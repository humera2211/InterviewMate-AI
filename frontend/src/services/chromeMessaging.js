export function getProblemData(tabId, retries = 3, delay = 400) {
  return new Promise((resolve, reject) => {
    function attempt(remaining) {
      chrome.tabs.sendMessage(
        tabId,
        { type: "GET_PROBLEM_DATA" },
        (response) => {
          if (chrome.runtime.lastError) {
            if (remaining > 0) {
              // Pehli baar fail hone pe content script inject karne ki koshish karo
              chrome.scripting.executeScript(
                {
                  target: { tabId },
                  files: ["content-script.js"], // apna exact built file path daalna
                },
                () => {
                  // inject ho ya na ho, thoda wait karke retry karo
                  setTimeout(() => attempt(remaining - 1), delay);
                },
              );
            } else {
              reject(chrome.runtime.lastError);
            }
            return;
          }

          resolve(response);
        },
      );
    }

    attempt(retries);
  });
}
