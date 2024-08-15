import {create} from 'zustand';
import {BeneficiaryModel} from '../models/beneficiary';
import {createJSONStorage, persist} from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

type State = {
  listBeneficiary: BeneficiaryModel[];
};

type Action = {
  addBeneficiary: (newBeneficiary: BeneficiaryModel) => void;
};
(set: (arg0: (state: any) => {listBeneficiary: any}) => any) => ({
  listBeneficiary: [],
  addBeneficiary: (newBeneficiary: any) =>
    set((state: {listBeneficiary: string | any[]}) => ({
      listBeneficiary: state.listBeneficiary.concat(newBeneficiary),
    })),
});
export const useBeneficiaryStore = create(
  persist<State & Action>(
    (set, get) => ({
      listBeneficiary: [],
      addBeneficiary: (newBeneficiary: BeneficiaryModel) =>
        set({listBeneficiary: get().listBeneficiary.concat(newBeneficiary)}),
    }),
    {
      name: 'beneficiary-storage', // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
