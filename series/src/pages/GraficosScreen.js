import React, { Component } from 'react';
import { Dimensions, Text, View } from 'react-native';
import MapView, { Callout, Marker, Polygon } from 'react-native-maps';
import firebase from 'firebase';

export default  class Graficos extends React.Component {
    constructor (props){
        super(props);
    
        this.state ={
            text: 'Gráficos',
        }
    }

    render(){
        return(
            <View>
                <Text> Funcionou! </Text>
            </View>
        )
    }


}