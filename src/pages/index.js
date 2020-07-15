import React, { Component } from 'react'
import Vudio from 'vudio.js'
import {Player} from 'react-music-widget'

import 'react-h5-audio-player/lib/styles.css';

import testAudio from '../assets/b.mp3'

import styles from './index.less';

export default class Page extends Component{
  // 构造
    constructor(props) {
      super(props);
      // 初始状态
      this.state = {
        musicList: [{
          url: testAudio,
          name: '二泉映月-阿炳'
        }]
      };
      this.vudio = null
    }

  componentDidMount() {
    setTimeout(()=> this._initPlay(),3000)
  }

  _initPlay=()=>{
    if (!this.vudio){
      var audioObj = document.getElementsByTagName('audio')[0];
      var canvasObj = document.querySelector('#canvas');
      this.vudio = new Vudio(audioObj, canvasObj, {
        effect : 'waveform', // 当前只有'waveform'这一个效果
        accuracy : 256, // 精度,实际表现为波形柱的个数，范围16-16348，必须为2的N次方
        width: document.body.clientWidth ,
        height: 600,
        waveform : {
          maxHeight : 100, // 最大波形高度
          minHeight : 1, // 最小波形高度
          spacing: 1, // 波形间隔
          color: [
            [0, '#f00'],
            [0.3, '#f00'],
            [0.3, '#f90'],
            [0.7, '#f90'],
            [0.7, '#ff0'],
            [1, '#ff0'],
          ], // 波形颜色，可以传入数组以生成渐变色
          shadowBlur : 0, // 阴影模糊半径
          shadowColor : '#f00', // 阴影颜色
          fadeSide : true, // 渐隐两端
          horizontalAlign : 'center', // 水平对齐方式，left/center/right
          verticalAlign: 'middle' // 垂直对齐方式 top/middle/bottom
        }
      });
      this.vudio.dance();
    }
  }

  render(){
      const { musicList } = this.state;
      return(
        <div className={styles.container}>
          <div className={styles.canva_warpper}>
            <canvas width="100%" id="canvas"></canvas>
          </div>
          <div className={styles.audio_warpper}>
            <Player panelColor="#636e72" autoHidden={true} musicList={musicList} position='bottom'/>
            {/*<ReactAudioPlayer*/}
            {/*  src={testAudio}*/}
            {/*  // autoPlay*/}
            {/*  controls*/}
            {/*/>*/}
          </div>
        </div>
      )
  }
}
