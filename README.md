# Hagarilingappa K — Portfolio

A modern, minimalist portfolio site for **Hagarilingappa K**, QA Engineer (Manual Testing, Gen-AI Automation, Mobile, API & Accessibility).

## Features

- **Dark theme by default** with light mode toggle (persisted in `localStorage`)
- **Fully responsive** layout for mobile, tablet, and desktop
- **Smooth scroll** and section-reveal animations
- **Sticky navigation** with mobile hamburger menu
- **Sections:** Hero, About, Work Experience, Skills, Services, Certifications, Contact

## Setup

1. **Profile photo**  
   Place your photo at `assets/profile.jpg`. If missing, the hero shows an “HK” placeholder.

2. **Resume**  
   Add your resume PDF (e.g. `resume.pdf`) in the project root, then in `index.html` set:
   - Hero: `<a href="resume.pdf" class="btn btn-secondary" download>Download Resume</a>`
   - About: `<a href="resume.pdf" class="btn btn-primary" download>Download CV →</a>`

3. **Run locally**  
   Open `index.html` in a browser, or use a local server:
   ```bash
   npx serve .
   ```
   Or with Python: `python -m http.server 8000` then visit `http://localhost:8000`.

## Tech

- HTML5, CSS3 (custom properties, grid, flexbox)
- Vanilla JavaScript (theme, scroll, reveal, nav)
- Font: [Inter](https://fonts.google.com/specimen/Inter) (Google Fonts)

## Structure

```
Portfolio/
├── index.html      # Single-page structure
├── styles.css      # Theming, layout, animations
├── script.js       # Theme, nav, smooth scroll, reveal
├── assets/
│   └── profile.jpg # Your photo (optional)
└── README.md
```

## Customization

- **Accent color:** Edit `--accent` and `--accent-hover` in `:root` and `[data-theme="light"]` in `styles.css`.
- **Content:** All copy lives in `index.html`; update sections as needed.

---

© Hagarilingappa K · QA Engineer
