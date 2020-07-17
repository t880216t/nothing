import {
  initSocket,
  querySendMessage,
  queryAddUser,
} from '@/services/wsApi';

const Model = {
  namespace: 'wsSocket',
  state: {
    avatar: null,
    configData: {},
    messageData: {id: null, message: null},
  },
  subscriptions: {
    socket({ dispatch }) { // socket相关
      return initSocket(data => {
        switch (data.command) {
          case 'push_message':
            dispatch({
              type: 'setServerMessage',
              payload: data.content,
            })
            break;
          case 'set_config':
            dispatch({
              type: 'setConfig',
              payload: data.content,
            })
            break;
        }
      })
    },
  },
  effects: {
    *setConfig({ payload }, { put }) {
      console.log('payload', payload)
      yield put({ type: 'updateState', payload: { configData: payload } });
    },
    *setServerMessage({ payload }, { put }) {
      yield put({ type: 'updateState', payload: { messageData: payload } });
    },
    *querySendMessage({ payload }, { call }) {
      yield call(querySendMessage, payload);
    },
    *queryAddUser({ payload }, { call, put }) {
      const response = yield call(queryAddUser, payload);
      yield put({ type: 'updateState', payload: { avatar: response.imgurl } });
    },
  },
  reducers: {
    updateState(state, { payload }) {
      return { ...state, ...payload };
    },
  },
};
export default Model;
