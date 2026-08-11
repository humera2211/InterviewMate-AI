import { parseLeetCode } from "../parsers/leetcodeParser";

console.log("InterviewMate AI Content Script Loaded");

let lastKnownTitle = null;

function waitForTitleUpdate(oldTitle, timeout = 2000, interval = 100) {
  return new Promise((resolve) => {
    const start = Date.now();

    function check() {
      const data = parseLeetCode();

      if (data?.title && data.title !== oldTitle) {
        resolve(data);
        return;
      }

      if (Date.now() - start > timeout) {
        resolve(data); // timeout, jo bhi mila usi se aage badho
        return;
      }

      setTimeout(check, interval);
    }

    check();
  });
}

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  console.log("Message received:", message);

  if (message.type === "GET_PROBLEM_DATA") {
    (async () => {
      const data = await waitForTitleUpdate(lastKnownTitle);
      lastKnownTitle = data?.title;

      console.log("Parsed data: ", data);
      sendResponse(data);
    })();

    return true; // IMPORTANT: async sendResponse ke liye zaroori hai
  }
});
