import {BeneficiaryModel} from './beneficiary';

export interface TransactionsModel {
  transactions: TransactionModel[];
  addTransaction: (amount: string, account: BeneficiaryModel) => void;
  balance: number;
}

export interface TransactionModel {
  id: number;
  amount: string;
  account?: BeneficiaryModel;
}
