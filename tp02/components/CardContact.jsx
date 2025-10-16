import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Modal, Button, Linking, Pressable } from 'react-native';

const data = [
  { id: 1, nom: "Rayane", prenom: "Meyfroot", mail: "rayanemeyfr@hotmail.com", telephone: "06.08.69.87.69" },
  { id: 2, nom: "Alice", prenom: "Dupont", mail: "alice.dupont@example.com", telephone: "06.12.34.56.78" },
  { id: 3, nom: "Bob", prenom: "Martin", mail: "bob.martin@example.com", telephone: "06.23.45.67.89" },
];

export default function CardContact() {
  const [selectedContact, setSelectedContact] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const openModal = (contact) => {
    setSelectedContact(contact);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedContact(null);
  };

  const callContact = async (telephone) => {
    const possible = await Linking.canOpenURL(telephone)

    if(possible){
        await Linking.openURL(telephone)
    } else {
        Alert.alert("Pas possible ici")
    }
  };

  return (
    <View  style={styles.listCard}>
      <FlatList
        data={data}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.card} onPress={() => openModal(item)}>
            <Text style={styles.name}>{item.nom}</Text>
          </TouchableOpacity>
        )}
      />

      {selectedContact && (
        <Modal visible={modalVisible} transparent={true} onRequestClose={closeModal}>
          <View style={styles.modalBackground}>
            <View style={styles.modalContainer}>
              <Text style={styles.title}>{selectedContact.nom} {selectedContact.prenom}</Text>
              <Text style={styles.subtitle}>{selectedContact.mail}</Text>
              <Pressable onPress={() => callContact(selectedContact.telephone)}>
                <Text style={styles.subtitle}>{selectedContact.telephone}</Text>
              </Pressable>

              <View style={{ marginTop: 20 }}>
                <Button title="Retour à la liste" onPress={closeModal} />
              </View>
            </View>
          </View>
        </Modal>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  listCard:{ 
    flex: 1, 
    padding: 20 
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
