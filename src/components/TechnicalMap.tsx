import { useState } from "react";
import { skills } from "../data/profile";
import { MdCloudQueue, MdAutoAwesome, MdCode, MdAccountTree } from "react-icons/md";
import "./styles/TechnicalWork.css";
const icons = [MdCloudQueue, MdAutoAwesome, MdCode, MdAccountTree];
export default function TechnicalMap() {
  const [active, setActive] = useState(0);
  const skill = skills[active];
  const Icon = icons[active];
  return <section className="technical-map" aria-labelledby="technical-map-title">
    <div className="technical-map-header"><div><p className="work-eyebrow">CONNECTED EXPERTISE</p><h3 id="technical-map-title">Explore my technical world.</h3></div><p>Select a domain to explore its technologies.</p></div>
    <div className="technical-map-body">
      <div className="map-root"><MdAccountTree aria-hidden="true" /><strong>Pankaj Kumar Pandey</strong><span>Cloud, AI & Enterprise Architecture</span></div>
      <div className="map-domains" role="group" aria-label="Technical domains">{skills.map((item, index) => { const DomainIcon = icons[index]; return <button key={item.title} aria-pressed={active === index} onClick={() => setActive(index)}><DomainIcon aria-hidden="true" /><span>{item.title}</span></button>; })}</div>
      <div className="map-detail" aria-live="polite" aria-atomic="true"><Icon aria-hidden="true" /><h4>{skill.title}</h4><ul>{skill.items.split(" · ").map((item) => <li key={item}>{item}</li>)}</ul></div>
    </div>
  </section>;
}
