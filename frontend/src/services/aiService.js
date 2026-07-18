import axios from "axios";

export async function askAI(problem, action) {
  try {
    const token = localStorage.getItem("authToken");

    const response = await axios.post(
      "http://localhost:8080/api/v1/openai/problem",
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
    throw new Error(error.response?.data?.error || "Something went wrong");
  }
}
