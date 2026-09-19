import { NextRequest, NextResponse } from 'next/server';
import { acquireSlotLock, releaseSlotLock } from '@/lib/redis';
import { query } from '@/lib/db';
import { z } from 'zod';

const bookingSchema = z.object({
  citizenName: z.string().min(3),
  phone: z.string().min(10),
  categoryId: z.number().int(),
  appointmentDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  slotTime: z.string().regex(/^\d{2}:\d{2}$/)
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const validated = bookingSchema.parse(body);

    // 1. Acquire distributed lock on Redis to prevent concurrency collisions
    const lockToken = await acquireSlotLock(validated.appointmentDate, validated.slotTime);
    if (!lockToken) {
      return NextResponse.json(
        { error: 'Selected time slot is currently being processed by another applicant. Please select another slot.' },
        { status: 409 }
      );
    }

    try {
      // 2. Check current bookings count for that slot
      const existing = await query(
        'SELECT count(*) FROM appointments WHERE appointment_date = $1 AND slot_time = $2 AND status != $3',
        [validated.appointmentDate, validated.slotTime, 'CANCELLED']
      );

      const count = parseInt(existing.rows[0].count, 10);
      const MAX_SLOT_CAPACITY = 5;

      if (count >= MAX_SLOT_CAPACITY) {
        return NextResponse.json({ error: 'This time slot is completely booked.' }, { status: 400 });
      }

      // 3. Generate unique random tracking code
      const trackingCode = 'SP-' + Math.random().toString(36).substring(2, 8).toUpperCase();

      const insertRes = await query(
        `INSERT INTO appointments (tracking_code, citizen_name, phone, category_id, appointment_date, slot_time)
         VALUES ($1, $2, $3, $4, $5, $6) RETURNING id, tracking_code, status`,
        [trackingCode, validated.citizenName, validated.phone, validated.categoryId, validated.appointmentDate, validated.slotTime]
      );

      return NextResponse.json({
        success: true,
        data: insertRes.rows[0],
        message: 'Appointment successfully scheduled!'
      }, { status: 201 });

    } finally {
      // Always release distributed lock
      await releaseSlotLock(validated.appointmentDate, validated.slotTime, lockToken);
    }

  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Internal Server Error' }, { status: 400 });
  }
}
