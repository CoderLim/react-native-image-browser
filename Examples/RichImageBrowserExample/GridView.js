/**
 * Source code: https://github.com/CoderGLM/react-native-image-browser
 *
 * @flow
 */
import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  StatusBar,
  TouchableHighlight,
} from 'react-native';

import Gallery from 'react-native-gallery';
import Lightbox from './Lightbox';

export default class GridView extends Component {
  constructor(props) {
    super(props);
    this.origins = [];
    this.state = {
      selectedIndex: -1,
    };
  }

  render() {
    let images = [];
    let imgBtns = this.props.images.map((uri, index) => {
      let img = <Image source={{uri}} style={styles.image}/>;
      images.push(img);
      return (
        <TouchableHighlight
          key={"touch_"+index}
          ref={"touch_ref_"+index}
          activeOpacity={1}
          onPress={this._imageClicked.bind(this, index)}>
          {img}
        </TouchableHighlight>
      );
    });

    return (
      <View style={styles.container}>
        <Lightbox
          origin={this.origins[this.state.selectedIndex]}
          onClose={this._closeLightbox.bind(this)}
          visible={this.state.selectedIndex !== -1}>
          <Gallery
            style={{flex:1, backgroundColor: 'black'}}
            onSingleTapConfirmed={this._closeLightbox.bind(this)}
            initialPage={this.state.selectedIndex}
            images={this.props.images}/>
        </Lightbox>
        {imgBtns}
      </View>
    );
  }

  componentDidMount() {
    this.origin = [];

    setTimeout(() => {
      // calculate all of the Image component's origin position
      for (var i = 0; i < this.props.images.length; i++) {
        this.refs["touch_ref_"+i].measure((fx, fy, width, height, px, py) => {
          this.origins.push({
            x: px,
            y: py,
            width,
            height,
          });});
      }
    });
  }

  /*
   *
   *  Private
   *
   */
  _imageClicked(index: number): void {
    StatusBar.setHidden(true, 'fade');
    this.setState({
      isOpen: true,
      selectedIndex: index,
    });
  }

  _closeLightbox(): void {
    this.setState({
      selectedIndex: -1
    });
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  image: {
    resizeMode: 'stretch',
    margin: 5,
    width: 100,
    height: 100,
    backgroundColor: 'gray',
  }
});
