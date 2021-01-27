import Button from './Button';
import { useLocation } from 'react-router-dom';

const Header = ({ title, onTap, showForm }) => {
  const location = useLocation();
  return (
    <header className="header">
      <h1>{title}</h1>
      {location.pathname === '/' && (
        <Button
          color={showForm ? 'red' : 'green'}
          text={showForm ? 'Close' : 'Add'}
          onClick={onTap}
        />
      )}
    </header>
  );
};

export default Header;
