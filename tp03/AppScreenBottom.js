import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import CardList from './components/CardList';
import { ContactProvider } from './context/ContactContext';
import Home from './components/Home';
import AddContact from './components/AddContact';

// Création des navigateurs
const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

export default function AppScreenBottom() {
  return (
    <ContactProvider>
      <NavigationContainer>
        <Tab.Navigator screenOptions={{tabBarActiveTintColor: '#f10c0cff', tabBarInactiveTintColor: '#0c0c0cff',}}>
          <Tab.Screen name="Home" component={Home} options={{ tabBarLabel: "Accueil", tabBarIcon: ({ color, size }) => ( <Ionicons name="home" size={size} color={color} />),}}/>
          <Tab.Screen name="ListContact" component={CardList} options={{tabBarLabel: "Contacts", tabBarIcon: ({ color, size }) => (<Ionicons name="people" size={size} color={color} />),}}/>
          <Tab.Screen name="AddContact" component={AddContact} options={{tabBarLabel: "Add", tabBarIcon: ({ color, size }) => (<Ionicons name="person-add" size={size} color={color} />),}}/>
        </Tab.Navigator>
      </NavigationContainer>
    </ContactProvider>
  );
}
