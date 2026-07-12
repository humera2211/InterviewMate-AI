import { defineManifest } from "@crxjs/vite-plugin";

export default defineManifest({
  manifest_version: 3,
  name: "InterviewMate AI",
  version: "1.0.0",
  description: "AI Interview Companion for LeetCode and GeeksforGeeks",

  action: {
    //default_popup: "index.html",
    default_title: "InterviewMate AI",
  },

  permissions: ["storage", "activeTab", "tabs", "scripting" , "sidePanel" , ],

  side_panel:{
    default_path:"index.html"
  } ,

  background:{
    service_worker: "src/background.js",
    type:"module" ,
  } ,

  host_permissions: [
    "https://leetcode.com/*",
    "https://www.geeksforgeeks.org/*",
    "http://localhost:8080/*",
  ],

  content_scripts: [
    {
      matches: ["https://leetcode.com/*", "https://www.geeksforgeeks.org/*"],
      js: ["src/content/content.js"],
    },
  ],
});
