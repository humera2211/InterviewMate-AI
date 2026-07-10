import { useEffect, useState } from "react";
import useCurrentTab from "./useCurrentTab";
import { getProblemData } from "../services/chromeMessaging";

export default function useProblemData() {
  const { tab, loading: tabLoading, error: tabError } = useCurrentTab();

  const [problem, setProblem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchProblem() {
      if (!tab?.id) return;

      try {
        const data = await getProblemData(tab.id);
        setProblem(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    if (!tabLoading) {
      fetchProblem();
    }
  }, [tab, tabLoading]);

  return {
    problem,
    loading: loading || tabLoading,
    error: error || tabError,
  };
}
