// src/contexts/AccountsContext.tsx
import React, { createContext, useState, useEffect, ReactNode } from "react";

interface Account {
  id: number;
  user: string;
  password: string;
}

interface AccountsContextType {
  accounts: Account[];
  currentUser: Account | null;
  createAccount: (user: string, password: string) => void;
  readAccounts: () => Account[];
  updateAccount: (
    id: number,
    updatedUser: string,
    updatedPassword: string
  ) => void;
  deleteAccount: (id: number) => void;
  login: (user: string, password: string) => boolean;
  logout: () => void;
}

export const AccountsContext = createContext<AccountsContextType | undefined>(
  undefined
);

interface AccountsProviderProps {
  children: ReactNode;
}

export const AccountsProvider: React.FC<AccountsProviderProps> = ({
  children,
}) => {
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [currentUser, setCurrentUser] = useState<Account | null>(null);

  // Carregar contas e usuário atual do localStorage ao montar
  useEffect(() => {
    const storedAccounts = localStorage.getItem("accounts");
    if (storedAccounts) {
      setAccounts(JSON.parse(storedAccounts));
    }

    const storedCurrentUser = localStorage.getItem("currentUser");
    if (storedCurrentUser) {
      setCurrentUser(JSON.parse(storedCurrentUser));
    }
  }, []);

  // Atualizar localStorage sempre que as contas mudarem
  useEffect(() => {
    localStorage.setItem("accounts", JSON.stringify(accounts));
  }, [accounts]);

  // Atualizar localStorage sempre que o usuário atual mudar
  useEffect(() => {
    if (currentUser) {
      localStorage.setItem("currentUser", JSON.stringify(currentUser));
    } else {
      localStorage.removeItem("currentUser");
    }
  }, [currentUser]);

  // Criar uma nova conta
  const createAccount = (user: string, password: string) => {
    const newAccount: Account = { id: Date.now(), user, password };
    setAccounts([...accounts, newAccount]);
  };

  // Ler todas as contas
  const readAccounts = (): Account[] => {
    return accounts;
  };

  // Atualizar uma conta existente
  const updateAccount = (
    id: number,
    updatedUser: string,
    updatedPassword: string
  ) => {
    setAccounts(
      accounts.map((account) =>
        account.id === id
          ? { ...account, user: updatedUser, password: updatedPassword }
          : account
      )
    );
  };

  // Deletar uma conta
  const deleteAccount = (id: number) => {
    setAccounts(accounts.filter((account) => account.id !== id));
    // Se a conta deletada for o usuário atual, deslogar
    if (currentUser && currentUser.id === id) {
      logout();
    }
  };

  // Função de login
  const login = (user: string, password: string): boolean => {
    const account = accounts.find(
      (acc) => acc.user === user && acc.password === password
    );
    if (account) {
      setCurrentUser(account);
      return true;
    } else {
      return false;
    }
  };

  // Função de logout
  const logout = () => {
    setCurrentUser(null);
  };

  return (
    <AccountsContext.Provider
      value={{
        accounts,
        currentUser,
        createAccount,
        readAccounts,
        updateAccount,
        deleteAccount,
        login,
        logout,
      }}
    >
      {children}
    </AccountsContext.Provider>
  );
};
