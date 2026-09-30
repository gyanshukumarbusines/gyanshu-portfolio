/**
 * ==============================================================================
 * GYANSHU KUMAR - PORTFOLIO PROJECT DATA
 * ==============================================================================
 * 
 * To add a new project, simply copy the template object at the bottom of this file,
 * fill in your project details, and add it to the `projects` array.
 * 
 * Supported Status Values:
 *  - "Completed"
 *  - "Under Development"
 *  - "Prototype"
 *  - "Planned"
 * 
 * Placeholder Tokens:
 *  - Use "YOUR_GITHUB_URL" if the repository link is not yet ready.
 *  - Use "YOUR_LIVE_DEMO_URL" if the live demo is not yet deployed.
 *  The site will automatically detect these placeholders and display friendly notices!
 * ==============================================================================
 */

const projects = [
  {
    id: "ai-education-platform",
    title: "AI-Powered Smart Education & Examination Platform",
    tagline: "Exploring intelligent technology to support students, educators, and institutional assessment workflows.",
    status: "Under Development", // Completed | Under Development | Prototype | Planned
    category: "AI & Cloud Systems",
    image: "assets/images/projects/education-platform/01-homepage.png",
    technologies: [
      "Python",
      "Node.js",
      "REST APIs",
      "AI APIs",
      "MySQL",
      "HTML5/CSS3/JS",
      "Docker",
      "Git & GitHub"
    ],
    liveDemo: "https://eduai-frontend-kkdf.onrender.com",
    github: "https://github.com/gyanshukumarbusines/eduai/tree/clean-main",
    blueprint: "docs/AI_Education_Exam_Platform_Full_Blueprint.pdf",
    video: "assets/videos/education-platform-demo.mp4",
    
    // Overview for Modal
    overview: "An AI and cloud-oriented education platform designed to explore how intelligent technology can support students, teachers, and educational institutions through structured digital workflows, automated assessment evaluations, and personalized study assistance.",
    
    // Problem definition
    problem: "Traditional academic management and testing systems often suffer from fragmented workflows, rigid evaluation methods that fail to adapt to individual student pace, lack of real-time learning diagnostics, and vulnerabilities during remote assessments.",
    
    // Technical Solution
    solution: "Developing a unified, cloud-ready architecture integrating structured REST APIs, relational database schemas, and AI endpoints to deliver intuitive candidate dashboards, timed secure online assessments, and diagnostic feedback loops.",
    
    // Honest Feature Breakdown (Working vs Planned vs Future)
    features: {
      working: [
        "Student registration & authentication flow prototype",
        "Interactive candidate dashboard interface",
        "Core REST API endpoints for user profile and assessment management",
        "Relational database schema for courses, student records, and question items",
        "Online examination interface with timed question navigation"
      ],
      planned: [
        "Teacher & Admin management panels for question bank authoring",
        "Automated scoring pipeline with instant topic performance calculation",
        "AI-assisted study summarization & personalized review generation",
        "Detailed performance analytics dashboard with weakness detection"
      ],
      future: [
        "Adaptive test difficulty engine adjusting questions in real-time",
        "AI proctoring telemetry (tab-switching and anomaly detection)",
        "Distributed container deployment for scalable high-concurrency exams",
        "Multi-modal AI tutoring assistant for complex technical problem-solving"
      ]
    },

    // System Architecture Description
    architecture: "Multi-tier architecture consisting of a responsive Web Client (HTML/CSS/JavaScript), a stateless REST API backend (Node.js / Python), a normalized relational database (MySQL/PostgreSQL), and integrated AI service endpoints for natural language processing and evaluation.",

    // Educational Learnings & Real-World Takeaways
    learnings: "Building this platform has provided deep hands-on learning in designing RESTful API endpoints, managing relational data consistency, orchestrating secure sessions, handling asynchronous state in client-side applications, and planning scalable cloud deployment containerization.",

    // Current Status & Roadmap Next Steps
    currentStatus: "Actively in development. Core dashboard, mock test navigation, and REST API schemas are being tested and refined. Integration with AI reasoning endpoints is in progress.",
    futureImprovements: "Refining backend database indexing, containerizing microservices with Docker for seamless CI/CD, and enhancing client-side offline tolerance during examinations.",

    // Screenshots Gallery — add your real PNG files here
    // To update a screenshot: replace the file in assets/images/projects/education-platform/
    // then change the filename below. The browser will always load the latest version.
    screenshots: [
      {
        src: "assets/images/projects/education-platform/01-homepage.png",
        title: "Home & Course Portal",
        caption: "Main landing interface showcasing learning tracks and platform capabilities."
      },
      {
        src: "assets/images/projects/education-platform/Login.png",
        title: "Login Screen",
        caption: "Secure login page for students and educators."
      },
      {
        src: "assets/images/projects/education-platform/register.png",
        title: "Student Registration",
        caption: "New user registration flow with profile setup."
      },
      {
        src: "assets/images/projects/education-platform/student-dashboard.png",
        title: "Student Dashboard",
        caption: "Centralized learning portal showing academic progress and scheduled exams."
      },
      {
        src: "assets/images/projects/education-platform/online-exam.png",
        title: "Online Examination Session",
        caption: "Timed assessment interface with question palette, answer selection, and telemetry."
      },
      {
        src: "assets/images/projects/education-platform/performance-analytics.png",
        title: "Analytics & Performance Feedback",
        caption: "Post-exam diagnostic breakdown showing topic mastery and study guidance."
      },
      {
        src: "assets/images/projects/education-platform/ai-tutor.png",
        title: "AI Tutor Assistant",
        caption: "Intelligent tutoring interface powered by AI for personalized study help."
      },
      {
        src: "assets/images/projects/education-platform/certificate.png",
        title: "Certificate of Completion",
        caption: "Auto-generated digital certificate awarded upon course or exam completion."
      }
    ]
  }

  /* 
  // ==============================================================================
  // HOW TO ADD YOUR NEXT PROJECT (PROJECT 2, 3, 4, etc.)
  // Simply uncomment this block and edit the details:
  // ==============================================================================
  ,
  {
    id: "project-2-id",
    title: "Project Title Here",
    tagline: "Short one-sentence summary of the project.",
    status: "Under Development", // "Completed" | "Under Development" | "Prototype" | "Planned"
    category: "Backend & APIs",
    image: "assets/images/projects/project-2/thumbnail.png",
    technologies: ["Python", "Flask", "MySQL", "REST APIs", "Git"],
    liveDemo: "YOUR_LIVE_DEMO_URL",
    github: "YOUR_GITHUB_URL",
    blueprint: "docs/your-project-blueprint.pdf", // Optional path to project blueprint/spec PDF
    video: "", // Leave empty if no video yet
    overview: "Detailed overview of what this project does...",
    problem: "The problem this project solves...",
    solution: "The technical solution implemented...",
    features: {
      working: [
        "Working feature 1",
        "Working feature 2"
      ],
      planned: [
        "Planned feature 1"
      ],
      future: [
        "Future feature 1"
      ]
    },
    architecture: "Client <-> API Backend <-> Database",
    learnings: "What you learned while researching and building this project...",
    currentStatus: "Current development phase...",
    futureImprovements: "What you plan to improve next...",
    screenshots: [
      {
        src: "assets/images/projects/project-2/screen1.png",
        title: "Main Screen",
        caption: "Description of this screen."
      }
    ]
  }
  */
];

// Global configuration for developer social links & profile
const developerConfig = {
  name: "GYANSHU KUMAR",
  title: "Software Developer | AI & Cloud Computing",
  tagline: "Building practical software projects with Python, backend technologies, APIs, Artificial Intelligence and Cloud Computing.",
  about: "I am a developer focused on building practical software solutions using backend development, APIs, Artificial Intelligence and Cloud Computing.\n\nI enjoy turning ideas into working software and continuously improving my technical skills through real-world projects.\n\nMy current focus is developing an AI-powered education and examination platform while exploring how AI and cloud technologies can be used to address real-world problems.",
  githubUrl: "https://github.com/gyanshukumarbusines",
  linkedinUrl: "https://www.linkedin.com/in/gyanshu-kumar-14b35a3b4",
  email: "gyanshukumarbusiness@gmail.com",
  resumePath: "assets/resume/Gyanshu_Kumar_Resume.pdf",
  profileImage: "assets/images/profile/AI_Education_Future_Vision.jpeg"
};

// Explicitly attach to window object to prevent any script scope issues
if (typeof window !== 'undefined') {
  window.projects = projects;
  window.developerConfig = developerConfig;
}

