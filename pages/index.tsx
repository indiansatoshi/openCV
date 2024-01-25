/* eslint-disable react/no-unescaped-entities */
import React, { useEffect } from "react"
import Link from "next/link"
import useCVStore from "@/store/cv"
import { Download, GithubIcon, Settings } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import CvTemplate from "@/components/cv-template"

export default function Home() {
  const cv = useCVStore((state) => state)
  const [gpt4ApiKey, setGpt4ApiKey] = React.useState("")
  const [dialogOpen, setDialogOpen] = React.useState(false)
  useEffect(() => {
    setGpt4ApiKey(getApiKeyCookie())

    function handleBeforePrint() {
      document.getElementById("sidebar")?.classList.add("hidden")
      document.getElementById("cv-section")?.classList.add("col-span-12")
      document
        .getElementById("cv-section")
        ?.classList.remove("col-span-8", "col-start-5")
      document.getElementById("btn-group")?.classList.add("hidden")
      document.title = `${cv.firstName || "Your"}_${
        cv.lastName || "Name"
      }_CV_${new Date().getFullYear()}`
    }

    function handleAfterPrint() {
      document.getElementById("sidebar")?.classList.remove("hidden")
      document.getElementById("cv-section")?.classList.remove("col-span-12")
      document
        .getElementById("cv-section")
        ?.classList.add("col-span-8", "col-start-5")
      document.getElementById("btn-group")?.classList.remove("hidden")
      document.title = "CV"
    }

    window.addEventListener("beforeprint", handleBeforePrint)
    window.addEventListener("afterprint", handleAfterPrint)

    return () => {
      window.removeEventListener("beforeprint", handleBeforePrint)
      window.removeEventListener("afterprint", handleAfterPrint)
    }
  }, [cv.firstName, cv.lastName])

  function handleDownload() {
    window.print()
  }

  function setApiKeyCookie(apiKey: string) {
    const expiry = new Date()
    expiry.setTime(expiry.getTime() + 30 * 60 * 1000) // 30 minutes from now
    const cookieValue = `apiKey=${encodeURIComponent(
      apiKey
    )};expires=${expiry.toUTCString()};path=/;SameSite=Strict`
    document.cookie = cookieValue
  }

  function getApiKeyCookie() {
    const cookieValue = document.cookie
      .split("; ")
      .find((row) => row.startsWith("apiKey"))
    if (cookieValue) {
      return cookieValue.split("=")[1]
    }
    return ""
  }

  return (
    <section
      className="col-span-8 col-start-5 max-w-4xl mx-auto py-20"
      id="cv-section"
    >
      <CvTemplate />
      <div
        className="fixed right-4 bottom-8 flex flex-col items-center gap-4"
        id="btn-group"
      >
        <Dialog open={dialogOpen} onOpenChange={(open) => setDialogOpen(open)}>
          <DialogTrigger asChild>
            <Button className=" rounded-full p-8">
              <Settings className="size-6" />
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader className="space-y-4">
              <DialogTitle>GPT 4 Api Key</DialogTitle>
              <DialogDescription>
                This will create a cookie on your browser to store your API key.
              </DialogDescription>
            </DialogHeader>
            <Input
              type="password"
              name="gpt4ApiKey"
              id="gpt4ApiKey"
              value={gpt4ApiKey}
              onChange={(e) => setGpt4ApiKey(e.target.value)}
            />
            <DialogFooter>
              <Button
                type="submit"
                onClick={() => {
                  setApiKeyCookie(gpt4ApiKey)
                  setDialogOpen(false)
                }}
              >
                Save changes
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <Link
          href="https://github.com/andyluak/cv-ai-builder"
          target="_blank"
          className="bg-black text-white p-4 rounded-full"
        >
          <Button variant="link" className="text-white">
            <GithubIcon className="size-6" />
          </Button>
        </Link>
        <Button className=" rounded-full p-8">
          <Download onClick={handleDownload} className="size-6" />
        </Button>
      </div>
    </section>
  )
}
