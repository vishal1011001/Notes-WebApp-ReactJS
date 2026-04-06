Note Management App with AI Assistant. (WebApp + Mobile App)

#### Frontend Made in React.js (HTML, CSS, JS)
#### Backend in NodeJS/ExpressJS
#### Database used is MongoDB via Mongoose
#### User Authentication with JWT tokens
#### Text generation via gemini API ( GEMINI 2.5 FLASH)
#### Can Work on Android, as an apk app, made using Capacitor JS. 

Users can take notes, Edit an existing note, Delete notes and toggle between Dark and light mode as per preference.
A user can access only his/her own notes, after logging in with their credentials.
Each request goes via Auth Middleware, that uses JWT Token to verify user identity.


## Features:
- Add new notes
- Ask AI anything, and save that as a Note
- Edit notes
- Search among notes
- Delete notes
- User Authentication
- Responsive design
- Built with modern react practices

## Tech Stack
- ReactJS
- Vite
- NodeJS
- ExpressJS
- MongoDB
- JavaScript (ES6+)
- HTML5
- CSS3

## Getting Started

### Prerequisites
- npm
- Node.js
- express.js
- mongoDB & mongoose

### Installation
```bash
npm install
npm init
npm run dev
```

### Instructions to run the application:
Website: 
- Open the folder in terminal and execute the command "npm run dev"
- Open another terminal in "notes-app-backend" and execute "npm run dev"
- Open 'http://localhost:5173' on any web browser
 
Mobile: 
- Make sure Android studio is installed.
- Open terminal in the root folder.
- Execute the following commands: 
  - npm run build
  - npx cap sync android
  - npx cap open android
- Android studio will open.
- Connect phone to PC via USB and make sure USB Debugging is on in the mobile device (developer options).
- Click run button in top bar in Android studio. Apk will be installed.