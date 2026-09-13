const footerLinks = [
  { label: "Instagram", href: "https://instagram.com", external: true },
  { label: "YouTube", href: "https://youtube.com", external: true },
];

function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-container">
        <div className="footer-brand-block">
          <p className="footer-brand">ALWAYS MODEST</p>
          <p className="footer-note">Everyday essentials, thoughtfully chosen.</p>
        </div>

        <div className="footer-column">
          <h2>Download app</h2>
          <a
            className="store-link"
            href="https://apps.apple.com"
            target="_blank"
            rel="noreferrer"
          >
            App Store
          </a>
          <a
            className="store-link"
            href="https://play.google.com/store"
            target="_blank"
            rel="noreferrer"
          >
            Google Play
          </a>
        </div>

        <div className="footer-column">
          <h2>Follow us</h2>
          {footerLinks.map((link) => (
            <a
              key={link.label}
              className="footer-link"
              href={link.href}
              target={link.external ? "_blank" : undefined}
              rel={link.external ? "noreferrer" : undefined}
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>

      <div className="footer-bottom">
        <p>Copyright © {new Date().getFullYear()} Always Modest. All rights reserved.</p>
        <p>Made for everyday living.</p>
      </div>
    </footer>
  );
}

export default Footer;
