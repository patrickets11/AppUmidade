import React from 'react';
import {View, StyleSheet, TextInput, Button, ActivityIndicator, Text, Alert} from 'react-native';

import FormRow from '../components/FormRow';

import firebase from 'firebase';




export default  class LoginScreen extends React.Component {
    constructor (props){
        super(props);
    
        this.state ={
            mail: 'patrickets11@gmail.com',
            password: '12345678',
            isLoading: false,
            message:'',
            coords: [],
        }
    }

    componentDidMount() {
            const firebaseConfig = {
                apiKey: "AIzaSyDPoRqvbUALh6rx76qy3C1DPJ0GP6bF5ic",
                authDomain: "series-patrick.firebaseapp.com",
                databaseURL: "https://series-patrick.firebaseio.com",
                projectId: "series-patrick",
                storageBucket: "series-patrick.appspot.com",
                messagingSenderId: "1072309958039",
                appId: "1:1072309958039:web:b7810429f648f7a8"
            };
            // Initialize Firebase
            firebase.initializeApp(firebaseConfig);
            //export const db = app.database();
          
           
          
    }

    onChangeHandler(field, value) {
        this.setState({
            [field]: value
        });
    }

    tryLogin(){
        this.setState ({ isLoading: true, message: '' });
        const {mail, password} = this.state
        const loginUserSucess = user => {
            this.setState({ message:"Sucesso!"});
            this.props.navigation.navigate('SeriesPage');

        }
        const loginUserFailed = error => {
            this.setState ({
                message: this.getMessageByErroCode(error.code)
            });
        }
        firebase
            .auth()
            .signInWithEmailAndPassword(mail, password)
            .then(loginUserSucess)
            .catch(error => {
                if (error.code == 'auth/user-not-found'){
                    Alert.alert ( 
                        'Usuário não encontrado',
                        'Deseja criar um cadastro com as informações inseridas?',
                        [{
                            text: 'Não',
                            onPress: () => console.log('Usuário não quer criar conta'),
                            style: 'cancel' //IOS
                        }, {
                            text:'Sim',
                            onPress: () => {
                                firebase
                                    .auth()
                                    .createUserWithEmailAndPassword(mail, password)
                                    .then (loginUserSucess)
                                    .catch(loginUserFailed);
                                }
                                    
                            }
                        ],
                        { cancelable: false }
                    )
                    return;
                } else {

                    loginUserFailed(error);
                }
            })
            .then(() => this.setState({isLoading: false}));
            

    }

    getMessageByErroCode (errorCode) {
        switch(errorCode){
            case 'auth/wrong-password':
                return 'Senha incorreta';
            case 'auth/user-not-found':
                return 'Usuário não encontrado';
            default:
                return 'Erro desconhecido';        
        }
    }

    renderMessage(){
        const {message} = this.state;
        if(!message)
            return null;
        return(
            <View>
                <Text>{message}</Text>
            </View>
        );
    }

    renderButton() {
        if (this.state.isLoading)
            return <ActivityIndicator />;
        return (
            <Button 
                title = "Entrar" 
                onPress = {() => this.tryLogin()}/>
        );
    }
    render () {
        return(
            <View style = { styles.container}>
                <FormRow first>
                    <TextInput 
                        style ={styles.input}
                        placeholder = "user@mail.com"
                        value = {this.state.mail}
                        onChangeText = {value => this.onChangeHandler('mail', value)}
                    />
                </FormRow>
                <FormRow last>
                    <TextInput 
                        style ={styles.input}
                        placeholder = "******"
                        secureTextEntry
                        value = {this.state.password}
                        onChangeText = {value => this.onChangeHandler('password', value)}
                    />
                </FormRow>
                { this.renderButton() }
                { this.renderMessage()}
                
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        paddingLeft: 10,
        paddingRight: 10,
    },
    input: {
        paddingLeft: 5,
        paddingRight: 5,
        paddingBottom: 5,
    }
});