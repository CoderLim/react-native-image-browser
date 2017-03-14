# react-native-image-browser

This is the `imagebrowser` component in React Native just for ios now. This is a JavaScript-only implementation of pager for React Native.
There are many issues to be resolved, such as Beautification code, optimization, I hope you can ask questions and recommendations

## ImageBrowserExample

![image](https://github.com/CoderGLM/react-native-image-browser/blob/master/screenshots/imagebrowser1.gif)<br/>
Demo project is [here](./Examples).

## Usage
1.Copy GridView.js, Carousel.js., Lightbox.js into your project, make sure putting them in same directory.<br/>
2.Code like this:

```
 <GridView
          style={styles.gridview}
          images={[
            'http://www.bz55.com/uploads1/allimg/120312/1_120312100435_8.jpg',
            'http://pic3.bbzhi.com/fengjingbizhi/gaoqingkuanpingfengguangsheyingps/show_fengjingta_281299_11.jpg',
            'http://pic17.nipic.com/20111024/7675119_084440853000_2.jpg',
            'http://imgsrc.baidu.com/forum/pic/item/a275666b3b092e466a60fbfe.jpg',
            'http://img2.3lian.com/2014/c7/12/d/77.jpg',
            'http://pic1.nipic.com/2008-12-18/20081218175254901_2.jpg',
            'http://a.hiphotos.baidu.com/zhidao/pic/item/09fa513d269759eea57ece50b2fb43166d22df7b.jpg',
            'http://www.feizl.com/upload2007/2011_05/110505164429412.jpg',
            'http://vipbook.sinaedge.com/bookcover/pics/124/cover_64285d83248c839d9a1e3cbf9a1c44ea.jpg'
          ]} />
```

## Page Transition Animation Controls
* **`animation`**: Not implement. I will add a property including 'scale', 'fade', 'none'.


## Licensed

MIT License
