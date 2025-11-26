# PassOp 🔐 – Password Manager (React + MongoDB)

PassOp is a simple password manager built with **React** on the frontend and **Node.js + Express + MongoDB** on the backend.  
You can securely save, view, copy, update, and delete your passwords for different websites in one place.

Deployed it using vercel:https://passop-mongodb.vercel.app/
you can see this project preview using the above link


> ⚠️ Note: This project is for learning and personal use.  
> Do **not** use it in production without adding strong security (encryption, auth, HTTPS, etc.).

---

## ✨ Features

- Add new password entries (website / username / password)
- View all saved passwords in a clean UI
- Copy password / username to clipboard
- Edit and update an existing entry
- Delete an entry
- Data stored in MongoDB

---

## 🏗️ Tech Stack

**Frontend**
- React
- (Your CSS solution: e.g. Tailwind CSS / plain CSS / Bootstrap)

**Backend**
- Node.js
- Express
- MongoDB (via Mongoose)

⚙️ Backend Setup (server)

Go to the backend folder:

cd server


Install dependencies:

npm install


Create an .env file (in /server) and add:

MONGO_URI=your_mongodb_connection_string
PORT=5000
CLIENT_URL=http://localhost:3000


MONGO_URI → your MongoDB URL

PORT → backend port (you can change if needed)

CLIENT_URL → URL of your React app (for CORS)

Start the backend:

npm start


or (if you use nodemon)

npm run dev


Backend will usually run on:

http://localhost:5000

💻 Frontend Setup (client)

Open a new terminal and go to the frontend folder:

cd client


Install dependencies:

npm install


If you are using environment variables (optional):

Create .env in /client:

REACT_APP_API_URL=http://localhost:5000


Start the React app:

npm start


React app will run on:

http://localhost:3000
  │   └── package.json
  ├── README.md
