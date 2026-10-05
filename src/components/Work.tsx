import { useEffect, useRef, useState } from "react";
import { MdAutoAwesome, MdStorage, MdCloudQueue, MdShoppingCart, MdPeopleOutline, MdEventAvailable, MdArrowForward, MdClose } from "react-icons/md";
import { projects } from "../data/profile";
import "./styles/Work.css";
import "./styles/TechnicalWork.css";

const icons = [MdAutoAwesome, MdStorage, MdShoppingCart, MdPeopleOutline, MdCloudQueue, MdEventAvailable];
const Work = () => {
  const [selected, setSelected] = useState<number | null>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const opener = useRef<HTMLButtonElement | null>(null);
  useEffect(() => {
    if (selected !== null) dialog.current?.showModal();
  }, [selected]);
  const project = selected === null ? null : projects[selected];
  return (
    <section className="work-section technical-work" id="work" aria-labelledby="selected-work-heading">
      <div className="work-container section-container" id="selected-work">
        <p className="work-eyebrow">PROJECTS & ENGINEERING</p>
        <h2 id="selected-work-heading">Selected <span>Work</span></h2>
        <p className="work-intro">Architecture in practice. Explore the platforms, decisions and outcomes behind my work.</p>
        <div className="work-tile-grid">
          {projects.map((item, index) => {
            const Icon = icons[index];
            return <button className="work-tile" key={item.title} aria-haspopup="dialog" onClick={(event) => { opener.current = event.currentTarget; setSelected(index); }}>
              <span className="work-tile-top"><Icon aria-hidden="true" /><span>0{index + 1}</span></span>
              <h3>{item.title}</h3>
              <p>{item.category}</p>
              <span className="work-tile-metric"><strong>{item.metric}</strong> {item.outcome}</span>
              <span className="work-tile-action">Explore project <MdArrowForward aria-hidden="true" /></span>
            </button>;
          })}
        </div>
      </div>
      <dialog ref={dialog} className="work-detail-dialog" aria-labelledby="work-detail-title" onClose={() => { setSelected(null); opener.current?.focus(); }} onClick={(event) => { if (event.target === event.currentTarget) dialog.current?.close(); }}>
        {project && <div className="work-detail-content">
          <button className="work-detail-close" aria-label="Close project details" onClick={() => dialog.current?.close()} autoFocus><MdClose /></button>
          <p className="work-eyebrow">{project.category}</p>
          <h2 id="work-detail-title">{project.title}</h2>
          <div className="work-detail-metric"><strong>{project.metric}</strong><span>{project.outcome}</span></div>
          <h3>Engineering & impact</h3><p>{project.detail}</p>
          <h3>Technology stack</h3><ul className="work-stack">{project.tools.split(" · ").map((tool) => <li key={tool}>{tool}</li>)}</ul>
        </div>}
      </dialog>
    </section>
  );
};
export default Work;
