import axios from "axios";

export async function getHistoryAPI() {
  try {
    const token = localStorage.getItem("authToken");

    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}/api/v1/interview/history`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.error || "Unable to fetch history.");
  }
}

export async function getInterviewAPI(id) {
  try {
    const token = localStorage.getItem("authToken");

    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}/api/v1/interview/history/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.error || "Unable to fetch interview.",
    );
  }
}

export async function deleteInterviewAPI(id) {
  try {
    const token = localStorage.getItem("authToken");

    const response = await axios.delete(
      `${import.meta.env.VITE_API_URL}/api/v1/interview/history/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.error || "Unable to delete interview.",
    );
  }
}
