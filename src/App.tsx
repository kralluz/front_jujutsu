// src/App.tsx
import React, { useContext } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { AccountsProvider, AccountsContext } from "./contexts/AccountsContext";
import { CharactersProvider } from "./contexts/CharactersContext";
import Register from "./components/Register";
import Login from "./components/Login";
import Home from "./components/Home";
import Manager from "./components/Manager";
import { Container } from "@chakra-ui/react";

const App: React.FC = () => {
  return (
    <AccountsProvider>
      <CharactersProvider>
        <Container p={0}>
          <AuthRoutes />
        </Container>
      </CharactersProvider>
    </AccountsProvider>
  );
};

// Custom hook to check authentication
const useAuth = (): boolean => {
  const accountsContext = useContext(AccountsContext);
  if (!accountsContext) return false; // Retorna false se o contexto não estiver disponível

  // Verifica se há um usuário atualmente autenticado
  return accountsContext.currentUser !== null;
};

const AuthRoutes: React.FC = () => {
  const isAuthenticated = useAuth();

  return (
    <Routes>
      <Route
        path="/register"
        element={!isAuthenticated ? <Register /> : <Navigate to="/" />}
      />
      <Route
        path="/session"
        element={!isAuthenticated ? <Login /> : <Navigate to="/" />}
      />
      <Route
        path="/manager"
        element={isAuthenticated ? <Manager /> : <Navigate to="/session" />}
      />
      <Route
        path="/"
        element={isAuthenticated ? <Home /> : <Navigate to="/session" />}
      />
      {/* Adicione outras rotas conforme necessário */}
    </Routes>
  );
};

export default App;
