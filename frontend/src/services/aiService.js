import axios from "axios";

export async function askAI(problem, action) {
  try {
    const token = localStorage.getItem("authToken");

    if (!token) {
      throw new Error("Please login to use InterviewMate AI.");
    }

    const response = await axios.post(
      `${import.meta.env.VITE_API_URL}/api/v1/openai/problem`,
      {
        title: problem.title,
        difficulty: problem.difficulty,
        statement: problem.statement,
        action,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    if (action === "explain") {
      return response.data.explain;
    }

    if (action === "hint") {
      return response.data.hints;
    }

    return response.data;
  } catch (error) {
     console.log("Message:", error.message);

     throw error;
  }
}
