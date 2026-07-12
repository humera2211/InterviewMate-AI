import axios from "axios";

export async function askAI(problem , action){

    const response = await axios.post(
      "http://localhost:8080/api/v1/openai/problem",
      {
        title: problem.title,
        difficulty: problem.difficuty,
        statement: problem.statement,
        action,
      },
    );

    return response.data;
}