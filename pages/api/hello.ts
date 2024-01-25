import type { NextApiRequest, NextApiResponse } from "next"
import { TCv } from "@/store/cv"
import OpenAi from "openai"

import { getSummaryPrompt } from "@/lib/helperPrompts"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  res.status(200).json({ name: "John Doe" })
}
