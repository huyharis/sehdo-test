import React from 'react';
import {
  DefaultTheme,
  NavigationContainer,
  DarkTheme,
} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {TransactionProvider} from './TransactionContext';
import HomeScreen from './HomeScreen';
import TransactionScreen from './TransactionScreen';
import Beneficiary from './BeneficiaryScreen';
import {useColorScheme} from 'react-native';

const Stack = createNativeStackNavigator();

const App = () => {
  const scheme = useColorScheme();

  return (
    <TransactionProvider>
      <NavigationContainer theme={scheme === 'dark' ? DarkTheme : DefaultTheme}>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Transaction" component={TransactionScreen} />
          <Stack.Screen name="Beneficiary" component={Beneficiary} />
        </Stack.Navigator>
      </NavigationContainer>
    </TransactionProvider>
  );
};

export default App;
