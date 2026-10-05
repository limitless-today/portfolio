import { FaLinkedinIn } from "react-icons/fa6";
import { MdMailOutline, MdPhone } from "react-icons/md";
import { TbNotes } from "react-icons/tb";
import { profile } from "../data/profile";
import HoverLinks from "./HoverLinks";
import "./styles/SocialIcons.css";
const SocialIcons = () => (
  <div className="icons-section">
    <div className="social-icons" data-cursor="icons" id="social">
      <span><a href={profile.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn"><FaLinkedinIn /></a></span>
      <span><a href={`mailto:${profile.email}`} aria-label="Email Pankaj"><MdMailOutline /></a></span>
      <span><a href={profile.phoneHref} aria-label="Call Pankaj"><MdPhone /></a></span>
    </div>
    <a className="resume-button" href={profile.resume} target="_blank" rel="noreferrer"><HoverLinks text="RESUME" /><span><TbNotes /></span></a>
  </div>
);
export default SocialIcons;
