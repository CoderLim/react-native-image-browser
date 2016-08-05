import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableHighlight,
  Alert,
} from 'react-native';
import Carousel from './Carousel';

export default class GridView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpenModal: false,
      selectedIndex: 0,
    };
  }

  render() {
    let { children } = this.props,
        images = [];

    React.Children.forEach(children, (item, index) => {
      images.push(
        <TouchableHighlight
          key={"touch_"+index}
          activeOpacity={1}
          onPress={this._itemClicked.bind(this, index)}>
          {item}
        </TouchableHighlight>
      );
    });

    return (
      <View style={styles.container}>
        {images}
        <Carousel
          firstPage={this.state.selectedIndex}
          isOpen={this.state.isOpenModal}
          children={this.props.children}
          onClose={this._closeModal.bind(this)}/>
      </View>
    );
  }

  _itemClicked(index: number) : void {
    this.setState({
      selectedIndex: index,
      isOpenModal: true,
    });
  }

  _closeModal() {
    this.setState({
      isOpenModal: false,
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
});
