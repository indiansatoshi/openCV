import React, { useEffect, useMemo, useRef } from "react"
import useCVStore, { CvObjectKey } from "@/store/cv"
import { SelectTrigger } from "@radix-ui/react-select"
import { AnimatePresence, motion } from "framer-motion"
import { Trash2 } from "lucide-react"
import { DateRange } from "react-day-picker"
import { v4 as uuidv4 } from "uuid"

import useStreamResponse from "@/hooks/useStreamResponse"

import { DatePickerWithRange } from "./date-range-picker"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectValue,
} from "./ui/select"
import { Textarea } from "./ui/textarea"

type TMultiAddInput = {
  cvObjectKey: CvObjectKey
  singular: string
}

function MultiAddInput({ cvObjectKey, singular }: TMultiAddInput) {
  const cv = useCVStore((state) => state)
  const setCV = useCVStore((state) => state.setCV)
  const wrapperRef = useRef<HTMLDivElement>(null)
  const { startStream, responses } = useStreamResponse()

  function shouldAllowAdd() {
    if (cv[cvObjectKey].length === 0) return true
    switch (cvObjectKey) {
      case "skills":
      case "links":
      case "languages": {
        const lastItem =
          cv[cvObjectKey].length > 0 && cv[cvObjectKey].slice(-1)[0]
        return lastItem && lastItem.name !== ""
      }

      case "experiences": {
        const lastItem =
          cv[cvObjectKey].length > 0 && cv[cvObjectKey].slice(-1)[0]
        return lastItem && lastItem.company !== ""
      }
      case "educations": {
        const lastItem =
          cv[cvObjectKey].length > 0 && cv[cvObjectKey].slice(-1)[0]
        return lastItem && lastItem.school !== ""
      }
    }
  }

  const addItem = () => {
    if (!shouldAllowAdd()) return

    const newItem = createNewItem(cvObjectKey)
    setCV({ ...cv, [cvObjectKey]: [...cv[cvObjectKey], newItem] })
  }

  const updateItem = (id: string, value: string | DateRange, name: string) => {
    const newObjects = cv[cvObjectKey].map((obj, i) => {
      if (obj.id === id) {
        return { ...obj, [name]: value }
      }
      return obj
    })
    setCV({ ...cv, [cvObjectKey]: newObjects })
  }

  const deleteItem = (id: string) => {
    const newObjects = cv[cvObjectKey].filter((obj) => obj.id !== id)
    setCV({ ...cv, [cvObjectKey]: newObjects })
  }

  useEffect(() => {
    wrapperRef.current
      ?.getElementsByTagName("input")
      [cv[cvObjectKey].length - 1]?.focus()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cv[cvObjectKey].length])

  const FieldInputs = useMemo(() => {
    switch (cvObjectKey) {
      case "skills": {
        return cv[cvObjectKey].map((obj) => (
          <motion.div
            className="flex"
            key={obj.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <Input
              className="pr-10"
              type="text"
              name={"name"}
              id={singular + obj.id}
              value={obj.name}
              placeholder={singular}
              onChange={(e) =>
                updateItem(obj.id, e.target.value, e.target.name)
              }
            />
            <Button
              className="-ml-14"
              variant="destructive"
              type="button"
              onClick={() => deleteItem(obj.id)}
            >
              <Trash2 />
            </Button>
          </motion.div>
        ))
      }
      case "links": {
        {
          return cv[cvObjectKey].map((obj) => (
            <motion.div
              className="flex"
              key={obj.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <Input
                className="pr-10 w-[20ch]"
                type="text"
                name={"name"}
                value={obj.name}
                placeholder={"Link"}
                onChange={(e) =>
                  updateItem(obj.id, e.target.value, e.target.name)
                }
              />
              <Input
                className="pr-10"
                type="text"
                name={"url"}
                value={obj.url}
                placeholder={"URL"}
                onChange={(e) =>
                  updateItem(obj.id, e.target.value, e.target.name)
                }
              />
              <Button
                className="-ml-14"
                variant="destructive"
                type="button"
                onClick={() => deleteItem(obj.id)}
              >
                <Trash2 />
              </Button>
            </motion.div>
          ))
        }
      }
      case "languages": {
        return cv[cvObjectKey].map((obj) => (
          <motion.div
            className="flex gap-2"
            key={obj.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <Input
              className="w-[15ch]"
              type="text"
              name={"name"}
              id={singular + obj.id}
              value={obj.name}
              placeholder={"Language"}
              onChange={(e) =>
                updateItem(obj.id, e.target.value, e.target.name)
              }
            />
            <Select
              name={"level"}
              value={obj.level}
              onValueChange={(e) => updateItem(obj.id, e, "level")}
            >
              <SelectTrigger asChild>
                <Button
                  variant="outline"
                  className="flex-grow text-slate-900 text-sm"
                >
                  <SelectValue placeholder="Proficiency" />
                </Button>
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Proficiency</SelectLabel>
                  <SelectItem value="beginner"> Beginner</SelectItem>
                  <SelectItem value="intermediate"> Intermediate</SelectItem>
                  <SelectItem value="advanced"> Advanced</SelectItem>
                  <SelectItem value="proficient"> Proficient</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
            <Button
              variant="destructive"
              type="button"
              onClick={() => deleteItem(obj.id)}
            >
              <Trash2 />
            </Button>
          </motion.div>
        ))
      }
      case "experiences": {
        return cv[cvObjectKey].map((obj) => (
          <motion.div
            className="flex flex-wrap gap-2"
            key={obj.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <Input
              className="pr-10 w-full"
              type="text"
              name={"company"}
              id={singular + obj.id}
              value={obj.company}
              placeholder={"Company"}
              onChange={(e) =>
                updateItem(obj.id, e.target.value, e.target.name)
              }
            />
            <Input
              className="pr-10 w-fit flex-grow"
              type="text"
              name={"position"}
              id={"position" + obj.id}
              value={obj.position}
              placeholder={"Position"}
              onChange={(e) =>
                updateItem(obj.id, e.target.value, e.target.name)
              }
            />
            <Input
              className="pr-10 w-fit flex-grow"
              type="text"
              name={"location"}
              id={"location" + obj.id}
              value={obj.location}
              placeholder={"Location"}
              onChange={(e) =>
                updateItem(obj.id, e.target.value, e.target.name)
              }
            />
            <DatePickerWithRange
              date={obj.date}
              setDate={(date) => updateItem(obj.id, date, "date")}
            />

            <Textarea
              name="description"
              value={obj.description}
              placeholder="Description"
              onChange={(e) =>
                updateItem(obj.id, e.target.value, e.target.name)
              }
              className="pr-16 w-full list-disc"
            />
            <Button
              className="-ml-16"
              variant="destructive"
              type="button"
              onClick={() => deleteItem(obj.id)}
            >
              <Trash2 />
            </Button>
          </motion.div>
        ))
      }
      case "educations": {
        return cv[cvObjectKey].map((obj) => (
          <motion.div
            className="flex flex-wrap gap-2"
            key={obj.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <Input
              className="pr-10 w-full"
              type="text"
              name={"school"}
              id={singular + obj.id}
              value={obj.school}
              placeholder={"School"}
              onChange={(e) =>
                updateItem(obj.id, e.target.value, e.target.name)
              }
            />
            <Input
              className="pr-10 w-fit flex-grow"
              type="text"
              name={"degree"}
              id={"degree" + obj.id}
              value={obj.degree}
              placeholder={"Degree"}
              onChange={(e) =>
                updateItem(obj.id, e.target.value, e.target.name)
              }
            />
            <DatePickerWithRange
              date={obj.date}
              setDate={(date) => updateItem(obj.id, date, "date")}
            />

            <Textarea
              name="description"
              value={obj.description}
              placeholder="Description"
              onChange={(e) =>
                updateItem(obj.id, e.target.value, e.target.name)
              }
              className="pr-16 list-desc"
            />
            <Button
              className="-ml-16"
              variant="destructive"
              type="button"
              onClick={() => deleteItem(obj.id)}
            >
              <Trash2 />
            </Button>
          </motion.div>
        ))
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cv[cvObjectKey], updateItem, deleteItem])

  return (
    <div ref={wrapperRef} className="space-y-4">
      <AnimatePresence>{FieldInputs}</AnimatePresence>
      <Button
        className="text-slate-900"
        variant={"outline"}
        type="button"
        onClick={addItem}
      >
        Add {cvObjectKey}
      </Button>
    </div>
  )
}

function createNewItem(cvObjectKey: CvObjectKey) {
  switch (cvObjectKey) {
    case "skills":
    case "links": {
      return {
        id: uuidv4(),
        name: "",
        url: "",
      }
    }
    case "languages": {
      return {
        id: uuidv4(),
        name: "",
        level: "beginner",
      }
    }

    case "experiences": {
      return {
        id: uuidv4(),
        company: "",
        position: "",
        location: "",
        description: "",
        date: {
          from: undefined,
          to: undefined,
        },
      }
    }
    case "educations": {
      return {
        id: uuidv4(),
        school: "",
        degree: "",
        description: "",
        date: {
          from: undefined,
          to: undefined,
        },
      }
    }
  }
}

export default MultiAddInput
