import { parseLeetCode } from "../parsers/leetcodeParser";

console.log("InterviewMate AI Content Script Loaded");

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {

     console.log("Message received:", message);
  if (message.type === "GET_PROBLEM_DATA") {
    const data = parseLeetCode();

    console.log("Parsed data: ",data);

    sendResponse(data);
  }
});
