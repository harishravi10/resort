# AURELIA — Luxury Resort & Nature Retreat
> *"Where Luxury Meets the Wild."*

---

## 1. Project Overview

**AURELIA** is a production-quality, highly interactive **3D luxury resort booking platform** crafted to deliver a cinematic, immersive hospitality experience. Designed to evoke high-end international retreat brands, visitors explore secluded villas suspended over turquoise ocean atolls and nestled within ancient rainforest canopies.

### Core Highlights
* **Cinematic 3D Hero Environment**: Procedural ocean water displacement, tropical island topography, swaying palms, overwater villa architecture, ambient sunlight, flying seabirds, and golden particle embers.
* **Scroll-Based 3D Narrative Story**: A 5-scene cinematic flight across Arrival, The Resort, The Residences, The Odyssey, and Sunset Horizon.
* **Interactive 3D Objects**:
  * **3D Rotating Earth Globe**: Interactive orbit controls featuring the Aurelia private sanctuary coordinates pin (`07°S, 72°E`).
  * **3D Luxury Villa Explorer**: Orbitable model with 5 clickable hotspots (*Bedroom, Pool, Bathroom, Balcony, Ocean View*) triggering architectural detail overlays.
  * **3D Room Suite Explorer**: In-room camera inspection highlighting the *Master King Bed, Concealed Mirror Cinema TV, Open Marble Rainfall Bath, Lagoon Terrace, and Sommelier Bar*.
* **Live Environmental Island Widget**: Real-time tropical temperature (°C / °F toggle), gentle ocean breeze speed, sunrise/sunset astronomical timings, and coral lagoon water metrics.
* **Web Audio Synthetic Soundscape**: Procedurally generated ocean wave swells and gentle coastal breezes with a 1-click toggle.
* **Complete Real-Time Booking System**:
  * 3-step luxury reservation flow with calendar dates, guest counts, and special requests.
  * Dynamic pricing formula with itemized tax and environmental sanctuary levy.
  * Booking confirmation with celebration confetti, unique reservation vouchers, and storage in Supabase / REST API.
* **User & Admin Portals**:
  * **Guest Dashboard**: Manage upcoming reservations, past visits, saved wishlists, and self-service cancellations.
  * **Admin Console**: Real-time revenue analytics, occupancy metrics, room inventory CRUD, and reservation status management.

---

## 2. Technology Stack

### Frontend
* **Core**: React 18 / 19, JavaScript (ESNext), HTML5, Vanilla CSS3 (Custom Luxury Design Tokens)
* **3D Graphics**: Three.js, React Three Fiber (`@react-three/fiber`), `@react-three/drei`
* **Routing & Animation**: React Router DOM 6, Framer Motion, GSAP, Canvas Confetti
* **Icons & HTTP**: Lucide React, Axios, `@supabase/supabase-js`

### Backend
* **Language & Framework**: Java 17, Spring Boot 3.2.4
* **Security & Auth**: Spring Security 6, JJWT (HMAC-SHA256 Token Provider), BCrypt Password Encoder
* **Persistence**: Spring Data JPA, Hibernate, PostgreSQL Driver
* **Architecture**: Strict layered architecture (`Controller` → `Service` → `Repository` → `Entity` → `DTO`)

### Database
* **PostgreSQL (Supabase)**: Row Level Security (RLS), UUID keys, foreign key constraints, and relational indices.

---

## 3. Folder Structure

```
resort/
├── frontend/
│   ├── public/
│   │   ├── _redirects             # Netlify SPA routing fallback
│   │   ├── favicon.svg            # Luxury gold monogram icon
│   │   ├── robots.txt             # SEO crawler directives
│   │   └── sitemap.xml            # SEO sitemap
│   ├── src/
│   │   ├── 3d/
│   │   │   ├── ResortHeroCanvas.jsx   # Fullscreen 3D WebGL hero scene
│   │   │   ├── ScrollStoryScene.jsx   # 5-scene scroll-driven camera rig
│   │   │   ├── InteractiveGlobe.jsx   # 3D rotating Earth with location beacon
│   │   │   ├── VillaExplorer3D.jsx    # 3D orbitable villa with 5 hotspots
│   │   │   └── RoomViewer3D.jsx       # 3D interactive suite inspection
│   │   ├── components/
│   │   │   ├── Navbar.jsx             # Floating glass navigation bar
│   │   │   ├── Footer.jsx             # Luxury editorial footer & gazette
│   │   │   ├── Cursor.jsx             # Magnetic glowing luxury cursor
│   │   │   ├── WeatherWidget.jsx      # Island live environmental widget
│   │   │   ├── AudioAmbience.jsx      # Web Audio ocean waves soundscape
│   │   │   ├── LoadingScreen.jsx      # Animated golden emblem preloader
│   │   │   └── BookingModal.jsx       # Multi-step booking engine
│   │   ├── context/
│   │   │   ├── AuthContext.jsx        # JWT & membership state
│   │   │   └── BookingContext.jsx     # Active reservation calculator
│   │   ├── pages/
│   │   │   ├── Home.jsx               # Cinematic master landing page
│   │   │   ├── Rooms.jsx              # 10 residences gallery & filter
│   │   │   ├── RoomDetail.jsx         # Villa deep-dive & 3D room inspector
│   │   │   ├── Dining.jsx             # Azure, Terra, Luna, Ember venues
│   │   │   ├── Spa.jsx                # Ayurvedic & Thalasso spa rituals
│   │   │   ├── Activities.jsx         # Island expeditions & diving
│   │   │   ├── UserDashboard.jsx      # Guest stay portfolio & cancellations
│   │   │   ├── AdminDashboard.jsx     # Executive metrics & inventory CRUD
│   │   │   ├── Login.jsx              # Portal login with 1-click demos
│   │   │   └── Register.jsx           # Membership enrollment
│   │   ├── sections/                  # Modular landing page chapters
│   │   ├── services/
│   │   │   ├── api.js                 # Universal Spring Boot / Supabase client
│   │   │   ├── supabase.js            # Supabase PostgreSQL client
│   │   │   └── mockData.js            # High-fidelity realistic dataset
│   │   ├── App.jsx
│   │   ├── index.css                  # Master CSS luxury tokens
│   │   └── main.jsx
│   ├── package.json
│   └── vite.config.js
├── backend/
│   ├── src/main/java/com/aurelia/resort/
│   │   ├── AureliaResortApplication.java
│   │   ├── config/                    # CorsConfig, WebMvcConfig
│   │   ├── controller/                # REST Controllers (Auth, Room, Booking, etc.)
│   │   ├── dto/                       # Request/Response Data Transfer Objects
│   │   ├── entity/                    # JPA Entities (User, Room, Booking, etc.)
│   │   ├── exception/                 # GlobalExceptionHandler, Custom Exceptions
│   │   ├── repository/                # Spring Data JPA Repositories
│   │   ├── security/                  # JwtTokenProvider, SecurityConfig, Filters
│   │   └── service/                   # Business Logic & Pricing Engines
│   ├── src/main/resources/
│   │   └── application.properties     # Supabase DB & JWT configs
│   └── pom.xml                        # Maven configuration
├── supabase/
│   ├── schema.sql                     # Full PostgreSQL tables & RLS policies
│   └── seed_data.sql                  # 10 Villas, 4 Restaurants, 6 Expeditions, Reviews
├── netlify.toml                       # Netlify production build configuration
├── .env.example
└── README.md
```

---

## 4. Local Installation

### Prerequisites
* **Node.js**: v18.0.0 or higher (v20+ recommended)
* **Java**: OpenJDK 17 or higher
* **Maven**: 3.8+ (or Maven wrapper)
* **Git**

### Clone & Setup
```bash
# 1. Clone repository
git clone https://github.com/your-username/aurelia-resort.git
cd aurelia-resort

# 2. Setup Frontend
cd frontend
npm install
```

---

## 5. Supabase Setup

1. Create a free project at [supabase.com](https://supabase.com).
2. Navigate to **SQL Editor** in your Supabase dashboard.
3. Open [`supabase/schema.sql`](file:///c:/Users/Harish/Desktop/resort/supabase/schema.sql) and paste its contents into the editor, then run it.
4. Open [`supabase/seed_data.sql`](file:///c:/Users/Harish/Desktop/resort/supabase/seed_data.sql) and paste its contents, then run it to populate 10 luxury villas, Michelin dining spots, activities, and initial reviews.
5. In **Project Settings** → **API**, copy:
   * `Project URL`
   * `anon public key`
6. In **Project Settings** → **Database**, copy your PostgreSQL connection URI.

---

## 6. Environment Variables

Create `.env` in `frontend/`:
```env
VITE_API_URL=http://localhost:8080
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-supabase-anon-key
```

Create environment variables for the Backend (or set in `backend/src/main/resources/application.properties`):
```env
DATABASE_URL=jdbc:postgresql://db.your-project.supabase.co:5432/postgres
DATABASE_USER=postgres
DATABASE_PASSWORD=your-db-password
JWT_SECRET=404E635266556A586E3272357538782F413F4428472B4B6250645367566B5970
PORT=8080
```

---

## 7. Running the Frontend

```bash
cd frontend
npm run dev
```
Open [http://localhost:5173/](http://localhost:5173/) or the displayed port in your browser.

To test the production build:
```bash
npm run build
npm run preview
```

---

## 8. Running the Backend

```bash
cd backend
mvn spring-boot:run
```
The REST API will launch on `http://localhost:8080`.

---

## 9. REST API Endpoints

| Method | Endpoint | Description | Access |
|---|---|---|---|
| `POST` | `/api/auth/register` | Register new user account | Public |
| `POST` | `/api/auth/login` | Login and receive Bearer JWT | Public |
| `GET` | `/api/rooms` | Retrieve all villas & suites | Public |
| `GET` | `/api/rooms/{id}` | Retrieve villa details by UUID | Public |
| `POST` | `/api/rooms` | Create new villa sanctuary | Admin |
| `PUT` | `/api/rooms/{id}` | Update villa specifications | Admin |
| `DELETE` | `/api/rooms/{id}` | Remove villa from inventory | Admin |
| `GET` | `/api/bookings` | View all resort reservations | Admin |
| `GET` | `/api/bookings/my` | View authenticated user's stays | User |
| `POST` | `/api/bookings` | Reserve a villa stay | User |
| `PUT` | `/api/bookings/{id}/cancel` | Cancel an existing reservation | User / Admin |
| `PUT` | `/api/bookings/{id}/status` | Update booking status | Admin |
| `GET` | `/api/restaurants` | View dining venues & menus | Public |
| `GET` | `/api/activities` | View curated resort expeditions | Public |
| `GET` | `/api/reviews` | View guest testimonials | Public |
| `POST` | `/api/reviews` | Post a new testimonial | User |
| `GET` | `/api/admin/dashboard` | Retrieve revenue & occupancy stats | Admin |

---

## 10. Authentication & Demo Credentials

The platform includes 1-click demo login buttons on the login page:

* **Registered Member**:
  * Email: `harish@example.com`
  * Password: `Password123!`
  * Role: `USER`
* **Admin Concierge**:
  * Email: `admin@aureliaresort.com`
  * Password: `Admin123!`
  * Role: `ADMIN`

---

## 11. Deployment

### Frontend (Netlify)
1. Push this repository to GitHub or GitLab.
2. Link the repository in Netlify.
3. Configure build settings:
   * **Base directory**: `frontend`
   * **Build command**: `npm run build`
   * **Publish directory**: `dist`
4. In Netlify **Environment Variables**, add:
   * `VITE_API_URL`: Your deployed backend URL
   * `VITE_SUPABASE_URL`: Your Supabase URL
   * `VITE_SUPABASE_ANON_KEY`: Your Supabase anon key
5. Deploy site. The included `public/_redirects` ensures seamless client-side SPA routing.

### Backend (Render / Railway / AWS)
1. Deploy the `backend/` folder to a Java 17 container on [Render](https://render.com) or [Railway](https://railway.app).
2. Set environment variables: `DATABASE_URL`, `DATABASE_USER`, `DATABASE_PASSWORD`, `JWT_SECRET`, `CORS_ALLOWED_ORIGINS`.
3. Build command: `mvn clean package -DskipTests`
4. Start command: `java -jar target/resort-backend-1.0.0.jar`

---

## 12. Troubleshooting

* **Vite Port Conflict**: If port 5173 is already in use, Vite will automatically select port 5174.
* **Offline / Standalone Fallback**: The frontend is architected with a universal resilient API client. If the Spring Boot backend or Supabase is not running, the application automatically uses high-fidelity local state caching with LocalStorage so every single feature (browsing, dynamic price calculation, booking creation, cancellation, admin actions) remains 100% interactive!
* **Soundscape Ambience**: The soundscape button uses the browser's Web Audio API and requires a user interaction (click) to start due to browser autoplay policies.
