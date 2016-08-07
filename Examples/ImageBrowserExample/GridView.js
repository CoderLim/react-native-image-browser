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
import Carousel from './Carousel';

export default class GridView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpenModal: false,
      selectedIndex: 0,
      origins: [],
    };
  }

  render() {
    let { children } = this.props,
        images = [];

    React.Children.forEach(children, (item, index) => {
      images.push(
        <TouchableHighlight
          key={"touch_"+index}
          ref={"touch_ref_"+index}
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
          origins={this.state.origins}
          firstPage={this.state.selectedIndex}
          isOpen={this.state.isOpenModal}
          children={this.props.children}
          onClose={this._closeModal.bind(this)}/>
      </View>
    );
  }

  componentDidMount() {
    this.setState({
      origins: [],
    });
    // 如果不使用setTimeout，异步回调得不到正确的值
    setTimeout(() => {
      for (var i = 0; i < this.props.children.length; i++) {
        this.refs["touch_ref_"+i].measure((fx, fy, width, height, px, py) => {
          this.state.origins.push({
            x: px,
            y: py,
            width,
            height,
          });
        });
      }
    });
  }

  _itemClicked(index: number): void {
    StatusBar.setHidden(true, 'fade');
    this.setState({
      selectedIndex: index,
      isOpenModal: true,
    });
  }

  _closeModal(): void {
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
