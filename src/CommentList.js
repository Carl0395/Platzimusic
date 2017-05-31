import React, { Component } from 'react';
import {
  StyleSheet,
  ListView,
  Text
} from 'react-native';

import Comment from './Comment'

export default class CommentList extends Component {

  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: ds
    }
  }

  componentDidMount() {
    this.updateDataSource(this.props.comments)
  }

  // Se ejecuta cada vez que hay un cambio
  componentWillReceiveProps(newProps) {
    if(newProps.comments !== this.props.comments) {
      this.updateDataSource(newProps.comments)
    }
  }

  updateDataSource = data => {
    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(data) 
    })
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
          renderRow={(comment) => {
            return(
              <Comment text={comment.text} avatar={comment.userPhoto}/>
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