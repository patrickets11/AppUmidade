import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableHighlight
} from 'react-native';
import firebase from 'firebase';

export default class AddItem extends React.Component {
  constructor(props) {
      super(props);
      this.state = {
        bomba: 0,
        toggleText: 'Desligada',
        horarioInicio: null,
        horarioFim: null,
      }
      
      bombaState = {
        bomba: 1
      }
}


stateHorario(){

  firebase
    .database()
    .ref('BOMBA')
    .set(this.state);
}



ligarBomba() {
  
  this.setState({
      bomba: 1,
      toggleText: 'Ligada'
  });  
  
  firebase
    .database()
    .ref('BOMBA')
    .set(this.state);
  
}

desligarBomba() {
  
  this.setState({
     bomba: 0,
     toggleText: 'Desligada'
   });  

   
   firebase
    .database()
    .ref('BOMBA')
    .set(this.state);
}

  render() {
    return (
      <View style={styles.main}>
        <Text style={styles.title}>Bomba 1</Text>
        <TextInput 
                        style ={styles.itemInput}
                        placeholder = "Digite o horário do início"
                        value = {this.state.horarioInicio}
                        onChangeText = {value => {this.setState({
                          horarioInicio: value
                        })}}
                    />
        <TextInput 
                        style ={styles.itemInput}
                        placeholder = "Digite o horário do fim"
                        value = {this.state.horarioFim}
                        onChangeText = {value => {this.setState({
                          horarioFim: value
                        })}}
                    />
        <TouchableHighlight
                style = {styles.button}
                underlayColor= "white"
                onPress = {() => {this.stateHorario()}}
        >
              <Text
                  style={styles.buttonText}>
                  ENVIAR HORÁRIOS
              </Text>
        </TouchableHighlight>
        
        <TouchableHighlight
                style = {styles.button}
                underlayColor= "white"
                onPress = {() => {this.ligarBomba()}}
        >
              <Text
                  style={styles.buttonText}>
                  LIGAR
              </Text>
        </TouchableHighlight>
        <TouchableHighlight
                style = {styles.button}
                underlayColor= "white"
                onPress = {() => {this.desligarBomba()}}
        >
              <Text
                  style={styles.buttonText}>
                  DESLIGAR
              </Text>
        </TouchableHighlight>
        <Text style = {styles.buttonText}>Estado da bomba: {this.state.toggleText}</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    padding: 30,
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor: '#6ca2f7'
  },
  title: {
    marginBottom: 20,
    fontSize: 25,
    textAlign: 'center'
  },
  itemInput: {
    height: 50,
    padding: 4,
    marginRight: 5,
    fontSize: 18,
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 8,
    color: 'white'
  },
  buttonText: {
    fontSize: 18,
    color: '#111',
    alignSelf: 'center'
  },
  button: {
    height: 45,
    flexDirection: 'row',
    backgroundColor:'white',
    borderColor: 'white',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    marginTop: 10,
    alignSelf: 'stretch',
    justifyContent: 'center'
  }
});