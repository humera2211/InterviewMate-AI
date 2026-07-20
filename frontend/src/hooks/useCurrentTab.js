import { useEffect, useState } from "react";
import { getCurrentTab } from "../services/chromeService";

export default function useCurrentTab() {
  const [tab, setTab] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchTab() {
      try {
        const currentTab = await getCurrentTab();
        setTab(currentTab);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchTab();

     //SPA navigation detect karne ke liye listener
    const handleUpdate = (tabId, changeInfo, updatedTab) => {
      if (
        updatedTab.active &&
        (changeInfo.url || changeInfo.status === "complete")
      ) {
        setTab({ ...updatedTab }); // naya reference → dependent effects re-run honge
      }
    };

    chrome.tabs.onUpdated.addListener(handleUpdate);

    // cleanup
    return () => {
      chrome.tabs.onUpdated.removeListener(handleUpdate);
    };
  }, []);


  return {
    tab,
    loading,
    error,
  };
}
