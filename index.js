import React, { Component } from 'react';

import {
    StyleSheet,
    Text,
    View,
    WebView
} from 'react-native';

class PercentCircle extends Component {
    constructor(props){
        super(props);
        this.state={
            init:`
              <html>
                  <head>
                      <meta charset="utf-8">
                      <meta http-equiv="x-ua-compatible" content="ie=edge">
                      <meta content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0;" name="viewport" />                      
                      <style>
                        html,body {
                          width: 100%;
                          height: 100%;
                          position: relative;
                          padding: 0;
                          margin:0;
                          overflow:hidden;
                        }
                        canvas {
                          padding: 0;
                          position: absolute;
                          left:0;
                          right: 0;
                          top: 0;
                          bottom:0;
                          margin:auto;
                        }

                      </style>
                  </head>
                  <body>
                      <canvas id="canvas"></canvas>
                  </body>
                  <script>
                    /* 显示百分比 */`,
                  end: `
                    
                    /* 扩大一倍 */
                    r = 2*r;
                    var w = r + 0.2 * r;
                    var h = r + 0.2 * r;

                    var center = r + 0.1 * r;
                    var canvas = document.getElementById('canvas');
                    canvas.style.width = r;
                    canvas.style.height = r;
                    canvas.width = 2 * r + 0.2 * r ;
                    canvas.height = 2 * r + 0.2 * r;

                    var ctx = canvas.getContext('2d');

                    /* 动画持续时间 毫秒 */

                    /* 运行时间 */
                    var time = 0;

                    /* 绘制文字 */
                    function drawText (ctx, str) {
                      ctx.textAlign = 'center';
                      ctx.fillStyle = fontColor;
                      ctx.font = 'normal normal 100 '+fontSize+'px sans-serif';
                      ctx.textBaseline = 'middle';
                      ctx.fillText(str+'%', center, center);
                    }

                    /* 缓动函数 */
                    function easeInOut (t, b, c, d) {
                        if ((t /= d / 2) < 1) return c / 2 * t * t + b;
                        return -c / 2 * ((--t) * (t-2) - 1) + b;
                    }

                    function drawCricle (ctx) {
                      ctx.beginPath();
                      ctx.arc(center, center, r, 2 * Math.PI, false);
                      ctx.closePath();
                      ctx.strokeStyle = bgColor;
                      ctx.lineWidth = lineWidth;
                      ctx.lineCap = 'round';
                      ctx.stroke();
                    }

                    function drawCircleLine (ctx, percent) {
                      percent = parseFloat(percent) || 0;
                      ctx.moveTo(r,r);
                      ctx.beginPath();
                      ctx.arc(center, center, r, - Math.PI / 2,  - Math.PI / 2 + 2 * Math.PI * percent * 0.01, false);

                      ctx.strokeStyle = fwColor;
                      ctx.lineWidth = lineWidth;
                      ctx.lineCap = 'round';
                      ctx.stroke();
                      ctx.closePath();   
                    }

                    function drawOneFrame () {
                      /* 清除画布 */
                      canvas.width = canvas.width;
                      ctx.clearRect(0, 0, w,h);
                      /* 清除画布结束 */  
                      time += frameTime;
                      ctx.scale(0.5, 0.5);
                      var tempPercent = parseInt(easeInOut(time, 0, percent * 2 * Math.PI, duration), 10);
                      tempPercent = parseInt(tempPercent/Math.PI/2);
                      if (time >= duration) {
                        tempPercent = percent;
                      }

                      drawText(ctx, tempPercent);
                      drawCricle(ctx);
                      drawCircleLine(ctx, tempPercent);
                    }
                    ctx.clearRect(0, 0, w, h);
                    
                    var handle = setInterval(function () {
                      if (time >= duration) {
                        clearInterval(drawOneFrame);
                        return
                      }
                      drawOneFrame()
                    }, frameTime)

                  </script>
              </html>
            `
        }
    }

    reRenderWebView(e) {
      this.setState({
            height: e.nativeEvent.layout.height,
            width: e.nativeEvent.layout.width,
      })
    }

    render() {
        var {percent, radius, frameTime, bgColor, fwColor, lineWidth, duration, fontColor, fontSize} = this.props;
        var concatHtml = `${this.state.init}
        var percent = ${percent};
        var r = ${radius} ;
        var frameTime = ${frameTime};
        var bgColor = '${bgColor}';
        var fwColor = '${fwColor}';
        var lineWidth = ${lineWidth};
        var duration = ${duration};
        var fontColor = '${fontColor}';
        var fontSize = ${fontSize};
        ${this.state.end}`;

        return (
            <View style={[styles.wrap, {width: this.props.radius , height: this.props.radius }]}> 
              <WebView
                  onLayout={this.reRenderWebView}
                  style={[styles.wView,{
                    width: this.props.radius * 2, 
                    height: this.props.radius * 2,
                    backgroundColor:'transparent',
                    overflow: 'hidden'
                  }]}
                  source={{ html: concatHtml}}
                  javaScriptEnabled={true}
                  domStorageEnabled={true}
                  scalesPageToFit={true}
                  scrollEnabled={false}
                  onMessage={(e) => {console.log(JSON.parse(e.nativeEvent.data))}}
                  automaticallyAdjustContentInsets={true}
              />
            </View>
        );
    };
};

var styles = StyleSheet.create({
    wrap: {
      overflow: 'hidden',
      position: 'relative',
    },
    wView: {
      position: 'absolute',
      top: 0,
      left: 0
    }
});

PercentCircle.defaultProps = {
  /* 圆圈半径 */
  radius: 75,
  /* 需要显示的百分比 */
  percent: 0,
  /* 每帧刷新的时间 */
  frameTime: 30,
  /* 背景圈的颜色 */
  bgColor: '#e8e8e8',
  /* 前景圈颜色 */
  fwColor: 'rgba(0, 188, 212, 0.65)',
  /* 圆圈border的粗细 */
  lineWidth: 20,
  /* 动画持续时间 */
  duration: 750,
  /* 'square' | 'round'  */
  lineCap: 'square',
  /* 字体颜色 */
  fontColor: '#fd8320',
  /* 字体大小 */
  fontSize: 60
}

module.exports = PercentCircle;