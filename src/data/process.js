export const processChallenges = [
  {
    id: "weather-api",
    number: "01",
    title: "Debugging an API Request",
    project: "Weatherly",
    category: "Backend / API Integration",
    difficulty: "Intermediate",
    summary:
      "Tracing a failed weather request across a React frontend and Node.js backend.",
    accent: "#38dfff",
    steps: [
      {
        id: "problem",
        title: "The Problem",
        label: "IDENTIFY",
        description:
          "The React application couldn't retrieve weather information correctly from the backend.",
        insight:
          "An API failure can originate in the frontend request, backend routing, external service, or response handling.",
        code: `const response = await fetch(
  "http://localhost:3000/api/weaather?city=Dallas"
);`,
        codeLabel: "Frontend request",
      },
      {
        id: "investigation",
        title: "The Investigation",
        label: "DIAGNOSE",
        description:
          "Inspect the request URL, compare it with the backend route, and check the browser console and Network tab.",
        insight:
          "A small spelling mismatch in an endpoint can prevent an otherwise correct request from reaching the intended handler.",
        code: `// Frontend path
/api/weaather

// Expected backend path
/api/weather`,
        codeLabel: "Endpoint comparison",
      },
      {
        id: "solution",
        title: "The Solution",
        label: "IMPLEMENT",
        description:
          "Correct the route spelling and keep the request handling inside a try/catch block so failures are shown clearly.",
        insight:
          "Consistent route names and explicit error handling make frontend/backend integrations easier to maintain.",
        code: `const response = await fetch(
  \`http://localhost:3000/api/weather?city=\${encodeURIComponent(city)}\`
);

if (!response.ok) {
  throw new Error("Weather request failed");
}

const data = await response.json();`,
        codeLabel: "Corrected request",
      },
      {
        id: "result",
        title: "The Result",
        label: "VERIFY",
        description:
          "With the frontend path aligned to the backend endpoint, the application can reach the weather handler and process its response.",
        insight:
          "A successful HTTP request is only the first check. The returned data and the user interface must also be verified.",
        code: `// Expected request flow
React UI
  → Node.js HTTP server
  → OpenWeather API
  → JSON response
  → Weather display`,
        codeLabel: "Request flow",
      },
    ],
  },
  {
    id: "authentication",
    number: "02",
    title: "Managing Authentication State",
    project: "Summarist",
    category: "React / Firebase",
    difficulty: "Intermediate",
    summary:
      "Connecting authentication status to protected pages and saved-book functionality.",
    accent: "#a78bfa",
    steps: [
      {
        id: "problem",
        title: "The Problem",
        label: "IDENTIFY",
        description:
          "Some application features should only be available to authenticated users, including access to a personal saved-book library.",
        insight:
          "A login button alone isn't enough. Different components need a consistent understanding of authentication status.",
        code: `// Features dependent on login
// My Library
// Account Settings
// Save book to library`,
        codeLabel: "Feature requirements",
      },
      {
        id: "investigation",
        title: "The Investigation",
        label: "DIAGNOSE",
        description:
          "Identify which pages depend on the current user, where authentication changes are observed, and how saved books are associated with accounts.",
        insight:
          "Authentication state should be shared consistently instead of being duplicated independently throughout the application.",
        code: `// Conceptual state
const user = null;

// Signed out → login prompt
// Signed in  → personal content`,
        codeLabel: "State model",
      },
      {
        id: "solution",
        title: "The Solution",
        label: "IMPLEMENT",
        description:
          "Use Firebase Authentication to observe the signed-in user and conditionally render protected interfaces. Store saved-book information in Firestore under the appropriate user context.",
        insight:
          "React conditional rendering controls the interface, while Firestore security rules must independently enforce authorization.",
        code: `{user ? (
  <SavedBooks />
) : (
  <button onClick={openLogin}>
    Log in to view your library
  </button>
)}`,
        codeLabel: "Illustrative React pattern",
      },
      {
        id: "result",
        title: "The Result",
        label: "VERIFY",
        description:
          "The interface can present the appropriate experience for signed-in and signed-out visitors, while authenticated users can work with their saved library.",
        insight:
          "Verify sign-in, sign-out, page access, and Firestore permissions separately. Interface visibility isn't a security boundary.",
        code: `// Verification checklist
// Signed-out UI
// Signed-in UI
// Bookmark persistence
// Firestore authorization`,
        codeLabel: "Validation checklist",
      },
    ],
  },
  {
    id: "demographics",
    number: "03",
    title: "Animating Dynamic Analysis Data",
    project: "sKINsTRIC AI",
    category: "Frontend / UI Engineering",
    difficulty: "Advanced UI",
    summary:
      "Presenting changing demographic percentages through interactive, smoothly animated visualizations.",
    accent: "#f0b86d",
    steps: [
      {
        id: "problem",
        title: "The Problem",
        label: "IDENTIFY",
        description:
          "The analysis interface needs to present demographic estimates and respond when the visitor changes the selected category or value.",
        insight:
          "Instant jumps between values can feel abrupt, especially in a prominent radial visualization.",
        code: `// Example data
const percentages = {
  categoryA: 34,
  categoryB: 62,
  categoryC: 81,
};`,
        codeLabel: "Illustrative sample data",
      },
      {
        id: "investigation",
        title: "The Investigation",
        label: "DIAGNOSE",
        description:
          "Determine how changing a selection affects the displayed percentage, radial visualization, and animation lifecycle.",
        insight:
          "The animation should interpolate from the currently displayed value rather than always restarting from zero.",
        code: `// Current displayed value: 34
// New selected value: 81
// Animate smoothly: 34 → 81`,
        codeLabel: "Animation requirement",
      },
      {
        id: "solution",
        title: "The Solution",
        label: "IMPLEMENT",
        description:
          "Use requestAnimationFrame with an easing function to interpolate between percentage values while keeping the selection state in React.",
        insight:
          "Separating the target value from the animated displayed value makes transitions easier to control.",
        code: `const easeOutCubic = (t) =>
  1 - Math.pow(1 - t, 3);

const progress = Math.min(elapsed / duration, 1);

const nextValue =
  startValue +
  (targetValue - startValue) *
    easeOutCubic(progress);`,
        codeLabel: "Easing calculation",
      },
      {
        id: "result",
        title: "The Result",
        label: "VERIFY",
        description:
          "The demographic display can transition between selections while keeping the radial graphic and numerical percentage visually synchronized.",
        insight:
          "Test rapid selection changes, animation cleanup, and reduced-motion behavior to keep the interface predictable.",
        code: `// Validate
// Selection updates target
// Percentage animates
// Radial graphic stays synchronized
// Interrupted animations are cleaned up`,
        codeLabel: "Interaction checks",
      },
    ],
  },
];
