# Oshan Harischandra - IoT Engineer Portfolio

Welcome to the source code for the personal portfolio of Oshan Harischandra. This site is a high-performance React application built with TypeScript, Vite, Tailwind CSS, and Framer Motion. It showcases a modern "hardware/cyberpunk" aesthetic featuring real-time PCB trace animations and IoT motifs.

## 🚀 Local Development

To run the site locally on your machine, simply execute:

```bash
npm install
npm run dev
```

The site will typically be available at `http://localhost:5173`.

---

## 🛠 How to Add or Edit Projects

All project data is managed in a single TypeScript file for easy maintainability. 

**File Path:** `src/data/projects.ts`

To add a new project, simply append a new object to the `projectsData` array. 

### Data Structure Example:

```typescript
{
  id: "my-new-project",
  title: "New IoT Project",
  description: "Brief summary for the project card.",
  longDescription: "Detailed explanation of the project, architecture, and your specific role.",
  tags: ["ESP32", "MQTT", "Hardware Design"],
  githubUrl: "https://github.com/username/my-new-project",
  demoUrl: "https://my-demo-link.com" // Optional
}
```

*Note: You can omit `demoUrl` or `longDescription` if they are not applicable.*

---

## 🔧 How to Add or Edit Skills & Certifications

### Technical Arsenal (Skills)
Skills are categorized and mapped directly from a data file.

**File Path:** `src/data/skills.ts`

To add a new skill to an existing category, simply add the string to the `skills` array.
To add a new category, add a new object:

```typescript
{
  category: "Cloud / DevOps",
  skills: ["AWS IoT Core", "Docker", "GitHub Actions"]
}
```

### Certifications & Awards
Certifications are currently managed inside the component file itself.

**File Path:** `src/components/sections/Certifications.tsx`

Locate the `certifications` array near the top of the file and add your new certificate:

```typescript
const certifications = [
  // ... existing certs
  {
    id: 3,
    title: "AWS Certified Solutions Architect",
    issuer: "Amazon Web Services",
    date: "2026",
    description: "Achieved associate level certification for designing cloud architectures."
  }
];
```

---

## 🌍 How to Publish Updates

This portfolio is hosted using GitHub Pages (`gh-pages`). When you are ready to publish your local changes to the live `.io` site, run the following exact sequence of commands in your terminal:

```bash
# 1. Stage and commit your source code changes
git add .
git commit -m "feat: added new project and updated skills"
git push origin main

# 2. Build and deploy the production bundle to GitHub Pages
npm run deploy
```

The `npm run deploy` command will automatically run TypeScript checks, build the optimized Vite bundle into the `dist/` directory, and push that bundle to the `gh-pages` branch. Your live site will update within 1-2 minutes!
