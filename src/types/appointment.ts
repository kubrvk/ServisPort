export type AppointmentStatus = 'SCHEDULED' | 'VERIFIED' | 'COMPLETED' | 'CANCELLED';

export interface AppointmentSlot {
  time: string;
  capacity: number;
  bookedCount: number;
  available: boolean;
}

export interface AppointmentBookingRequest {
  citizenName: string;
  phone: string;
  categoryId: number;
  appointmentDate: string; // YYYY-MM-DD
  slotTime: string;        // HH:mm
}

export interface AppointmentRecord {
  id: string;
  trackingCode: string;
  citizenName: string;
  phone: string;
  appointmentDate: string;
  slotTime: string;
  status: AppointmentStatus;
}
