const dotenv = require("dotenv");

dotenv.config();

const { GoogleGenerativeAI } = require("@google/generative-ai");
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({
  model: "gemini-2.5-flash-lite",
});

module.exports.summaryController = async (req, res) => {
  try {
    const { text } = req.body;

    if (!text) {
      return res.status(400).json({
        success: false,
        message: "Text is required",
      });
    }

    const result = await model.generateContent(`Summarize this ${text}`);

    const response = result.response.text();

    return res.status(200).json(response);
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

module.exports.paraController = async (req, res) => {
  try {
    const { text } = req.body;

    console.time("Paragraph");

    const result = await model.generateContent(
      `Write a single paragraph of about 100 words on: ${text}`,
    );

    console.timeEnd("Paragraph");

    const response = result.response.text();

    return res.status(200).json(response);
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

module.exports.chatbotController = async (req, res) => {
  try {
    const { text } = req.body;

    if (!text) {
      return res.status(400).json({
        success: false,
        message: "Question is required",
      });
    }

    const result = await model.generateContent(`
You are Yoda from Star Wars.

Answer every question in Yoda's speaking style.

Example:
Me: What is your name?
Yoda: Yoda, my name is.

Me: ${text}
Yoda:
    `);

    const response = result.response.text();

    return res.status(200).json(response);
  } catch (err) {
    console.log(err);

    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

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

Problem:
${statement}

Give exactly ONE hint.

Return your answer in VALID MARKDOWN.

Format:

#Hint

...

#Think About

- point
- point

Rules:
- Never reveal the full solution.
- Never provide code.
- Maximum 100 words.
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

    const result = await model.generateContent(prompt);

    const response = result.response.text();

    return res.status(200).json({
      success: true,
      response,
    });
  } catch (err) {
    console.log(err);

    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
