import React, { Component } from 'react'
import Vudio from 'vudio.js'
import ReactAudioPlayer from 'react-audio-player';

import testAudio from '../assets/b.mp3'

import styles from './index.less';

export default class Page extends Component{
  // 构造
    constructor(props) {
      super(props);
      // 初始状态
      this.state = {
      };
      this.vudio = null
    }

  componentDidMount() {
    this._initPlay()
  }

  _initPlay=()=>{
    if (!this.vudio){
      var audioObj = document.getElementsByTagName('audio')[0];
      var canvasObj = document.querySelector('#canvas');
      this.vudio = new Vudio(audioObj, canvasObj, {
        effect : 'waveform', // 当前只有'waveform'这一个效果
        accuracy : document.body.clientWidth > 800 ? 256 : 64, // 精度,实际表现为波形柱的个数，范围16-16348，必须为2的N次方
        width: document.body.clientWidth ,
        waveform : {
          maxHeight : 100, // 最大波形高度
          minHeight : 1, // 最小波形高度
          spacing: 1, // 波形间隔
          color: [
            [0, '#1e90ff'],
            [0.3, '#1e90ff'],
            [0.3, '#5352ed'],
            [0.7, '#5352ed'],
            [0.7, '#3742fa'],
            [1, '#3742fa'],
          ], // 波形颜色，可以传入数组以生成渐变色
          shadowBlur : 0, // 阴影模糊半径
          shadowColor : '#5352ed', // 阴影颜色
          fadeSide : true, // 渐隐两端
          horizontalAlign : 'center', // 水平对齐方式，left/center/right
          verticalAlign: 'middle' // 垂直对齐方式 top/middle/bottom
        }
      });
      this.vudio.dance();
    }
  }

  render(){
      return(
        <div className={styles.container}>
          <div className={styles.canva_warpper}>
            <canvas className={styles._canvas} width="100%" id="canvas"></canvas>
          </div>
          <div className={styles.audio_warpper}>
            <ReactAudioPlayer
              src={testAudio}
              autoPlay
              controls
              loop
            />
          </div>
        </div>
      )
  }
}
