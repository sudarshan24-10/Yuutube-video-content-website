
# Youtube Clone (Yuutube)

## This project is a demo clone of the popular video-sharing platform YouTube. It is built using React for the frontend, Node.js and Express.js for the backend, and MongoDB for the database.

## Features include:

- User Authentication includes Google Authentication 
- Video uploading: Users can upload videos to the platform.
- Video playback: Users can watch videos uploaded by others.
- Like and comment: Users can like videos and leave comments.
- Search functionality: Users can search for videos based on keywords. 
- Responsive design: The WebApp is optimized for desktop screens.

## Technologies used

- Backend:  Nodejs, Expressjs, MongoDB
- Frontend: React.js, Styled Components.
- Other Libraries: Bcrypt.js, Dotenv, JSON Web Token (JWT), Mongoose, React Helmet Async, React Router, React-virtualized, Styled Components, React Router DOM, React Toastify, Axios, Redux Store, react-error-boundary, Firebase Storage, Firebase Google Authentication, morgan, cors, helmet.

- used custom debounce hook for search functionality and used React virtualzied for rendering video lists and comments list, used Error boundaries for handling page components errors.


## Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/sudarshan24-10/Youtube_Clone.git
2. **Install Dependencies**   

cd Youtube_Clone
cd backend
npm install
cd ../frontend
npm install


3. **Set up environment variables:**
- **Create a .env file in the backend directory and add the following variables:**
    - PORT=your_port_here
    - MONGODB_URI=your_mongodb_uri_here
    - JWT_SECRET=your_jwt_secret_here
- **Create a .env file in the Frontend directory and add the following variables:**
    - REACT_APP_FIREBASE_API_KEY=your_firebase_api_key_here
    - REACT_APP_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain_here
    - REACT_APP_FIREBASE_PROJECT_ID=your_firebase_project_id_here
    - REACT_APP_FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket_here
    - REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id_here
    - REACT_APP_FIREBASE_APP_ID=your_firebase_app_id_here

4. **Start the backend server:**
    - cd backend
    - npm start
5. **Start the frontend server:**
    - cd frontend
    - npm start
## Screenshots

![Screenshot from 2024-03-31 11-42-01](https://github.com/sudarshan24-10/Ecommerce-Web-App/assets/60260411/fc13b369-0789-416f-9daa-27716d7475b2)

Demo Video![Screenshot from 2024-03-31 11-42-01](https://github.com/sudarshan24-10/Ecommerce-Web-App/assets/60260411/fc13b369-0789-416f-9daa-27716d7475b2)(https://youtu.be/M8qVc6SE1ro)


##### added Light and dark themme functionality also.


### Feel free to customize this template according to your project's specific features and requirements.
