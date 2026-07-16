import axios from "axios";

export async function startInterviewAPI(interviewData) {
  try {
    const response = await axios.post(
      "http://localhost:8080/api/v1/interview/start",
      interviewData,
    );

    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Unable to start interview.",
    );
  }
}

export async function evaluateInterviewAPI(interviewData) {
  try {
    const response = await axios.post(
      "http://localhost:8080/api/v1/interview/evaluate",
      interviewData,
    );

    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Unable to evaluate interview.",
    );
  }
}
