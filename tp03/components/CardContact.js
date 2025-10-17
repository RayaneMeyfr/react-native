// components/CardContact.js
import React from 'react';
import { View, Text, StyleSheet, Button, Pressable, Linking, Alert } from 'react-native';
import { useContacts } from '../context/ContactContext';

export default function CardContact({ contact, onClose }) {
  const { removeContact } = useContacts();

  const callContact = async (telephone) => {
    const url = `tel:${telephone}`;
    const possible = await Linking.canOpenURL(url);
    if (possible) {
      await Linking.openURL(url);
    } else {
      Alert.alert("Appel impossible", "Impossible d'ouvrir le téléphone.");
    }
  };

  const handleDelete = () => {
    removeContact(contact.id);
    onClose();
  };

  return (
    <View style={styles.modalBackground}>
      <View style={styles.modalContainer}>
        <Text style={styles.title}>{contact.nom} {contact.prenom}</Text>
        <Text style={styles.subtitle}>{contact.mail}</Text>

        <Pressable onPress={() => callContact(contact.telephone)}>
          <Text style={styles.subtitle}>{contact.telephone}</Text>
        </Pressable>

        <View>
          <Button title="Supprimer ce contact" color="red" onPress={handleDelete} />
        </View>

        <View>
          <Button title="Retour à la liste" onPress={onClose} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    width: '80%',
    alignItems: 'center',
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: '#0b9089',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    color: '#0b9089',
    marginBottom: 5,
  },
});
