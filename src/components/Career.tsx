import "./styles/Career.css";
import { experience } from "../data/profile";
const Career = () => (
  <div className="career-section section-container"><div className="career-container">
    <h2>My career <span>&</span><br /> experience</h2>
    <div className="career-info">
      <div className="career-timeline"><div className="career-dot" /></div>
      {experience.map((item) => <div className="career-info-box" key={item.company}>
        <div className="career-info-in"><div className="career-role"><h4>{item.role}</h4><h5>{item.company}</h5></div></div>
        <p>{item.detail}</p>
      </div>)}
    </div>
  </div></div>
);
export default Career;
