[![license](https://img.shields.io/github/license/mashape/apistatus.svg)]()
[![Version](https://img.shields.io/npm/v/react-native-circular-progress.svg)](https://www.npmjs.com/package/react-native-perccent-circle)
[![npm](https://img.shields.io/npm/dt/react-native-circular-progress.svg)](https://www.npmjs.com/package/react-native-perccent-circle)

# react-native-percent-circular

React Native component for creating animated, circular progress with Pure js. Useful for displaying users points for example. **Works on iOS & Android.**



## Example app
![image](PercentCircle.png)

## Installation

 Install library `npm i --save react-native-percent-progress`

## Usage

Import CircularProgress or AnimatedCircularProgress.

```js
import PercentCircle from 'react-native-percent-progress';
```

Use as follows:

```jsx
  <PercentCircle percent={79} />
```

## Configuration

You can configure the passing by following props:

- **radius** – the radius of the circle
- **percent** - current, percentage fill (from 0 to 100)
- **frameTime** - the time of refresh circle
- **fwColor** - color of a progress line
- **bgColor** - color of a background for progress line
- **duration** - the time of animation
- **lineCap** - the shape to be used at the ends of the circle. Possible values:  round or square.
- **fontColor** - the color of font
- **fontSize** - the size of font (px)

## Author

Hlere (595806119@qq.com)

## License

MIT
