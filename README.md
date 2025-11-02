# WanderWall

> "Not All Who Wander Are Lost"

WanderWall is a simple web application that allows users to submit their favorite quotes along with a name. It demonstrates basic HTML forms, server-side handling, and database integration with MongoDB.

---

## 🌟 Features

- Submit a name and quote through a simple HTML form
- Store quotes in a **MongoDB** database
- Hosted database on **Render** for persistent data
- Minimal and clean front-end

---

## 🛠 Installation

1. **Clone the repository:**

```bash
git clone https://github.com/your-username/WanderWall.git
cd WanderWall


Install dependencies:

npm install


Set up environment variables:

Create a .env file in the root directory:

MONGO_URI=<Your MongoDB connection string>
DB_NAME=<Your database name>
PORT=3000


Run the app:

npm start


Open your browser and navigate to http://localhost:3000

📂 Usage
HTML Form Example

Here is the form users interact with:

<form action="/items" method="POST">
  <input type="text" placeholder="name" name="name">
  <input type="text" placeholder="quote" name="quote">
  <button type="submit">Submit</button>
</form>


Visual representation of the form:

<form action="/items" method="POST"> <input type="text" placeholder="name" name="name"> <input type="text" placeholder="quote" name="quote"> <button type="submit">Submit</button> </form>

Note: GitHub does not render interactive HTML forms in the README, but this snippet visually represents the form for documentation purposes.

💾 Database

This project uses MongoDB for storing quotes.

Database is hosted on Render for reliable access.

Connection is handled securely via environment variables.

Example environment variables:

MONGO_URI=<Your MongoDB connection string>
DB_NAME=<Your database name>

🖥 Tech Stack

HTML

Node.js / Express

MongoDB

Render (Database hosting)

🌐 Live Demo

Add your live demo link here

📸 Screenshots




🚀 Contributing

Fork the repository

Create your feature branch (git checkout -b feature-name)

Commit your changes (git commit -m 'Add feature')

Push to the branch (git push origin feature-name)

Open a Pull Request

📜 License

This project is licensed under the MIT License.


✅ This version:  

- Shows your HTML form in **code format**  
- Provides a **visual example** of the form  
- Includes database, installation, usage, tech stack, screenshots, and live demo sections  
