import { certifications, skills } from "../data/profile";
import "./styles/Expertise.css";
import SkillAnimation from "./SkillAnimation";
import TechnicalMap from "./TechnicalMap";
import SkillsKeyboard from "./SkillsKeyboard";
const TechStack = () => (
  <section className="expertise-section section-container" aria-labelledby="expertise-title">
    <h2 id="expertise-title">Technology & <span>credentials</span></h2>
    <TechnicalMap />
    <SkillsKeyboard />
    <SkillAnimation />
    <div className="expertise-grid">{skills.map((skill) => <article key={skill.title}><h3>{skill.title}</h3><p>{skill.items}</p></article>)}</div>
    <h3 className="credentials-title">Certifications</h3>
    <ul className="credentials-list">{certifications.map((item) => <li key={item}>{item}</li>)}</ul>
  </section>
);
export default TechStack;
