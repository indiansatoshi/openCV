/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react"
import useCVStore, { TCv } from "@/store/cv"

import useStreamResponse from "@/hooks/useStreamResponse"

import MultiAddInput from "./multi-add-input"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import { ScrollArea } from "./ui/scroll-area"
import { Textarea } from "./ui/textarea"

type Props = {}

function Sidebar({}: Props) {
  const cv = useCVStore((state) => state)
  const setCV = useCVStore((state) => state.setCV)

  function handleInputChange(
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) {
    const newCV: TCv = {
      ...cv,
      [e.target.name]: e.target.value,
    }
    setCV(newCV)
  }

  const { startStream, responses } = useStreamResponse()

  useEffect(() => {
    if (responses !== "") {
      setCV({
        ...cv,
        description: responses,
      })
    }
  }, [responses, setCV])

  return (
    <ScrollArea
      className="h-full max-h-dvh col-span-4 !fixed bottom-0 w-[600px]"
      id="sidebar"
    >
      <aside className="min-h-dvh  bg-slate-900 text-slate-100 p-8">
        <form className="space-y-6">
          <p className="text-slate-200 text-2xl">Basic Info</p>
          <div className="space-y-2">
            <Label htmlFor="firstName">First Name</Label>
            <Input
              type="text"
              name="firstName"
              id="firstName"
              value={cv.firstName}
              placeholder="First Name"
              onChange={handleInputChange}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="lastName">Last Name</Label>
            <Input
              type="text"
              name="lastName"
              id="lastName"
              value={cv.lastName}
              placeholder="Last Name"
              onChange={handleInputChange}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="roleApplying">Role Applying For</Label>
            <Input
              type="text"
              name="roleApplying"
              id="roleApplying"
              value={cv.roleApplying}
              placeholder="Role Applying For"
              onChange={handleInputChange}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              name="description"
              value={cv.description}
              placeholder="Description"
              onChange={handleInputChange}
            />
            <Button
              type="button"
              className="mt-4"
              onClick={() => startStream({ cv, type: "summary" })}
            >
              Generate Summary
            </Button>
          </div>

          <div className="space-y-2 flex-grow">
            <Label htmlFor="email">Email</Label>
            <Input
              type="email"
              name="email"
              value={cv.email}
              placeholder="Email"
              onChange={handleInputChange}
            />
          </div>
          <div className="space-y-2 flex-grow">
            <Label htmlFor="phone">Phone</Label>
            <Input
              type="phone"
              name="phone"
              value={cv.phone}
              placeholder="Phone"
              onChange={handleInputChange}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="address">Adress</Label>
            <Textarea
              name="address"
              id="address"
              value={cv.address}
              placeholder="Adress"
              onChange={handleInputChange}
            />
          </div>
          <div className="space-y-6">
            <p className="text-slate-200 text-2xl">Links</p>
            <MultiAddInput cvObjectKey="links" singular="link" />
          </div>
          <div className="space-y-6">
            <p className="text-slate-200 text-2xl">Skills</p>
            <MultiAddInput cvObjectKey="skills" singular="skill" />
          </div>
          <div className="space-y-6">
            <p className="text-slate-200 text-2xl">Experiences</p>
            <MultiAddInput cvObjectKey="experiences" singular="experience" />
          </div>
          <div className="space-y-6">
            <p className="text-slate-200 text-2xl">Educations</p>
            <MultiAddInput cvObjectKey="educations" singular="education" />
          </div>
          <div className="space-y-6">
            <p className="text-slate-200 text-2xl">Languages</p>
            <MultiAddInput cvObjectKey="languages" singular="language" />
          </div>
        </form>
      </aside>
    </ScrollArea>
  )
}

export default Sidebar
