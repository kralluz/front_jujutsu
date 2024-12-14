// src/App.tsx
import { CharactersProvider } from "../contexts/CharactersContext";
import { Container } from "@chakra-ui/react";
import React, { useContext } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Register from "./Register";
import Login from "./Login";
import Manager from "./Manager";
import Home from "./Home";
import { AccountsContext, AccountsProvider } from "@/contexts/AccountsContext";

const App: React.FC = () => {
  return (
    <AccountsProvider>
      <CharactersProvider>
        <Router>
          <Container maxW="container.md" p={4}>
            <Routes>
              <Route
                path="/register"
                element={!useAuth() ? <Register /> : <Navigate to="/" />}
              />
              <Route
                path="/session"
                element={!useAuth() ? <Login /> : <Navigate to="/" />}
              />
              <Route
                path="/manager"
                element={useAuth() ? <Manager /> : <Navigate to="/session" />}
              />
              <Route
                path="/"
                element={useAuth() ? <Home /> : <Navigate to="/session" />}
              />
            </Routes>
          </Container>
        </Router>
      </CharactersProvider>
    </AccountsProvider>
  );
};

// Hook personalizado para verificar autenticação
const useAuth = (): boolean => {
  // Aqui você deve implementar a lógica real de autenticação.
  // Por enquanto, retornaremos false para não autenticado.
  // Você pode usar o contexto de contas para verificar se o usuário está logado.
  const accountsContext = useContext(AccountsContext);
  if (!accountsContext) return false;

  // Exemplo simplificado: verifica se há pelo menos uma conta cadastrada
  return accountsContext.accounts.length > 0;
};

export default App;
