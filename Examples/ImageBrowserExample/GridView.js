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
          onClose={this._closeCarousel.bind(this)}/>
      </View>
    );
  }

  componentDidMount() {
    this.setState({
      origins: [],
    });
    // 如果不使用setTimeout，异步回调得不到正确的值
    requestAnimationFrame(() => {
      // 计算没个item的origin（原始坐标大小），保存在origins里
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

  /*
   *
   *  Private
   *
   */
  _itemClicked(index: number): void {
    StatusBar.setHidden(true, 'fade');
    this.setState({
      selectedIndex: index,
      isOpenModal: true,
    });
  }

  _closeCarousel(): void {
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
