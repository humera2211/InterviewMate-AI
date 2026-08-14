# Privacy Policy — InterviewMate AI

**Last Updated: August 14, 2026**

## 1. Introduction

InterviewMate AI ("we", "our", "us", or "the extension") is a Chrome extension designed to provide AI-powered assistance for coding problems and interview preparation on supported websites such as LeetCode and GeeksforGeeks.

This Privacy Policy explains what information InterviewMate AI collects or processes, how that information is collected, how it is used, where it is stored, when it is shared with third-party service providers, and how users can request deletion of their data.

By using InterviewMate AI, you acknowledge the data practices described in this Privacy Policy.

---

## 2. Information We Collect and Process

InterviewMate AI may collect or process the following categories of information.

### 2.1 Account Information

When you create or use an InterviewMate AI account, we may process:

- Email address
- Account identification information
- Authentication information required to maintain your session

This information is used to create and authenticate your account and provide access to the extension's features.

### 2.2 Authentication Information

InterviewMate AI uses JWT-based authentication.

Authentication tokens required to maintain a logged-in session may be stored locally in the user's browser.

Authentication information is used only to authenticate requests to our backend services and maintain the user's session.

We do not intentionally send authentication tokens or passwords to Google Gemini or other AI services.

### 2.3 Coding Problem and Website Content

When the extension is used on supported coding websites, it may access information from the coding problem currently being viewed, including:

- Problem title
- Problem description
- Problem difficulty
- Other coding problem information necessary to provide the requested feature

This information is accessed only to provide InterviewMate AI's coding assistance features.

InterviewMate AI does not intentionally collect or track the user's general browsing history.

### 2.4 Interview Information

When users use mock interview and interview evaluation features, InterviewMate AI may process:

- AI-generated interview questions
- User responses and answers
- Interview evaluations
- Interview scores
- Interview feedback
- Interview session history

This information is used to provide mock interviews, evaluate responses, display feedback, and maintain interview history.

---

## 3. How Information Is Collected

Information may be collected or processed in the following ways:

- Information provided directly by the user during registration and use of the extension
- Information generated during mock interview and interview evaluation features
- Coding problem information read from supported coding problem pages when the relevant feature is used
- Authentication information generated when the user logs in
- Information sent to our backend when the user requests features that require server-side processing

InterviewMate AI does not intentionally collect unrelated browsing activity.

---

## 4. Chrome Extension Permissions

InterviewMate AI requests the following permissions to function:

### Scripting Permission
- **Purpose:** Allows the extension to inject assistance features, UI elements, and helper functions into supported coding websites (LeetCode, GeeksforGeeks, etc.)
- **Use:** Used only to provide coding problem assistance, hints, explanations, and interview preparation features
- **Not Used For:** Modifying non-coding websites, injecting ads, or tracking user activity on unrelated pages

### Side Panel Permission
- **Purpose:** Allows the extension to display a side panel interface for mock interviews, explanations, hints, and interview feedback
- **Use:** Used to provide a dedicated UI space for the extension's features within the browser
- **Not Used For:** Displaying ads or tracking activity

### Host Permissions
- **Purpose:** Specifies which websites the extension can access and modify (LeetCode, GeeksforGeeks, and other supported coding platforms)
- **Hosts Accessed:** `https://leetcode.com/*`, `https://www.geeksforgeeks.org/*`, and other explicitly supported coding websites
- **Use:** Used only to read and assist with coding problems on these websites
- **Not Used For:** Accessing other websites or general browsing activity

These permissions are used only to provide the extension's stated functionality and are not used for any other purpose.

---

## 5. Cookies and Local Storage

InterviewMate AI uses browser storage mechanisms for the following purposes:

### Local Storage
InterviewMate AI stores the following information locally in your browser:

- **JWT Authentication Tokens:** Used to maintain your logged-in session and authenticate requests to our backend
- **User Preferences:** Such as extension settings, UI preferences, and selected features
- **Temporary Session Data:** Information needed to provide features during your current session

**Important:** All local storage data remains on your device and is not automatically transmitted to our servers. Local storage is only sent to our backend when you explicitly request a feature that requires server-side processing.

### Cookies
InterviewMate AI does **NOT** use cookies.

### Browser Storage Security
- Authentication tokens are stored securely and are not exposed to third-party scripts
- Local storage is accessible only to InterviewMate AI and cannot be accessed by other extensions or websites
- You can clear all stored data by uninstalling the extension or using your browser's storage management tools

### Clearing Your Data
To clear all local data stored by InterviewMate AI:
1. Go to Chrome Settings → Privacy and Security → Clear Browsing Data
2. Select "Cookies and other site data" and "Cached images and files"
3. Or uninstall the extension, which will automatically remove all associated local data

---

## 6. How We Use Information

We use the collected information only to provide, maintain, secure, and improve InterviewMate AI's stated functionality.

Information may be used to:

- Create and authenticate user accounts
- Maintain authenticated sessions
- Retrieve coding problem information
- Generate AI-powered explanations
- Generate progressive hints
- Generate coding approaches
- Generate mock interview questions
- Evaluate interview responses
- Generate interview feedback and scores
- Store and display interview history
- Provide requested AI-assisted features
- Maintain and secure backend services
- Detect and resolve technical problems affecting the extension

We do not sell user data.

We do not use user data for targeted advertising or unrelated commercial purposes.

---

## 7. AI Processing and Google Gemini

InterviewMate AI uses Google's Generative AI API (Gemini) to provide AI-powered functionality.

When a user explicitly requests an AI-powered feature, information necessary to fulfill that request may be transmitted to Google Gemini.

Depending on the feature being used, this may include:

- Coding problem title
- Coding problem description
- Coding problem difficulty
- User-provided interview responses
- Interview questions
- Other information necessary to generate the requested AI response

**Important Data Practices:**
- Google Gemini is used only to provide the AI functionality requested by the user
- We do not intentionally send passwords, JWT authentication tokens, or other authentication credentials to Google Gemini
- Data sent to Google Gemini is not used to train Google's models or for any purpose other than generating your requested AI response
- Users can choose not to use AI-powered features that require sending information for AI processing

For information about Google's handling of data sent to its services, users should review Google's applicable privacy and data-processing documentation at https://policies.google.com/privacy.

---

## 8. Backend Processing

InterviewMate AI uses a backend service to provide authentication, AI-related requests, interview functionality, and other application features.

Information required to provide these features may be transmitted from the Chrome extension to our backend over HTTPS.

The backend may process:

- Account information
- Authentication-related information
- Coding problem information
- Interview questions and responses
- Interview evaluations
- Interview history
- Other information necessary to provide requested application functionality

The backend does not intentionally collect unrelated browsing history.

---

## 9. Data Storage

InterviewMate AI may store certain information on its backend database, including:

- User account information
- Authentication-related application data
- Interview questions and responses
- Interview evaluations
- Interview scores and feedback
- Interview history
- Other application data required to provide the extension's features

### Backend Storage
Application data is stored using MongoDB Atlas with appropriate security measures.

### Local Browser Storage
Authentication tokens used for the client-side session may be stored locally in the user's browser using browser local storage APIs.

Data stored locally in the browser remains on the user's device unless transmitted to the backend as required to provide a requested feature.

---

## 10. Third-Party Service Providers

InterviewMate AI uses third-party services to provide its functionality.

### Google Gemini
Google Gemini is used for AI-powered processing and generation of explanations, hints, approaches, mock interview questions, and evaluations.

Relevant information may be transmitted to Google Gemini when an AI feature is requested.

### MongoDB Atlas
MongoDB Atlas is used to store application and interview-related data required by InterviewMate AI.

### Render
Our backend services are hosted using Render infrastructure.

Data transmitted to our backend may therefore be processed through the infrastructure required to operate our backend service.

**Data Transfer:** These service providers are used only to provide the functionality of InterviewMate AI. We do not sell user data to third parties, advertising networks, or data brokers.

---

## 11. Data Sharing

We do not sell, rent, or trade personal information.

Information may be shared with or processed by third-party service providers only when necessary to provide InterviewMate AI's functionality.

These parties include:

- **Google Gemini** — AI processing and response generation
- **MongoDB Atlas** — application and interview data storage
- **Render** — backend hosting and infrastructure

Information may also be disclosed when required by applicable law or when necessary to protect the security and integrity of the service.

We do not share user data for targeted advertising or unrelated purposes.

---

## 12. Data Security

We take reasonable technical and organizational measures to protect user information.

- Data transmitted between the Chrome extension, backend services, and third-party services is transmitted using HTTPS/TLS encryption
- Authentication information is protected and is not intentionally disclosed publicly
- Local storage data is protected by browser security mechanisms
- We do not store sensitive information like passwords in plaintext

However, no method of electronic transmission or storage can be guaranteed to be completely secure. Users should maintain secure passwords and not share their account credentials.

---

## 13. Data Retention

We retain user information only for as long as necessary to provide InterviewMate AI's functionality, maintain the user's account, provide interview history, maintain security, or comply with applicable legal obligations.

Interview history may remain stored until the user requests deletion or until it is no longer required for the service.

Local storage data on your device is retained until you clear it or uninstall the extension.

---

## 14. Data Deletion

Users may request deletion of their InterviewMate AI account and associated data by contacting:

**Email:** humerafficial2211@gmail.com

A deletion request should be made from or include the email address associated with the InterviewMate AI account so that the request can be verified.

**Timeline:** After verification, we will process the deletion request within **30 days**, subject to applicable legal or security requirements.

**Automatic Data Removal:** Uninstalling the extension automatically removes all locally stored data from your device.

---

## 15. User Control

Users can:

- Stop using InterviewMate AI at any time
- Log out of their account
- Disable or uninstall the extension (which removes all local storage data)
- Request deletion of their account and associated backend data
- Choose not to use AI-powered features that require sending information for AI processing
- Clear local storage data using browser settings

---

## 16. Website Content and Browsing Activity

InterviewMate AI may access coding problem content on supported websites such as LeetCode and GeeksforGeeks when necessary to provide its user-facing coding assistance features.

The extension does not intentionally collect general browsing history, unrelated website content, or information from websites that are not required for its stated functionality.

Coding problem content accessed by the extension is used only to provide the extension's coding assistance and interview preparation features.

---

## 17. Chrome Web Store User Data Policy

InterviewMate AI's collection, use, and transfer of user data are limited to the purposes necessary to provide and improve the extension's disclosed single purpose: coding problem assistance and interview preparation.

- We do not sell user data
- We do not use user data for personalized advertising
- We do not use user data for any purpose unrelated to the extension's functionality
- We comply with the Chrome Web Store User Data Policy and its Limited Use requirements

---

## 18. Children's Privacy

InterviewMate AI is not specifically directed toward children under the age of 13, and we do not knowingly collect personal information from children under 13.

---

## 19. Changes to This Privacy Policy

We may update this Privacy Policy when our extension's functionality, data practices, or applicable requirements change.

Any updates will be published on this page with a revised "Last Updated" date.

Continued use of InterviewMate AI after changes are made constitutes acceptance of the updated Privacy Policy.

---

## 20. Contact

For questions regarding this Privacy Policy or InterviewMate AI's data practices, please contact:

**Email:** humeraofficial2211@gmail.com

---

**InterviewMate AI**

AI-powered coding problem assistance and interview preparation companion.
