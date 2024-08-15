import React, {createContext, useState, useContext, useEffect} from 'react';
import {TransactionModel, TransactionsModel} from './models/transaction';
import {useTransactionStore} from './store/TransactionStore';

const TransactionContext = createContext<TransactionsModel>({
  transactions: [],
  addTransaction: () => {},
  balance: 0,
});

export const useTransactions = () => useContext(TransactionContext);

export const TransactionProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [transactions, setTransactions] = useState<TransactionModel[]>([]);
  const {saveTransaction, calculateBalance} = useTransactionStore();
  const [balance, setBalance] = useState(0);
  const {transactions: transactionData, balance: balanceData} =
    useTransactionStore();

  useEffect(() => {
    setTransactions(transactionData);
    setBalance(balanceData);
  }, [transactionData, balanceData]);

  const addTransaction = async (amount: string, account: any) => {
    try {
      const newTransaction = {
        id: Date.now(),
        amount,
        account,
      };
      setTransactions(prevTransactions => [
        ...prevTransactions,
        newTransaction,
      ]);
      setBalance(prevBalance => prevBalance - parseFloat(amount));

      saveTransaction(newTransaction);
      calculateBalance(parseFloat(amount));
    } catch (e) {}
  };

  return (
    <TransactionContext.Provider
      value={{transactions, addTransaction, balance}}>
      {children}
    </TransactionContext.Provider>
  );
};
