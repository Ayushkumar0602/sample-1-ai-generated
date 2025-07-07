# sample 1

AI-generated project created with AI Code Builder.

## Project Description
## Detailed Prompt for AI Code Generator:  Full-Stack Web Application with Firebase

This prompt requests the generation of a complete, functional, and secure web application using HTML, inline JavaScript, and inline CSS, leveraging Firebase for backend services.  The application will manage moodboards, allowing users to create, view, and manage images within them.

**I. Firebase Configuration:**

The application must utilize the following Firebase configuration directly embedded within the HTML:

```json
{
  "apiKey": "AIzaSyCVYdfql5aqHrChlA1v3nxRLkIbYyWMvUg",
  "authDomain": "study2-7bdc7.firebaseapp.com",
  "projectId": "study2-7bdc7",
  "storageBucket": "study2-7bdc7.firebasestorage.app",
  "messagingSenderId": "320617984870",
  "appId": "1:320617984870:web:04b61ea4ee88ae057e4ea7"
}
```

**II. System Architecture:**

The application will use Firebase for authentication and data storage.  The following collections and features are required:

* **Collections (Firestore):**  `users`, `moodboards` (containing user IDs, moodboard titles, timestamps), `images` (containing moodboard IDs, image URLs, timestamps).
* **Authentication:**  Email/password and at least one OAuth provider (e.g., Google).
* **Pages:** `landing`, `signup`, `login`, `dashboard`, `createMoodboard`, `viewMoodboard`.
* **Functions (Firebase Cloud Functions -  Implementation not strictly required but highly recommended):** `createUser`, `createMoodboard`, `addImageToMoodboard`, `deleteMoodboard`, `deleteImageFromMoodboard`, `updateUser`, `secureImageStorage` (handles secure upload and storage of images to Firebase Storage).  Consider using server-side functions for security.

**III. Page-Specific Requirements:**

Each page must have the following functionality and features:

* **`landing`:**  A welcome page with a brief description of the application and links to signup/login.  Must be visually appealing and responsive.
* **`signup`:**  Allows users to create accounts using email/password and OAuth (Google preferred).  Should include input validation and error handling.
* **`login`:**  Allows existing users to log in using email/password and OAuth.  Should include input validation and error handling.
* **`dashboard`:** Displays a list of the user's moodboards. Allows users to create new moodboards and navigate to individual moodboard views.
* **`createMoodboard`:** Allows users to create new moodboards by providing a title and optionally adding images.  Should include image upload functionality (using Firebase Storage).  Must handle file type validation and error handling.
* **`viewMoodboard`:** Displays a specific moodboard with its images.  Allows users to delete the moodboard or individual images.  Must handle image loading and error handling.


**IV. Technical Requirements:**

* **Code Format:**  All code must be written in HTML with inline JavaScript and inline CSS.  Avoid external JavaScript or CSS files.
* **Error Handling:**  Robust error handling must be implemented throughout the application to gracefully handle network issues, authentication failures, and invalid user input.  Display user-friendly error messages.
* **Security:** Follow Firebase security best practices.  Use appropriate rules in Firestore and Storage to protect data.  Avoid client-side validation only; rely on server-side validation where possible (through Cloud Functions).
* **Responsive Design:** The application must be responsive and adapt to different screen sizes and devices.
* **Documentation:**  Include clear comments within the code to explain the functionality of different sections.


**V. Expected Output:**

A single HTML file containing all the code for the entire application, including inline JavaScript and CSS.  The code should be well-structured, readable, and follow best practices for web development.  The application should be fully functional and meet all requirements outlined above.


**VI. Important Note:**  The provided Firebase configuration contains a public API key.  For a production application, **never** hardcode API keys directly into client-side code.  Use environment variables or a more secure method for managing sensitive information.  This prompt uses it for simplicity in this demonstration.  The generated code is for educational purposes only and should not be deployed in a production environment without proper security measures in place.


## Files
- firebase-config.js
- createMoodboard.html
- index.html
- login.html
- dashboard.html
- styles.css
- utils.js
- viewMoodboard.html
- signup.html
- landing.html

## Getting Started
1. Clone this repository
2. Open the files in your preferred editor
3. Start building!

---
Generated on 07/07/2025, 13:04:03
