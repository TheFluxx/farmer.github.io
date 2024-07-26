import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  tasks: [
    {
      id: 1,
      name: 'FarmerCheck',
      img: './img/farmer_logo.gif',
      price: '1 000',
      link: 'https://t.me/TestFarmerCheck',
      channel_id: '@TestFarmerCheck' // добавлено поле channel_id
    },
    {
      id: 2,
      name: 'CheckerFM',
      img: './img/energy.gif',
      price: '1 000',
      link: 'https://t.me/CheckerFM1',
      channel_id: '@CheckerFM1' // добавлено поле channel_id
    },
    {
      id: 3,
      name: 'TestFarmer',
      img: './img/Comp.gif',
      price: '1 000',
      link: 'https://t.me/TestFarmer2',
      channel_id: '@TestFarmer2' // добавлено поле channel_id
    },
    {
      id: 4,
      name: 'CheckFarmer',
      img: './img/molnialogo_5.gif',
      price: '1 000',
      link: 'https://t.me/CheckFarmer',
      channel_id: '@CheckFarmer' // добавлено поле channel_id
    }
  ]
};

export const coinSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {}
});

export default coinSlice.reducer;
