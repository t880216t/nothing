import React, { Component } from 'react';
import Vudio from 'vudio.js';
import { connect } from 'dva';

import BulletScreen from '../components/BulletScreen';
import TimeWrapper from '../components/TimeWrapper';
import AudioPlay from '../components/AudioPlay';

import styles from './index.less';

@connect(({ wsSocket }) => ({
  wsSocket,
}))
class Page extends Component {
  // 构造
  constructor(props) {
    super(props);
    // 初始状态
    this.state = {
      musicUrl: '/assert/eqyy.mp3',
      clientWidth: 1024,
      avatar: '',
      isMobile: false,
    };
    this.vudio = null;
    this.durTime = 0;
  }

  componentWillMount() {
    const clientWidth = document.body.clientWidth;
    const isMobile = /Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent);
    this.setState({ clientWidth, isMobile });
  }

  componentDidMount() {
    this.durTime = localStorage.getItem('durTime') || 0;
    // this._initPlay()
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.wsSocket.configData !== this.props.wsSocket.configData) {
      if (nextProps.wsSocket.configData.musicUrl !== this.state.musicUrl){
        this.setState({
          musicUrl: nextProps.wsSocket.configData.musicUrl,
        },() => {
          if (!localStorage.getItem('user_sid')){
            localStorage.setItem('user_sid',nextProps.wsSocket.configData.sid)
            const { dispatch } = this.props;
            dispatch({
              type: 'wsSocket/queryAddUser',
              payload: {
                user_id: nextProps.wsSocket.configData.sid
              }
            })
              .then(() => {
                const { avatar } = this.props.wsSocket
                if (avatar){
                  this.setState({
                    avatar
                  })
                }
              })
          }
        })
      }
    }
  }

  _initPlay = () => {
    const { clientWidth, isMobile } = this.state;
    const audioObj = document.getElementsByTagName('audio')[0];
    const canvasObj = document.querySelector('#canvas');
    if (!this.vudio && audioObj && canvasObj) {
      this.vudio = new Vudio(audioObj, canvasObj, {
        effect: 'waveform', // 当前只有'waveform'这一个效果
        accuracy: !isMobile ? 256 : 64, // 精度,实际表现为波形柱的个数，范围16-16348，必须为2的N次方
        width: clientWidth,
        waveform: {
          maxHeight: 100, // 最大波形高度
          minHeight: 1, // 最小波形高度
          spacing: 1, // 波形间隔
          color: [
            [0, '#1e90ff'],
            [0.3, '#1e90ff'],
            [0.3, '#5352ed'],
            [0.7, '#5352ed'],
            [0.7, '#3742fa'],
            [1, '#3742fa'],
          ], // 波形颜色，可以传入数组以生成渐变色
          shadowBlur: 0, // 阴影模糊半径
          shadowColor: '#5352ed', // 阴影颜色
          fadeSide: true, // 渐隐两端
          horizontalAlign: 'center', // 水平对齐方式，left/center/right
          verticalAlign: 'middle', // 垂直对齐方式 top/middle/bottom
        },
      });
      this.vudio.dance();
    }
  };

  handleCanPlay = () => {
    this._initPlay()
  }

  handleError = (e) => {
    console.log('handleError',e)
  }

  render() {
    const { isMobile, musicUrl, avatar } = this.state;
    return (
      <div className={styles.container}>
        <div className={styles.canva_wrapper}>
          <canvas className={styles._canvas} width="100%" id="canvas"></canvas>
        </div>
        <div className={styles.audio_wrapper}>
          <AudioPlay autoPlay loop showControl id={'myAudio'} src={musicUrl} onCanPlay={this.handleCanPlay()}></AudioPlay>
        </div>
        <div className={styles.push_wrapper} style={{ bottom: !isMobile ? '30vh' : 1 }}>
          <BulletScreen avatar={avatar}/>
        </div>
        <div className={styles.time_wrapper} style={{ bottom: !isMobile ? '30vh' : 1 }}>
          <TimeWrapper durTime={this.durTime} />
        </div>
      </div>
    );
  }
}

export default Page;
