# react-native-image-browser

This is the `imagebrowser` component in React Native just for ios now. This is a JavaScript-only implementation of pager for React Native.
There are many issues to be resolved, such as Beautification code, optimization, I hope you can ask questions and recommendations

##Demo

![image](https://github.com/CoderGLM/react-native-image-browser/blob/master/screenshots/imagebrowser1.gif)<br/>
Demo project is [here](./Examples).

## Usage
1.Copy GridView.js, Carousel.js., Lightbox.js into your project, make sure the three in same directory.<br/>
2.Code like this:

```
 <GridView style={styles.gridview}>
          <Image source={{uri:''}} style={styles.image}/>
          <Image source={{uri:''}}
          <Image source={{uri:''}}
          <Image source={{uri:''}}
  </GridView>
```

## Page Transition Animation Controls
* **`animation`**: Not implement. I will add a property including 'scale', 'fade', 'none'.


## Licensed

MIT License
