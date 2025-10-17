import React, { useState } from 'react';
import { Alert, StyleSheet, Text, TextInput, View, Button, Pressable } from 'react-native';
import { useContacts } from '../context/ContactContext';

export default function AddContact({navigation}) {
  const { addContact } = useContacts();
  const [prenom, setPrenom] = useState('');
  const [nom, setNom] = useState('');
  const [mail, setMail] = useState('');
  const [telephone, setTelephone] = useState('');

  const isValidName = prenom.trim().length >= 2 && nom.trim().length >= 2;
  const isValidMail = mail.includes('@') && mail.includes('.');
  const isValidPhone = telephone.length === 14;

  const handlePhoneChange = (value) => {
    const cleaned = value.replace(/\D/g, '');
    const formatted = cleaned.replace(/(\d{2})(?=\d)/g, '$1.').slice(0, 14);
    setTelephone(formatted);
  };

  const handleSubmit = () => {
    if (!isValidName || !isValidMail || !isValidPhone) {
      Alert.alert('Erreur', 'Veuillez remplir tous les champs correctement.');
      return;
    }

    const newContact = {nom,prenom,mail,telephone,};

    addContact(newContact);

    setPrenom('');
    setNom('');
    setMail('');
    setTelephone('');

    navigation.navigate("ListContact");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Ajouter un contact</Text>

      <View style={styles.field}>
        <Text style={styles.label}>Prénom</Text>
        <TextInput style={styles.input} value={prenom} onChangeText={setPrenom} placeholder="Ex : Rayane" autoCapitalize="words" />
      </View>

      <View style={styles.field}>
        <Text style={styles.label}>Nom</Text>
        <TextInput style={styles.input} value={nom} onChangeText={setNom} placeholder="Ex : Meyfroot" autoCapitalize="words" />
      </View>

      <View style={styles.field}>
        <Text style={styles.label}>Email</Text>
        <TextInput style={styles.input} value={mail} onChangeText={setMail} placeholder="Ex : exemple@mail.com" autoCapitalize="none" keyboardType="email-address"/>
      </View>

      <View style={styles.field}>
        <Text style={styles.label}>Téléphone</Text>
        <TextInput style={styles.input} value={telephone} onChangeText={handlePhoneChange} placeholder="Ex : 06.12.34.56.78" keyboardType="phone-pad" />
      </View>

      <Pressable
        style={[styles.button, !(isValidName && isValidMail && isValidPhone) && styles.disabledButton]}
        onPress={handleSubmit}
        disabled={!(isValidName && isValidMail && isValidPhone)}
      >
        <Text style={styles.buttonText}>Valider</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 25,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#0b9089',
    textAlign: 'center',
    marginBottom: 20,
  },
  field: {
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    color: '#333',
    marginBottom: 5,
  },
  input: {
    borderWidth: 2,
    borderColor: '#0b9089',
    borderRadius: 10,
    padding: 10,
    fontSize: 16,
    backgroundColor: '#fff',
  },
  button: {
    backgroundColor: '#0b9089',
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: 'center',
    marginTop: 10,
  },
  disabledButton: {
    backgroundColor: '#a9a9a9',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
  },
});
