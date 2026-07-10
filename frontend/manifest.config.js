import { defineManifest } from "@crxjs/vite-plugin";

export default defineManifest({
  manifest_version: 3,
  name: "InterviewMate AI",
  version: "1.0.0",
  description: "AI Interview Companion for LeetCode and GeeksforGeeks",

  action: {
    default_popup: "index.html",
    default_title: "InterviewMate AI",
  },

  permissions: ["storage", "activeTab", "tabs", "scripting"],

  host_permissions: [
    "https://leetcode.com/*",
    "https://www.geeksforgeeks.org/*",
  ],

  content_scripts: [
    {
      matches: ["https://leetcode.com/*", "https://www.geeksforgeeks.org/*"],
      js: ["src/content/content.js"],
    },
  ],
});
