import axios from "axios";

export async function askAI(problem , action){
    try {
      const response = await axios.post(
        "http://localhost:8080/api/v1/openai/problem",
        {
          title: problem.title,
          difficulty: problem.difficulty,
          statement: problem.statement,
          action,
        },
      );
   
    return response.data;

    } catch (error) {
      throw new Error(error.response?.data?.message || "Something went wrong");
    }

}