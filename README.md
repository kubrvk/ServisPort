# ServisPort — Online Application & Booking Portal

![Build Status](https://img.shields.io/badge/Build-Passing-brightgreen?style=flat-square)
![Next.js](https://img.shields.io/badge/Next.js-14_App_Router-black?style=flat-square&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.3-blue?style=flat-square&logo=typescript)
![Redis](https://img.shields.io/badge/Redis-7_Distributed_Locking-red?style=flat-square&logo=redis)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16-336791?style=flat-square&logo=postgresql)
![License](https://img.shields.io/badge/License-MIT-purple?style=flat-square)

ServisPort is an enterprise-tier citizen and customer application intake portal designed to handle high-concurrency appointment scheduling, document verification, and transactional confirmation alerts with strict zero-double-booking guarantees.

---

## 🏛️ System Architecture

```
                       +---------------------------------------+
                       |          User Web Browser             |
                       |       (Next.js 14 Responsive)         |
                       +-------------------+-------------------+
                                           | HTTP/2 & HTTPS
                                           v
+------------------------------------------------------------------------------------+
|                         Next.js App Router Edge & API Server                       |
|                                                                                    |
|   +----------------------------------------------------------------------------+   |
|   |                       Zod Payload Schema Validation                        |   |
|   +--------------------------------------+-------------------------------------+   |
|                                          |                                         |
|                 +------------------------+------------------------+                |
|                 |                                                 |                |
|                 v                                                 v                |
|  +------------------------------+                +------------------------------+  |
|  |     Redis Redlock Engine     |                |     Document Vault Proxy     |  |
|  | (Distributed Concurrency Lk) |                |  (Anti-malware & MIME Check) |  |
|  +--------------+---------------+                +--------------+---------------+  |
|                 | Lock Granted                                  | Clean Metadata   |
|                 +------------------------+----------------------+                  |
|                                          v                                         |
|                          +-------------------------------+                         |
|                          |    PostgreSQL 16 Engine Pool  |                         |
|                          +---------------+---------------+                         |
+------------------------------------------|-----------------------------------------+
                                           v
                       +---------------------------------------+
                       |       SMS / Email Webhook Dispatch    |
                       |      (Tracking Code Confirmation)     |
                       +---------------------------------------+
```

---

## 🚀 Key Architectural Highlights

- **Concurrency-Safe Slot Locking**: Utilizes Redis distributed locks with exponential backoff to eliminate race conditions during peak appointment release spikes.
- **Micro-Document Verification**: Secure file intake pipeline verifying MIME types, byte length constraints, and signature verification.
- **Stateless Horizontal Scaling**: Edge-compatible API routes with low cold-start latency.
- **Accessibility & Compliance (WCAG 2.1 AA)**: Semantic HTML, ARIA landmarks, and keyboard-navigable scheduling components.

---

## 🔌 Core API Specifications

### `POST /api/appointments`
Reserve and commit an appointment slot with distributed locking.

**Request Payload:**
```json
{
  "citizenName": "Can Demir",
  "phone": "+905551234567",
  "categoryId": 2,
  "appointmentDate": "2026-11-05",
  "slotTime": "14:30"
}
```

**Response (201 Created):**
```json
{
  "success": true,
  "data": {
    "id": "f47ac10b-58cc-4372-a567-0e02b2c3d479",
    "tracking_code": "SP-9A82FC",
    "status": "SCHEDULED"
  },
  "message": "Appointment successfully scheduled!"
}
```

---

## 💻 Local Setup & Deployment

### Run via Docker Compose
```bash
git clone https://github.com/kubrvk/ServisPort.git
cd ServisPort

# Start PostgreSQL, Redis, and Next.js portal
docker compose up -d --build
```
Navigate to `http://localhost:3000` to interact with the scheduling portal.

### Manual Development
```bash
npm install
npm run dev
```

---

## 👤 Author & License

- **Author**: `kubrvk` ([GitHub Profile](https://github.com/kubrvk))
- **License**: MIT License.
