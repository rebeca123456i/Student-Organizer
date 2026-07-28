<div align="center">

# 📚 Student Organizer

### Platforma all-in-one pentru organizare academică și studiu asistat de AI

[![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-blue?logo=typescript)](https://www.typescriptlang.org/)
[![Prisma](https://img.shields.io/badge/Prisma-ORM-2D3748?logo=prisma)](https://www.prisma.io/)
[![Neon](https://img.shields.io/badge/Neon-PostgreSQL-00E599?logo=postgresql)](https://neon.tech/)
[![Clerk](https://img.shields.io/badge/Auth-Clerk-6C47FF)](https://clerk.com/)
[![Stripe](https://img.shields.io/badge/Payments-Stripe-635BFF?logo=stripe)](https://stripe.com/)
[![Deployed on Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black?logo=vercel)](#)

[Demo Live](#-demo-live) • [Funcționalități](#-funcționalități) • [Tech Stack](#️-tech-stack) • [Instalare](#-instalare-locală)

</div>

---

## 🎯 Despre proiect

**Student Organizer** este o aplicație web construită pentru a rezolva o problemă reală: studenții își pierd timpul jonglând între aplicații diferite pentru task-uri, calendar și materiale de curs.

Aplicația reunește **organizare**, **planificare** și **învățare asistată de AI** într-un singur spațiu de lucru gândit să fie confortabil și motivant, cu un sidebar persistent care creează senzația unui "loc de studiu" personal, nu doar un simplu tool de productivitate.

---

## ✨ Funcționalități

### 🆓 Plan Free

| Funcționalitate | Descriere |
|---|---|
| 🧭 **Dashboard** | Prezentare de ansamblu a activității și progresului |
| ✅ **To-Do List (Matrice Eisenhower)** | Task-urile sunt clasificate automat pe 4 cadrane: **Urgent & Important**, **Important & Neurgent**, **Urgent & Neimportant**, **Neimportant & Neurgent** |
| 📅 **Calendar integrat** | Sincronizare bidirecțională cu **Google Calendar**, folosind emailul academic al studentului |
| 🔐 **Autentificare securizată** | Login/Signup gestionat prin **Clerk** |
| 🗂️ **Sidebar persistent** | Navigare rapidă între Dashboard, Task-uri, Calendar, Profil |

### 💎 Plan Premium — AI Study (50€)

| Funcționalitate | Descriere |
|---|---|
| 📖 **Upload materiale de curs** |

| Layer | Tehnologie |
|---|---|
| Framework | [Next.js 16](https://nextjs.org/)(App Router) |
| Limbaj | TypeScript |
| Stilizare | Tailwind CSS |
| Bază de date | [Neon](https://neon.tech/) — PostgreSQL Serverless |
| ORM | [Prisma](https://www.prisma.io/) |
| Autentificare | [Clerk](https://clerk.com/) |
| Plăți / Abonamente | [Stripe](https://stripe.com/) |
| Calendar | Google Calendar API |
| AI | Quiz generation / Summarization / Study planning |
| Deploy | [Vercel](https://vercel.com/) |

---

## 📂 Structura proiectului

student-organizer/
├── app/ # Rute Next.js (App Router)
│ ├── dashboard/ # Pagina principală, overview
│ ├── tasks/ # To-do list & matrice Eisenhower
│ ├── pricing/ # Planuri de abonament
│ ├── profile/ # Profil utilizator
│ ├── sign-in/ # Autentificare (Clerk)
│ ├── sign-up/ # Înregistrare (Clerk)
│ └── api/ # API routes (webhooks Stripe, Google Calendar etc.)
├── components/ # Componente UI reutilizabile
├── lib/ # Utilitare, configurări (Prisma client, helpers)
├── prisma/ # Schema bazei de date & migrații
├── public/ # Assets statice (imagini, logo)
└── src/generated/prisma/ # Prisma Client generat automat

---

## 🚀 Demo Live

🔗 **[student-organizer.vercel.app](#)** *(link în curând, după deploy)*

---

## 📦 Instalare locală

### Cerințe
- Node.js 18+
- Cont [Neon](https://neon.tech/) (PostgreSQL)
- Cont [Clerk](https://clerk.com/)
- Cont [Stripe](https://stripe.com/)

### Pași

```bash
# 1. Clonează repo-ul
git clone https://github.com/rebeca123456i/Student-Organizer.git
cd Student-Organizer

# 2. Instalează dependențele
npm install

# 3. Configurează variabilele de mediu
cp .env.example .env.local
# completează DATABASE_URL, Clerk keys, Stripe keys etc.

# 4. Generează Prisma Client & rulează migrațiile
npx prisma generate
npx prisma migrate dev

# 5. Pornește serverul de dezvoltare
npm run dev
```

Deschide [http://localhost:3000](http://localhost:3000) în browser.

---

## 🗺️ Roadmap

- [x] Setup proiect Next.js + structură de bază
- [x] Autentificare cu Clerk
- [x] Integrare bază de date (Neon + Prisma)
- [ ] Dashboard funcțional
- [ ] To-do list cu matrice Eisenhower
- [ ] Integrare Google Calendar
- [ ] Integrare Stripe (abonamente Free / Premium)
- [ ] Generare quiz-uri AI
- [ ] Generare summary AI
- [ ] Study Plan AI
- [ ] Deploy pe Vercel

---

## 🌿 Branch Strategy

| Branch | Scop |
|---|---|
| `main` | Cod stabil, protejat — merge doar prin Pull Request |
| `dev` | Branch de dezvoltare activă |

---

## 👩‍💻 Autor

Realizat de **Rebeca**, ca proiect de practică / dezvoltare aplicație web full-stack.

---

<div align="center">
Made with ☕ and Next.js
</div>