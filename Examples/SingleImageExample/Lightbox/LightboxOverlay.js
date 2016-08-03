
'use strict';

import React, { Component, PropTypes }from 'react';
import {
  Animated,
  Dimensions,
  Modal,
  Platform,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableHighlight,
  View,
} from 'react-native';

const WINDOW_WIDTH = Dimensions.get('window').width;
const WINDOW_HEIGHT = Dimensions.get('window').height;
const STATUS_BAR_OFFSET = (Platform.OS == 'android' ? -25 : 0);

export default class LightboxOverlay extends Component {
  static propTypes = {
    origin: PropTypes.shape({
      x: PropTypes.number,
      y: PropTypes.number,
      width: PropTypes.number,
      height: PropTypes.number,
    }),
    isOpen: PropTypes.bool,
    onOpen: PropTypes.func,
    onClose: PropTypes.func,
  };

  static defaultProps = {
    backgroundColor: 'black',
  };

  constructor(props) {
    super(props);
    this.state = {
      isAnimating: false,
      target: {
        x: 0,
        y: 0,
      },
      openVal: new Animated.Value(0),
    };
  }

  componentDidMount() {
    if (this.props.isOpen) this.open();
  }

  open() {
    StatusBar.setHidden(true, 'fade');
    this.setState({
      isAnimating: true,
      target: {
        x: 0,
        y: 0,
      }
    });
    Animated.timing(this.state.openVal, {
      toValue: 1,
    }).start();
  }

  close() {
    StatusBar.setHidden(false, 'fade');
    Animated.timing(this.state.openVal, {
      toValue: 0
    }).start(() => {
      this.props.onClose();
    });
  }

  componentWillReceiveProps(props) {
    if (this.props.isOpen != props.isOpen && props.isOpen) {
      this.open();
    }
  }

  render() {
    let { isOpen, origin, backgroundColor, } = this.props;
    let { isAnimating, openVal, target, } = this.state;
    console.log(origin);
    let openStyle = [styles.open, {
      left: openVal.interpolate({inputRange: [0, 1], outputRange: [origin.x, target.x]}),
      top: openVal.interpolate({inputRange: [0, 1], outputRange: [origin.y + STATUS_BAR_OFFSET, target.y + STATUS_BAR_OFFSET]}),
      width: openVal.interpolate({inputRange: [0, 1], outputRange: [origin.width, WINDOW_WIDTH]}),
      height: openVal.interpolate({inputRange: [0, 1], outputRange: [origin.height, WINDOW_HEIGHT]}),
    }];

    let background = <Animated.View style={[styles.background, {backgroundColor: backgroundColor}]}></Animated.View>
    let header = null;
    let content = (
      <Animated.View style={openStyle}>
        {this.props.children}
      </Animated.View>
    );

    return (
      <Modal visible={isOpen} transparent={true}>
        <TouchableHighlight onPress={this.close.bind(this)} activeOpacity={1}>
          <View>
            {header}
            {background}
            {content}
          </View>
        </TouchableHighlight>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  background: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: WINDOW_WIDTH,
    height: WINDOW_HEIGHT,
  },
  open: {
    position: 'absolute',
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'pink',
  }
});
