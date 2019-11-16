import { createAppContainer, createStackNavigator } from 'react-navigation';

import LoginScreen from './src/pages/LoginScreen';
import Map from './src/pages/SeriesPage';
import AddItem from './src/pages/AddCoordenadas';
import Graficos from './src/pages/GraficosScreen';

const AppNavigator = createStackNavigator({
  'Login' : {
    screen: LoginScreen,
    NavigationOptions: {
      title: 'Bem vindo!',
    }
  },

  'SeriesPage':{
    screen: Map
  },

  'AddCoordenadas':{
    screen: AddItem
  },
  'GraficosScreen':{
    screen: Graficos
  }
}, {
  defaultNavigationOptions: {
    title: "Irrigação Inteligente",
    headerTintColor: 'white',
    headerStyle: {
      backgroundColor: '#6ca2f7',
      borderBottomWidth: 1,
      borderBottomColor: '#C5C5C5',
    },
    headerTitleStyle: {
      color: 'white',
      fontSize: 25,
    }
  }
});

const AppContainer = createAppContainer(AppNavigator);

export default AppContainer;