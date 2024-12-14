import React, { useContext, useState } from "react";
import { AccountsContext } from "../contexts/AccountsContext";

const AccountsManager: React.FC = () => {
  const accountsContext = useContext(AccountsContext);

  if (!accountsContext) {
    return null;
  }

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Account</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {accountsContext.accounts.map((account: any, index: any) => (
            <tr key={index}>
              <td>{account.name}</td>
              <td>
                <button>Edit</button>
                <button>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        <input type="text" placeholder="New account name" />
        <button>Add Account</button>
      </div>
    </div>
  );
};

export default AccountsManager;
