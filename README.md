# THE CORE

### Interactive 3D Software Developer Portfolio

An immersive, interactive developer portfolio built to showcase my projects, technical skills, engineering process, and development journey.

THE CORE combines modern web development with real-time 3D graphics, cinematic animations, and interactive application experiences. Rather than presenting a traditional portfolio, it invites visitors to explore five distinct environments, each representing a different part of my work as a software developer.

**Developer:** Jeremiah Austin

**Live Website:** Coming Soon

**GitHub:** https://github.com/overkill489

---

## Overview

THE CORE is a React-based single-page application designed around a futuristic command center.

Visitors begin with an animated 3D energy reactor before entering the Command Center, where they can explore five interconnected realms.

The portfolio emphasizes:

- Interactive, responsive user interfaces
- Real-time 3D rendering and animation
- Component-based React architecture
- Client-side routing and deep linking
- Practical software engineering experience
- Accessibility and performance considerations

The goal is to create a memorable experience while keeping projects, professional information, and contact options easily accessible.

---

## Features

### Interactive Landing Experience

- Custom 3D energy reactor
- Animated orbital rings and particle effects
- Mouse-responsive reactor movement
- Cinematic camera transition into the Command Center
- Bloom and emissive lighting effects
- Smooth entrance animations
- Reduced-motion considerations
- Responsive layouts for desktop and mobile

### Command Center

The Command Center acts as the portfolio's main navigation system.

It includes:

- Interactive holographic previews
- Five selectable destinations
- Dynamic hover interactions
- Dedicated navigation for each realm
- Quick recruiter access to resume, GitHub, and contact information

---

## The Five Realms

### 01 — THE BUILDS | Projects

An interactive project archive showcasing completed software development work.

Features include:

- Project gallery with screenshots
- Individual project inspection pages
- Technology and feature breakdowns
- Engineering case studies
- Interactive architecture diagrams
- GitHub repository and live deployment links
- Shareable project URLs

Featured projects:

**sKINsTRIC AI**

A React application featuring AI analysis workflows, interactive demographic visualizations, responsive interfaces, and API integration.

[Live Application](https://jeremiah-skinstricai-internshipvercel-ckih3n8jt-bigboycode.vercel.app/)

[Source Code](https://github.com/overkill489/Jeremiah-SkinstricAi-Internship)

**Summarist**

A Next.js application featuring book discovery, authentication, audio playback, and personal library functionality using Firebase.

[Live Application](https://jeremiah-advanced-internship1.vercel.app/)

[Source Code](https://github.com/overkill489/jeremiah-advanced-internship_)

**Weatherly**

A weather application featuring a React frontend, a Node.js HTTP backend, OpenWeather API integration, error handling, and forecast data processing.

**Movie Final**

A movie discovery application featuring browsing, search functionality, category-based listings, and movie detail pages.

[Live Application](https://movie-final2-ln12k21v6-bigboycode.vercel.app/)

[Source Code](https://github.com/overkill489/Movie-Final_)

### 02 — THE STACK | Skills

An interactive technology visualization connecting development skills to real projects.

Features include:

- 3D technology constellation
- Connected skill nodes
- Technology inspection panel
- Frontend, backend, and tools filters
- Related-project navigation
- Desktop 3D and grid viewing modes
- Mobile-friendly grid fallback

### 03 — THE ORIGIN | Story

An interactive timeline documenting my development journey.

Features include:

- Five selectable story chapters
- Animated content transitions
- Development milestones
- Chapter navigation
- Journey progress indicators

### 04 — THE MIND | Engineering Process

An interactive case-study experience exploring how technical problems are approached and solved.

Visitors can explore examples involving:

- Debugging frontend and backend API requests
- Authentication and application state
- Dynamic data visualization and animation

Each walkthrough follows four stages:

1. Problem
2. Investigation
3. Solution
4. Result

Code samples are provided as illustrative examples and are not executed within the simulator.

### 05 — THE SIGNAL | Contact

A futuristic communication terminal with a working contact form.

Features include:

- Three inquiry categories
- Direct message submission through EmailJS
- Client-side input validation
- Loading and error states
- Animated transmission confirmation
- Copyable email address
- Links to GitHub and featured projects

The contact form sends messages through EmailJS without requiring visitors to open an external email application.

---

## Technology Stack

### Frontend

- React
- JavaScript (ES6+)
- Vite
- Tailwind CSS
- React Router
- Lucide React

### 3D Graphics

- Three.js
- React Three Fiber
- React Three Drei
- React Three Postprocessing

### Services and Integrations

- EmailJS
- GitHub
- Vercel

### Development Tools

- Visual Studio Code
- npm
- Git
- Chrome DevTools

---

## Project Architecture

```text
the-core/
├── public/
│   ├── projects/
│   └── resume.pdf
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── EnergyCore.jsx
│   │   ├── ReactorScene.jsx
│   │   ├── RealmHologram.jsx
│   │   ├── RealmNavigation.jsx
│   │   ├── RealmPreview.jsx
│   │   ├── SkillConstellation.jsx
│   │   ├── SkillNetwork.jsx
│   │   ├── ProjectCard.jsx
│   │   ├── ProjectInspection.jsx
│   │   ├── ProcessSimulator.jsx
│   │   ├── SignalVisualizer.jsx
│   │   └── RecruiterAccess.jsx
│   ├── data/
│   │   ├── projects.js
│   │   ├── skills.js
│   │   ├── realms.js
│   │   ├── story.js
│   │   ├── process.js
│   │   └── contact.js
│   ├── pages/
│   │   ├── Landing.jsx
│   │   ├── Hub.jsx
│   │   ├── ProjectRealm.jsx
│   │   ├── SkillsRealm.jsx
│   │   ├── StoryRealm.jsx
│   │   ├── ProcessRealm.jsx
│   │   └── ContactRealm.jsx
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── .env.example
├── .gitignore
├── index.html
├── package.json
├── vercel.json
└── vite.config.js
```

---

## Getting Started

### Prerequisites

Make sure you have the following installed:

- Node.js
- npm
- Git

### 1. Clone the Repository

```bash
git clone https://github.com/overkill489/the-core-portfolio.git
cd the-core-portfolio
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env.local` file in the project root.

```env
VITE_EMAILJS_SERVICE_ID=your_service_id
VITE_EMAILJS_TEMPLATE_ID=your_template_id
VITE_EMAILJS_PUBLIC_KEY=your_public_key
```

These values are provided by EmailJS.

The contact form requires a configured EmailJS service and template. The remainder of the portfolio can be explored without these values.

Vite exposes variables prefixed with `VITE_` in client-side JavaScript. Never place private API keys, passwords, or server-side secrets in these variables.

### 4. Start the Development Server

```bash
npm run dev
```

Open the local URL displayed in your terminal, usually:

```text
http://localhost:5173
```

---

## Production Build

To create an optimized production build:

```bash
npm run build
```

To preview the production build locally:

```bash
npm run preview
```

Vite generates the production files inside the `dist` directory.

---

## Routing

THE CORE uses React Router for client-side navigation.

Available routes include:

| Route                  | Description                   |
| ---------------------- | ----------------------------- |
| `/`                    | Landing experience            |
| `/hub`                 | Command Center                |
| `/projects`            | Project archive               |
| `/projects/:projectId` | Individual project inspection |
| `/skills`              | Technology constellation      |
| `/story`               | Developer journey             |
| `/process`             | Engineering walkthroughs      |
| `/contact`             | Contact terminal              |

Direct navigation and browser history are supported through React Router.

The Vercel configuration includes an SPA rewrite to allow direct navigation to nested routes.

---

## Performance and Accessibility

The application includes several optimizations and accessibility considerations:

- Lazy loading of the Command Center
- Route-based navigation
- Controlled WebGL device pixel ratio
- Reduced geometry complexity for orbital animations
- Lower particle counts on mobile devices
- Mobile fallback for the 3D technology visualization
- Cleanup of browser event listeners
- Reduced-motion-aware animations
- Semantic buttons and accessible form labels
- Responsive layouts across different screen sizes

Performance improvements are designed to reduce unnecessary rendering while maintaining the portfolio's visual identity.

---

## Contact Form Configuration

THE SIGNAL uses EmailJS to submit messages.

The email template uses these variables:

```text
{{from_name}}
{{reply_to}}
{{inquiry_type}}
{{subject}}
{{message}}
```

For production deployment, configure the EmailJS environment variables in your hosting provider.

EmailJS account security features, including available domain restrictions and spam protection, should be enabled before publicly deploying the contact form.

No private Gmail credentials are stored in the source code.

---

## Deployment

THE CORE is designed for deployment on Vercel.

Recommended configuration:

| Setting          | Value           |
| ---------------- | --------------- |
| Framework Preset | Vite            |
| Build Command    | `npm run build` |
| Output Directory | `dist`          |
| Root Directory   | `./`            |

Environment variables should be configured in the Vercel project settings.

---

## Future Improvements

Potential future enhancements include:

- Additional engineering case studies
- Further 3D rendering optimizations
- Expanded accessibility testing
- Additional featured projects
- Improvements to route transitions
- Automated testing
- Performance monitoring

---

## Author

**Jeremiah Austin**

Software Developer focused on building interactive, responsive, and practical web applications.

**GitHub:** [@overkill489](https://github.com/overkill489)

**Email:** overkill.489@gmail.com

---

## License

Copyright © 2026 Jeremiah Austin.

No open-source license has been specified for this repository.
