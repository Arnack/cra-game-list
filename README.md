# Schedule App

This is a React application that displays a schedule of online events taking place in two virtual zones. The application fetches data from a demo server and displays the schedule in a table format, grouping slots by date.

## Features

- Fetches list of virtual rooms and schedule from a demo server.
- Displays schedule in a table format with columns for each room.
- Groups schedule slots by date.
- Displays a loader while data is being fetched.
- Utilizes React Context for state management.
- Written in TypeScript for type safety.
- Styled using SCSS modules.
- Tested using Jest and React Testing Library.

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher) or yarn

### Installation

1. Clone the repository:

```sh
git clone https://github.com/your-username/schedule-app.git
cd schedule-app
```

2. Install dependencies:

```sh
npm install
# or
yarn install
```

### Running the App

To start the development server:

```sh
npm start
# or
yarn start
```

Open your browser and navigate to `http://localhost:3000`.

### Running Tests

To run the tests:

```sh
npm test
# or
yarn test
```

## Project Structure

```
.
├── public
│   ├── index.html
│   └── ...
├── src
│   ├── components
│   │   ├── loader
│   │   ├── roomColumn
│   │   ├── scheduleSlot
│   │   ├── scheduleTable
│   ├── context
│   │   ├── ScheduleContext.tsx
│   │   └── ...
│   ├── services
│   │   └── scheduleService.ts
│   ├── model
│   │   └── interfaces.ts
│   ├── mockData.ts
│   ├── App.tsx
│   ├── App.css
│   ├── index.tsx
│   ├── setupTests.ts
│   └── ...
├── .babelrc
├── jest.config.js
├── package.json
└── ...
```

## Key Files and Directories

- `src/components/`: Contains all React components.
- `src/context/`: Contains context for state management.
- `src/services/`: Contains services for API calls.
- `src/model/`: Contains TypeScript interfaces.
- `src/mockData.ts`: Contains mock data used when API requests fail.
- `src/setupTests.ts`: Configures the testing environment.
- `.babelrc`: Babel configuration file.
- `jest.config.js`: Jest configuration file.
