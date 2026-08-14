# IoT/Embedded Systems Engineer Portfolio

A dark-themed, single-page personal portfolio website tailored for an IoT and Embedded Systems Engineer. Built with React, Vite, Tailwind CSS, and Framer Motion.

## 🚀 Getting Started Locally

1. **Prerequisites**: Make sure you have Node.js (v18+) installed.
2. **Install Dependencies**:
   ```bash
   npm install
   ```
3. **Run the Development Server**:
   ```bash
   npm run dev
   ```
   Open your browser to `http://localhost:5173` to view the site.

## 🛠 Adding a New Project

The Projects section is completely data-driven. You do not need to edit any UI code to add a new project.

1. Open `src/data/projects.ts`.
2. Add a new object to the `projectsData` array:
   ```typescript
   {
     id: "my-new-project",
     title: "My New Project",
     description: "A short one-sentence description.",
     longDescription: "A detailed paragraph explaining the project architecture and results.",
     tags: ["ESP32", "C++", "MQTT"],
     githubUrl: "https://github.com/username/repo",
     demoUrl: "https://example.com" // Optional
   }
   ```
3. Save the file. The UI will automatically update.

## 🚢 Deployment to GitHub Pages

This project is configured to deploy to `username.github.io` via GitHub Actions.

1. Ensure your repository is named `username.github.io` (replace `username` with your GitHub username).
2. Go to your repository **Settings** > **Pages**.
3. Under **Build and deployment**, set the **Source** to **GitHub Actions**.
4. Push your code to the `main` branch.
5. The GitHub Action in `.github/workflows/deploy.yml` will automatically build and deploy your site to `https://username.github.io`.

## 🖼 Updating Your Information
- **Photo**: Replace the placeholder in `src/components/sections/Hero.tsx`.
- **Resume**: Replace the `public/resume.pdf` file with your actual PDF resume.
- **Content**: Update your details in the components located under `src/components/sections/`.
