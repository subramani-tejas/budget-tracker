# Google Sheets Budget Tracker (React + Spring Boot)

Personal budget tracker app

A proof-of-concept application that provides a custom web UI to add expense entries directly to a private Google Sheet. The google spreadsheet looks like this:

<img width="465" height="105" alt="image" src="https://github.com/user-attachments/assets/fb785f5d-f872-4b64-ad68-a0ded11a1e64" />

## Prerequisites

- Java (17+) & Maven
- Node.js & npm
- A Google Cloud Service Account with the Google Sheets API enabled.

## Configuration

1. **Service Account:** Download your Service Account key as `credentials.json` and place it in `src/main/resources/`. _(Note: This file is git-ignored for security)._
2. **Sheet Access:** Share your target Google Sheet with your Service Account's email address and grant it "Editor" permissions.
3. **Properties:** Set your Google Sheet ID in your environment variables or `application.properties`:
   ```properties
   google.sheet.id=YOUR_SHEET_ID_HERE
   ```

## Running the Application

### Backend (Spring Boot)

1. Navigate to the Spring Boot project root.
2. Run the application (starts on http://localhost:8080):

### Frontend (React)

1. Navigate to the frontend directory.
2. Install dependencies and start the app (starts on http://localhost:3000):

```Bash
npm install
npm start
```
