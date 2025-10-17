import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import CardList from './components/CardList';
import { ContactProvider } from './context/ContactContext';

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <ContactProvider>
        <CardList/>
      </ContactProvider>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
