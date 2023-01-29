import Button from '../button/Button';
import './header.scss';

function Header() {
  return (
    <header className="container header">
      <a href="./">
        <img alt="home logo" className="logo" />
      </a>
      <nav className="header_items">
        <Button
          isLoading={false}
          text={'Logout'}
          type={'btn-inverted btn-hidden'}
        />
        <Button text={'Sign up'} />
        <Button text={'Sign in'} type={'btn-inverted'} />
      </nav>
      <button className="menu">
        <img alt="icon menu" />
      </button>
    </header>
  );
}

export default Header;
