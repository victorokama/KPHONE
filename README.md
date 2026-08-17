# ❖ Pulse Mobile Repair & Tech Labs — Business Website

> A high-performance 4-page modern luxury smartphone repair & diagnostic business website featuring interactive tools, an instant cost estimator, a live repair tracker, and online appointment booking.

![License](https://img.shields.io/badge/License-MIT-blue.svg)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black)

---

## ✨ Overview

**Pulse Mobile Repair & Tech Labs** is an end-to-end web application built using HTML5, modular CSS3 custom properties, and vanilla JavaScript. It features an ultra-modern **Dark Slate & Electric Cyan aesthetic with glowing laser violet highlights, glassmorphism UI cards, micro-interactions, and mobile-first responsive architecture**.

---

## 📑 Included Pages & Modules

1. **Home (`#home`)**
   - Hero banner with glow effects, trust metrics counters, and instant quote CTAs.
   - **Live Repair Status Tracker**: Interactive ticket lookup tool (`PULSE-8942`).
   - Quick repair services grid (Screen, Battery, Water Damage, Charging Port, Camera, Micro-Soldering).

2. **Repair Services Catalog (`#services`)**
   - Brand filter bar (Apple iPhone, Samsung Galaxy, Google Pixel, iPad & Tablets).
   - Interactive device catalog with turnaround times, OEM vs premium specs, and pricing breakdown.

3. **Instant Repair Cost Estimator (`#calculator`)**
   - Step 1: Select Brand (Apple, Samsung, Google, iPad).
   - Step 2: Select Device Model (Dynamic dropdown).
   - Step 3: Select Problem(s) (Cracked screen, battery, water wash, charging port, camera).
   - Step 4: Fulfillment option (Express Store Walk-In vs On-Site Mobile Van).
   - **Real-Time Price Panel**: Calculates total guaranteed price, turnaround time, 90-day warranty badge, and bridges straight into booking.

4. **Book Repair & Contact (`#contact`)**
   - Appointment booking form with preferred date/time slot selection.
   - Interactive reservation confirmation modal with ticket reference generator (`PULSE-XXXXX`).
   - Store hub location info, emergency tech phone lines, and expandable FAQ accordions.

---

## 📁 File Structure

```
BUSINESS WEBSITE/
├── assets/
│   └── hero_phone_repair.png   # Precision workbench & screen repair visual
├── .gitignore                  # OS & temporary file rules
├── index.html                  # Main SPA markup & views (#home, #services, #calculator, #contact)
├── styles.css                  # Modern dark tech design system & responsive CSS
├── script.js                   # Client-side hash router, cost estimator, tracker & modal logic
├── LICENSE                     # MIT License
└── README.md                   # Project documentation
```

---

## 🚀 How to Run Locally

Simply open `index.html` in any web browser or use a simple HTTP server like VS Code Live Server or `npx serve`.

---

## 📄 License
This project is licensed under the MIT License.
