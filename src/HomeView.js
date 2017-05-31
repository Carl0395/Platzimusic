import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  ActivityIndicator,
  Platform
} from 'react-native';

import ArtistList from './ArtistList'
import {getArtists} from './api-client'

export default class HomeView extends Component {

  state = {
    artists: null
  }

  // Se llama cuando el componente ya fue rendereado 
  componentDidMount() {
    // El metodo setState dispara nuevamente el render
    getArtists().then(data => this.setState({artists: data}))
  }

  render() {

    const artists = this.state.artists
    const navigator = this.props.navigator

    return(
      <View style={styles.container}>
        {!artists && <ActivityIndicator size="large"/>}
        {artists && <ArtistList artists={artists} navigator={navigator}/>}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    // El espacio que ocupa el container
    flex: 1,
    backgroundColor: 'lightgray',
    paddingTop: Platform.select({
      ios: 30,
      android: 10
    })
  }
});