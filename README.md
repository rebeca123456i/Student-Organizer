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
## 🚀 Demo Live

https://student-organizer-green.vercel.app/



## 💳 Planuri de abonament

| Funcționalitate | 🆓 Free | 💎 Premium |
|-----------------|:------:|:----------:|
| Dashboard | ✅ | ✅ |
| Gestionare task-uri | ✅ | ✅ |
| Matricea Eisenhower | ✅ | ✅ |
| Calendar | ✅ | ✅ |
| Organizare cursuri | ✅ | ✅ |
| Profil utilizator | ✅ | ✅ |
| Număr maxim de task-uri | 20 | Nelimitat |
| Încărcare materiale de curs | ❌ | ✅ |
| Generare quiz-uri cu AI | ❌ | ✅ |
| Generare rezumate cu AI | ❌ | ✅ |
| Plan de studiu personalizat cu AI | ❌ | ✅ |
| Suport prioritar | ❌ | ✅ |
| Preț | **Gratuit** | **50 USD** |


## 🛠️ Tehnologii utilizate

| Componentă | Tehnologie |
|------------|------------|
| Framework | Next.js 16 (App Router) |
| Limbaj | TypeScript |
| Stilizare | Tailwind CSS |
| Bază de date | Neon PostgreSQL |
| ORM | Prisma |
| Autentificare | Clerk |
| Plăți | Stripe |
| Inteligență Artificială | OpenAI API |
| Calendar | Google Calendar API |
| Deploy | Vercel |
---

## 📂 Structura proiectului

| Director | Rol |
|-----------|-----|
| `app/dashboard` | Pagina principală (Dashboard) |
| `app/tasks` | Gestionarea task-urilor |
| `app/calendar` | Calendar și evenimente |
| `app/profile` | Profil utilizator |
| `app/pricing` | Pagina de abonamente |
| `app/api` | API-uri (Stripe, AI, Calendar etc.) |
| `components` | Componente reutilizabile |
| `lib` | Configurări și utilitare (Prisma, Stripe etc.) |
| `prisma` | Schema bazei de date și migrații |
| `public` | Imagini și fișiere statice |

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

## 🚀 Roadmap

| Status | Feature |
|:------:|---------|
| ✅ | Project setup |
| ✅ | Clerk Authentication |
| ✅ | Prisma + Neon Database |
| ✅ | Pricing Page |
| ✅ | Stripe Subscription |
| ✅ | User Profile |
|    | Dashboard |
|    | Task Management |
|    | Eisenhower Matrix |
|    | Google Calendar |
|    | AI Quiz Generator |
|    | AI Summary Generator |
|    | AI Study Planner |
|    | Responsive Design |
|    | Deploy to Vercel |



## ✨ Funcționalități

| Modul | Descriere |
|--------|-----------|
| 📊 Dashboard | Vizualizare rapidă a progresului și statisticilor personale |
| ✅ Task-uri | Creare, editare, ștergere și organizare folosind Matricea Eisenhower |
| 📅 Calendar | Organizarea examenelor, cursurilor și evenimentelor |
| 👤 Profil | Administrarea contului și a abonamentului |
| 💳 Abonamente | Upgrade de la Free la Premium prin Stripe |
| 🤖 AI Quiz | Generarea automată de teste din materialele încărcate |
| 📝 AI Summary | Generarea rezumatelor pentru cursuri |
| 📚 AI Study Planner | Crearea unui plan personalizat de învățare |



---

## 🌿 Strategie Git


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