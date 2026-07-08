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
  }, []);

  return {
    tab,
    loading,
    error,
  };
}
