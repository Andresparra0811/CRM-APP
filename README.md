<h1 align="center">CRM Validation System</h1>
<h2 align="center">Automating Lead Validation in Sales Pipelines</h2>

## Table of Contents
1. [Context](#context)
2. [Requirements](#requirements)
3. [Technologies and Tools](#technologies-and-tools)
4. [Assumptions and Decisions](#assumptions-and-decisions)
5. [Installation Process](#installation-process)
6. [User Manual](#user-manual)

## Context
The current CRM used by sales agents requires manual validation of leads through external systems, causing inefficiencies and delays in converting leads into prospects. 

This project automates the validation process by implementing an integrated solution within the CRM. To qualify as a prospect, a lead must meet the following criteria:
1. Verification in the national registry with matching personal details.
2. A clean record in the national judicial archives.
3. A satisfactory score (above 60) in the internal qualification system.

### Validation Flow
- The first two validations (registry and judicial records) are conducted in parallel.
- The internal scoring system is accessed only if the first two checks are successful. This system generates a random number between 0 and 100, and it is considered successful only if the value exceeds 60.
- Leads that pass all validations are upgraded to **prospects** within the CRM pipeline.

## Requirements
1. Integrate automated lead validation through fictional developed external systems.
2. Provide a clean, intuitive, and responsive interface for users.
3. Ensure adherence to best practices in frontend development using JavaScript frameworks.
4. Document the system thoroughly for ease of understanding and maintainability.
6. Do not use CSS frameworks.
7. Do not develop a server side solution.
   

## Technologies and Tools

This project utilizes the following technologies and tools:

---

### **Vite.JS**
<div align="center">
  <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/f1/Vitejs-logo.svg/640px-Vitejs-logo.svg.png" alt="Vite Logo" width="150" height="150" />
</div>

- **Description**: Vite is a modern build tool created to improve the frontend development experience. It uses an extremely fast development server powered by native ES modules and supports hot module replacement (HMR), ensuring instant feedback while coding.
- **Why Vite?**: Vite outperforms traditional build tools like Webpack by focusing on speed and simplicity, especially for modern frameworks like React and Vue. It significantly reduces build times and offers better development efficiency.
- **Version Used**: `React 19.0.0` with `TypeScript 5.7.2`
- **Key Features**: Lightning-fast cold starts, optimized production builds, and a highly extensible plugin system.
- **Documentation**: [Vite Official Documentation](https://vitejs.dev/)

---

### **React**
<div align="center">
  <img src="https://www.netdevices.fr/wp-content/uploads/2023/09/react.js.png" alt="React Logo" width="200" height="150" />
</div>

- **Description**: React is a JavaScript library designed for building user interfaces, especially for single-page applications. It allows developers to create reusable UI components, making the code modular and maintainable.
- **Why React?**: It simplifies the development of dynamic web apps by using a declarative programming paradigm and offering tools like JSX, state management, and hooks.
- **Version Used**: `19.0.0`
- **Key Features**: Virtual DOM for better performance, component-based architecture, and a large ecosystem of libraries for routing, state management, and more.
- **Documentation**: [React Official Documentation](https://react.dev/)

---

### **TypeScript**
<div align="center">
  <img src="https://cdn-icons-png.flaticon.com/512/919/919832.png" alt="TypeScript Logo" width="150" height="150" />
</div>

- **Description**: TypeScript is a statically typed superset of JavaScript that compiles to plain JavaScript. It adds type definitions, which improve code readability, maintainability, and error detection during development.
- **Why TypeScript?**: It enhances the development workflow by catching potential bugs before runtime and improves collaboration in teams by providing clear type annotations.
- **Version Used**: `5.7.2`
- **Key Features**: Strong typing, great editor support with IntelliSense, and compatibility with JavaScript.
- **Documentation**: [TypeScript Official Documentation](https://www.typescriptlang.org/)

---

### **CSS**
<div align="center">
  <img src="https://cdn-icons-png.flaticon.com/512/919/919826.png" alt="CSS Logo" width="150" height="150" />
</div>

- **Description**: CSS (Cascading Style Sheets) is a language used to describe the visual appearance of web pages. It allows you to define layouts, colors, fonts, and animations, making web pages interactive and visually appealing.
- **Why CSS?**: CSS is fundamental for creating responsive, mobile-friendly designs and ensures a consistent user experience across devices.
- **Documentation**: [CSS MDN Documentation](https://developer.mozilla.org/en-US/docs/Web/CSS)
- **Key Features**: Responsive design (via media queries), advanced animations (with keyframes), and grid/flexbox layout systems.

---

### **Visual Studio Code**
<div align="center">
  <img src="https://gerardorenteria.blog/wp-content/uploads/2023/06/vsclogo-1.png?w=1024" alt="VS Code Logo" width="200" height="150" />
</div>

- **Description**: Visual Studio Code (VS Code) is a lightweight yet powerful source-code editor. It supports multiple programming languages and comes with a wide array of extensions for debugging, Git integration, and more.
- **Why VS Code?**: Its extensive extension library, customizable interface, and seamless integration with version control systems make it a must-have tool for developers.
- **Key Features**: Integrated terminal, IntelliSense for code completion, and live server for quick web previews.
- **Documentation**: [Visual Studio Code Official Documentation](https://code.visualstudio.com/)

---

### **GitHub Desktop**
<div align="center">
  <img src="https://miro.medium.com/v2/resize:fit:600/1*p6exlg2Jrl3pimjPy7R-sA.png" alt="GitHub Desktop Logo" width="150" height="150" />
</div>

- **Description**: GitHub Desktop is a user-friendly Git client for managing repositories. It simplifies the process of cloning repositories, managing branches, and resolving merge conflicts through a graphical interface.
- **Why GitHub Desktop?**: It removes the complexity of working with Git via command line, making version control accessible even to beginners.
- **Key Features**: Visual diff tool, drag-and-drop repository management, and seamless integration with GitHub.
- **Documentation**: [GitHub Desktop Official Documentation](https://desktop.github.com/)

---

### **ChatGPT**
<div align="center">
  <img src="https://blog.ulawpractice.com/content/images/2023/09/chatgpt-logo-png-1-1.png" alt="ChatGPT Logo" width="200" height="150" />
</div>

- **Description**: ChatGPT is an advanced AI model designed to assist in problem-solving, brainstorming, and learning. It can generate code snippets, explain complex concepts, and offer creative suggestions.
- **Why ChatGPT?**: It accelerates the development process by providing quick solutions to challenges and improving understanding of the tools and technologies used in the project.
- **Key Features**: Natural language understanding, multi-tasking capabilities, and real-time assistance.
- **Documentation**: [ChatGPT Documentation](https://openai.com/chatgpt/)

## Assumptions and Decisions

- **File Organization**:  
  The project follows a structured organization, grouping files into the following folders: `components`, `data`, `hooks`, `pages`, `services`, `styles`, and `types`. This ensures a clean, maintainable, and scalable architecture.

- **Validation Assumptions**:  
  For external system validations, it is assumed that a JSON file is available containing the necessary data to verify the consistency of records with the internal system and to confirm that there are no criminal records associated with the individuals.

- **Service Logic**:  
  A dedicated `services` folder is included, containing a file specifically responsible for handling external system validations. This file is used within the validation service to perform two parallel external validations. After these validations are complete, a random value is generated, and if the value exceeds 60, the Lead is successfully converted into a Prospect.

- **Visualization of Leads and Prospects**:  
  It was decided to display Leads and Prospects using visually appealing cards, even though they show less data compared to a table. To compensate for this, a search bar is included, allowing users to search for Leads and/or Prospects by name or email.

- **Validation Button Behavior**:  
  Since the Score generation is random, it was decided to disable the validation button on Lead cards if any validation fails. This measure improves the system's reliability by preventing unlimited attempts to achieve the desired Score.

- **Validation Failure Feedback**:  
  The system provides feedback on the reason for validation failure. It specifies whether the failure occurred due to criminal records, mismatched information, or an insufficient Score.

- **Data Persistence**:  
  As no Backend implementation is included, local storage is used to save the Leads and Prospects data to persist through page reloads. For this reason, a delete functionality is also implemented, allowing users to remove Leads and Prospects from the system.

## Installation Process

Follow these steps to set up and run the project locally:

  1. **Clone the Repository**:  
     Start by cloning the GitHub repository to your local machine. Open a terminal and run the following command:  
     ```bash
     git clone <repository-url>
     ```
     Replace `<repository-url>` with the actual URL of the GitHub repository.
  
  2. **Navigate to the Project Folder**:  
     Change to the directory where the project files were cloned:  
     ```bash
     cd <project-folder>
     ```
     Replace `<project-folder>` with the name of the cloned repository.
  
  3. **Install Dependencies**:  
     Make sure you have [Node.js](https://nodejs.org/) installed on your system. Install the required dependencies using npm or yarn:  
     ```bash
     npm install
     ```
     Or, if you are using Yarn:  
     ```bash
     yarn install
     ```
  
  4. **Start the Development Server**:  
     Run the development server using Vite. This will start the application locally and make it available at `http://localhost:5173/`:  
     ```bash
     npm run dev
     ```
     Or, if using Yarn:  
     ```bash
     yarn dev
     ```


### Prerequisites
- Node.js (version 16 or later recommended)
- A package manager (npm or yarn)
- Git (to clone the repository)

With these steps, you can successfully install and run the project on your local environment.
## User Manual

This section explains how to use the CRM system, detailing its main functionalities. Each functionality includes a brief description and a video tutorial for clarity.

---

### **1. Creating a Lead Through the Form**

- **Description**:  
  Users can create a new Lead by filling out the following mandatory fields in the form:  
  - **National ID**: Must be a numeric value.  
  - **Birthdate**: Must follow the `MM/DD/YYYY` format.  
  - **First Name**: Lead's first name.  
  - **Last Name**: Lead's last name.  
  - **Email**: Must have a valid email format (e.g., example@domain.com).  

  All fields are required to successfully create a Lead.

- **Video Tutorial**:  
[![CRM APP Create a Lead](https://img.youtube.com/vi/3pjxcB2i2jU/0.jpg)](https://www.youtube.com/watch?v=3pjxcB2i2jU)
---

### **2. Validating a Lead**

- **Description**:  
  The validation process consists of three steps:  
  1. Verify that the data matches with external systems.  
  2. Ensure that the Lead has no judicial records.  
  3. Check if the Score is greater than 60.  

- **Subsections**:  

  **2.1 Successful Validation**  
  - If the validation succeeds, the Lead is converted into a Prospect, and the card is moved to the "Prospects" section.  

  **2.2 Failed Validation**  
  - If the validation fails:  
    - The button status changes to "Failed," and it becomes disabled.  
    - A message is displayed indicating why the validation failed, such as mismatched data or insufficient Score.  

- **Video Tutorial**:  
[![Título del video](https://img.youtube.com/vi/KJzjQy4fr1E/0.jpg)](https://www.youtube.com/watch?v=KJzjQy4fr1E)
---

### **3. Search Bar**

- **Description**:  
  The search bar allows users to find Leads or Prospects by **name** or **email**. Only cards that match the search criteria will be displayed.

- **Video Tutorial**:  
[![Título del video](https://img.youtube.com/vi/X0cHWa9zAEU/0.jpg)](https://www.youtube.com/watch?v=X0cHWa9zAEU)
---

### **4. Delete Button for Prospects or Leads**

- **Description**:  
  Users can delete a Lead or Prospect by clicking the delete button on the corresponding card. Once deleted, the card is removed from the system.

- **Video Tutorial**:  
[![Título del video](https://img.youtube.com/vi/JahfI-HZ4Q4/0.jpg)](https://www.youtube.com/watch?v=JahfI-HZ4Q4)

