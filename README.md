# Master Dashboard

This project is created as part of a master thesis at NTNU. The system is a Learning Analytics Dashboard designed to support teachers in K-12 education in monitoring and analyzing student interactions. It includes features such as face detection and emotion analysis using a webcam feed.

## Features

- **Webcam Feed with Face Detection**: Detects faces and analyzes emotions in real-time using the `face-api.js` library.
- **Emotion Logging**: Captures and logs emotion data with timestamps for further analysis.

## Installation

1. Clone the repository:
   ```bash
   git clone [repository-url](https://github.com/thomasnielsen00/master-dashboard)
   cd master-dashboard
   ```

2. Set up database:
   - Start a new postgreSQL database
   - Create a .env file to store your environment variables for the database
   - Run the `db-setup-script.txt` file
   - Populate the database with data

3. Install dependencies:
   For the front-end:  
   ```bash
   cd teacher-dashboard
   npm install
   ```
   For the back-end:  
   ```bash
   cd backend
   npm install
   ```

4. Ensure the `face-api.js` models are available in the `/models` directory. You can download them from the [face-api.js GitHub repository](https://github.com/justadudewhohacks/face-api.js). For more information, see: [face-api.js guide](https://itnext.io/face-api-js-javascript-api-for-face-recognition-in-the-browser-with-tensorflow-js-bcc2a6c4cf07)

## Usage

1. Start the development server:
   For the front-end:  
   ```bash
   cd teacher-dashboard
   npm run dev
   ```
   
   For the back-end:  
   ```bash
   cd backed
   npm start
   ```

3. Open the application in your browser at `http://localhost:3000`.

4. Navigate to the **Student Interface** section to access the webcam feed and face detection features.

## File Structure

- **`src/app/studentInterface/_components/WebcamFeed.tsx`**: Contains the main component for face detection and emotion analysis.
- **`/models`**: Directory for storing pre-trained models required by `face-api.js`.

## Notes

- Ensure that your browser has permissions to access the webcam.
- The face detection interval is set to 2 seconds to balance performance and accuracy.
