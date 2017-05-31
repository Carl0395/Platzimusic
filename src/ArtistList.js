import React, { Component } from 'react';
import {
  StyleSheet,
  ListView,
  TouchableOpacity,
  Navigator
} from 'react-native';

 import ArtistBox from './Artistbox'

export default class ArtistList extends Component {

  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: ds
    }
  }

  componentDidMount() {
    this.updateDataSource(this.props.artists)
  }

  // Se ejecuta cada vez que hay un cambio
  componentWillReceiveProps(newProps) {
    if(newProps !== this.props.artists) {
      this.updateDataSource(newProps.artists)
    }
  }

  updateDataSource = data => {
    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(data) 
    })
  }

  eventoCaja(artist) {
    // console.warn(artist.name);
    this.props.navigator.push({
      // Propiedades que pasan por el router
      name: 'Detalle',
      artist: artist,
      // Metodo para pasar los props
      passProps: {}
    });
  }

  render() {

    const artist = {
      image: 'https://kiwicdn.akamaized.net/0dce/2htRFLDsDTwBGhrp1BxHrQ.jpg',
      name: 'David Bowie',
      likes: 200,
      comments: 140 
    }
    return (
      <ListView
          enableEmptySections = {true}
          dataSource={this.state.dataSource}
          renderRow={(artist) => {
            return(
              // Evento para cada caja de la lista
              <TouchableOpacity 
                onPress={() => this.eventoCaja(artist)}>
                <ArtistBox artist={artist}/>
              </TouchableOpacity>
            )
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