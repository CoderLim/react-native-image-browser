import React, { Component, PropTypes } from 'react';
import {
  View,
  Image,
  TouchableHighlight,
  StyleSheet,
  Dimensions,
  Animated,
  Platform,
} from 'react-native';

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
      animator: new Animated.Value(0),
    };
  }

  componentWillMount() {
  }

  render() {
    let { children, origin } = this.props;
    let { animator } = this.state;
    let image = React.cloneElement(React.Children.only(children), {
          style: styles.image,
        });
    let openStyle = [styles.open, {
      left: origin.x,
      top: origin.y,
      width: origin.width,
      height: origin.height,
      transform: [{
          translateY: animator.interpolate({inputRange: [0, 1], outputRange: [0, 0.5*WINDOW_HEIGHT-0.5*(2*origin.y + origin.height + STATUS_BAR_OFFSET)]})
        }, {
          translateX: animator.interpolate({inputRange: [0, 1], outputRange: [0, 0.5*WINDOW_WIDTH-0.5*(2*origin.x+origin.width)]})
        }, {
          scale: animator.interpolate({inputRange: [0, 1], outputRange: [1, WINDOW_WIDTH/origin.width]})
        }],
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
