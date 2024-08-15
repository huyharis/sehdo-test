import React, {useEffect, useState} from 'react';
import {View, TextInput, Button, StyleSheet, Modal, Text} from 'react-native';
import {useTransactions} from './TransactionContext';
import {useBeneficiaryStore} from './store/BeneficiaryStore';
import RNPickerSelect from 'react-native-picker-select';
import {TransactionsModel} from './models/transaction';
import {BeneficiaryModel} from './models/beneficiary';
import {useTransactionStore} from './store/TransactionStore';

const TransactionScreen = ({navigation}) => {
  const [amount, setAmount] = useState('');
  const [name, setName] = useState('');
  const [iban, setIBan] = useState('');
  const [selectedBeneficiary, setSelectedBeneficiary] = useState<any>();
  const [isShowModal, setIsShowModal] = useState(false);
  const {addTransaction}: TransactionsModel = useTransactions();
  const {listBeneficiary} = useBeneficiaryStore();
  const {balance} = useTransactionStore();

  const handleTransaction = () => {
    if (balance < parseFloat(amount)) {
      setIsShowModal(true);
      return;
    }
    const accountDetails: BeneficiaryModel = {
      IBANNumber: listBeneficiary[selectedBeneficiary]?.IBANNumber ?? '',
      firstName: listBeneficiary[selectedBeneficiary]?.firstName ?? '',
      lastName: listBeneficiary[selectedBeneficiary]?.lastName ?? '',
    };
    addTransaction(amount, accountDetails);
    navigation.goBack();
  };

  useEffect(() => {
    console.log('selectedBeneficiary', selectedBeneficiary?.firstName);

    setName(
      `${listBeneficiary[selectedBeneficiary]?.firstName ?? ''} ${
        listBeneficiary[selectedBeneficiary]?.lastName ?? ''
      }`,
    );
    setIBan(listBeneficiary[selectedBeneficiary]?.IBANNumber ?? '');
  }, [listBeneficiary, selectedBeneficiary]);

  const renderModal = () => {
    return (
      <Modal transparent animationType="slide" visible={isShowModal}>
        <View style={styles.modalContainer}>
          <View style={styles.modalView}>
            <Text>Your balance not enough to do this transaction</Text>
            <Button
              title="Ok"
              onPress={() => {
                setIsShowModal(false);
              }}
            />
          </View>
        </View>
      </Modal>
    );
  };

  return (
    <View style={styles.transactionScreenContainer}>
      {renderModal()}
      <View style={styles.inputStyle}>
        <RNPickerSelect
          useNativeAndroidPickerStyle
          onValueChange={value => {
            setSelectedBeneficiary(value);
          }}
          onDonePress={() => {
            setName(
              `${listBeneficiary[selectedBeneficiary]?.firstName} ${listBeneficiary[selectedBeneficiary]?.lastName}`,
            );
            setIBan(listBeneficiary[selectedBeneficiary]?.IBANNumber ?? '');
          }}
          items={listBeneficiary.map((item, index) => ({
            label: `${item.firstName} ${item.lastName}`,
            value: `${index}`,
          }))}
          style={{
            viewContainer: {
              alignSelf: 'flex-start',
              height: '100%',
              width: '100%',
              justifyContent: 'center',
              paddingHorizontal: 8,
            },
          }}
          textInputProps={{
            textAlign: 'left',
          }}
        />
      </View>
      <TextInput
        style={styles.inputStyle}
        onChangeText={setAmount}
        value={amount}
        keyboardType="numeric"
        placeholder="Enter amount"
      />
      <TextInput
        style={styles.inputStyle}
        readOnly
        // value={`${listBeneficiary[selectedBeneficiary].firstName} ${listBeneficiary[selectedBeneficiary].lastName} `}
        value={name}
        placeholder="Recipient Name"
      />
      <TextInput
        style={styles.inputStyle}
        readOnly
        // value={listBeneficiary[selectedBeneficiary].IBANNumber}
        value={iban}
        placeholder="Recipient IBAN"
      />
      <Button title="Submit Transaction" onPress={handleTransaction} />
    </View>
  );
};

const styles = StyleSheet.create({
  transactionScreenContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputStyle: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    width: '80%',
    marginVertical: 8,
    paddingHorizontal: 8,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
});

export default TransactionScreen;
