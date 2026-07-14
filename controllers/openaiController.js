const dotenv = require("dotenv");

dotenv.config();
const ErrorResponse=require("../utils/errorResponse")

const { GoogleGenerativeAI } = require("@google/generative-ai");
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({
  model: "gemini-2.5-flash-lite",
});


//-------------------For extension----------------------
module.exports.problemController = async (req, res) => {
  try {
    const { title, difficulty, statement, action } = req.body;

    if (!title || !statement || !action) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields",
      });
    }

    let prompt = "";

    switch (action) {
      case "explain":
        prompt = `
You are an expert DSA mentor.

Problem Title:
${title}

Difficulty:
${difficulty}

Problem Statement:
${statement}

Explain this problem for a beginner.

Return your answer in VALID MARKDOWN.

Format exactly like this:

#Problem Explanation

Explain what the problem is asking in simple language.

#Goal

- Bullet points
- What needs to be found
- Important constraints

#Example Intuition

Explain using a small example.

Rules:
- Do NOT explain the algorithm.
- Do NOT provide code.
- Use markdown headings and bullet points.
`;
        break;
      case "hint":
         prompt = `
You are an expert DSA mentor.

Problem Title:
${title}

Difficulty:
${difficulty}

Problem Statement:
${statement}

Generate EXACTLY 3 progressive hints.

Rules:
- Hint 1 should be very subtle.
- Hint 2 should reveal a little more.
- Hint 3 should almost reveal the optimal approach.
- Do NOT provide code.
- Do NOT reveal the final solution.
- Keep every hint under 50 words.

Return ONLY in this format:

1. <hint>

2. <hint>

3. <hint>
`;
        break;
      case "approach":
        prompt = `
You are preparing a student for coding interviews.

Problem:
${statement}

Return your answer in VALID MARKDOWN.

Format exactly:

#Intuition

...

#Optimal Approach

Step-by-step explanation.

#Time Complexity

- Time:

#Space Complexity

- Space:

Rules:
- Do NOT generate code.
- Use headings and bullet points.
`;
        break;

      default:
        return res.status(400).json({
          success: false,
          message: "Invalid action",
        });
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

    return res.status(200).json({
      success: true,
      response,
    });
  } catch (err) {
    console.log(err);

     return res.status(err.statusCode || 500).json({
       success: false,
       message: err.message,
     });
  }
};
