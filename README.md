````markdown
# 🛰️ MyCorp. Global Mainframe | Frontend Portal

The **MyCorp. Frontend** is a high-performance, enterprise-grade corporate interface built with **Next.js 16**, **Tailwind CSS**, and **Framer Motion**. It serves as the primary gateway for the MyCorp. ecosystem, featuring a public registry, subsidiary management portal, and an administrative command center.

---

### 🚀 Core Technical Stack

- **Framework:** Next.js 16 (App Router + Turbopack)
- **Styling:** Tailwind CSS (Glassmorphism & High-Tech Aesthetics)
- **Animations:** Framer Motion (Hover Glows, Shimmer Scans, Page Transitions)
- **Icons:** Lucide-React
- **Communication:** Axios / Fetch API (Synchronized with Port 8081)

---

### 🛠️ Prerequisites

Before launching the portal, ensure the following are installed:

1.  **Node.js 18.x** or higher.
2.  **npm** or **yarn** package manager.
3.  **Spring Boot Backend** (Running on Port 8081 for data synchronization).

---

### 📦 Installation & Setup

#### 1. Navigate to Directory

```bash
cd frontend
```
````

#### 2. Install Dependencies

```bash
npm install
```

#### 3. Configure API Uplink

Ensure the configuration in `src/lib/api.ts` correctly points to your backend mainframe:

```typescript
const API_BASE_URL = "http://localhost:8081/api";
```

#### 4. Launch Development Portal

```bash
npm run dev
```

_The portal will initialize and listen on **http://localhost:3000**._

---

### 📡 System Architecture & Routing

The portal is architected into three distinct operational tiers:

#### **A. The Public Hub**

- **Landing Page:** Cinematic overview of group sectors and mission.
- **Global Registry:** Dynamic directory of all verified MyCorp. subsidiaries.
- **Sector Slugs:** Dedicated entry points for Technology, Logistics, and Real Estate.
- **Contact Terminal:** Encrypted form for transmitting inquiries to the mainframe.

#### **B. Subsidiary Dashboard (`/dashboard`)**

- **Overview:** Real-time uplink status and corporate identity tracking.
- **Entity Profile:** Self-service management of HQ address, website, and phone variables.
- **Compliance:** Secure view of registration IDs and sector allocations.

#### **C. Admin Command Center (`/admin`)**

- **Master Intelligence:** A high-level view mapping all users to their registered entities.
- **Inquiry Inbox:** Centralized management of all incoming public messages.
- **Global Audit:** Monitoring tool for the entire network valuation and node count.

---

### 🛡️ UI/UX Features

- **Hover Glow Logic:** Interactive KPI cards and navigation links feature theme-specific background light pulses.
- **Shimmer Scan:** A high-tech "laser scan" animation sweeps across cards on hover to simulate data processing.
- **Responsive Mainframe:** 100% mobile-optimized layouts with a compact, professional navigation system.
- **Glassmorphism:** Modern UI depth using backdrop blurs and semi-transparent layers.

---

### 📂 Directory Structure

```text
frontend/
├── app/                # Main Routing Nodes (Dashboard, Admin, Registry)
├── src/
│   ├── components/     # UI Modules (Navbar, KPI Cards, Sector Slugs)
│   ├── lib/            # Mainframe API Bridge (Axios instance)
│   └── styles/         # Global CSS & Tailwind Configuration
├── public/             # Static Assets & Global Branding
└── tailwind.config.ts  # Theme & Animation Extension
```
