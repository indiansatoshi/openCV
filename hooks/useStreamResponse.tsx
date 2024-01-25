import { useEffect, useState } from "react"
import { TCv } from "@/store/cv"
import { useMutation } from "@tanstack/react-query"
import { ChatCompletion } from "openai/resources/index.mjs"

function useStreamResponse() {
  const [responses, setResponses] = useState("")
  const [data, setData] = useState<ChatCompletion | undefined>()
  const [isLoading, setIsLoading] = useState(false)
  const { mutate: startStream } = useMutation({
    mutationFn: async ({ cv, type }: { cv: TCv; type: string }) => {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ cv, type }),
      })

      if (!response.body) {
        throw new Error("ReadableStream not supported in this browser.")
      }

      const reader = response.body.getReader()
      return reader
    },
    onSuccess: (reader) => {
      setIsLoading(true)
      readStream(reader)
    },
  })

  async function readStream(reader: ReadableStreamDefaultReader) {
    async function read() {
      const { done, value } = await reader.read()
      if (done) {
        setIsLoading(false)
        return
      }

      const text = new TextDecoder().decode(value)
      if (text.includes("END STREAM")) {
        try {
          setData(JSON.parse(text.replace(/.*END STREAM/, "")))
        } catch (e) {
          console.log(e)
        }
      } else {
        setResponses((prev) => prev + text)
        console.log(responses)
      }
      read()
    }
    read()
  }

  useEffect(() => {
    if (data) {
      setResponses("")
    }
  }, [data])

  return { responses, data, startStream, isLoading }
}

export default useStreamResponse
