import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity
} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';
import {firebaseDatabase, firebaseAuth} from './firebase'

export default class ArtistBox extends Component {

  state = {
    liked: false,
    likeCount: 0,
    commentCount: 0
  }

  commentsCount = snapshot => {
    const comments = snapshot.val()
    if(comments) {
      //console.warn('comentario', Object.keys(comments).length)
      this.setState({
        commentCount: Object.keys(comments).length
      })
      // Una vez termino me desuscribo 
      this.getCommentsRef().off('value', this.commentsCount);
    }
  }

// Este metodo se llama antes de que se carga el componente
  componentWillMount() {

    // Suscripcion al evento de firebase 
    this.getCommentsRef().on('value', this.commentsCount)


    const {uid} = firebaseAuth.currentUser
    // Cada vez que cambie el valor de ese objeto
    this.getArtistRef().on('value', snapshot => {
      const artist = snapshot.val()
      if(artist) {// artist != null
        this.setState({
          likeCount: artist.likeCount,
          liked: artist.likes && artist.likes[uid]
        })
      }
    })
  }

  eventoLike = () => {

    //this.setState({ liked: !this.state.liked })
    //console.warn('aritst', this.props.artist.likes)
    this.toggleLike(!this.state.liked)    
  }

  getArtistRef = () => {
    const {id} = this.props.artist
    return firebaseDatabase.ref(`artist/${id}`)
  }

  getCommentsRef = () => {
    // el id que hace referencia al artista
    const {id} = this.props.artist
    return firebaseDatabase.ref(`comments/${id}`)
  }

  toggleLike = (like) => {
    const {uid} = firebaseAuth.currentUser
    this.getArtistRef().transaction(function(artist){
      if(artist) {
        if(artist.likes  && artist.likes[uid]) {
          artist.likeCount--;
          artist.likes[uid] = null;
        } else {
          artist.likeCount++;
          if(!artist.likes) {
            artist.likes = {};
          }
          artist.likes[uid] = true;
        }
      }
      // Si el artist no existe 
      return artist || {
        // Caso de primer like
        likeCount: 1,
        likes: {
          [uid]: true
        }
      };
    });
  }

  render() {

    //console.warn('El nombre', this.props.artist.name)
    const {image, name, likes, comments} = this.props.artist
    const likeIcon = this.state.liked?
      <Icon name="ios-heart" size={30} color="#e74c3c" /> :
      <Icon name="ios-heart-outline" size={30} color="gray" />

    const commentIcon = this.state.commentCount > 0 ?
      <Icon name="ios-chatboxes" size={30} color="#1087C7" /> :
      <Icon name="ios-chatboxes-outline" size={30} color="gray" />

    const {likeCount} = this.state
    const {commentCount} = this.state

    return (

       <View style={styles.artistbox}>

        <Image style={styles.image} source={{ uri:image }}/>

        <View style={styles.info}>
          <Text style={styles.name}>{name}</Text>
          <View style={styles.row}>
            <View style={styles.iconContainer}>
              <TouchableOpacity onPress={this.eventoLike}>
                {likeIcon}
              </TouchableOpacity>
              <Text style={styles.count}>{likeCount}</Text>
            </View>
            <View style={styles.iconContainer}>
              {commentIcon}
              <Text style={styles.count}>{commentCount}</Text>
            </View>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
   
  artistbox: {
    margin: 5,
    backgroundColor: 'white',
    flexDirection: 'row',
    shadowColor: 'black',
    shadowOpacity: .2,
    shadowOffset: {
      height: 1,
      width: -2
    },
    // Esta opcion es para la sombra de android
    elevation: 2,
  },
  image: {
    width: 150,
    height: 150
  },
 info: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'center'
 },
 name: {
  fontSize: 20,
  marginTop: 10,
  color: '#333'
 },
 row: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  marginHorizontal: 40,
  marginTop: 15
 },
 iconContainer: {
  flex: 1,
  alignItems: 'center'
 },
 count: {
  color: 'gray'
 }
  
});