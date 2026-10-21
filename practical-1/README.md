# Practical 1 – Introduction to React and Component Architecture

A student portfolio page built with Vite + React from small, reusable components.

```
App.jsx
 ├── Header.jsx    name, themeColor (inline style)   ← props
 ├── NavBar.jsx    highlights the section in view    (supplementary)
 ├── About.jsx     bio                               ← prop
 ├── Skills.jsx    skillList array rendered with map ← prop
 ├── Projects.jsx  three hardcoded projects          (post-lab task)
 └── Footer.jsx    contact and copyright             ← props
```

## Run

```bash
cd app
npm install
npm run dev      # http://localhost:5173
```

Change your name, email and skills in `app/src/App.jsx`. A screenshot of the running page is in `output/`.
