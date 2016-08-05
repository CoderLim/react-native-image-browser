import React, { Component,  PropTypes, } from 'react';
import {
  ScrollView,
  Image,
  TouchableHighlight,
  View,
  Dimensions,
  StyleSheet,
  Modal,
  Text,
} from 'react-native';

const WINDOW_WIDTH = Dimensions.get('window').width;
const WINDOW_HEIGHT = Dimensions.get('window').height;

export default class Carousel extends Component {
  static propTypes = {
    onClose: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this._firstPageShowed = false;
    this.state={
      currentPage: 1,
    };
  }

  componentWillMount() {
  }

  componentDidMount() {

  }

  render() {
    // 滚动到GridView中选择的page
    if (!this._firstPageShowed) {
      this._timer = setTimeout(()=> {
          this._scrollView && this._scrollView.scrollTo({
            x: this.props.firstPage*WINDOW_WIDTH,
            y: 0,
            animated: false,
          });
          // 当GridView显示时，就会执行这里，所以不能直接赋值为true
          this._firstPageShowed = this.isOpen;
        });
    }

    let { children } = this.props,
        items = [];

    React.Children.forEach(children, (item, index) => {
      let image = React.cloneElement(item, {
            style: [item.props.style, styles.image],
          });
      items.push(
        <TouchableHighlight
          key={'touch_'+index}
          activeOpacity={1}
          style={[styles.item]}
          onPress={this._pressImage.bind(this)}>
          {image}
        </TouchableHighlight>
      );
    });

    return (
      <Modal visible={this.props.isOpen}>
        <View style={{flex:1}}>
          <ScrollView
            ref={(component) => {this._scrollView = component}}
            scrollEventThrottle={15}
            removeClippedSubviews={true}
            pagingEnabled={true}
            horizontal={true}
            onScroll={this._onScroll.bind(this)}>
            {items}
          </ScrollView>
          <Text style={styles.legend}>{this.state.currentPage}/{9}</Text>
        </View>
      </Modal>
    );
  }

  componentWillReceiveProps(nextProps) {
  }

  componentWillUnmount() {
    this._timer && this.clearTimeout(this._timer);
  }

  /*
   *
   *  Private
   *
   */
  _pressImage() {
    this.props.onClose();
  }

  _onScroll(e) {
    let newPageNum = parseInt(e.nativeEvent.contentOffset.x/WINDOW_WIDTH+1);
    newPageNum!=this.state.currentPage && this.setState({
      currentPage: newPageNum,
    });
  }

  /*
   *
   *  Events
   *
   */


}



const styles = StyleSheet.create({
  legend: {
    position: 'absolute',
    top: 50,
    left: 0,
    right: 0,
    fontSize: 17,
    textAlign: 'center',
    color: 'white',
    backgroundColor: 'black',
  },
  item: {
    flex: 1,
    position: 'relative',
    width: WINDOW_WIDTH,
  },
  image: {
    position: 'absolute',
    margin: 0,
    width: WINDOW_WIDTH,
    height: WINDOW_HEIGHT,
    backgroundColor: 'black',
  }
});
