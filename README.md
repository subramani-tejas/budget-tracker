# Google Sheets Budget Tracker (React + Spring Boot)

# Docker Update-

## 1. Building the Docker Image
Navigate to the directory containing the Dockerfile and run the following command to compile the Java application and build the container image:

```Bash
docker build -t budget-app .
```

## 2. Running the Container
Spin up the container and map the internal application port (8080) to your local machine:

```Bash
docker run -p 8080:8080 budget-app
```

### API Endpoints: Application Health
Monitors the application's uptime and internal system dependencies.

```
URL: http://localhost:8080/actuator/health
Method: GET
Success Response: {"status":"UP"}
```

---

# Personal budget tracker app

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
