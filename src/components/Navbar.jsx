import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

export default function Navbar() {
  const { logout, user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login', { replace: true });
  };

  return (
    <nav className="navbar">
      <span>Student Directory</span>
      <span className="nav-right">
        {user?.email && <span className="nav-email">{user.email}</span>}
        <button onClick={handleLogout}>Logout</button>
      </span>
    </nav>
  );
}