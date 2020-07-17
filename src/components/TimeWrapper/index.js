import React, { Component } from 'react';
import { connect } from 'dva';

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
      durTime: 0,
    };
    this.screen = null;
  }

  componentWillMount() {
    const durTime = parseInt(localStorage.getItem('durTime')) || 0
    this.setState({
      durTime
    })
  }

  componentDidMount() {
    setInterval(()=>{
      this.setState({
        durTime: this.state.durTime + 1000
      },()=>{
        localStorage.setItem('durTime', this.state.durTime)
      })
    }, 1000)
  }

  formatDuring = (mss) => {
    var days = parseInt(mss / (1000 * 60 * 60 * 24));
    var hours = parseInt((mss % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = parseInt((mss % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = ((mss % (1000 * 60)) / 1000).toFixed();
    return {days,hours,minutes,seconds};
  }

  render() {
    const { durTime } = this.state;
    return (
      <main className={styles.time_code}>
        <p>
          {this.formatDuring(durTime).days}
          <small>d</small>
          {this.formatDuring(durTime).hours}
          <small>h</small>
          {this.formatDuring(durTime).minutes}
          <small>m</small>
          {this.formatDuring(durTime).seconds}
          <small>s</small>
        </p>
        <h2>您在此发呆的时间</h2>
      </main>
    );
  }
}

export default Page;
