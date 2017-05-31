import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  Text
} from 'react-native';

import {firebaseDatabase, firebaseAuth} from './firebase'
import Icon from 'react-native-vector-icons/Ionicons';
import ArtistBox from './Artistbox'
import CommentList from './CommentList'

export default class ArtistDetail extends Component {

  state = {
    comments: []
  }

  componentDidMount() {
    // Suscripcion al evento de firebase 
    this.getArtistCommentsRef().on('child_added', this.addComment);
  }

  // Evento que se ejecuta cuando el componente se va a desmontar
  componentWillUnmount() {
    // Para desuscribinos una vez se desmonta el componente
    this.getArtistCommentsRef().off('child_added', this.addComment);
  }
  addComment = (data) => {
      const comment = data.val()
      this.setState({
        comments: this.state.comments.concat(comment)
      })
    }

  eventoEnviar = () => {
    //console.warn('enviar', this.state.text)
    const {uid, photoURL} = firebaseAuth.currentUser
    const {text} = this.state
    const artistCommentsRef = this.getArtistCommentsRef()
    var newCommentRef = artistCommentsRef.push();
    newCommentRef.set({
      text,
      userPhoto: photoURL,
      uid
    });
    this.setState({ text: '' })
  }

  getArtistCommentsRef = () => {
    const {id} = this.props.artist
    return firebaseDatabase.ref(`comments/${id}`)
  }

  eventoCambioTexto = (text) => this.setState({text})

  render() {

    const artist = this.props.artist
    const {comments} = this.state
    
    return(
      <View style={styles.container}>
        <ArtistBox artist={artist} />
        <Text style={styles.titulo}>Comentarios</Text>
        <CommentList comments={comments} />

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            value={this.state.text}
            placeholder="Opina sobre este artista"
            onChangeText={this.eventoCambioTexto}
          />
          <TouchableOpacity onPress={this.eventoEnviar}>
            <Icon name="ios-send-outline" size={30} color="gray" />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    // El espacio que ocupa el container
    flex: 1,
    backgroundColor: 'lightgray',
    paddingTop: 50
  },
  inputContainer: {
    height: 50,
    backgroundColor: 'white',
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center'
  },
  input: {
    height: 50,
    flex: 1
  },
  titulo: {
    fontSize: 20,
    paddingHorizontal: 15,
    marginVertical: 10
  }
});