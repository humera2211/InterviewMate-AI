import { useEffect, useState , useRef } from "react";
import useCurrentTab from "./useCurrentTab";
import { getProblemData } from "../services/chromeMessaging";
import { getProblemSlug } from "../utils/leetcode";

export default function useProblemData() {
  const { tab, loading: tabLoading, error: tabError } = useCurrentTab();

  const [problem, setProblem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const requestIdRef = useRef(0); //har request ko ek unique id
   const slug = getProblemSlug(tab?.url);

  useEffect(() => {
    async function fetchProblem() {
      if (!tab?.id || !slug) {
        return;
      }

      const currentRequestId = ++requestIdRef.current;

      setLoading(true); //naya fetch shuru hone pe loading reset
      try {
        const data = await getProblemData(tab.id);

        if (currentRequestId !== requestIdRef.current) {
          return;
        }

        setProblem(data);
      } catch (err) {
        if (currentRequestId !== requestIdRef.current) {
          return;
        }
        setError(err.message);
      } finally {
        if (currentRequestId === requestIdRef.current) {
          setLoading(false);
        }
      }
    }

    if (!tabLoading) {
      fetchProblem();
    }
  }, [tab?.id, slug, tabLoading]);

  return {
    problem,
    loading: loading || tabLoading,
    error: error || tabError,
  };
}
