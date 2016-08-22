/**
 * Source code: https://github.com/CoderGLM/react-native-image-browser
 * @flow
 */
import React, { Component, PropTypes } from 'react';
import {
  View,
  Image,
  TouchableHighlight,
  StyleSheet,
  Dimensions,
  Animated,
  Platform,
  Modal,
} from 'react-native';

const WINDOW_WIDTH = Dimensions.get("window").width;
const WINDOW_HEIGHT = Dimensions.get("window").height;
const STATUS_BAR_OFFSET = (Platform.OS == 'android' ? -25 : 0);

export default class Lightbox extends Component {
  static propTypes = {
      visible: PropTypes.bool,
      origin: PropTypes.shape({
        x: PropTypes.number,
        y: PropTypes.number,
        width: PropTypes.number,
        height: PropTypes.number,
      }),
  };

  constructor(props) {
    super(props);
    this.state = {
      animator: new Animated.Value(0),
    };
  }

  render() {
    if (!this.props.visible) {
      return null;
    }
    let { children, origin } = this.props;
    let { animator } = this.state;

    let openStyle = this.props.origin && [styles.open, {
        left: animator.interpolate({inputRange: [0, 1], outputRange: [origin.x, 0]}),
        top: animator.interpolate({inputRange: [0, 1], outputRange: [origin.y + STATUS_BAR_OFFSET, STATUS_BAR_OFFSET]}),
        width: animator.interpolate({inputRange: [0, 1], outputRange: [origin.width, WINDOW_WIDTH]}),
        height: animator.interpolate({inputRange: [0, 1], outputRange: [origin.height, WINDOW_HEIGHT]}),
      }];
    let content = (
      <Animated.View style={openStyle}>
        {this.props.children}
      </Animated.View>
    );
    return (
      <Modal
        style={{
          backgroundColor: 'black'
        }}
        animationType={"fade"}
        transparent={false}
        visible={this.props.visible}
        onRequestClose={this.props.onClose}
        >
        <TouchableHighlight
          activeOpacity={1}
          style={styles.container}
          onPress={this._pressImage.bind(this)}>
          {content}
        </TouchableHighlight>
      </Modal>
    );
  }

  componentDidMount() {
    /*
     *  需要setValue(0)，如果不添加，会有一定几率看不到动画，短暂黑屏然后显示最终图片
     */
    this.state.animator.setValue(0);
    Animated.timing(this.state.animator, {
      toValue: 1,
    }).start();
  }

  /*
   *
   *  Private
   *
   */
  _pressImage() {
    Animated.timing(this.state.animator, {
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
    backgroundColor: 'yellow',
  },
  open: {
    position: 'absolute',
    margin: 0,
    backgroundColor: 'black',
  }
});
