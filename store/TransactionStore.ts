import {create} from 'zustand';
import {createJSONStorage, persist} from 'zustand/middleware';
import {TransactionModel} from '../models/transaction';
import AsyncStorage from '@react-native-async-storage/async-storage';

type State = {
  transactions: TransactionModel[];
  balance: number;
};

type Action = {
  saveTransaction: (newTransaction: TransactionModel) => void;
  calculateBalance: (balance: number) => void;
};

export const useTransactionStore = create(
  persist<State & Action>(
    (set, get) => ({
      transactions: [],
      balance: 1000,
      saveTransaction: (newTransaction: TransactionModel) =>
        set({transactions: get().transactions.concat(newTransaction)}),
      calculateBalance: (newBalance: number) => {
        set({balance: get().balance - newBalance});
      },
    }),
    {
      name: 'transaction-storage', // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
