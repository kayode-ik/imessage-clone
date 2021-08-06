import {createSlice } from '@reduxjs/toolkit';
// import { fetchCount } from './features/counter/counterAPI';

const initialState = {
  chatId: null,
  chatName: null,

  // status: 'idle',
};

export const chatSlice = createSlice({
  name: 'chat',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    setChat: (state, action) => {

      state.chatId = action.payload.chatId;
      state.chatName = action.payload.chatName;
    },
  },
});

export const {setChat } = chatSlice.actions;

export const selectChatId = (state) => state.chat.chatId;
export const selectChatName = (state) => state.chat.chatName ;

export default chatSlice.reducer;
