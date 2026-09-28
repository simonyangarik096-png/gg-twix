# GG TWIX

> Երկու քույրերի՝ **Yana**-յի և **Eva**-յի համատեղ YouTube ալիքի 3D ինտերակտիվ կայք։

![GG TWIX](https://img.shields.io/badge/GG-TWIX-FF33FA?style=for-the-badge)
![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react&logoColor=white)
![Three.js](https://img.shields.io/badge/Three.js-0.160-000000?style=for-the-badge&logo=three.js&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-18+-339933?style=for-the-badge&logo=node.js&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-8-47A248?style=for-the-badge&logo=mongodb&logoColor=white)

---

## 📖 Բովանդակություն

- [🎯 Ինչ է սա](#-ինչ-է-սա)
- [✨ Առանձնահատկություններ](#-առանձնահատկություններ)
- [🛠️ Տեխնոլոգիաներ](#️-տեխնոլոգիաներ)
- [📁 Կառուցվածք](#-կառուցվածք)
- [🚀 Կարգավորում](#-կարգավորում)
- [👥 Admin Դերեր](#-admin-դերեր)
- [🎮 Խաղ](#-խաղ)
- [🚢 Deploy](#-deploy)
- [📄 License](#-license)

---

## 🎯 Ինչ է սա

**GG TWIX**-ը 3D ինտերակտիվ web կայք է, որը ստեղծված է երկու քույրերի՝ Yana-յի և Eva-յի համատեղ YouTube ալիքի համար։

**Գլխավոր էջում** → 3D ինտերակտիվ տարածք, որտեղ:
- 👑 **GG TWIX լոգո** → կենտրոնում, դանդաղ պտտվող
- 🩷 **YANA կոճակ** → ուղղորդում է Yana-յի panel
- 💠 **EVA կոճակ** → ուղղորդում է Eva-յի panel
- 📺 **3D հեռուստացույց** → սեղմելիս բացվում է YouTube ալիք
- 🎮 **3D խաղային ապարատ** → սեղմելիս բացվում է խաղի էջ

---

## ✨ Առանձնահատկություններ

### 🎨 Frontend
- ✅ **3D մոդելներ** → Three.js + React Three Fiber
- ✅ **Ինտերակտիվ scene** → մկնիկով պտտում, zoom
- ✅ **Responsive** → բոլոր էջերում
- ✅ **Neon դիզայն** → Yana-յի magenta + Eva-յի cyan
- ✅ **Հայերեն** ամբողջ UI-ով
- ✅ **SPA** → արագ navigation

### 🔧 Backend
- ✅ **REST API** → Express.js
- ✅ **MongoDB** → Mongoose-ով
- ✅ **JWT Authentication** → 7-օրյա token
- ✅ **Password hashing** → bcryptjs
- ✅ **Role-based access** → 4 մակարդակ
- ✅ **Activity Log** → ամեն գործողություն գրանցվում է
- ✅ **File uploads** → Multer (նկար + վիդեո)

### 🔐 Admin Համակարգ
- ✅ **4 տիպի admin** → Yana / Eva / General / Leader
- ✅ **Առանձին panel** ամեն դերի համար
- ✅ **Իրավունքների տարանջատում**
- ✅ **Leader-ը** կարող է **ամեն ինչ**

---

## 🛠️ Տեխնոլոգիաներ

### Frontend
| Տեխնոլոգիա | Տարբերակ | Ինչի համար |
|------------|----------|-----------|
| React | 18.2 | UI framework |
| Vite | 5.0 | Build tool |
| React Router | 6.20 | Routing |
| Three.js | 0.160 | 3D գրադարան |
| @react-three/fiber | 8.15 | React + Three |
| @react-three/drei | 9.92 | 3D helpers |
| TailwindCSS | 3.3 | CSS framework |
| Axios | 1.6 | HTTP client |

### Backend
| Տեխնոլոգիա | Տարբերակ | Ինչի համար |
|------------|----------|-----------|
| Node.js | 18+ | Runtime |
| Express | 4.18 | Web framework |
| MongoDB | 8.0 | Database |
| Mongoose | 8.0 | ODM |
| JWT | 9.0 | Authentication |
| bcryptjs | 2.4 | Password hashing |
| Multer | 1.4 | File uploads |

---

## 📁 Կառուցվածք

```
gg-twix/
├── frontend/                    # React app
│   ├── public/
│   │   └── models/              # 3D մոդելներ (.glb)
│   │       ├── gg-twix-logo.glb
│   │       ├── tv.glb
│   │       └── console.glb
│   ├── src/
│   │   ├── api/                 # Axios client
│   │   ├── components/          # Reusable components
│   │   ├── context/             # AuthContext
│   │   ├── pages/               # Էջեր
│   │   │   └── admin/           # 4 Admin panels
│   │   ├── styles/              # Գլոբալ CSS
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── index.html
│   ├── package.json
│   ├── tailwind.config.js
│   ├── postcss.config.js
│   └── vite.config.js
│
├── backend/                     # Express API
│   ├── src/
│   │   ├── config/              # DB connection
│   │   ├── controllers/         # Business logic
│   │   ├── middleware/          # Auth
│   │   ├── models/              # Mongoose schemas
│   │   ├── routes/              # API endpoints
│   │   ├── utils/               # Seed
│   │   └── server.js
│   ├── uploads/                 # User files
│   │   ├── images/
│   │   └── videos/
│   ├── .env
│   └── package.json
│
├── package.json                 # Root config
├── .gitignore
└── README.md
```

---

## 🚀 Կարգավորում

### Նախապատրաստում

Համոզվիր, որ ունես.
- ✅ **Node.js 18+** → [nodejs.org](https://nodejs.org/)
- ✅ **Git** → [git-scm.com](https://git-scm.com/)
- ✅ **MongoDB** → [mongodb.com/try/download/community](https://www.mongodb.com/try/download/community) **կամ** MongoDB Atlas

### Քայլ 1 — Clone

```bash
git clone <repository-url>
cd gg-twix
```

### Քայլ 2 — Տեղադրել Dependencies

```bash
npm run install:all
```

**Այս հրամանը տեղադրում է.**
- Root-ի deps
- Frontend-ի deps
- Backend-ի deps

### Քայլ 3 — Կարգավորել Environment

Ստեղծիր `backend/.env` ֆայլը.

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/gg-twix
JWT_SECRET=change_this_to_a_long_random_secret_string_please
JWT_EXPIRE=7d
```

**⚠️ Production-ից առաջ** փոխիր `JWT_SECRET`-ը → **ուժեղ** random string-ով։

### Քայլ 4 — Տեղադրել 3D Մոդելները

Դիր 3 `.glb` ֆայլերը `frontend/public/models/` պանակում:
- `gg-twix-logo.glb`
- `tv.glb`
- `console.glb`

### Քայլ 5 — Աշխատացնել

```bash
npm run dev
```

**Արդյունք.**
- 🌐 **Frontend** → http://localhost:3000
- 🔧 **Backend** → http://localhost:5000
- 🔐 **Login** → http://localhost:3000/admin/login

---

## 👥 Admin Դերեր

### 🩷 Yana Admin
**Իրավունքներ.** Միայն **Yana panel**-ը։
- Փոխել bio
- Ավելացնել/ջնջել նկարներ
- Ավելացնել/ջնջել վիդեոներ

**Մուտք.** `/admin/yana`

---

### 💠 Eva Admin
**Իրավունքներ.** Միայն **Eva panel**-ը։

**Մուտք.** `/admin/eva`

---

### ⚙️ Ընդհանուր Admin
**Իրավունքներ.** Միայն **ընդհանուր էջը**։
- Hero վերնագիր + ենթավերնագիր
- Հեռուստացույցի բաժին
- Խաղի բաժին
- Սոցցանցեր
- Footer

**Մուտք.** `/admin/general`

---

### 👑 Leader Admin
**Իրավունքներ.** **ԱՄԵՆ ԻՆՉ**։
- ✅ Ստեղծել ադմիններ (4 դերերից ցանկացած)
- ✅ Ջնջել ադմիններ
- ✅ Փոխել ադմինների password-ները
- ✅ Փոխել դերերը
- ✅ Մուտք գործել **ցանկացած** panel
- ✅ Տեսնել Activity Log

**Մուտք.** `/admin/leader`

**⚠️ Առաջին մուտք.** `leader / leader123` (Seed-ից)

**⚠️ Կարևոր.** Առաջին մուտքից **հետո փոխիր** password-ը։

---

## 🎮 Խաղ

**⚠️ Խաղը դեռ պատրաստ չէ** → ցուցադրվում է «Շուտով...» էջ։

**Ապագա պլաններ.** → Մկնիկով կառավարվող խաղ → Three.js-ով։

**Մուտք.** `/game` կամ **սեղմել** 3D խաղային ապարատին **գլխավոր էջում**։

---

## 🚢 Deploy

### Frontend → Vercel

1. Գրանցվիր [vercel.com](https://vercel.com/)
2. Import project → **root directory** ընտրիր `frontend`
3. Build command → `npm run build`
4. Output directory → `dist`

### Backend → Render

1. Գրանցվիր [render.com](https://render.com/)
2. New Web Service → **root directory** ընտրիր `backend`
3. Build command → `npm install`
4. Start command → `npm start`
5. Environment variables → ավելացրու `.env`-ի արժեքները

### Database → MongoDB Atlas

1. Գրանցվիր [mongodb.com/atlas](https://www.mongodb.com/atlas)
2. Ստեղծիր **անվճար** cluster (M0)
3. Ստեղծիր user + թույլատրիր IP
4. Ստացիր connection string
5. Դիր Render-ի `MONGO_URI`-ի մեջ

---

## 📄 License

**Private** — © 2025 GG TWIX

Բոլոր իրավունքները պաշտպանված են։

---

## 👨‍💻 Հեղինակ

**GG TWIX**
- 🩷 **Yana** → YouTube ալիքի համահիմնադիր
- 💠 **Eva** → YouTube ալիքի համահիմնադիր

**YouTube.** [@evayanagrigoryans](https://youtube.com/@evayanagrigoryans)

---

<div align="center">

**🩷 Made with love for Yana & Eva 💠**

</div>