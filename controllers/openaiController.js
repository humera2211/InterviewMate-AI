const dotenv = require("dotenv");

dotenv.config();
const ErrorResponse=require("../utils/errorResponse")

const { GoogleGenerativeAI } = require("@google/generative-ai");
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({
  model: "gemini-2.5-flash",
});


//-------------------For extension----------------------
module.exports.problemController = async (req, res , next) => {
  try {
    const { title, difficulty, statement, action } = req.body;

    if (!title || !statement || !action) {
       return next(new ErrorResponse("Missing required fields", 400));
    }

    let prompt = "";

    switch (action) {
      case "explain":
        prompt = `
You are an expert Data Structures & Algorithms mentor helping a student 
preparing for technical interviews (LeetCode/GeeksforGeeks style).

Problem Title:
${title}

Difficulty:
${difficulty}

Problem Statement:
${statement}


TASK:
Analyze this problem and provide a structured breakdown covering ALL approaches 
from brute force to optimal. Be precise and educational, like explaining to a 
student who wants to deeply understand the "why", not just memorize the solution.

Respond in the following structure:

1. CATEGORY / PATTERN
   - Identify the core pattern(s) this problem belongs to 
     (e.g., "Sliding Window", "Two Pointers", "DP - Knapsack", "Graph - BFS")

2. PREREQUISITES
   - List the core topics/patterns the candidate must know before attempting 
     this problem
   - List 1-2 easier foundational questions they should have solved first

3. BRUTE FORCE APPROACH
   - Core idea (2-3 lines)
   - Data structure(s) used and WHY it's suited for this approach
   - Time Complexity (with reasoning, not just the notation)
   - Space Complexity (with reasoning)
   - Edge cases this approach must handle
   - Common mistakes candidates make with this approach

4. BETTER APPROACH (if one exists between brute force and optimal)
   - Core idea (2-3 lines)
   - What specific inefficiency from the brute force does this fix?
   - Data structure(s) used and WHY it's better suited here than the brute force one
   - Time Complexity (with reasoning)
   - Space Complexity (with reasoning)
   - The KEY INSIGHT/trick that allows this improvement over brute force
   - Edge cases this approach must handle
   - Common mistakes candidates make with this approach

5. OPTIMAL APPROACH
   - Core idea (2-3 lines)
   - What specific inefficiency from the "better" approach does this fix?
   - Data structure(s) used and WHY it's the best fit
   - Time Complexity (with reasoning)
   - Space Complexity (with reasoning)
   - The KEY INSIGHT/trick that gets to optimal
   - Edge cases this approach must handle
   - Common mistakes candidates make with this approach

6. COMPLEXITY REDUCTION PATH
   - Explain step-by-step HOW one moves from brute force → better → optimal
   - Frame it as: "The brute force does X repeatedly, which we can avoid by 
     using Y data structure / technique, which reduces complexity because Z"

7. FOLLOW-UP QUESTIONS
   - List 3-4 follow-up questions a real interviewer would ask after the 
     optimal solution (e.g., "What if the array is sorted?", "What if we 
     can't use extra space?", "What if this needs to run on streaming data?")
   - Briefly note how the approach would change for each

8. INTERVIEW FREQUENCY / CONTEXT
   - How commonly is this type of problem asked (Low / Medium / High frequency)
   - What category of companies typically ask this (e.g., product-based, 
     service-based, FAANG-tier) — general context only, not guarantees

9. SIMILAR QUESTIONS
   - List 3-5 similar problems (by name, if well-known LeetCode/GFG problems) 
     that use the same pattern/technique
   - Briefly note what's different/harder in each

OUTPUT FORMAT: Respond ONLY in valid JSON, no markdown formatting, no extra text:
{
  "category": [],
  "prerequisites": { "topics": [], "foundational_questions": [] },
  "brute_force": { "idea": "", "data_structure": "", "why_ds": "", "time_complexity": "", "time_reasoning": "", "space_complexity": "", "space_reasoning": "", "edge_cases": [], "common_mistakes": [] },
  "better_approach": { "idea": "", "fixes": "", "data_structure": "", "why_ds": "", "time_complexity": "", "time_reasoning": "", "space_complexity": "", "space_reasoning": "", "key_insight": "", "edge_cases": [], "common_mistakes": [] },
  "optimal_approach": { "idea": "", "fixes": "", "data_structure": "", "why_ds": "", "time_complexity": "", "time_reasoning": "", "space_complexity": "", "space_reasoning": "", "key_insight": "", "edge_cases": [], "common_mistakes": [] },
  "complexity_reduction_path": "",
  "follow_up_questions": [ { "question": "", "impact_on_approach": "" } ],
  "interview_context": { "frequency": "", "company_types": "" },
  "similar_questions": [ { "name": "", "difference": "" } ]
}

RULES:
- If brute force and optimal are the same (no intermediate step exists), 
  set "better_approach" to null and explain why in complexity_reduction_path.
- Keep reasoning concise but precise — no fluff, no generic statements.
- Base data structure suitability on actual properties (e.g., "HashMap gives 
  O(1) average lookup, eliminating the need for nested iteration").
- For interview_context, avoid absolute claims — frame as general trends, 
  not guarantees.

LIMIT : for each topic give precise response in 3-4 lines.

  IMPORTANT:
- Return ONLY a valid JSON object.
- Do NOT include any explanation before or after the JSON.
- The response must be directly parseable using JSON.parse().
`;
        break;
      case "hint":
         prompt = `

You are an expert DSA mentor, inspired by the teaching style of Striver (takeUforward) and CodeStoryWithMIK. Their style: they don't just name a technique — they make the student FEEL why the brute force is slow, then guide them to the realization of a better idea, step by step, like a human thinking out loud.
Problem Title:
${title}

Difficulty:
${difficulty}

Problem Statement:
${statement}


You generate GUIDED HINTS (not full solutions or code) for a given DSA problem, in THREE progressive levels.

## TASK
Given a DSA problem statement (and optionally constraints/examples), analyze it and produce hints in THREE progressive levels:
1. Brute Force Hint
2. Better Approach Hint
3. Optimal Approach Hint

## STEP 1 — PATTERN RECOGNITION (do this internally first)
Before generating hints, scan the problem statement for signal words/phrases and map them to likely data structures or techniques. Use this reference (not exhaustive — apply the same reasoning to unlisted cases too):

- "frequency", "count of", "duplicate", "distinct" → HashMap / HashSet
- "subarray", "substring", "contiguous", "max/min length", "at most K distinct" → Sliding Window
- "sorted array", "sorted list" → Binary Search / Two Pointer
- "pair sum", "triplet sum", "closest sum" on sorted data → Two Pointer
- "minimize the maximum" / "maximize the minimum" → Binary Search on Answer
- "kth largest/smallest", "top K" → Heap (Priority Queue)
- "next greater/smaller element", "span" → Monotonic Stack
- "connected components", "islands", "grid traversal" → BFS/DFS/Union-Find
- "shortest path", "minimum cost to reach" → BFS (unweighted) / Dijkstra (weighted)
- "number of ways", "count paths", "min/max cost to reach" with overlapping subproblems → Dynamic Programming
- "subsequence", "partition", "can we form" → DP or Backtracking
- "all permutations/combinations/subsets" → Backtracking
- "range queries", "prefix sum needed repeatedly" → Prefix Sum / Segment Tree / BIT
- "cycle detection", "prerequisite", "order of tasks" → Topological Sort / Graph
- "interval", "overlapping", "merge" → Sorting + Interval logic
- "median", "running stream of numbers" → Two Heaps

Identify which pattern(s) apply and let that guide the direction of hints — but DO NOT reveal the pattern name outright in early hints; let the student arrive at it.

## STEP 2 — HUMAN THINKING STYLE (this is the key instruction)
Don't state hints like a textbook. Think like a mentor talking to the student:
- Brute Force hint: point at the most NAIVE instinct a human has first (e.g., "check every pair"), and hint at WHERE it becomes slow — as if dry-running a small example in your head.
- Better hint: point out the SPECIFIC wasted/repeated work in brute force ("notice you're recalculating the same thing") — this should feel like the natural next question a curious student would ask themselves, not a jump to a named technique.
- Optimal hint: give the "aha" realization — the one observation that unlocks the efficient approach. Name the technique only here, tied directly to the reason it clicks (e.g., "since the array is sorted, you don't need to re-scan — two pointers can shrink the search space").
- Use rhetorical/guiding phrasing sparingly (max one question per hint), not textbook statements.
- NEVER give full code or a complete step-by-step algorithm.
- NEVER directly name the exact technique in Hint 1 or Hint 2 (e.g., don't say "use a hashmap" — instead nudge: "what if you could check if you've seen a value before, in O(1) time?").
- Optimal hint (Hint 3) MAY name the technique/pattern, but should still describe the INSIGHT, not the implementation.
- Each hint should build on the previous one — don't repeat information.
- Do not mention time/space complexity unless it helps illustrate WHY an approach is worse (e.g., "this works but re-checks the same subarray repeatedly — can we avoid that?").
- If the problem has an obvious brute force (e.g., nested loops), describe its idea and its inefficiency without full logic.
- Tailor hints to the ACTUAL problem given — do not use generic hints unrelated to the specific constraints/examples provided.


## STEP 3 — LENGTH RULES (STRICT)
- Each hint: MAX 25 words, 1-2 sentences. No exceptions.
- No filler, no "let's think about" — get straight to the nudge.
- No code, no step-by-step algorithm.
- One idea per hint only.

## OUTPUT FORMAT
Return ONLY in this format:

1. <hint>

2. <hint>

3. <hint>

`;
        break;
      
      default:
         return next(new ErrorResponse("Invalid action", 400));
    }

    let response;

    try{

    const result = await model.generateContent(prompt);
    response = result.response.text();
    }catch(err)
    {
      console.log("Gemini Error:" , err);
       if (
         err.status === 503 ||
         err.message?.includes("503") ||
         err.message?.includes("Service Unavailable")
       ) {
         throw new ErrorResponse(
           "AI model is currently busy. Please try again in a few seconds.",
           503,
         );
       }

       throw new ErrorResponse("Internal Server Error", 500);
    }


    if (action === "hint") {
      const hints = response
        .split(/\n?\d+\.\s/)
        .filter(Boolean)
        .map((hint) => hint.trim());

      return res.status(200).json({
        success: true,
        hints,
      });
    }

    let parsedResponse;

    if (action === "explain") {
      const cleaned = response
        .replace(/```json/g, "")
        .replace(/```/g, "")
        .trim();

      try {
        parsedResponse = JSON.parse(cleaned);

        return res.status(200).json({
          success: true,
          explain: parsedResponse,
        });
      } catch (err) {
         console.error("Invalid JSON from Gemini:");
         console.error(response);
        throw new ErrorResponse("AI returned an invalid JSON response.", 500);
      }
    }

    return res.status(200).json({
      success: true,
      response,
    });
  } catch (err) {
    console.log(err);

     next(err);
  }
};
