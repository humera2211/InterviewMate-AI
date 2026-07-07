const dotenv=require("dotenv");

dotenv.config();

const {GoogleGenerativeAI}=require("@google/generative-ai");
const genAI=new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({
  model: "gemini-2.5-flash",
});

module.exports.summaryController= async (req,res)=>{

    try{
    const {text}=req.body;

    if (!text) {
      return res.status(400).json({
        success: false,
        message: "Text is required",
      });
    }

    const result=await model.generateContent(`Summarize this ${text}`);

    const response=result.response.text();

    return res.status(200).json(response);
    }catch(err)
    {
        console.log(err);
        return res.status(500).json({
            success:false,
            message:err.message
        });
    }
};

module.exports.paraController=async (req,res )=>{

   module.exports.paraController = async (req, res) => {
     try {
       const { text } = req.body;

       console.time("Paragraph")

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