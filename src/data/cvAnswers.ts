import { certifications, experience, profile, projects, skills } from "./profile";

const topics = [
  { words: "hello hi hey who about background summary introduce overview pankaj experience years", answer: `${profile.name} is a London-based solution architect and principal engineer with over 20 years of experience in enterprise digital transformation. His focus includes multi-cloud architecture, AI/ML, data platforms and cybersecurity.`, source: "Profile overview" },
  { words: "cloud aws azure gcp google oracle oci multicloud platforms kubernetes terraform infrastructure", answer: `Pankaj works across AWS, Microsoft Azure, Google Cloud and Oracle Cloud Infrastructure. His toolkit includes Kubernetes, Docker and Terraform. He led migration of 35 legacy Microsoft applications to AWS, reducing infrastructure costs by 40% and improving scalability by 50%.`, source: "Cloud expertise and migration project" },
  { words: "ai ml artificial intelligence rag llm genai generative cocounsel assistant machine learning python retrieval", answer: `${projects[0].detail} His AI toolkit includes Azure OpenAI, Vertex AI, SageMaker and LlamaIndex, with experience in retrieval-augmented generation and enterprise AI assistants.`, source: "CoCounsel and AI expertise" },
  { words: "data lake platform bigquery snowflake kafka dbt airflow analytics database ingestion", answer: `${projects[1].detail} Technologies include ${projects[1].tools}.`, source: "Enterprise Data Platform" },
  { words: "career employment employer work worked company companies thomson reuters tcs tata bloomberg cmc roles history", answer: experience.map((item) => `${item.role} — ${item.company}. ${item.detail}`).join("\n\n"), source: "Career history from the supplied CV" },
  { words: "projects achievement achievements impact results outcomes delivered commerce customer success transformation", answer: projects.slice(0, 5).map((item) => `${item.title}: ${item.metric} ${item.outcome}. ${item.detail}`).join("\n\n"), source: "Selected project outcomes" },
  { words: "certification certifications certified credentials qualifications togaf certificates", answer: certifications.join("\n\n"), source: "Certifications listed in the CV; current validity not verified" },
  { words: "skills tools technology technologies stack programming languages engineering integration apigee boomi devops security", answer: skills.map((item) => `${item.title}: ${item.items}`).join("\n\n"), source: "Technical expertise" },
  { words: "education degree university college masters mca study studied academic", answer: "Master of Computer Application, Maharshi Dayanand University.\n\nM.Sc. Computer Science, Maharshi Dayanand University.\n\nDiploma in Advanced Computing, ACTS, C-DAC Pune.\n\nPG Diploma in Computer Science, Pt. Ravishankar Shukla University.", source: "Education" },
  { words: "contact email phone linkedin reach connect location based london resume cv download hire", answer: `Pankaj is based in ${profile.location}.\n\nEmail: ${profile.email}\nPhone: ${profile.phone}\n\nUse the résumé and LinkedIn links below for his full background or to get in touch.`, source: "Contact details" },
  { words: "leadership team teams manage managed management architects mentoring lead led", answer: "Pankaj led a global team of 30+ technical architects and a $290M digital transformation consolidating 245+ platforms. His CV highlights stakeholder management, mentoring, architectural governance and aligning technology with business strategy.", source: "Leadership and career highlights" },
];

export function answerFromCV(question: string): { answer: string; source: string } {
  const normalized = question.toLowerCase().replace(/[^a-z0-9]+/g, " ");
  // These require current/private information or subjective judgments, not keyword guesses.
  if (/\b(salary|rate|rates|available|availability|visa|sponsor|sponsorship|married|age|address|current|currently|today|tomorrow|best|better|recommend|ignore|instructions|prompt)\b/.test(normalized)) {
    return { answer: "I can’t confirm that from this CV. Please contact Pankaj directly for current availability, personal details or advice. I can help with his documented experience, skills, projects, education and certifications.", source: "Not confirmed in the portfolio knowledge base" };
  }
  const tokens = new Set(normalized.trim().split(/\s+/));
  const ranked = topics.map((topic) => ({ ...topic, score: topic.words.split(" ").reduce((total, word) => total + (tokens.has(word) ? (["pankaj", "experience", "work", "about"].includes(word) ? 0.2 : 1) : 0), 0) })).sort((a, b) => b.score - a.score);
  if (!ranked[0].score) return { answer: "I don’t have a CV-based answer to that question. Try asking about cloud architecture, AI projects, career history, certifications, education or contact details.", source: "Outside the CV knowledge base" };
  return { answer: ranked[0].answer, source: ranked[0].source };
}
