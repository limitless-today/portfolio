import { MdArrowOutward } from "react-icons/md";
import { profile } from "../data/profile";
import "./styles/Contact.css";
const Contact = () => (
  <div className="contact-section section-container" id="contact"><div className="contact-container">
    <h3>Let’s connect</h3><div className="contact-flex">
      <div className="contact-box"><h4>Contact</h4>
        <p>{profile.location}</p><p><a href={`mailto:${profile.email}`} data-cursor="disable">{profile.email}</a></p>
        <p><a href={profile.phoneHref} data-cursor="disable">{profile.phone}</a></p>
        <a href={profile.linkedin} target="_blank" rel="noreferrer" data-cursor="disable" className="contact-social">LinkedIn <MdArrowOutward /></a>
        <a href={profile.resume} target="_blank" rel="noreferrer" data-cursor="disable" className="contact-social">View résumé <MdArrowOutward /></a>
      </div>
      <div className="contact-box"><h4>Education</h4>
        <p>Master of Computer Application · Maharshi Dayanand University</p>
        <p>M.Sc. Computer Science · Maharshi Dayanand University</p>
        <p>Diploma in Advanced Computing · ACTS, C-DAC Pune</p>
        <p>PG Diploma in Computer Science · Pt. Ravishankar Shukla University</p>
      </div>
      <div className="contact-box"><h2><span>{profile.name}</span><br />Cloud, AI & Enterprise Architecture</h2>
      </div>
    </div>
  </div></div>
);
export default Contact;
