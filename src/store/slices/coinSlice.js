import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
    count: 0,
    maximum: 1,
    able: 1,
    oneTap: 10,
    multitapPrice: 1000,
    energyPrice: 2100,
    skin: './img/coin-btn.png',
    skinPrice: 1000000,
    isChanged: false,
    isBuy: false,
    currentActive: 'secondSkin',
    localId: 'secondSkin',
    loading: false,
    error: null,
    autofarm: false,
    hasLoaded: false, // добавлено новое состояние
    tasks_id_done: [], // добавлено новое состояние

};

// Thunk для получения данных пользователя
export const fetchUserPoints = createAsyncThunk(
    'coin/fetchUserPoints',
    async (telegram_id) => {
        const response = await fetch(`https://69198d2284674affe33d7248d493d8a5.serveo.net/api/user/${telegram_id}`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return data;
    }
);

// Thunk для добавления кликов и обновления энергии
export const addClicks = createAsyncThunk(
    'coin/addClicks',
    async ({ telegram_id, clicks, energy }) => {
        const response = await fetch('https://69198d2284674affe33d7248d493d8a5.serveo.net/api/clicks', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ telegram_id, clicks, energy })
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        return data.farm_coins;
    }
);


// Thunk для покупки multitap
export const buyMultitap = createAsyncThunk(
    'coin/buyMultitap',
    async ({ telegram_id, multitapPrice }) => {
        const response = await fetch('https://69198d2284674affe33d7248d493d8a5.serveo.net/api/buy/multitap', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ telegram_id, multitapPrice })
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        return data;
    }
);

// Thunk для покупки energy
export const buyEnergy = createAsyncThunk(
    'coin/buyEnergy',
    async ({ telegram_id, price }) => {
        const response = await fetch('https://69198d2284674affe33d7248d493d8a5.serveo.net/api/buy/energy', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ telegram_id, price })
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        return data;
    }
);

// Thunk для покупки autofarm
export const buyAutofarm = createAsyncThunk(
    'coin/buyAutofarm',
    async ({ telegram_id, price }) => {
        const response = await fetch('https://69198d2284674affe33d7248d493d8a5.serveo.net/api/buy/autofarm', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ telegram_id, price })
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        return data;
    }
);

// Thunk для покупки скинов
export const buySkin = createAsyncThunk(
    'coin/buySkin',
    async ({ telegram_id, price, skin }) => {
        const response = await fetch('https://69198d2284674affe33d7248d493d8a5.serveo.net/api/buy/skin', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ telegram_id, price, skin })
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        return data;
    }
);

// Thunk для изменения скина
export const changeSkin = createAsyncThunk(
    'coin/changeSkin',
    async ({ telegram_id, skin }) => {
        const response = await fetch('https://69198d2284674affe33d7248d493d8a5.serveo.net/api/change/skin', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ telegram_id, skin })
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        return data;
    }
);
// Thunk для проверки подписки и обновления задач
export const checkSubscriptionAndUpdateTask = createAsyncThunk(
    'coin/checkSubscriptionAndUpdateTask',
    async ({ telegram_id, channel_id, task_id, price }) => {
        const response = await fetch('https://69198d2284674affe33d7248d493d8a5.serveo.net/api/check-subscription', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ telegram_id, channel_id, task_id, price }),
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        return { isMember: data.isMember, task_id };
    }
);

export const coinSlice = createSlice({
    name: 'coin',
    initialState,
    reducers: {
        increment: (state) => {
            if (state.able >= 10) {
                state.count += state.oneTap;
            }
        },
        increase: (state) => {
            if (state.able >= 10) {
                state.able -= 10;
            }
        },
        editSkin: (state, action) => {
            state.skin = action.payload;
        },
        buySkinSl: (state) => {
            state.isBuy = true;
        },
        setMaximum: (state) => {
            state.able = state.maximum;
        },
        editActive: (state, action) => {
            state.currentActive = action.payload;
        },
        editLocal: (state, action) => {
            state.localId = action.payload;
        },
        raiseEnergy: (state) => {
            if (state.able < state.maximum) {
                state.able += 1;
            }
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchUserPoints.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchUserPoints.fulfilled, (state, action) => {
                state.loading = false;
                state.count = action.payload.farm_coins;
                state.multitap = action.payload.multitap;
                state.oneTap = 10 + action.payload.multitap;
                state.maximum = action.payload.energy;
                state.autofarm = action.payload.autofarm;
                state.current_skin = action.payload.current_skin;
                state.skin = action.payload.current_skin;
                state.skins = action.payload.skins;
                state.able = action.payload.able;
                state.hasLoaded = true; // Устанавливаем флаг hasLoaded в true после первой загрузки
                state.tasks_id_done = action.payload.tasks_id_done
            })
            .addCase(fetchUserPoints.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(addClicks.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(addClicks.fulfilled, (state, action) => {
                state.loading = false;
                state.count = action.payload;
            })
            .addCase(addClicks.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(buyMultitap.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(buyMultitap.fulfilled, (state, action) => {
                state.loading = false;
                state.count = action.payload.farm_coins;
                state.multitap = action.payload.multitap;
            })
            .addCase(buyMultitap.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(buyEnergy.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(buyEnergy.fulfilled, (state, action) => {
                state.loading = false;
                state.count = action.payload.farm_coins;
                state.energy = action.payload.energy;
            })
            .addCase(buyEnergy.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(buyAutofarm.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(buyAutofarm.fulfilled, (state, action) => {
                state.loading = false;
                state.count = action.payload.farm_coins;
                state.autofarm = action.payload.autofarm;
            })
            .addCase(buyAutofarm.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(buySkin.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(buySkin.fulfilled, (state, action) => {
                state.loading = false;
                state.count = action.payload.farm_coins;
                state.skins = action.payload.skins;
            })
            .addCase(buySkin.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(changeSkin.fulfilled, (state, action) => {
                state.skin = action.payload.current_skin;
            })
            .addCase(changeSkin.rejected, (state, action) => {
                state.error = action.error.message;
            })
            .addCase(checkSubscriptionAndUpdateTask.fulfilled, (state, action) => {
                if (action.payload.isMember) {
                    state.tasks_id_done.push(action.payload.task_id);
                }
            })
            .addCase(checkSubscriptionAndUpdateTask.rejected, (state, action) => {
                state.error = action.error.message;
            });
    },
});

export const { increment, increase, editSkin, buySkinSl, editActive, editLocal, raiseEnergy, setMaximum } = coinSlice.actions;

export default coinSlice.reducer;
