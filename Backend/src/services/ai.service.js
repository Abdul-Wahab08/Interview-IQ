import { GoogleGenAI } from "@google/genai";
import { z } from "zod";
import { zodToJsonSchema } from "zod-to-json-schema";
import { required } from "zod/mini";
import { convertTextToPdfUsingPuppeteer } from "./puppeteer.service.js";

const technicalQuestionsSchema = z.object({
  question: z.string().describe("Technical question can be asked during the interview"),
  intention: z.string().describe("Intention behind asking the technical question"),
  answer: z.string().describe("How to answer the question, including key points to cover and common pitfalls to avoid")
}).describe("Technical questions that can be asked during the interview");

const behavioralQuestionsSchema = z.object({
  question: z.string().describe("Behavioral question can be asked during the interview"),
  intention: z.string().describe("Intention behind asking the behavioral question"),
  answer: z.string().describe("How to answer the question, including key points to cover and common pitfalls to avoid")
}).describe("Behavioral questions that can be asked during the interview");

const skillGapSchema = z.object({
  skill: z.string().describe("Skill that the candidate is lacking for the job"),
  severity: z.enum(["Low", "Medium", "High"]).describe("Severity of the skill gap i.e. how important it is for the candidate to improve on this skill in order to be a good fit for the job")
}).describe("Skills that the candidate is lacking for the job");

const preparationPlanSchema = z.object({
  day: z.number().describe("Day number in the preparation plan, starting from 1"),
  focus: z.string().describe("Focus area for this day in the preparation plan, e.g. technical questions, behavioral questions, etc."),
  tasks: z.array(z.string()).describe("List of tasks to be completed on this day as part of the preparation plan")
}).describe("Preparation plan for the candidate to improve their chances of success in the interview");

const interviewReportSchema = z.object({
  title: z.string().describe("Title of the job on which the interview report is based"),
  matchScore: z.number().describe("A score from 0 to 100 representing the match between the candidate and the job"),
  technicalQuestions: z.array(technicalQuestionsSchema).describe("Technical questions that can be asked during the interview"),
  behavioralQuestions: z.array(behavioralQuestionsSchema).describe("Behavioral questions that can be asked during the interview"),
  skillGaps: z.array(skillGapSchema).describe("Skills that the candidate is lacking for the job"),
  preparationPlan: z.array(preparationPlanSchema).describe("Preparation plan for the candidate to improve their chances of success in the interview")
})

const geminiSchema = {
  type: "object",
  properties: {
    title: { type: "string" },
    matchScore: { type: "number" },
    technicalQuestions: {
      type: "array",
      items: {
        type: "object",
        properties: {
          question: { type: "string" },
          intention: { type: "string" },
          answer: { type: "string" },
        },
        required: ["question", "intention", "answer"],
      },
    },
    behavioralQuestions: {
      type: "array",
      items: {
        type: "object",
        properties: {
          question: { type: "string" },
          intention: { type: "string" },
          answer: { type: "string" },
        },
        required: ["question", "intention", "answer"],
      },
    },
    skillGaps: {
      type: "array",
      items: {
        type: "object",
        properties: {
          skill: { type: "string" },
          severity: { type: "string", enum: ["Low", "Medium", "High"] },
        },
        required: ["skill", "severity"],
      },
    },
    preparationPlan: {
      type: "array",
      items: {
        type: "object",
        properties: {
          day: { type: "number" },
          focus: { type: "string" },
          tasks: { type: "array", items: { type: "string" } },
        },
        required: ["day", "focus", "tasks"],
      },
    },
  },
  required: ["title", "matchScore", "technicalQuestions", "behavioralQuestions", "skillGaps", "preparationPlan"],
};

export const generateInterviewReport = async ({ jobDescription, resume, selfDescription }) => {
  const prompt = `
    Generate an interview report on the basis of given schema for a candidate with the following details:
                        Resume: ${resume}
                        Self Description: ${selfDescription}
                        Job Description: ${jobDescription} `;

  const ai = new GoogleGenAI({
    apiKey: process.env.GOOGLE_GENAI_API_KEY
  })

  const fullSchema = zodToJsonSchema(interviewReportSchema, {
    target: "openApi3",
    $refStrategy: "none"
  });

  const refinedSchema = {
    type: "object",
    properties: fullSchema.properties,
    required: fullSchema.required,
    ...(fullSchema.$defs && { $defs: fullSchema.$defs }),
    ...(fullSchema.definitions && { definitions: fullSchema.definitions }),
  }

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        systemInstruction: "Respond with a valid JSON object strictly following the provided response schema. All required fields must be present.",
        responseMimeType: "application/json",
        responseSchema: geminiSchema,
      }
    })

    const interviewReport = JSON.parse(response.text);

    return interviewReport;
  } catch (error) {
    console.error("Error generating interview report:", error);
    throw error;
  }
}

export const generateResumePdf = async ({ jobDescription, resume, selfDescription }) => {
  try {
    const prompt = `Generate a resume in PDF format for a candidate based on the following details:
                    Resume: ${resume}
                    Self Description: ${selfDescription}
                    Job Description: ${jobDescription}
                    
                    the response should be a JSON object with a single field "html" which contains the HTML content of the resume which can be converted to PDF using any library like puppeteer.
                        The resume should be tailored for the given job description and should highlight the candidate's strengths and relevant experience. The HTML content should be well-formatted and structured, making it easy to read and visually appealing.
                        The content of resume should be not sound like it's generated by AI and should be as close as possible to a real human-written resume.
                        you can highlight the content using some colors or different font styles but the overall design should be simple and professional.
                        The content should be ATS friendly, i.e. it should be easily parsable by ATS systems without losing important information.
                        The resume should not be so lengthy, it should ideally be 1-2 pages long when converted to PDF. Focus on quality rather than quantity and make sure to include all the relevant information that can increase the candidate's chances of getting an interview call for the given job description.`;

    const pdfSchema = z.object({
      html: z.string().describe("HTML content of the resume which can be converted to PDF using any library like puppeteer")
    }).describe("Schema for the response of resume PDF generation")

    const ai = new GoogleGenAI({
      apiKey: process.env.GOOGLE_GENAI_API_KEY
    })

    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: zodToJsonSchema(pdfSchema)
      }
    })

    const pdfBuffer = await convertTextToPdfUsingPuppeteer(response.text)
    return pdfBuffer;

  } catch (error) {
    console.error("Error generating resume PDF from interview report: ", error);
    throw error;
  }
}

