import React, { Component } from 'react';
import { Dimensions, Text, View } from 'react-native';
import MapView, { Callout, Marker, Polygon } from 'react-native-maps';
import firebase from 'firebase';


const { width, height } = Dimensions.get('window');

export default class App extends Component {
    constructor() {
    super();
    
    
    this.state = {
      region: null,
      polygons: [
        {
          coordinates: [
            { latitude: -20.520918, longitude: -43.746169 },
            { latitude: -20.520888, longitude: -43.742893 },
            { latitude: -20.523410, longitude: -43.742657 },
            { latitude: -20.523671, longitude: -43.746401 },
          ],

          coordinatesMarker: [
            { latitude: -20.523410, longitude: -43.746169 },
            { latitude: -20.520888, longitude: -43.742893 },
            { latitude: -20.523410, longitude: -43.742657 },
            { latitude: -20.523671, longitude: -43.746401 },
          ],

          open: false,
        },
        
      ],

      dataList: null,
      umidade: null
    };
    
    

    }
    
    

  toggle(polygon) {
    console.log('onPress', polygon.open);

    if (polygon.open) {
      polygon.marker.hideCallout();
    } else {
      polygon.marker.showCallout();
    }

    polygon.open = !polygon.open;
  }

  readUserData() {
    firebase
      .database()
      .ref('regions')
      .on('umidade', function (snapshot) {
        x=console.tron.log(snapshot.val())
      });
      return x;
  }


  firebase() {
    firebase.database().ref('BOMBA/bomba').once('value').then(snapshot => {
      
      this.setState({
        umidade : snapshot.val()
      });
      
      //console.log(this.state.umidade);
      return umidade;
    });
  }

  mostrarGraficos(){

  }

  render() {

    const {navigate} = this.props.navigation;
    
    return (

      <View style={styles.container}>
        <MapView style={styles.map} 
          initialRegion={{
          latitude:-20.523410,
          longitude:-43.746169,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01
      }}>
          {this.state.polygons.map((polygon, index) => (
            <View key={index}>


                <Polygon
                    fillColor='#FF0000'
                    coordinates={polygon.coordinates}
                    onPress={() => this.toggle(polygon)}
                />
              <Marker
                ref={ref => polygon.marker = ref}
                coordinate={polygon.coordinatesMarker[0]}>
                <Callout
                  onPress={() => this.props.navigation.navigate('AddCoordenadas')}
                >
                  <Text>bomba</Text>
                </Callout>
              </Marker>

              <Marker
                coordinate={polygon.coordinatesMarker[1]}>
                <Callout
                  onPress={this.firebase()}
                >                
                 <Text onPress={this.firebase()}> {this.state.umidade} </Text>
                </Callout>
              </Marker>

            </View>
          ))}
        </MapView>
        
      </View>
    );
  }
}

const styles = {
  container: {
    alignItems: 'stretch',
    flex: 1,
  },
  map: {
    flex: 1,
  },
};
