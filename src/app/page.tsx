'use client';
import React, { useState } from 'react';

export default function Home() {
  const [formData, setFormData] = useState({
    citizenName: '',
    phone: '',
    categoryId: 1,
    appointmentDate: '2026-10-01',
    slotTime: '10:00'
  });
  const [result, setResult] = useState<any>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setResult({ status: 'loading' });
    try {
      const res = await fetch('/api/appointments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      setResult(data);
    } catch (err: any) {
      setResult({ error: err.message });
    }
  };

  return (
    <main style={{ minHeight: '100vh', background: '#0b0d12', color: '#f8fafc', padding: '3rem 1.5rem', fontFamily: 'sans-serif' }}>
      <div style={{ maxWidth: '640px', margin: '0 auto', background: 'rgba(17,20,24,0.85)', padding: '2rem', borderRadius: '12px', border: '1px solid #1e2535' }}>
        <h1 style={{ color: '#4a9eff', marginBottom: '0.5rem' }}>ServisPort Online Randevu</h1>
        <p style={{ color: '#94a3b8', marginBottom: '2rem' }}>Yüksek trafik toleranslı, anlık evrak doğrulama ve randevu planlama sistemi.</p>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.875rem', marginBottom: '0.5rem' }}>Ad Soyad</label>
            <input
              type="text"
              required
              value={formData.citizenName}
              onChange={e => setFormData({ ...formData, citizenName: e.target.value })}
              style={{ width: '100%', padding: '0.75rem', background: '#111418', border: '1px solid #2d3748', borderRadius: '6px', color: '#fff' }}
              placeholder="Örn: Ahmet Yılmaz"
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.875rem', marginBottom: '0.5rem' }}>Telefon Numarası</label>
            <input
              type="tel"
              required
              value={formData.phone}
              onChange={e => setFormData({ ...formData, phone: e.target.value })}
              style={{ width: '100%', padding: '0.75rem', background: '#111418', border: '1px solid #2d3748', borderRadius: '6px', color: '#fff' }}
              placeholder="5XX XXX XX XX"
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.875rem', marginBottom: '0.5rem' }}>Randevu Tarihi</label>
              <input
                type="date"
                required
                value={formData.appointmentDate}
                onChange={e => setFormData({ ...formData, appointmentDate: e.target.value })}
                style={{ width: '100%', padding: '0.75rem', background: '#111418', border: '1px solid #2d3748', borderRadius: '6px', color: '#fff' }}
              />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '0.875rem', marginBottom: '0.5rem' }}>Saat Dilimi</label>
              <select
                value={formData.slotTime}
                onChange={e => setFormData({ ...formData, slotTime: e.target.value })}
                style={{ width: '100%', padding: '0.75rem', background: '#111418', border: '1px solid #2d3748', borderRadius: '6px', color: '#fff' }}
              >
                <option value="09:00">09:00 - 09:30</option>
                <option value="10:00">10:00 - 10:30</option>
                <option value="11:30">11:30 - 12:00</option>
                <option value="14:00">14:00 - 14:30</option>
                <option value="15:30">15:30 - 16:00</option>
              </select>
            </div>
          </div>

          <button
            type="submit"
            style={{ padding: '0.875rem', background: '#4a9eff', color: '#000', border: 'none', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer', marginTop: '1rem' }}
          >
            Randevu Oluştur &amp; Onayla
          </button>
        </form>

        {result && (
          <div style={{ marginTop: '1.5rem', padding: '1rem', borderRadius: '6px', background: result.success ? 'rgba(77,219,135,0.1)' : 'rgba(255,107,107,0.1)', border: result.success ? '1px solid #4ddb87' : '1px solid #ff6b6b' }}>
            <pre style={{ margin: 0, fontSize: '0.85rem' }}>{JSON.stringify(result, null, 2)}</pre>
          </div>
        )}
      </div>
    </main>
  );
}
