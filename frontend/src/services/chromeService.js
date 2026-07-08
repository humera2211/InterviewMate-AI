export async function getCurrentTab() {
  return new Promise((resolve, reject) => {
    if (!chrome?.tabs) {
      reject(new Error("Chrome Tabs API not available"));
      return;
    }

    chrome.tabs.query(
      {
        active: true,
        currentWindow: true,
      },
      (tabs) => {
        if (chrome.runtime.lastError) {
          reject(chrome.runtime.lastError);
          return;
        }

        resolve(tabs[0]);
      },
    );
  });
}
