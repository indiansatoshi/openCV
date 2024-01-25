import type { NextApiRequest, NextApiResponse } from "next"
import { TCv } from "@/store/cv"
import OpenAi from "openai"

import { getSummaryPrompt } from "@/lib/helperPrompts"

export const runtime = "nodejs"
export const dynamic = "force-dynamic"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (!req.cookies.apiKey && !process.env.OPENAI_API_KEY === undefined) {
    res.status(401).json({ error: "No API key provided" })
    res.end()
    return
  }

  if (req.method === "POST") {
    const openai = new OpenAi({
      apiKey: process.env.OPENAI_API_KEY || req.cookies.apiKey,
    })
    const {
      cv,
      type,
    }: {
      cv: TCv
      type: "summary" | "jobDescription" | "educationDescription"
    } = req.body

    if (!cv || !type) {
      res.status(400).json({ error: "Bad Request" })
      return
    }

    try {
      const stream = openai.beta.chat.completions.stream({
        model: "gpt-4",
        messages: [
          {
            role: "assistant",
            content:
              "Your job is to write an SEO and conversion optimized CV. The user will prompt what exactly he wants your help with.",
          },
          {
            role: "user",
            content: getSummaryPrompt(cv, type),
          },
        ],
        stream: true,
        max_tokens: 4000,
      })

      stream.on("content", (delta) => {
        res.write(delta)
      })

      const chatCompletion = await stream.finalChatCompletion()
      res.write("END STREAM")
      res.write(chatCompletion)
      res.status(200).end()
    } catch (error) {
      console.error("Error:", error)
      res.status(500).json({ error: "Internal Server Error" })
    }
  } else {
    res.status(405).json({ error: "Method Not Allowed" })
  }
}
