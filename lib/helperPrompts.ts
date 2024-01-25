import { TCv } from "@/store/cv"

export function getSummaryPrompt(
  cv: TCv,
  type: "summary" | "jobDescription" | "educationDescription"
) {
  let prompt = ""

  if (cv.roleApplying) {
    prompt += `Role Applying For: ${cv.roleApplying}\n`
  }

  if (cv.skills.length > 0) {
    prompt += `Skills:`
    cv.skills.forEach((skill, i) => {
      prompt += `${skill.name}${i === cv.skills.length - 1 ? "." : ","}`
    })
    prompt += `\n`
  }

  if (cv.experiences.length > 0) {
    prompt += `Experiences:\n`
    cv.experiences.forEach((experience) => {
      prompt += `${experience.position} at ${experience.company} from ${experience.date.from} to ${experience.date.to}\n`
    })
  }

  if (cv.educations.length > 0) {
    prompt += `Educations:\n`
    cv.educations.forEach((education) => {
      prompt += `${education.degree} at ${education.school} from ${education.date.from} to ${education.date.to}\n`
    })
  }

  if (cv.languages.length > 0) {
    prompt += `Languages:\n`
    cv.languages.forEach((language) => {
      prompt += `${language.name} at ${language.level}\n`
    })
  }

  if (cv.description) {
    prompt += `Description:\n`
    prompt += `${cv.description}\n`
  }

  if (type === "summary") {
    prompt += `Based on the information above, please write a summary description for this user for this CV. Use first person and write in a professional tone. There might be instances where the user already started writing something so it is your job to continue where he left of and do an amazing job.\n`
    prompt += `Do not fixate as much about previous companies and abstract his experience based on all his job experiences.\n`
    prompt += `Keep the summary short and concise and do not go over 3-4 paragraphs.\n`
  }

  if (type === "jobDescription") {
    prompt += `Based on the information above, please write a job description for this user for this CV. Use first person and write in a professional tone. There might be instances where the user already started writing something so it is your job to continue where he left of and do an amazing job.\n`
    prompt += `Do not fixate as much about previous companies and abstract his experience based on all his job experiences.\n`
  }

  if (type === "educationDescription") {
    prompt += `Based on the information above, please write an education description for this user for this CV. Use first person and write in a professional tone. There might be instances where the user already started writing something so it is your job to continue where he left of and do an amazing job.\n`
    prompt += `Do not fixate as much about previous companies and abstract his experience based on all his job experiences.\n`
  }

  prompt += `Response: `

  return prompt
}
