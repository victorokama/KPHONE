# ❖ Aura Kitchens — Luxury Business Website

> A high-performance 4-page modern luxury business website designed for custom kitchen design, remodeling, and smart culinary architectural services.

![License](https://img.shields.io/badge/License-MIT-orange.svg)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black)
![GitHub Pages](https://img.shields.io/badge/Deploy-GitHub%20Pages-blue.svg)

---

## 📖 Table of Contents
- [Project Overview](#-project-overview)
- [Pages Included](#-pages-included)
- [Interactive Features](#-interactive-features)
- [File Structure](#-file-structure)
- [Deployment Instructions](#-deployment-instructions)
  - [Option A: Deploy via GitHub Web UI (Easiest)](#option-a-deploy-via-github-web-ui-easiest)
  - [Option B: Deploy via GitHub Desktop](#option-b-deploy-via-github-desktop)
  - [Option C: Deploy via Git Command Line](#option-c-deploy-via-git-command-line)
- [License](#-license)

---

## ✨ Project Overview

**Aura Kitchens** is built using standard-compliant HTML5, modular CSS3 custom properties, and vanilla JavaScript. It features a modern **Dark Slate & Deep Charcoal aesthetic with glowing copper accents, glassmorphism UI elements, and responsive mobile-first architecture**.

---

## 📑 Pages Included

1. **Home (`#home`)**
   - Hero banner with glow effects, stats counters, and quick CTA triggers.
   - Interactive Before & After remodel comparison slider.
   - Featured kitchen style concepts grid.
   - Real-time Instant Kitchen Remodel Cost Calculator.
   - Client endorsement testimonials.

2. **About Us (`#about`)**
   - Brand history & master joinery heritage.
   - 4-Step Transformation process (Discovery $\rightarrow$ 3D VR Render $\rightarrow$ Fabrication $\rightarrow$ White-Glove Installation).
   - Architectural design team showcase.

3. **Services (`#services`)**
   - Detailed service cards (Full Remodeling, Italian Cabinetry, Smart Integration, Quartzite Slabs).
   - Package comparison matrix (*Essential Refresh*, *Signature Remodel*, *Ultra-Luxury Bespoke*).

4. **Contact Us (`#contact`)**
   - Consultation booking form with instant validation & modal confirmations.
   - Showroom location details & 3D virtual tour preview trigger.
   - Expandable FAQ accordion.

---

## 🛠️ Interactive Features

- **Multi-Page SPA Router**: Lightweight hash-based router (`#home`, `#about`, `#services`, `#contact`) with smooth transitions.
- **Before/After Image Slider**: Touch & mouse draggable handle comparing outdated vs transformed kitchen spaces.
- **Remodel Cost Estimator**: Calculates estimated budget based on footprint size, finish grade, and selected add-ons.
- **Glassmorphic UI**: Dynamic backdrop filters, glowing copper highlights, and smooth CSS animations.

---

## 📁 File Structure

```
BUSINESS WEBSITE/
├── .github/
│   └── workflows/
│       └── deploy.yml          # Automatic GitHub Pages CI/CD workflow
├── assets/
│   ├── hero.png                # Luxury dark slate kitchen hero visual
│   ├── before.png              # 1990s oak kitchen (before remodel)
│   ├── after.png               # Remodeled luxury slate kitchen (after)
│   ├── smart.png               # Smart kitchen technology feature
│   └── team.png                # Master design team portrait
├── .gitignore                  # Git ignore rules for OS & temporary files
├── index.html                  # Main single-page application router & markup
├── styles.css                  # Complete CSS design system & responsive layout
├── script.js                   # Client-side router, slider, calculator & form logic
├── LICENSE                     # MIT License
└── README.md                   # Project documentation & deployment guide
```

---

## 🚀 Deployment Instructions

### Option A: Deploy via GitHub Web UI (Easiest)

1. Log into your account on [GitHub.com](https://github.com).
2. Click **New Repository** (`+` icon in top right).
3. Name your repository (e.g., `aura-kitchens` or `business-website`).
4. Select **Public** and leave "Add a README" **unchecked**. Click **Create repository**.
5. On the new repository page, click **uploading an existing file**.
6. Drag and drop all files and folders from your `BUSINESS WEBSITE` folder (`index.html`, `styles.css`, `script.js`, `README.md`, `.gitignore`, `.github`, and `assets`).
7. Click **Commit changes**.
8. Go to **Settings** $\rightarrow$ **Pages** (in the left sidebar).
9. Under **Build and deployment** $\rightarrow$ **Source**, choose **GitHub Actions** (or select `Deploy from a branch` $\rightarrow$ `main` branch $\rightarrow$ `/ (root)` $\rightarrow$ **Save**).
10. Your site will be published at: `https://<your-username>.github.io/<repository-name>/`!

---

### Option B: Deploy via GitHub Desktop

1. Download and install [GitHub Desktop](https://desktop.github.com/).
2. Open GitHub Desktop and click **File** $\rightarrow$ **Add Local Repository**.
3. Choose `c:\Users\INEWTON\Desktop\BUSINESS WEBSITE`.
4. Click **Create a Repository** if prompted.
5. Click **Publish repository** to push it to GitHub.
6. In your GitHub repository settings under **Pages**, enable **GitHub Pages** from the `main` branch.

---

### Option C: Deploy via Git Command Line

If you have Git installed on your terminal:

```bash
# 1. Initialize git repository
git init

# 2. Add all files
git add .

# 3. Create initial commit
git commit -m "Initial commit - Aura Kitchens 4-Page Website"

# 4. Rename default branch to main
git branch -M main

# 5. Connect your GitHub remote repository
git remote add origin https://github.com/YOUR-USERNAME/YOUR-REPO-NAME.git

# 6. Push to GitHub
git push -u origin main
```

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).
