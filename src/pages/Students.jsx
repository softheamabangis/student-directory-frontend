import { useEffect, useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import Navbar from '../components/Navbar';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

export default function Students() {
  const { token, logout } = useAuth();
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let cancelled = false;

    async function fetchStudents() {
      setLoading(true);
      setError('');
      try {
        const res = await fetch(`${API_URL}/api/students`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (res.status === 401) {
          // Token expired or invalid — clear session and return to login
          logout();
          return;
        }
        if (!res.ok) throw new Error(`Request failed (${res.status})`);

        const data = await res.json();
        if (!cancelled) setStudents(data);
      } catch (err) {
        if (!cancelled) setError(err.message || 'Could not load students.');
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    fetchStudents();
    return () => {
      cancelled = true;
    };
  }, [token, logout]);

  return (
    <>
      <Navbar />
      <main className="students-container">
        <h2>Students</h2>
        {loading && <p>Loading students…</p>}
        {error && <p className="error">{error}</p>}
        {!loading && !error && students.length === 0 && (
          <p>No students found.</p>
        )}
        {!loading && !error && students.length > 0 && (
          <ul className="student-list">
            {students.map((s) => (
              <li key={s._id || s.id || s.email} className="student-item">
                <strong>{s.name || s.username || 'Unnamed'}</strong>
                <span>{s.email}</span>
              </li>
            ))}
          </ul>
        )}
      </main>
    </>
  );
}