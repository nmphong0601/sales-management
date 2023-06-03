import { FaArrowUp } from "@react-icons/all-files/fa/FaArrowUp";
import { FaFacebookF } from "@react-icons/all-files/fa/FaFacebookF";
import { FaGithub } from "@react-icons/all-files/fa/FaGithub";

const social = [
  {
    name: "facebook",
    url: "https://facebook.com/Zin.Kick",
    icon: <FaFacebookF />,
  },
  {
    name: "github",
    url: "https://github.com/nmphong0601",
    icon: <FaGithub />,
  },
];

const Footer = () => {
  const networks = social.map(function (network) {
    return (
      <li key={network.name}>
        <a href={network.url}>{network.icon}</a>
      </li>
    );
  });

  return (
    <footer>
      <div className="row">
        <div className="twelve columns">
          <ul className="social-links">{networks}</ul>

          <ul className="copyright">
            <li>&copy; Copyright 2023 NMP</li>
            <li>
              Design by{" "}
              <a title="Styleshout" href="http://www.styleshout.com/">
                NMP
              </a>
            </li>
          </ul>
        </div>

        <div id="go-top">
          <a ref={el => {
            if(!el) return;
            el.onclick = e => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: "smooth" });
            }
          }} className="smoothscroll" title="Back to Top" href="#home">
            <FaArrowUp />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
