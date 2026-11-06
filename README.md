# 📊 PollZone

### A modern, lightweight community polling web application built using HTML5, CSS3, and Vanilla JavaScript.

PollZone is an interactive community polling application that allows users to create custom polls, participate in anonymous voting, and visualize voting results through interactive charts. It provides a simple and responsive platform for creating polls, collecting votes, and analyzing results without requiring a backend server or authentication system.

**Live Demo:** [PollZone](https://suprio-dev.github.io/Poll-Zone/)

---

## ✨ Features

- Create custom polls with multiple voting options
- Anonymous voting system
- Browser-based duplicate vote prevention using Local Storage
- Interactive voting functionality
- Category-based poll organization (Opinion, Decision, Survey)
- Search functionality to find polls
- Filter polls by category
- Poll expiration with countdown timer
- Active and closed poll management
- Finalize polls to close voting
- Interactive doughnut chart visualization using Chart.js
- Vote count and percentage breakdown
- Shareable poll links
- Export poll results as CSV files
- Delete polls
- Dark and light theme toggle
- Theme preference persistence using Local Storage
- Poll data persistence across page reloads
- Responsive user interface
- Smooth CSS animations and transitions

---

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| HTML5 | Website structure |
| CSS3 | Styling, animations, and responsive layouts |
| JavaScript (ES6+) | Application logic and dynamic interactions |
| Chart.js | Interactive poll result visualization |
| Local Storage API | Persistent poll data, theme preferences, and vote tracking |
| Git & GitHub | Version control and collaboration |
| GitHub Pages | Website hosting |

---

## 📊 Application Workflow

```text
          Open PollZone
                ↓
          Create a Poll
                ↓
       Add Multiple Options
                ↓
          Publish the Poll
                ↓
       Participate in Voting
                ↓
        Track Voting Progress
                ↓
       Finalize & Create Chart
                ↓
        Analyze Poll Results
                ↓
        Share / Export Results
```

PollZone provides a browser-based polling experience where users can create polls, participate in voting, and visualize results through interactive charts. Poll information and voting data are stored using the Local Storage API, allowing the application to retain data across browser reloads without requiring a backend server.

---

## 🔒 Validation & Data Handling

PollZone implements several client-side validation and data-handling mechanisms:

- Empty poll question validation
- Minimum two voting options validation
- Input sanitization for angle brackets
- Expired poll validation
- Duplicate vote prevention using browser-based Local Storage tracking
- Voting restriction after poll finalization
- Persistent poll data management

**Note:** Voting restrictions are currently configurable through a `TEST_MODE` flag. Browser-based Local Storage validation is intended for demonstration purposes and does not provide secure server-side vote integrity.

---

## 🎯 Why I Built It

This project was built to practice and strengthen my understanding of:

- JavaScript DOM manipulation
- Dynamic HTML rendering
- Event handling and event listeners
- Array methods and data manipulation
- Working with Browser APIs
- Local Storage and persistent data management
- JSON parsing and serialization
- Conditional rendering using JavaScript
- Date and time manipulation
- Integrating third-party libraries using Chart.js
- Generating and exporting CSV files
- Clipboard API and URL handling
- Implementing light and dark themes
- Building interactive and responsive web applications

---

## 📱 Responsive Design

PollZone is designed to provide a consistent experience across different screen sizes:

1. Desktop
2. Tablet
3. Mobile devices

---

## 🚀 Run Locally

```bash
git clone https://github.com/suprio-dev/Poll-Zone.git
cd Poll-Zone
```

Open `index.html` in your browser.

No build tools, package installation, or backend setup required.

---

## 📌 Project Status

**Completed — Frontend JavaScript Project**

Built as a hands-on project to strengthen JavaScript fundamentals, browser APIs, DOM manipulation, Local Storage, event handling, and interactive data visualization.