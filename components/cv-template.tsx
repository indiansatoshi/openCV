import React from "react"
import Link from "next/link"
import useCVStore from "@/store/cv"
import { format } from "date-fns"

import { cn } from "@/lib/utils"

type Props = {}

function CvTemplate({}: Props) {
  const cv = useCVStore((state) => state)

  return (
    <div id="cv" className="space-y-8 w-[56rem] max-w-4xl break-words">
      <div className="text-slate-500 text-center">
        <h1 className="font-serif text-3xl/[200%] font-bold text-slate-600">
          {cv.firstName || "Your"} {cv.lastName || "Name"}
        </h1>
        <p>{cv.roleApplying || "The role you are applying for"}</p>
        <ul className="inline-flex gap-8 list-image-item">
          <li>{cv.phone || "Phone"}</li>
          <li>{cv.email || "Email"}</li>
        </ul>
        <ul className="gap-8 flex items-center justify-center">
          {cv.links.map((l) => (
            <li key={l.id} className="text-blue-500">
              <Link target="_blank" href={l.url}>
                {l.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <div className="w-full">
        <h2
          className={cn(
            "text-center font-serif text-slate-900 text-2xl font-bold relative",
            "after:absolute after:w-full after:h-0.5 after:inset-0 after:[top:calc(100%+4px)] after:bg-slate-900"
          )}
        >
          Summary
        </h2>
        <p className="pt-8 text-slate-500 text-base/7 text-pretty">
          {cv.description ||
            "Write a short summary about yourself and what makes you a good fit for the role you are applying for."}
        </p>
      </div>
      <div className="w-full">
        <h2
          className={cn(
            "text-center font-serif text-slate-900 text-2xl font-bold relative",
            "after:absolute after:w-full after:h-0.5 after:inset-0 after:[top:calc(100%+4px)] after:bg-slate-900"
          )}
        >
          Skills
        </h2>
        <ul className="pt-8 text-slate-500 text-base/7 text-pretty inline-flex flex-wrap gap-x-8 gap-y-4 list-inside list-disc">
          {cv.skills.length > 0 ? (
            cv.skills.map((skill) => <li key={skill.id}>{skill.name}</li>)
          ) : (
            <>
              <li>Skill 1</li>
              <li>Skill 2</li>
              <li>Skill 3</li>
              <li>Skill 4</li>
            </>
          )}
        </ul>
      </div>
      <div className="w-full">
        <h2
          className={cn(
            "text-center font-serif text-slate-900 text-2xl font-bold relative",
            "after:absolute after:w-full after:h-0.5 after:inset-0 after:[top:calc(100%+4px)] after:bg-slate-900"
          )}
        >
          Experience
        </h2>
        <div className="jobs pt-8 space-y-8">
          {cv.experiences.length > 0 ? (
            cv.experiences.map((exp) => {
              return (
                <div className="job space-y-2" key={exp.id}>
                  <div className="flex justify-between text-slate-600">
                    <p className="text-xl">{exp.company || "Your Company"}</p>
                    <p>{exp.location}</p>
                  </div>
                  <div className="flex justify-between text-slate-600">
                    <p>{exp.position}</p>
                    <p>
                      {exp?.date?.from &&
                        exp.date.to &&
                        format(exp.date.from, "MMM yyyy") +
                          " - " +
                          format(exp.date.to, "MMM yyyy")}
                    </p>
                  </div>
                  <p className="text-slate-700 text-base/7 list-disc">
                    {exp.description || "What did you do here?"}
                  </p>
                </div>
              )
            })
          ) : (
            <div className="job space-y-2">
              <div className="flex justify-between text-slate-600">
                <p className="text-xl">Company</p>
                <p>Location</p>
              </div>
              <div className="flex justify-between text-slate-600">
                <p>Position</p>
                <p>Date</p>
              </div>
              <p className="text-slate-700 text-base/7 list-desc">
                Write a short description about your experience here and your
                most important achievements.
              </p>
            </div>
          )}
        </div>
      </div>
      <div className="w-full">
        <h2
          className={cn(
            "text-center font-serif text-slate-900 text-2xl font-bold relative",
            "after:absolute after:w-full after:h-0.5 after:inset-0 after:[top:calc(100%+4px)] after:bg-slate-900"
          )}
        >
          Education
        </h2>
        <div className="educations pt-8 space-y-8">
          {cv.educations.length > 0 ? (
            cv.educations.map((edu) => {
              return (
                <div className="education space-y-2" key={edu.id}>
                  <div className="flex justify-between text-slate-600">
                    <p className="text-xl">{edu.school || "Your School"}</p>
                  </div>
                  <div className="flex justify-between text-slate-600">
                    <p>{edu.degree}</p>
                    <p>
                      {edu?.date?.from &&
                        edu.date.to &&
                        format(edu.date.from, "MMM yyyy") +
                          " - " +
                          format(edu.date.to, "MMM yyyy")}
                    </p>
                  </div>
                  <p className="text-slate-700 text-base/7 list-disc">
                    {edu.description || "What did you do here?"}
                  </p>
                </div>
              )
            })
          ) : (
            <div className="education space-y-2">
              <div className="flex justify-between text-slate-600">
                <p className="text-xl">School</p>
              </div>
              <div className="flex justify-between text-slate-600">
                <p>Degree</p>
                <p>Date</p>
              </div>
              <p className="text-slate-700 text-base/7">
                Write a short description about your education here and your
                most important achievements.
              </p>
            </div>
          )}
        </div>
      </div>
      <div className="w-full">
        <h2
          className={cn(
            "text-center font-serif text-slate-900 text-2xl font-bold relative",
            "after:absolute after:w-full after:h-0.5 after:inset-0 after:[top:calc(100%+4px)] after:bg-slate-900"
          )}
        >
          Languages
        </h2>
        <ul className="pt-8 text-slate-500 text-base/7 text-pretty gap-20">
          {cv.languages.length > 0 ? (
            cv.languages.map((lang) => (
              <li
                className="flex flex-row justify-between capitalize"
                key={lang.id}
              >
                <p>{lang.name}</p>
                <p>{lang.level}</p>
              </li>
            ))
          ) : (
            <>
              <li className="flex flex-row justify-between">
                <p>Language</p>
                <p>Level</p>
              </li>
              <li className="flex flex-row justify-between">
                <p>Language</p>
                <p>Level</p>
              </li>
            </>
          )}
        </ul>
      </div>
    </div>
  )
}

export default CvTemplate
