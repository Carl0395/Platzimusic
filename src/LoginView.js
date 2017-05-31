import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Navigator,
  Image
} from 'react-native';

// Importa librerias internas de FBSDK {} como el ejemplo de la linea 1
import FBSDK, {
  LoginButton,
  AccessToken
} from 'react-native-fbsdk'

import firebase, {
  firebaseAuth
} from './firebase'

const {FacebookAuthProvider} = firebase.auth


export default class LoginView extends Component {

  state = {
    credenciales: null
  }

  // Este metodo se llama antes de que se carga el componente
  componentWillMount() {
    this.autenticacionFirebase()
  }

  autenticacionFirebase = () => {
    // Esta linea AccesToken es de Facebook
    AccessToken.getCurrentAccessToken().then((data) => {
      const {accessToken} = data
      const credential = FacebookAuthProvider.credential(accessToken)

      firebaseAuth.signInWithCredential(credential).then((credenciales) => {
        
        // Replace para que no guarde esta vista en la pila y pasar de vista
        this.props.navigator.replace({
          name: 'Home',
          passProps: {}
        });

      }, function(error) {
        console.log("Sign In Error", error);
      });
    })
  }

  eventoLogin = (error, result) => {
    if (error) {
      console.error(error)
    } else if (result.isCancelled) {
      alert("login is cancelled.");
    } else {
      this.autenticacionFirebase()
    }
  }

  render() {
   
   return(
      <Image source={require('./background.jpg')} style={styles.container}>
        <Image source={require('./logo.png')} style={styles.logo} />
        <Text style={styles.welcome}>
          Bienvenidos a PlatziMusic
        </Text>
        <LoginButton
          readPermissions={['public_profile', 'email']}
          onLoginFinished={this.eventoLogin}
          onLogoutFinished={() => alert("logout.")} />

      </Image>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    // El espacio que ocupa el container
    flex: 1,
    width: null,
    height: null,
    backgroundColor: 'lightgray',
    justifyContent: 'center',
    alignItems: 'center'
  },
  welcome: {
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 20,
    backgroundColor: 'transparent',
    color: 'white'
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 20
  }
});