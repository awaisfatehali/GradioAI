const gradeWithAI = async (extractedText, teacherInstructions, level = "Medium") => {
  try {
    const { GoogleGenerativeAI } = require("@google/generative-ai");
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    // Define tone/strictness based on level
    let gradingStyle = "";
    if (level === "Chill") {
      gradingStyle = "Be friendly, lenient, and encouraging. Reward effort generously.";
    } else if (level === "Medium") {
      gradingStyle = "Grade fairly with balanced strictness. Reward understanding but note missing points.";
    } else if (level === "Strict") {
      gradingStyle = "Be highly strict and professional. Deduct for missing content or errors. Zero tolerance for weak arguments.";
    }

    // Construct a single prompt template
    const Prompt = `
You are a university-level Computer Science professor grading assignments.

GRADING STYLE
${gradingStyle}

TEACHER INSTRUCTIONS
${teacherInstructions}

STUDENT SUBMISSION (truncated to 10,000 chars):
"${extractedText.substring(0, 10000).replace(/\\/g, "\\\\").replace(/"/g, '\\"')}"

INSTRUCTIONS
1. Evaluate based on the teacher's instructions.
2. Score using a scale of 0–100.
3. Provide feedback in 2–3 sentences.
4. Tone should match the grading style.
5. Return ONLY a JSON object with this structure:

{
  "grade": number,
  "feedback": "string"
}
`;

    const result = await model.generateContent(Prompt);
    const text = await result.response.text();

    // Clean and parse JSON
    const cleanJson = text.replace(/```json|```/g, "").trim();
    let data;
    try {
      data = JSON.parse(cleanJson);
    } catch (err) {
      console.error("JSON Parse Error:", cleanJson);
      data = { grade: 0, feedback: "AI returned malformed output." };
    }

    return {
      grade: data.grade || 0,
      feedback: data.feedback || "No feedback provided.",
    };
  } catch (error) {
    console.error("AI Grading Error:", error);
    return {
      grade: 0,
      feedback: "Error during AI grading. Please review manually.",
    };
  }
};


module.exports = gradeWithAI;
