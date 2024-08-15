import {View, TextInput, Button, StyleSheet, Modal, Text} from 'react-native';
import React, {useState} from 'react';
import {useBeneficiaryStore} from './store/BeneficiaryStore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {electronicFormatIBAN, ValidationErrorsIBAN} from 'ibantools';

const Beneficiary = ({navigation}) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [iban, setIban] = useState('');
  const [error, setError] = useState('');
  const [showModal, setShowModal] = useState(false);

  const {listBeneficiary, addBeneficiary} = useBeneficiaryStore();

  const ibantools = require('ibantools');
  // 'NL91ABNA0517164300'

  const _onSubmit = async () => {
    const formatIban = electronicFormatIBAN(iban);
    try {
      if (ibantools.isValidIBAN(formatIban)) {
        addBeneficiary({
          IBANNumber: iban,
          firstName: firstName,
          lastName: lastName,
        });
        AsyncStorage.setItem(
          'BeneficiariesData',
          JSON.stringify(listBeneficiary),
        );
        navigation.goBack();
        return;
      } else {
        const errorCodes = ibantools.validateIBAN(iban).errorCodes;
        setError(`${ValidationErrorsIBAN[errorCodes]}`);
        setShowModal(true);
      }
    } catch (e) {
      setShowModal(true);
      console.log('error', e);
    }
  };

  const renderModal = () => {
    return (
      <Modal transparent animationType="slide" visible={showModal}>
        <View style={styles.modalContainer}>
          <View style={styles.modalView}>
            <Text>{error}</Text>
            <Button
              title="Ok"
              onPress={() => {
                setShowModal(false);
              }}
            />
          </View>
        </View>
      </Modal>
    );
  };

  return (
    <View style={styles.beneficiaryScreenContainer}>
      {renderModal()}
      <TextInput
        style={styles.inputStyle}
        onChangeText={setIban}
        value={iban}
        placeholder="IBAN Number"
      />
      <TextInput
        style={styles.inputStyle}
        onChangeText={setFirstName}
        value={firstName}
        placeholder="First name"
      />
      <TextInput
        style={styles.inputStyle}
        onChangeText={setLastName}
        value={lastName}
        placeholder="Last name"
      />
      <Button title="Submit" onPress={_onSubmit} />
    </View>
  );
};

const styles = StyleSheet.create({
  beneficiaryScreenContainer: {
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

export default Beneficiary;
