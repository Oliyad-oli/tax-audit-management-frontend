import { Link } from 'react-router-dom';

function SimpleNav() {
  return (
    <nav style={{
      backgroundColor: '#1e40af',
      padding: '1rem',
      display: 'flex',
      justifyContent: 'center',
      gap: '2rem'
    }}>
      <Link to="/" style={{ color: 'white', textDecoration: 'none', fontSize: '1.1rem' }}>Home</Link>
      <Link to="/about" style={{ color: 'white', textDecoration: 'none', fontSize: '1.1rem' }}>About</Link>
      <Link to="/services" style={{ color: 'white', textDecoration: 'none', fontSize: '1.1rem' }}>Services</Link>
      <Link to="/contact" style={{ color: 'white', textDecoration: 'none', fontSize: '1.1rem' }}>Contact</Link>
    </nav>
  );
}

export default SimpleNav;