const dotenv = require("dotenv");

dotenv.config();

const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const model = genAI.getGenerativeModel({
  model: "gemini-2.5-flash",
});


module.exports.startInterview = async (req, res) => {
  try {
    const { title, statement, difficulty, duration, totalQuestions } = req.body;

    // validation
    if (!title || !statement || !difficulty || !duration || !totalQuestions) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields",
      });
    }

    const prompt = `
You are an experienced software engineer conducting a real technical coding interview.

Problem Title:
${title}

Problem Statement:
${statement}

Interview Difficulty:
${difficulty}

Interview Duration:
${duration} minutes

Generate exactly ${totalQuestions} interview questions.

Difficulty Guidelines:

- Basic:
  * Friendly interviewer.
  * Focus on understanding the problem.
  * Ask about brute-force thinking before optimization.
  * Avoid intimidating questions.

- Medium:
  * Standard software engineering interview.
  * Cover brute force, optimization, complexity and edge cases.

- Advanced:
  * Behave like a senior FAANG interviewer.
  * Ask deep follow-up questions.
  * Focus on trade-offs, scalability and optimization.
  * Challenge assumptions.

Rules:

1. Questions must be progressive.
2. Every next question should naturally continue the discussion.
3. Stay completely focused on THIS problem only.
4. Do NOT reveal the optimal solution.
5. Do NOT provide hints.
6. Do NOT provide code.
7. Questions should sound like a real interviewer.
8. Keep every question under 30 words.
9. Return EXACTLY ${totalQuestions} questions.

Return ONLY valid JSON.

Output format:

[
  {
    "id":1,
    "question":"..."
  }
]

Do not return markdown.
Do not use \`\`\`json.
Do not explain anything.
`;

    const result = await model.generateContent(prompt);

    const response = result.response.text();

    const cleaned = response
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

      const questions = JSON.parse(cleaned);
      const sessionId = crypto.randomUUID();

      return res.status(200).json({
        success: true,
        questions,
        sessionId, 
      });

  } catch (err) {       //error handling
    console.log(err);

    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};


module.exports.evaluateInterview = async (req, res, next) => {
  try {
    const { title, statement, difficulty, questions, answers } = req.body;

    // Validation
    if (!title || !statement || !difficulty || !questions || !answers) {
      return next(new ErrorResponse("Missing required fields", 400));
    }

    if (!questions.length || !answers.length) {
      return next(new ErrorResponse("Interview data is empty.", 400));
    }

    // Prompt
    const prompt = `
You are a strict Senior Software Engineer at Google conducting a real coding interview.

Your job is to evaluate ONLY what the candidate actually wrote.

Do NOT assume hidden knowledge.
Do NOT guess the candidate's intention.
Do NOT be overly generous.


Problem Title:
${title}

Problem Statement:
${statement}

Interview Difficulty:
${difficulty}

Questions:
${JSON.stringify(questions, null, 2)}

Candidate Answers:
${JSON.stringify(answers, null, 2)}

Evaluate the candidate fairly.
Evaluation Rules

1. Evaluate ONLY the written answer.

2. If the answer is:
- empty
- random characters
- keyboard smashing
- meaningless text
- unrelated to the question

then:

Score = 0 to 2

Examples:

"asdfasdf"

"qwerty"

"abc xyz"

"123123"

"I don't know"

should NEVER receive a high score.

3. Never praise an incorrect answer.

4. Never invent missing explanations.

5. Give high scores ONLY when the answer is technically correct and well explained.

6. Difficulty matters.

Basic:
Small mistakes are acceptable.

Medium:
Expect correct reasoning.

Advanced:
Expect:
- optimal approach
- edge cases
- complexity analysis
- interview-quality explanation

Missing these should significantly reduce the score.

----------------------------------------------------

Score every question out of 10 using this rubric.

0-2
Wrong answer
Random text
No understanding
Completely unrelated answer

3-4
Some relevant idea
Mostly incorrect
Poor explanation

5-6
Correct intuition
Missing important details

7-8
Correct approach
Minor mistakes
Good explanation

9-10
Interview-ready answer
Technically accurate
Clear reasoning
Good communication
Mentions complexity and edge cases when appropriate

----------------------------------------------------

Also score these categories out of 10.

Problem Understanding

Communication

Optimization

Complexity Analysis

Edge Cases

Return ONLY valid JSON.

Output format

{
  "overallScore":84,

  "categoryScores":{
    "problemUnderstanding":8,
    "communication":9,
    "optimization":7,
    "complexity":8,
    "edgeCases":6
  },

  "strengths":[
    "...",
    "..."
  ],

  "improvements":[
    "...",
    "..."
  ],

  "review":[
    {
      "questionId":1,
      "score":8,
      "expectedAnswer":"...",
      "feedback":"..."
    }
  ]
}

Do not return markdown.

Do not use \`\`\`.
`;

    // Gemini
    const result=await model.generateContent(prompt);
    const response=result.response.text();

    // Parse JSON
    const cleaned = response
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

      let evaluation;

      try {
        evaluation = JSON.parse(cleaned);
      } catch (err) {
        return next(new ErrorResponse("AI returned an invalid response.", 500));
      }

    // Return Result
    return res.status(200).json({
      success: true,
      ...evaluation,
    });


  } catch (err) {
    console.log(err);

    if (
      err.status === 503 ||
      err.message?.includes("503") ||
      err.message?.includes("Service Unavailable")
    ) {
      return next(
        new ErrorResponse("AI model is currently busy. Please try again.", 503),
      );
    }

    return next(new ErrorResponse("Internal Server Error", 500));
  }
};
