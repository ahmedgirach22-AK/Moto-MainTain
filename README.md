# 🏍️ Moto-Maintain

**A lightweight, client-side digital garage and maintenance tracker for the modern rider.**

Moto-Maintain is an interactive web application designed to help motorcycle owners track service intervals, log maintenance history, and calculate the financial savings of DIY repairs versus visiting an authorized service center. 

Developed as a first-year B.Tech Artificial Intelligence and Data Science project at Parul University, this application operates entirely in the browser. It utilizes a structured JSON data model and browser `localStorage` to create a persistent user experience without the need for a complex backend server.

## ✨ Key Features

*   **Interactive Digital Garage:** Register your specific motorcycle model and input the current odometer reading to establish a baseline.
*   **Smart Service Tracker:** The JavaScript engine automatically calculates due, overdue, and upcoming maintenance tasks (e.g., chain slack adjustment, valve clearance, oil changes) based on real-time kilometer readings.
*   **DIY vs. Service Center Calculator:** An interactive table that compares the estimated cost of buying parts directly against standard labor and parts costs at a service center.
*   **Persistent Maintenance Log:** A historical record of all completed service tasks, saved locally to the user's device.

## 🛠️ Tech Stack

*   **Front-end:** HTML5, CSS3 (Responsive, custom dark-mode mechanical theme)
*   **Core Logic:** Vanilla JavaScript (ES6+)
*   **Data Storage:** Browser `localStorage`
*   **Data Architecture:** JSON-based schema for highly scalable motorcycle service interval mapping (includes baseline test data for a 2016 Honda Hornet 160R and a 350cc cruiser).

## 🚀 Future Scope

While currently functioning as a deterministic tracking tool, the underlying architecture is designed to scale. Future iterations of this project aim to incorporate:
*   **Predictive Maintenance:** Utilizing historical logging data to estimate component wear-and-tear before the manufacturer's suggested interval.
*   **Automated Diagnostics:** Exploring AI workflows to suggest fixes based on user-inputted symptoms.

## ⚙️ How to Run Locally

1.  Clone this repository: 
    `git clone https://github.com/yourusername/moto-maintain.git`
2.  Navigate to the project directory.
3.  Double-click `index.html` to open it in any modern web browser. No local server installation is required.

---
**Author:** Aaditya Vishwakarma  
**License:** MIT
