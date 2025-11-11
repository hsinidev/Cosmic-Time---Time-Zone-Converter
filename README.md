# Cosmic Time - Time Zone Converter

![Cosmic Time](https://your-domain.com/social-preview.png) <!-- Placeholder for a screenshot of the app -->

Cosmic Time is a modern, responsive, and visually stunning time zone converter application built with React, TypeScript, and Tailwind CSS. It provides a seamless and intuitive experience for anyone needing to coordinate across different global time zones, from professionals scheduling international meetings to travelers planning their next trip.

The application features a beautiful animated cosmic background, making time conversion not just a utility, but an experience.

## ✨ Key Features

- **Multi-City Conversion**: Convert a specific date and time from a source city to multiple target cities simultaneously.
- **Real-Time Data**: Utilizes the WorldTimeAPI for accurate, up-to-date time zone information, automatically accounting for Daylight Saving Time (DST).
- **12/24 Hour Format**: Easily toggle the time display between 12-hour (AM/PM) and 24-hour formats.
- **Stunning UI/UX**: A clean, professional, and friendly interface centered on a beautiful animated multi-colored galaxy background.
- **Fully Responsive**: The layout is optimized for a seamless experience on all devices, from desktops to mobile phones.
- **Privacy-Focused**: No user data is stored. Optional API keys are saved only in the browser for the current session.
- **SEO Optimized**: Includes a comprehensive 3500+ word article on global time zones, complete with JSON-LD schema for powerful SEO performance.
- **Informative Modals**: Quick access to an About page, User Guide, Contact info, and other policies.

## 🛠️ Tech Stack

- **Frontend**: [ReactJS](https://reactjs.org/) (with Functional Components and Hooks)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **API**: [WorldTimeAPI](https://worldtimeapi.org/) (for time zone data)

## 🚀 Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

- [Node.js](https://nodejs.org/) (v16 or later recommended)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

### Installation

1.  **Clone the repository:**
    ```sh
    git clone https://github.com/hsinidev/cosmic-time-converter.git
    ```
2.  **Navigate to the project directory:**
    ```sh
    cd cosmic-time-converter
    ```
3.  **Install NPM packages:**
    ```sh
    npm install
    ```

### Running the Application

-   **Start the development server:**
    ```sh
    npm run start
    ```
    This will run the app in development mode. Open [http://localhost:3000](http://localhost:3000) (or another port if specified) to view it in your browser.

## 📂 Project Structure

The project follows a standard React application structure, organizing files by function for clarity and maintainability.

```
/
├── public/
│   ├── index.html      # Main HTML template
│   └── favicon.svg     # Application favicon
├── src/
│   ├── components/
│   │   ├── ThemeLayout.tsx           # Main layout with background, header, footer
│   │   ├── TimeZoneConverterTool.tsx # The core converter component
│   │   └── SeoArticle.tsx            # SEO article component
│   ├── App.tsx             # Main application component and state management
│   ├── index.tsx           # Entry point of the React application
│   ├── constants.ts        # App-wide constants (e.g., timezone list)
│   └── types.ts            # TypeScript type definitions
├── README.md             # This file
├── robots.txt            # Instructions for web crawlers
└── sitemap.xml           # Sitemap for search engines
```

## ✍️ Author

**HSINI MOHAMED**

-   **GitHub**: [@hsinidev](https://github.com/hsinidev)
-   **Email**: [hsini.web@gmail.com](mailto:hsini.web@gmail.com)
-   **Website**: [doodax.com](https://doodax.com)

## 📄 License

This project is licensed under the MIT License.
