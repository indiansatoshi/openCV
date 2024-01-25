import { DateRange } from "react-day-picker"
import { create } from "zustand"

export type TCv = {
  firstName: string
  lastName: string
  roleApplying: string
  description: string
  age: number
  email: string
  phone: string
  address: string
  links: {
    id: string
    name: string
    url: string
  }[]
  skills: {
    id: string
    name: string
  }[]
  experiences: {
    id: string
    company: string
    position: string
    location: string
    description: string
    date: DateRange
  }[]
  educations: {
    id: string
    school: string
    degree: string
    date: DateRange
    description: string
  }[]
  languages: {
    id: string
    name: string
    level: "beginner" | "intermediate" | "advanced" | "proficient"
  }[]
}

export type CvObjectKey = keyof TCv extends infer K
  ? K extends "links" | "skills" | "experiences" | "educations" | "languages"
    ? K
    : never
  : never

export type TExperienceType = TCv["experiences"]
export type TEducationType = TCv["educations"]
export type TLanguageType = TCv["languages"]
export type TLinkType = TCv["links"]
export type TSkillType = TCv["skills"]

const useCVStore = create<
  TCv & {
    resetCV: () => void
    setCV: (cv: TCv) => void
  }
>((set) => ({
  firstName: "",
  lastName: "",
  roleApplying: "",
  description: "",
  age: 0,
  email: "",
  phone: "",
  address: "",
  links: [],
  skills: [],
  experiences: [],
  educations: [],
  languages: [],

  resetCV: () =>
    set({
      firstName: "",
      lastName: "",
      roleApplying: "",
      description: "",
      age: 0,
      email: "",
      phone: "",
      address: "",
      links: [],
      skills: [],
      experiences: [],
      educations: [],
      languages: [],
    }),

  setCV: (cv: Partial<TCv>) => set((state) => ({ ...state, ...cv })),
}))

export default useCVStore
