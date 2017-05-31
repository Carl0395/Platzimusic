import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  View,
  Text,
  Navigator,
  TouchableHighlight
} from 'react-native';

import HomeView from './HomeView'
import ArtistDetail from './ArtistDetail'
import LoginView from './LoginView'



class PlatziMusic extends React.Component {

  /**
   * En este metodo se definen las escenas o
   * las vistas en las que se van a navegar
   */
  cargarEscenas(router, navigator) {
    switch(router.name) {
      case 'Home':
        return(
          <HomeView navigator={navigator}/>
        );
      case 'Detalle':
        return(
          <ArtistDetail artist={router.artist}/>
        );
      case 'Login':
        return(
          <LoginView navigator={navigator} />
        );
    }
  }

  render() {

    return (
      <Navigator
        initialRoute={{name: 'Login'}}
        renderScene={this.cargarEscenas}
        configureScene={(route) => {
          if(route.sceneConfig) {
            return route.sceneConfig;
          }
          return Navigator.SceneConfigs.FloatFromRight;
        }}
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    // El espacio que ocupa el container
    flex: 1,
    backgroundColor: 'lightgray',
    paddingTop: 50
  }
});

AppRegistry.registerComponent('PlatziMusic', () => PlatziMusic);