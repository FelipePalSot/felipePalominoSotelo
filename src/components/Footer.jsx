export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer__grid">
        <p>&copy; <span id="y">{new Date().getFullYear()}</span> LimpiezaPro</p>
        <nav className="footer__nav">
          <a href="#">Términos</a>
          <a href="#">Privacidad</a>
        </nav>
      </div>
    </footer>
  );
}
