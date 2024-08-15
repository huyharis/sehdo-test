import React from 'react';
import {
  View,
  Text,
  Button,
  FlatList,
  StyleSheet,
  ListRenderItemInfo,
} from 'react-native';
import {TransactionModel} from './models/transaction';
import {useTransactionStore} from './store/TransactionStore';

const HomeScreen = ({navigation}) => {
  // const {transactions, balance} = useTransactions();
  const {transactions, balance} = useTransactionStore();

  const renderItem = ({item}: ListRenderItemInfo<TransactionModel>) => {
    console.log('🚀 ~ renderItem ~ item:', item);
    return (
      <View style={styles.item}>
        <Text style={styles.itemText}>Transaction ID: {item.id}</Text>
        <Text style={styles.itemText}>
          Amount: ${parseFloat(item.amount).toFixed(2)}
        </Text>
        {item.account && (
          <>
            <Text style={styles.itemText}>
              To: {`${item.account.firstName} ${item.account.lastName}`}
            </Text>
            <Text style={styles.itemText}>IBAN: {item.account.IBANNumber}</Text>
          </>
        )}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.balanceText}>
        Current Balance: ${balance.toFixed(2)}
      </Text>
      <View style={styles.buttonContainer}>
        <Button
          title="Add Transaction"
          onPress={() => navigation.navigate('Transaction')}
        />
        <Button
          title="Create Beneficaiary"
          onPress={() => navigation.navigate('Beneficiary')}
        />
      </View>
      <FlatList
        data={transactions}
        keyExtractor={item => item.id.toString()}
        renderItem={renderItem}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 20,
  },
  balanceText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  item: {
    // backgroundColor: '#f9f9f9',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  itemText: {
    fontSize: 16,
  },
  listContainer: {
    flexGrow: 1,
    width: '100%',
  },
  buttonContainer: {
    display: 'flex',
    flexDirection: 'row',
    gap: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default HomeScreen;
