import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/login';
  };

  const token = localStorage.getItem('token');

  return (
    <nav
      style={{
        padding: '1rem 2rem',
        background: '#646cff',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '1rem',
        borderRadius: '0 0 12px 12px',
        color: '#fff',
      }}
    >
      <Link to="/" style={{ color: '#fff', fontWeight: 600 }}>Home</Link>
      <Link to="/produtos/criar" style={{ color: '#fff', fontWeight: 600 }}>Criar Produto</Link>
      {token ? (
        <button
          onClick={handleLogout}
          style={{
            background: '#fff',
            color: '#646cff',
            border: 'none',
            borderRadius: '6px',
            padding: '0.5rem 1rem',
            fontWeight: 600,
            cursor: 'pointer',
          }}
        >
          Logout
        </button>
      ) : (
        <>
          <Link to="/login" style={{ color: '#fff', fontWeight: 600 }}>Login</Link>
          <Link to="/signup" style={{ color: '#fff', fontWeight: 600 }}>Cadastro</Link>
        </>
      )}
    </nav>
  );
};

export default Navbar;