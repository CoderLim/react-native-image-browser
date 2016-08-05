import React, { Component,  PropTypes, } from 'react';
import {
  ScrollView,
  Image,
  TouchableHighlight,
  View,
  Dimensions,
  StyleSheet,
  Modal,
} from 'react-native';

const WINDOW_WIDTH = Dimensions.get('window').width;
const WINDOW_HEIGHT = Dimensions.get('window').height;

export default class Carousel extends Component {
  static propTypes = {
    onClose: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
  }

  render() {
    let { children } = this.props,
        items = [];

    React.Children.forEach(children, (item, index) => {
      let image = React.cloneElement(item, {
            style: [item.props.style, styles.image],
          });
      items.push(
        <TouchableHighlight
          key={'touch_'+index}
          style={[styles.item]}
          onPress={this._pressImage.bind(this)}>
          {image}
        </TouchableHighlight>
      );
    });

    this._timer = setTimeout(()=> {
        this._scrollView && this._scrollView.scrollTo({
          x:this.props.selectedIndex*WINDOW_WIDTH,
          y:0,
          animated: false,
        })}
    );

    return (
      <Modal visible={this.props.isOpen}>
        <ScrollView
          ref={(component) => {this._scrollView = component}}
          pagingEnabled={true}
          horizontal={true}>
            {items}
        </ScrollView>
      </Modal>
    );
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.selectedIndex != this.props.selectedIndex) {
      this._scrollView && this._scrollView.scrollTo({
        x:nextProps.selectedIndex*WINDOW_WIDTH,
        y:0,
        animated: false,
      });
    }
  }

  componentWillUnmount() {
    this._timer && this.clearTimeout(this._timer);
  }

  _pressImage() {
    this.props.onClose();
  }

}



const styles = StyleSheet.create({
  item: {
    flex: 1,
    backgroundColor: 'yellow',
    position: 'relative',
    width: WINDOW_WIDTH,
  },
  image: {
    position: 'absolute',
    margin: 0,
    width: WINDOW_WIDTH,
    height: WINDOW_HEIGHT,
  }
});
