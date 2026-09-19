# ServisPort

<img align="left" width="40%" src="https://raw.githubusercontent.com/kubrvk/portfolio/main/img/galeri/site/11a.jpg"/>

<h3><a href="https://github.com/kubrvk/ServisPort"><img src="https://img.shields.io/badge/GitHub-kubrvk%2FServisPort-000000?style=flat-square&logo=github&logoColor=white" height="25"/></a></h3>

![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badges&logo=nextdotjs&logoColor=white) ![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badges&logo=nodedotjs&logoColor=white) ![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badges&logo=postgresql&logoColor=white) ![Redis](https://img.shields.io/badge/Redis-DC382D?style=for-the-badges&logo=redis&logoColor=white)

<br>

High-traffic citizen application and appointment booking portal built for web accessibility and Redis caching.

<br clear="left"/>

---

## Technical Details

| Component | Specification |
|---|---|
| Framework | Next.js, Node.js |
| Cache & Concurrency | Redis (Distributed Slot Locking & Fast Caching) |
| Database | PostgreSQL (ACID-compliant Transactional Appointments) |
| Accessibility (a11y) | WCAG 2.1 AA Compliance, Keyboard Navigation, Screen Reader Ready |
| Styling | Tailored Clean CSS with High Contrast Modes |

---

## Code Overview & Architecture

```text
ServisPort/
├── src/
│   ├── app/               # Next.js App Router pages
│   ├── components/        # Accessible form controls & calendar picker
│   ├── lib/
│   │   ├── db.ts          # PostgreSQL connection pool
│   │   └── redis.ts       # Redis client & lock management
│   └── services/          # Booking verification & slot reservation
├── public/                # Static assets & icons
├── package.json
└── README.md
```

---

## License & Author

Developed by **[Beraat Yetkin](https://github.com/kubrvk)**. All rights reserved.
