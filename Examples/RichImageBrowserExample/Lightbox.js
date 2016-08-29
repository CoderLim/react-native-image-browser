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
      animating: false,
      animator: new Animated.Value(0),
    };
  }

  render() {
    // if (!this.props.visible) {
    //   console.log('return null');
    //   return null;
    // }
    let { children, origin } = this.props;
    let { animator } = this.state;

    let openStyle;

    openStyle = this.props.origin && [styles.open, {
          left: animator.interpolate({inputRange: [0, 1], outputRange: [origin.x, 0]}),
          top: animator.interpolate({inputRange: [0, 1], outputRange: [origin.y + STATUS_BAR_OFFSET, STATUS_BAR_OFFSET]}),
          width: animator.interpolate({inputRange: [0, 1], outputRange: [origin.width, WINDOW_WIDTH]}),
          height: animator.interpolate({inputRange: [0, 1], outputRange: [origin.height, WINDOW_HEIGHT]}),
        }];


    let gallery = React.cloneElement(children, {
      position: 'absolute',
      left: 0,
      top: 0,
      width: WINDOW_WIDTH,
      height: WINDOW_HEIGHT,
      opacity: this.state.animating?0:1,
    });

    let animatedView = (
      <Animated.View style={openStyle}>
        <Image style={{flex: 1, resizeMode:'contain'}} source={this.props.source} />
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
            {animatedView}
        </TouchableHighlight>
        {gallery}
      </Modal>
    );
  }

  componentDidMount() {
    console.log('componentDidMount');
  }

  componentWillReceiveProps(newProps) {
    if (this.props.visible != newProps.visible) {
      if (newProps.visible) {
        this.setState({
          animating: true,
        });

        this.state.animator.setValue(0);
        Animated.timing(this.state.animator, {
          toValue: 1,
        }).start(() => {
          this.setState({
            animating: false,
          });
        });
      }
    }
  }

  /*
   *
   *  Private
   *
   */
  _pressImage() {
    this.setState({
      animating: true,
    });
    Animated.timing(this.state.animator, {
      toValue: 0,
    }).start(() => {
      this.setState({
        animating: false,
      });
      this.props.onClose();
    });
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: WINDOW_WIDTH,
    backgroundColor: 'black',
  },
  open: {
    position: 'absolute',
    backgroundColor: 'black',
  }
});
