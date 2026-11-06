
export const caseStudies = {
  skinstric: {
    title: "Engineering an AI Analysis Experience",

    challenge:
      "Build a responsive, multi-step application that collects user information, interacts with an AI analysis API, and displays interactive results while maintaining a smooth user experience.",

    solution:
      "Used React components and state to manage the onboarding flow, React Router to navigate between stages, asynchronous requests to communicate with the analysis API, and animated interfaces to present the results.",

    architecture: [
      {
        id: "input",
        label: "User Input",
        description:
          "Collects the user's name, location, and selected image through guided onboarding screens.",
      },
      {
        id: "state",
        label: "React State",
        description:
          "Manages user input, UI loading states, selected demographic categories, and navigation data.",
      },
      {
        id: "api",
        label: "Analysis API",
        description:
          "Receives requests from the frontend and returns information used by the analysis interface.",
      },
      {
        id: "results",
        label: "Results UI",
        description:
          "Transforms returned analysis information into interactive demographic visualizations.",
      },
    ],

    highlights: [
      "Multi-step onboarding and navigation",
      "Asynchronous API integration",
      "Loading and error-state handling",
      "Dynamic demographic data visualization",
      "Responsive interface animations",
    ],
  },
};
