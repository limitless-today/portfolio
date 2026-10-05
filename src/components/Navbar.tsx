import { useEffect } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { HiOutlineHome, HiOutlineUser, HiOutlineBriefcase, HiOutlineEnvelope } from "react-icons/hi2";
import { FaLinkedinIn } from "react-icons/fa";
import { gsap } from "gsap";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import "./styles/Navbar.css";

gsap.registerPlugin(ScrollSmoother, ScrollTrigger);
export let smoother: ScrollSmoother;

const Navbar = () => {
  useEffect(() => {
    smoother = ScrollSmoother.create({
      wrapper: "#smooth-wrapper",
      content: "#smooth-content",
      smooth: 1.7,
      speed: 1.7,
      effects: true,
      autoResize: true,
      ignoreMobileResize: true,
    });

    smoother.scrollTop(0);
    smoother.paused(true);

    let links = document.querySelectorAll(".header a[data-href]");
    links.forEach((elem) => {
      let element = elem as HTMLAnchorElement;
      element.addEventListener("click", (e) => {
        if (window.innerWidth > 1024) {
          e.preventDefault();
          let elem = e.currentTarget as HTMLAnchorElement;
          let section = elem.getAttribute("data-href");
          smoother.scrollTo(section, true, "top top");
        }
      });
    });
    window.addEventListener("resize", () => {
      ScrollSmoother.refresh(true);
    });
  }, []);
  return (
    <>
      <nav className="header mac-dock" aria-label="Main navigation">
        <ul>
          <li><a className="dock-icon dock-home" data-href="#landingDiv" href="#landingDiv" aria-label="Home"><HiOutlineHome aria-hidden="true" /><span className="dock-label">Home</span></a></li>
          <li><a className="dock-icon dock-about" data-href="#about" href="#about" aria-label="About"><HiOutlineUser aria-hidden="true" /><span className="dock-label">About</span></a></li>
          <li><a className="dock-icon dock-work" data-href="#work" href="#work" aria-label="Work"><HiOutlineBriefcase aria-hidden="true" /><span className="dock-label">Work</span></a></li>
          <li><a className="dock-icon dock-contact" data-href="#contact" href="#contact" aria-label="Contact"><HiOutlineEnvelope aria-hidden="true" /><span className="dock-label">Contact</span></a></li>
          <li className="dock-divider" aria-hidden="true" />
          <li><a className="dock-icon dock-linkedin" href="https://www.linkedin.com/in/pankajpandey-architect" target="_blank" rel="noreferrer" aria-label="LinkedIn (opens in new tab)"><FaLinkedinIn aria-hidden="true" /><span className="dock-label">LinkedIn ↗</span></a></li>
        </ul>
      </nav>

      <div className="landing-circle1"></div>
      <div className="landing-circle2"></div>
      <div className="nav-fade"></div>
    </>
  );
};

export default Navbar;
