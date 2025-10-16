import { Text, View,StyleSheet } from 'react-native'
import React, { Component } from 'react'

export default class CardContact extends Component {
  render() {
    return (
      <View style={styles.card}>
        <Text style={styles.title}>Rayane Meyfroot</Text>
        <Text style={styles.subtitle}>06.08.69.87.69</Text>
        <Text style={styles.subtitle}>rayanemeyfr@hotmail.com</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
    card: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ebebebff',
        borderWidth: 1,            
        borderColor: '#ffffff',   
        borderRadius: 10,          
        padding: 50                
    },
    title: {
        color : '#0b9089ff',
        fontSize : 25,
        fontWeight : '900',
        padding:10
    },
   subtitle: {
        color : '#0b9089ff',
        fontWeight : '900',
    }
})