import { GoogleGenerativeAI } from "@google/generative-ai";

export const sendMessage = async (message) => {
  try {
    const genAI = new GoogleGenerativeAI(
      "AIzaSyBTUrDAq9N3QTLgRiIT_Ru9pwyJjsXNABQ"
    );
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const result = await model.generateContent(message+"and Response will be short");
    // console.log(result.response.text());
    return result;
  } catch (error) {
    console.error("Error sending message:", error);
    throw error;
  }
};
 

