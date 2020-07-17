import React, { Component } from 'react';
import BulletScreen from 'rc-bullets';
import { Input } from 'antd';
import { connect } from 'dva';

import styles from './index.less';

const { Search } = Input;

@connect(({ wsSocket }) => ({
  wsSocket,
}))
class Page extends Component {
  // 构造
  constructor(props) {
    super(props);
    // 初始状态
    this.state = {
      inputMessage: null,
    };
    this.screen = null;
  }

  componentDidMount() {
    this.screen = new BulletScreen('.screen', { duration: 20 });

  }

  componentWillReceiveProps(nextProps) {
    if (!this.props.wsSocket.messageData.id && nextProps.wsSocket.messageData.id) {
      this.screen.push({
        msg: nextProps.wsSocket.messageData.message,
        head: nextProps.wsSocket.messageData.avatar,
        color: '#eee',
        size: 'small',
        backgroundColor: 'rgba(2,2,2,.3)',
      });
    } else if (nextProps.wsSocket.messageData.id !== this.props.wsSocket.messageData.id && this.screen) {
      this.screen.push({
        msg: nextProps.wsSocket.messageData.message,
        head: nextProps.wsSocket.messageData.avatar,
        color: '#eee',
        size: 'small',
        backgroundColor: 'rgba(2,2,2,.3)',
      });
    }
  }

  handleSendMessage = value => {
    const user_sid = localStorage.getItem('user_sid')
    if (value && user_sid) {
      this.querySendMessage(user_sid, value);
    }
  };

  querySendMessage = (user_sid,message) => {
    const { dispatch } = this.props;
    this.setState({inputMessage: null},()=>{
      dispatch({
        type: 'wsSocket/querySendMessage',
        payload: {
          user_sid,
          message,
        },
      })
    })
  };

  render() {
    const { inputMessage } = this.state;
    return (
      <main>
        <div className="screen" style={{ width: '100vw', height: '80vh' }}></div>
        <div className={styles.send_wrapper}>
          <Search
            value={inputMessage}
            onChange={e => this.setState({inputMessage: e.target.value})}
            className={styles.input_wrapper}
            placeholder="说点啥吧"
            onSearch={value => this.handleSendMessage(value)}
            onPressEnter={e => this.handleSendMessage(e.target.value)}
            enterButton='发送'
            size="large"
            style={{ minWidth: 300, maxWidth: 500 }}
          />
        </div>
      </main>
    );
  }
}

export default Page;
