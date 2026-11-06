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

  summarist: {
    title: "Building an Interactive Book Platform",

    challenge:
      "Create a responsive book discovery application that supports user authentication, personalized book libraries, and audio playback while managing data from multiple services.",

    solution:
      "Used Next.js and React to build reusable components, integrated book APIs for content, implemented Firebase Authentication for user accounts, and used Firestore to manage saved books.",

    architecture: [
      {
        id: "interface",
        label: "Next.js UI",
        description:
          "The React-based interface displays recommended books, book details, personalized libraries, and the audio player.",
      },
      {
        id: "books",
        label: "Book API",
        description:
          "The application requests book information from external API endpoints and displays the returned data using reusable React components.",
      },
      {
        id: "firebase",
        label: "Firebase",
        description:
          "Firebase Authentication manages user sign-in, while Firestore stores saved-book information associated with users.",
      },
      {
        id: "player",
        label: "Library / Player",
        description:
          "Authenticated users can manage their saved books, while the audio player provides playback, pause, and skip controls.",
      },
    ],

    highlights: [
      "Next.js App Router architecture",
      "Firebase Authentication integration",
      "Firestore saved-book functionality",
      "Dynamic book data fetching",
      "Custom audio player controls",
      "Responsive and reusable UI components",
    ],
  },

  "movie-final": {
    title: "Engineering a Movie Discovery Experience",

    challenge:
      "Build a navigable movie application that organizes different types of movie content and allows visitors to search for and inspect individual movies.",

    solution:
      "Used React and React Router to organize the application into reusable views with dedicated routes for movie categories, search, and individual movie details.",

    architecture: [
      {
        id: "frontend",
        label: "React UI",
        description:
          "Reusable React components render movie listings, navigation controls, search interfaces, and movie detail views.",
      },
      {
        id: "routing",
        label: "React Router",
        description:
          "Client-side routing connects the different movie categories, search page, and individual movie detail pages without requiring full-page reloads.",
      },
      {
        id: "data",
        label: "Movie Data",
        description:
          "Movie information is used to populate category listings, search results, and individual movie detail views.",
      },
      {
        id: "details",
        label: "Movie Details",
        description:
          "The application displays information for the selected movie using its corresponding route and movie data.",
      },
    ],

    highlights: [
      "React component-based architecture",
      "Client-side navigation with React Router",
      "Popular movie listings",
      "Top-rated and upcoming movie categories",
      "Movie search functionality",
      "Dynamic movie detail routes",
    ],
  },

  weatherly: {
    title: "Connecting React to a Weather API Backend",

    challenge:
      "Create a weather application that retrieves real weather information while keeping API credentials on the backend and presenting useful forecast data to users.",

    solution:
      "Built a React frontend that communicates with a Node.js HTTP server. The backend uses Axios to request weather information from OpenWeather, processes the forecast response, and returns JSON to the frontend.",

    architecture: [
      {
        id: "frontend",
        label: "React UI",
        description:
          "The frontend collects a city name, sends requests to the backend, and displays weather information alongside loading and error states.",
      },
      {
        id: "server",
        label: "Node.js Server",
        description:
          "A Node.js server handles incoming HTTP requests, reads query parameters, and returns JSON responses to the React application.",
      },
      {
        id: "weather-api",
        label: "OpenWeather API",
        description:
          "Axios sends server-side requests to the OpenWeather API using an API key stored in environment variables.",
      },
      {
        id: "forecast",
        label: "Forecast Processing",
        description:
          "The backend processes weather forecast entries and organizes them into daily data that the frontend can display using US customary units.",
      },
    ],

    highlights: [
      "React and Node.js integration",
      "Server-side API requests using Axios",
      "Environment variable configuration",
      "JSON API responses",
      "Weather forecast data processing",
      "Loading and error-state handling",
      "US customary weather units",
    ],
  },
};
