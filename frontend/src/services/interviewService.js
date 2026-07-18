import axios from "axios";

export async function startInterviewAPI(interviewData) {
  try {
    const token = localStorage.getItem("authToken");

    const response = await axios.post(
      `${import.meta.env.VITE_API_URL}/api/v1/interview/start`,
      interviewData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.error || "Unable to start interview.",
    );
  }
}

export async function evaluateInterviewAPI(interviewData) {
  try {
    const token = localStorage.getItem("authToken");

    const response = await axios.post(
      `${import.meta.env.VITE_API_URL}/api/v1/interview/evaluate`,
      interviewData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.error || "Unable to evaluate interview.",
    );
  }
}
