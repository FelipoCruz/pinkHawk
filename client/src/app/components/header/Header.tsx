import './header.scss';

function Header() {
  return (
    <header className="container header">
      <a href="./">
        <img alt="home logo" className="logo" />
      </a>
      <nav>
        <ul className="header_items">
          <button className="btn">Signup</button>
          <button className="btn">Login</button>
        </ul>
      </nav>
      <button className="menu">
        <img alt="icon menu" />
      </button>
    </header>
  );
}

export default Header;
