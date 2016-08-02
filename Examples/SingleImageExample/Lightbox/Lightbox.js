/*
 *
 *  reference: react-native-lightbox
 *
 */

'use strict';

import React, { Component, PropTypes } from 'react';
import {
  Animated,
  TouchableHighlight,
  View
} from 'react-native';
import LightboxOverlay from './LightboxOverlay';

export default class Lightbox extends Component {
  static propTypes = {
    backgroundColor: PropTypes.string,
    onOpen: PropTypes.func,
    onClose: PropTypes.func,
  };

  static defaultProps = {
    onOpen: () => {},
    onClose: () => {},
  };

  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      origin: {
        x: 0,
        y: 0,
        width: 0,
        height: 0,
      }
    };
  }

  open() {
    this._root.measure((fx, fy, width, height, px, py) => {
      this.setState({
        isOpen: true,
        isAnimating: true,
        origin: {
          width,
          height,
          x: px,
          y: py,
        }
      });
    });
  }

  close() {
    throw new Error('Do not use this method');
  }

  onClose() {
    this.setState({
      isOpen: false,
    });
  }

  getOverlayProps() {
    return {
      isOpen: this.state.isOpen,
      origin: this.state.origin,
      onClose: this.onClose.bind(this),
    };
  }

  render() {
    return (
      <View
        ref={component => this._root = component}
        style={this.props.style}
        onLayout={() => {}}
      >
        <Animated.View>
          <TouchableHighlight onPress={this.open.bind(this)}>
            {this.props.children}
          </TouchableHighlight>
        </Animated.View>
        <LightboxOverlay {...this.getOverlayProps()}>
          {
            React.cloneElement(
              React.Children.only(this.props.children),
              this.props.activeProps,
            )
          }
        </LightboxOverlay>
      </View>
    );
  }
}
