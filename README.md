# 🚀 InterviewMate AI

An AI-powered Chrome Extension that enhances your **LeetCode DSA and interview preparation** with real-time AI assistance. InterviewMate AI provides problem explanations, progressive hints, mock interviews, interview evaluation, and history tracking—all directly from a Chrome Side Panel.

Built with **React, Node.js, Express.js, MongoDB, Google Gemini AI, and Chrome Extension Manifest V3**.

---

##  Features

- 🤖 **AI Explain** – Get a detailed explanation of the current problem.
- 💡 **Progressive Hints** – Solve problems with guided hints instead of directly viewing the solution.
- 🎤 **Mock Interview** – Practice AI-generated interview questions based on the current problem.
- 📊 **Interview Evaluation** – Receive AI feedback on your responses.
- 📚 **Interview History** – View, review, and delete previous interview sessions.
- 🔐 **Secure Authentication** – JWT-based login and registration.
- ⚡ **Chrome Side Panel Integration** – Access AI assistance without leaving LeetCode.
- ☁️ **Cloud Backend** – Powered by MongoDB Atlas and Render.

---

## 🛠 Tech Stack

### Frontend

- React
- Vite
- Tailwind CSS
- Chrome Extension (Manifest V3)
- React Router

### Backend

- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- JWT Authentication
- Google Gemini API

### Deployment

- Render

---

## 📂 Project Structure

```
InterviewMateAI/
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── content/
│   │   ├── hooks/
│   │   ├── pages/
│   │   ├── services/
│   │   └── utils/
│   ├── manifest.config.js
│   └── vite.config.js
│
├── backend/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── services/
│   └── server.js
│
└── README.md
```

---

#  Installation

### 1. Clone the Repository

```bash
git clone https://github.com/humera2211/InterviewMateAI.git
cd InterviewMateAI
```

---

### 2. Install Dependencies

#### Frontend

```bash
cd frontend
npm install
```

#### Backend

Open another terminal:

```bash
cd backend
npm install
```

---

### 3. Configure Environment Variables

#### Backend

Create a `.env` file inside the `backend` folder.

```env
PORT=8080
MONGODB_URI=<your_mongodb_connection_string>
JWT_ACCESS_SECRET=<your_jwt_secret>
GEMINI_API_KEY=<your_gemini_api_key>
```

#### Frontend

Create a `.env` file inside the `frontend` folder.

```env
VITE_API_URL=https://interviewmate-ai-backend.onrender.com
```

---

### 4. Run the Backend

```bash
cd backend
npm run dev
```

---

### 5. Build the Chrome Extension

```bash
cd frontend
npm run build
```

This generates the `dist` folder.

---

### 6. Load the Extension in Chrome

1. Open Chrome.

2. Navigate to

```
chrome://extensions
```

3. Enable **Developer Mode**.

4. Click **Load unpacked**.

5. Select the

```
frontend/dist
```

folder.

The extension is now ready to use.

---

# How It Works

### AI Explain

- Open any LeetCode problem.
- Launch the InterviewMate AI Side Panel.
- Click **Explain**.
- The AI generates a structured explanation including intuition, approach, algorithm, and time/space complexity.

---

### Progressive Hints

- Click **Hint**.
- Receive hints one at a time to encourage problem-solving instead of revealing the full solution immediately.

---

### Mock Interview

- Click **Interview**.
- Answer AI-generated interview questions based on the current coding problem.
- Receive personalized feedback and evaluation.

---

### Interview History

- Every completed interview is securely stored in MongoDB.
- Review previous interviews anytime.
- Delete interviews whenever required.

---

##  Troubleshooting

### Problem data is not detected

- Refresh the LeetCode page.
- Ensure you are on a valid LeetCode problem URL.
- Reload the extension after making changes.

---

### AI is not responding

- Verify that the backend server is running.
- Check the Gemini API configuration.
- Ensure `VITE_API_URL` points to the correct backend.

---

### Login failed

- Make sure the backend server is running.
- Login again if the JWT token has expired.

---

##  Future Improvements

- Support for GeeksforGeeks
- Support for Codeforces
- AI-generated follow-up questions
- Voice-based mock interviews
- Personalized learning recommendations
- Multi-language support

---

## Contributing

Contributions are welcome!

1. Fork the repository.
2. Create a feature branch.

```bash
git checkout -b feature/your-feature-name
```

3. Commit your changes.

```bash
git commit -m "Add your feature"
```

4. Push the branch.

```bash
git push origin feature/your-feature-name
```

5. Open a Pull Request.

---

##  License

This project is licensed under the MIT License.

---

##  Support

If you found this project helpful, consider giving it a ⭐ on GitHub!
