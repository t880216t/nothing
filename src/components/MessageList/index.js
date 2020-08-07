import React, { Component } from 'react';
import { connect } from 'dva';
import { Icon, Drawer, List, Avatar } from 'antd';

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
      showMessage: false,
      messageList: [],
    };
  }

  componentDidMount(){
    this.updateMessageList()
  }

  updateMessageList=()=>{
    const { messageList } = this.props.wsSocket
    if (messageList){
      this.setState({messageList})
    }
  }

  handleShowMessage=()=>{
    this.setState({
      showMessage: !this.state.showMessage,
    })
  }


  render() {
    const { showMessage, messageList } = this.state;
    return (
      <div>
        <div className={styles.btnInr} onClick={() => this.handleShowMessage()}>
          <Icon style={{color: 'white'}} type="left" />
        </div>
        <Drawer
          className={styles.drawer_container}
          drawerStyle={{background: '#222', color: '#fff'}}
          bodyStyle={{background: '#222', color: '#fff'}}
          placement="right"
          closable={false}
          width={'520px'}
          onClose={this.handleShowMessage}
          visible={showMessage}
        >
          <List
            itemLayout="horizontal"
            dataSource={messageList}
            className={styles.message_list}
            split={false}
            renderItem={item => (
              <List.Item>
                <List.Item.Meta
                  avatar={<Avatar size='large' className={styles.avatar} src={item.avatar} />}
                  title={item.message}
                  description={item.addTime}
                />
              </List.Item>
            )}
          />
        </Drawer>
      </div>
    );
  }
}

export default Page;
