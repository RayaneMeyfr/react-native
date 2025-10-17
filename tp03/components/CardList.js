import React, { useState } from 'react';
import { View, FlatList, TouchableOpacity, Text, StyleSheet, Modal, Button } from 'react-native';
import CardContact from './CardContact';
import { useContacts } from '../context/ContactContext';

export default function CardList() {
  const { contacts } = useContacts(); 
  const [selectedContact, setSelectedContact] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const openModal = (contact) => {
    setSelectedContact(contact);
    setModalVisible(true);
  };

  const closeModal = () => {
    setSelectedContact(null);
    setModalVisible(false);
  };

  if (contacts.length < 1) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>Aucun contact</Text>
      </View>
    );
  }
  return (
    <View style={styles.listCard}>
      <FlatList
        data={contacts}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.card} onPress={() => openModal(item)}>
            <Text style={styles.name}>{item.nom}</Text>
          </TouchableOpacity>
        )}
      />

      {selectedContact && (
        <Modal visible={modalVisible} transparent={true} onRequestClose={closeModal}>
          <CardContact contact={selectedContact} onClose={closeModal} />
        </Modal>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  listCard: {
    flex: 1,
    padding: 20,
  },
  card: {
    padding: 15,
    backgroundColor: '#ebebeb',
    marginBottom: 10,
    borderRadius: 10,
    alignItems: 'center',
  },
  name: {
    fontSize: 18,
    fontWeight: '700',
    color: '#0b9089',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 20,
    color: '#888',
  },
});