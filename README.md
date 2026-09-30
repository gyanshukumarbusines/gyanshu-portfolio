# Gyanshu Kumar - Personal Developer Portfolio

A modern, fast, professional, responsive portfolio website built with pure **HTML5, CSS3, and JavaScript**. Designed specifically to showcase real-world projects in **Python, Backend Development, REST APIs, Artificial Intelligence, Cloud Computing, Database Management, and Git & GitHub**.

---

## 🌟 Highlights & Key Features

- **Professional Tech Aesthetic**: Dark theme by default with clean slate colors, electric indigo & cyan accents, subtle glassmorphism, and zero childish or gaming effects.
- **Strict Honesty & Integrity**: Presents you authentically as a software developer and project builder continuously learning and building; visual skill cards instead of fake percentage bars; no fabricated claims or client logos.
- **Dynamic Project Data System**: All project cards and modal views are powered by `data/projects.js`. Adding a new project is as simple as adding an object to an array—no HTML rewriting required.
- **In-Depth Project Modal**: Displays detailed architectural breakdowns, honest feature statuses (**Current / Working**, **Planned**, **Future Vision**), system architecture, and key learnings.
- **Full-Screen Screenshot Lightbox**: Accessible, keyboard-navigable (`ArrowLeft`, `ArrowRight`, `Escape`), touch-swipe enabled modal for browsing UI screenshots.
- **Local Demo Video Support**: Embeds local HTML5 video (`assets/videos/*.mp4`) with play/pause/fullscreen controls, and graceful fallback when a video has not yet been recorded.
- **Resume Integration**: Supports direct viewing and downloading of `assets/resume/Gyanshu_Kumar_Resume.pdf`, with a helpful notification dialog if the file is pending.
- **Dark & Light Mode**: User toggle with smooth transitions, persistent `localStorage` saving, and automatic fallback to system preferences (`prefers-color-scheme`).
- **Fully Responsive**: Designed and tested across mobile phones, tablets, laptops, and desktop screens with an accessible mobile hamburger drawer.
- **Zero Heavy Frameworks**: Pure standard Web APIs—fast load times, lightweight bundle, zero build steps required.

---

## 📁 Directory Structure

```
gyanshu-portfolio/
│
├── index.html                  # Semantic, accessible, SEO-optimized markup
├── README.md                   # Complete documentation and deployment guide
├── .gitignore                  # Excludes sensitive files, logs, node_modules
│
├── css/
│   ├── style.css               # Design tokens, themes (dark/light), layout, typography
│   ├── responsive.css          # Mobile, tablet, and touch viewport rules
│   └── animations.css          # Subtle, performant transitions & scroll reveals
│
├── js/
│   ├── main.js                 # App bootstrapper, year updater, toast feedback
│   ├── navigation.js           # Sticky nav, mobile drawer, active section spy
│   ├── theme.js                # Dark/Light mode manager with localStorage persistence
│   ├── projects.js             # Project card renderer from data source
│   ├── project-modal.js        # Detailed modal with roadmap & architecture
│   ├── gallery.js              # Screenshot lightbox gallery (fullscreen, swipe, keyboard)
│   └── contact.js              # Contact form validation & mailto launcher
│
├── data/
│   └── projects.js             # Centralized project data array (add future projects here!)
│
├── assets/
│   ├── images/
│   │   ├── profile/            # Profile portrait image & clean vector avatar SVG
│   │   │   └── profile.svg
│   │   ├── projects/
│   │   │   └── education-platform/ # Thumbnails & screenshot mockups
│   │   │       ├── thumbnail.svg
│   │   │       ├── home.svg
│   │   │       ├── dashboard.svg
│   │   │       ├── exam.svg
│   │   │       └── results.svg
│   │   └── icons/
│   ├── videos/                 # Local MP4 video demo container
│   │   └── README.txt          # Guide for placing education-platform-demo.mp4
│   └── resume/                 # Resume PDF directory
│       └── README.txt          # Guide for placing Gyanshu_Kumar_Resume.pdf
│
└── docs/
    └── README.txt              # Architectural blueprint & notes
```

---

## 🚀 How to Run Locally

Because this website uses pure HTML5, CSS3, and JavaScript, you do not need to install complex build tools like Webpack or Vite.

### Option 1: VS Code Live Server (Recommended)
1. Open the `gyanshu-portfolio` folder in **Visual Studio Code**.
2. Install the **Live Server** extension (by Ritwick Dey).
3. Right-click on `index.html` and select **"Open with Live Server"**.
4. The site will launch in your default browser at `http://127.0.0.1:5500`.

### Option 2: Python HTTP Server (Built into Windows/Mac/Linux)
Open a terminal inside the `gyanshu-portfolio` folder and run:
```bash
# Python 3
python -m http.server 8000
```
Then visit `http://localhost:8000` in your web browser.

### Option 3: Node.js `npx serve`
```bash
npx serve .
```

---

## 🛠️ How to Customize & Add Content

### 1. Updating Your Social Links & Contact Info
Open `data/projects.js` and locate the `developerConfig` object at the bottom of the file:
```javascript
const developerConfig = {
  name: "GYANSHU KUMAR",
  title: "Software Developer | AI & Cloud Computing",
  githubUrl: "https://github.com/your-username",       // Replace placeholder
  linkedinUrl: "https://linkedin.com/in/your-profile", // Replace placeholder
  email: "your.email@example.com",                     // Replace placeholder
  resumePath: "assets/resume/Gyanshu_Kumar_Resume.pdf"
};
```
*(When set to `YOUR_GITHUB_URL` or `YOUR_EMAIL`, the website automatically displays a polite notification rather than a broken page).*

---

### 2. How to Add a New Project (Project 2, Project 3, etc.)
You do **not** need to touch `index.html`! Simply open `data/projects.js` and append an object to the `projects` array:

```javascript
const projects = [
  {
    id: "ai-education-platform",
    // ... existing primary project ...
  },
  
  // NEW PROJECT EXAMPLE:
  {
    id: "cloud-api-service",
    title: "Distributed Microservices API Gateway",
    tagline: "Scalable backend service handling high-throughput request throttling and database connection pooling.",
    status: "Under Development", // "Completed" | "Under Development" | "Prototype" | "Planned"
    category: "Backend & Cloud",
    image: "assets/images/projects/api-service/thumbnail.png",
    technologies: ["Python", "Flask", "Docker", "MySQL", "Redis"],
    liveDemo: "https://api-service.vercel.app", // or "YOUR_LIVE_DEMO_URL"
    github: "https://github.com/your-username/api-service", // or "YOUR_GITHUB_URL"
    video: "",
    overview: "Detailed description of the problem and technical purpose...",
    problem: "Bottlenecks during concurrent student query bursts...",
    solution: "Implemented an asynchronous queue and token bucket rate limiter...",
    features: {
      working: [
        "Stateless token validation middleware",
        "Connection pooling layer with MySQL"
      ],
      planned: [
        "Distributed cache invalidation via Redis Pub/Sub"
      ],
      future: [
        "Autonomous auto-scaling container configuration on AWS/GCP"
      ]
    },
    architecture: "Client -> Reverse Proxy -> API Gateway -> Workers -> DB",
    learnings: "Mastered concurrency management, socket timeouts, and connection pools.",
    currentStatus: "Benchmarking requests per second locally.",
    futureImprovements: "Containerizing with Docker Compose for multi-node testing.",
    screenshots: [
      {
        src: "assets/images/projects/api-service/screen1.png",
        title: "API Gateway Metrics",
        caption: "Request throughput and response latency dashboard."
      }
    ]
  }
];
```

The website will automatically generate the card, modal details, and image gallery triggers for your new project!

---

### 3. How to Add Your Resume PDF
1. Export your resume as a PDF file named `Gyanshu_Kumar_Resume.pdf`.
2. Copy it into:
   ```
   assets/resume/Gyanshu_Kumar_Resume.pdf
   ```
3. That's it! Both the **"Download Resume"** and **"View Resume"** buttons on the website will automatically detect and open it.

---

### 4. How to Add a Project Demo Video
1. Record a walkthrough of your project and export it as an MP4 file (e.g. `education-platform-demo.mp4`).
2. Copy it into:
   ```
   assets/videos/education-platform-demo.mp4
   ```
3. In `data/projects.js`, confirm the `video` property matches the path:
   ```javascript
   video: "assets/videos/education-platform-demo.mp4"
   ```
*(If no video file is placed, the video section will gracefully display a friendly coming-soon notice without breaking).*

---

### 5. How to Add Real Screenshots
1. Save your project screenshots in `assets/images/projects/education-platform/` (e.g., `home.png`, `dashboard.png`, `exam.png`, `results.png`).
2. In `data/projects.js`, update the `screenshots` array paths to reference your new image files.

---

## 🌐 Deployment Instructions (Free Hosting)

### Deploying via GitHub + Vercel (Recommended)

#### Step 1: Create a GitHub Repository
1. Log in to [GitHub](https://github.com).
2. Click **"New repository"**, name it `gyanshu-portfolio`, choose **Public**, and do not initialize with README (we already have one).
3. In your local terminal, navigate to the `gyanshu-portfolio` folder and run:
   ```bash
   git init
   git add .
   git commit -m "Initial commit: Gyanshu Kumar developer portfolio"
   git branch -M main
   git remote add origin https://github.com/<your-username>/gyanshu-portfolio.git
   git push -u origin main
   ```

#### Step 2: Connect Repository to Vercel
1. Go to [Vercel](https://vercel.com) and sign in with your GitHub account.
2. Click **"Add New..."** -> **"Project"**.
3. Locate `gyanshu-portfolio` in the list of GitHub repositories and click **"Import"**.
4. Leave framework preset as **Other** (it is a standard static site).
5. Click **"Deploy"**.
6. Within seconds, Vercel will provide you with a free live URL (e.g., `https://gyanshu-portfolio.vercel.app`).

#### Step 3: (Optional) Free GitHub Pages Alternative
If you prefer hosting directly on GitHub:
1. In your GitHub repository, go to **Settings** -> **Pages**.
2. Under **Build and deployment** -> **Source**, select **Deploy from a branch**.
3. Choose branch `main` and folder `/ (root)`.
4. Click **Save**. Your site will be live at `https://<your-username>.github.io/gyanshu-portfolio/`.

---

## 🔒 Security & Privacy Practices

- **Zero Secrets in Code**: No API keys, passwords, database credentials, or secret tokens are included in client-side files.
- **Git Hygiene**: The `.gitignore` file automatically excludes `.env`, `*.log`, and temporary files.
- **Honeypot Protection**: The contact form includes an invisible bot trap to discourage automated form spammers.

---

## 📄 License & Copyright

© 2026 Gyanshu Kumar. All rights reserved.  
*"Building, learning and creating with technology."*
