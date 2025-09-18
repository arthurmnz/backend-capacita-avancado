import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = () => {
  const token = localStorage.getItem('token');

  // Se não há token, redireciona para a página de login
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // Se há um token, renderiza o conteúdo da rota aninhada (a página protegida)
  return <Outlet />;
};

export default ProtectedRoute;
