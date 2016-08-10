/**
 * Source code: https://github.com/CoderGLM/react-native-image-browser
 * @flow
 */
import React, { Component, PropTypes } from 'react';
import {
  View,
  TouchableHighlight,
  StyleSheet,
  Dimensions,
  Animated,
  Platform,
} from 'react-native';
import Image from 'react-native-transformable-image';

const WINDOW_WIDTH = Dimensions.get("window").width;
const WINDOW_HEIGHT = Dimensions.get("window").height;
const STATUS_BAR_OFFSET = (Platform.OS == 'android' ? -25 : 0);

export default class Lightbox extends Component {
  static propTypes = {
      origin: PropTypes.shape({
        x: PropTypes.number,
        y: PropTypes.number,
        width: PropTypes.number,
        height: PropTypes.number,
      }),
      onClose: PropTypes.func.isRequired,
      onOpen: PropTypes.func,
  };

  constructor(props) {
    super(props);
    this.state = {
      openValue: new Animated.Value(0),
    };
  }

  render() {
    let { children, origin } = this.props;
    let { openValue } = this.state;
    let image = React.cloneElement(React.Children.only(children), {
          style: styles.image,
        });
    let openStyle = [styles.open, {
        left: openValue.interpolate({inputRange: [0, 1], outputRange: [origin.x, 0]}),
        top: openValue.interpolate({inputRange: [0, 1], outputRange: [origin.y + STATUS_BAR_OFFSET, STATUS_BAR_OFFSET]}),
        width: openValue.interpolate({inputRange: [0, 1], outputRange: [origin.width, WINDOW_WIDTH]}),
        height: openValue.interpolate({inputRange: [0, 1], outputRange: [origin.height, WINDOW_HEIGHT]}),
    }];
    let content = (
      <Animated.View style={openStyle}>
        {image}
      </Animated.View>
    );
    return (
      <TouchableHighlight
        activeOpacity={1}
        style={styles.container}
        onPress={this._pressImage.bind(this)}>
        {content}
      </TouchableHighlight>
    );
  }

  componentDidMount() {
    /*
     *  需要setValue(0)，如果不添加，会有一定几率看不到动画，短暂黑屏然后显示最终图片
     */
    this.state.openValue.setValue(0);
    Animated.timing(this.state.openValue, {
      toValue: 1,
    }).start();
  }

  /*
   *
   *  Private
   *
   */
  _pressImage() {
    Animated.timing(this.state.openValue, {
      toValue: 0,
    }).start(() => {
      this.props.onClose();
    });

  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: WINDOW_WIDTH,
  },
  image: {
    flex: 1,
    resizeMode: 'contain',
  },
  open: {
    position: 'absolute',
    margin: 0,
    backgroundColor: 'black',
  }
});
