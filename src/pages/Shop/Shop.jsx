import './Shop.css';
import { useSelector, useDispatch } from 'react-redux';
import format from '../../utils/format';
import { useEffect, useState } from 'react';
import { buyMultitap, buyEnergy, buyAutofarm, buySkin, fetchUserPoints, changeSkin } from '../../store/slices/coinSlice';
import { Swiper, SwiperSlide } from 'swiper/react';
import { editActive, editLocal } from '../../store/slices/coinSlice';

function Shop() {
    const dispatch = useDispatch();
    const tg = window.Telegram.WebApp;
    const telegram_id = tg.initDataUnsafe.user.id;

    useEffect(() => {
        dispatch(fetchUserPoints(telegram_id));
    }, [dispatch, telegram_id]);

    const lvl = useSelector((state) => state.coin.multitap);
    const energyLevel = useSelector((state) => state.coin.energyLevel);
    const currentId = useSelector((state) => state.coin.currentActive);
    const localId = useSelector((state) => state.coin.localId);
    const autofarm = useSelector((state) => state.coin.autofarm);
    const currentSkin = useSelector((state) => state.coin.current_skin);
    const skins = useSelector((state) => state.coin.skins);

    const calculatePrice = (basePrice, level) => {
        return basePrice * Math.pow(2.5, level);
    };

    const multitapPrice = calculatePrice(1000, lvl);
    const energyPrice = calculatePrice(1000, (energyLevel - 6500) / 500);

    const [multitap, setMultitap] = useState(format(multitapPrice.toString()));
    const [energy, setEnergy] = useState(format(energyPrice.toString()));

    const autofarmStart = (e) => {
        tg.HapticFeedback.notificationOccurred('success');
        dispatch(buyAutofarm({ telegram_id, price: 1000000 }));
    };

    const nextLvl = () => {
        tg.HapticFeedback.impactOccurred('heavy');
        dispatch(buyMultitap({ telegram_id, price: multitapPrice }));
    };

    const upgradeEnergy = () => {
        tg.HapticFeedback.impactOccurred('heavy');
        dispatch(buyEnergy({ telegram_id, price: energyPrice }));
    };

    const buySkinHandler = (e, skin) => {
        tg.HapticFeedback.notificationOccurred('success');
        dispatch(buySkin({ telegram_id, price: 1000000, skin }));
    };

    const changeSkinHandler = async (e, skin) => {
        tg.HapticFeedback.notificationOccurred('success');
        await dispatch(changeSkin({ telegram_id, skin }));
        await dispatch(fetchUserPoints(telegram_id));
    };

    useEffect(() => {
        if (document.querySelector(`#${localId}`)) {
            a();
        }
    }, [currentId, localId]);

    useEffect(() => {
        const currentElement = document.querySelector(`#${currentId}`);
        if (currentElement) {
            const activeButton = currentElement.querySelector('.active_btn');
            const buyButton = currentElement.querySelector('.buy_btn');

            if (activeButton) activeButton.classList.add('disactive');
            if (buyButton) buyButton.classList.remove('disactive');
        }
    }, [currentId]);

    const a = async () => {
        try {
            const localElement = document.querySelector(`#${localId}`);
            const currentElement = document.querySelector(`#${currentId}`);

            if (localElement) {
                const localActiveButton = localElement.querySelector('.active_btn');
                const localBuyButton = localElement.querySelector('.buy_btn');

                if (localActiveButton) localActiveButton.classList.add('disactive');
                if (localBuyButton) localBuyButton.classList.remove('disactive');
            }

            if (currentElement) {
                const currentActiveButton = currentElement.querySelector('.active_btn');
                const currentBuyButton = currentElement.querySelector('.buy_btn');

                if (currentActiveButton) currentActiveButton.classList.remove('disactive');
                if (currentBuyButton) currentBuyButton.classList.add('disactive');
            }

            await dispatch(editLocal(currentId));
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <main className='shop noselect'>
            <header className="header">
                <h2 className="header_txt">Shop</h2>
            </header>
            <hr />
            <div className="upgrade_block">
                <h2 className="header_txt">Upgrade</h2>
                <div className="upgrade_blocks">
                    <div className="upgrade_top">
                        <h5 className="upgrade_header">
                            Multitap
                        </h5>
                        <p className="upgrade_lvl">
                            {lvl} → {lvl + 1}
                        </p>
                        <div className="upgrade_price_block">
                            <img src="./img/money-shop.png" alt="money" />
                            <p className="upgrade_txt">{multitap}</p>
                        </div>
                        <button className="buy_btn" onClick={nextLvl}>
                            <span>
                                Buy
                            </span>
                        </button>
                    </div>
                    <div className="upgrade_top">
                        <h5 className="upgrade_header">
                            Energy
                        </h5>
                        <p className="upgrade_lvl">
                            +500
                        </p>
                        <div className="upgrade_price_block">
                            <img src="./img/money-shop.png" alt="money" />
                            <p className="upgrade_txt">{energy}</p>
                        </div>
                        <button className="buy_btn" onClick={upgradeEnergy}>
                            <span>
                                Buy
                            </span>
                        </button>
                    </div>
                </div>
                <div className="upgrade_bottom">
                    <div className="upgrade_sprite">
                        <img src="./img/sprite.png" alt="sprite" />
                    </div>
                    <div className="upgrade_autofarm">
                        <h5 className="upgrade_header">
                            Auto_farm
                        </h5>
                        <div className="upgrade_price_block">
                            <img src="./img/money-shop.png" alt="money" />
                            <p className="upgrade_txt">1 000 000</p>
                        </div>
                    </div>
                    <button className={`buy_btn ${autofarm ? 'disactive' : ''}`} onClick={autofarmStart}>
                        <span>
                            Buy
                        </span>
                    </button>
                    <button className={`buy_btn select_btn active_btn ${!autofarm ? 'disactive' : ''}`}>
                        <span>
                            Active
                        </span>
                    </button>
                </div>
            </div>
            <div className="skins_block">
                <h2 className="header_txt">Skins</h2>
                <Swiper
                    spaceBetween={50}
                    slidesPerView={1}
                >
                    <SwiperSlide>
                        <div className="upgrade_bottom skin_block" id='firstSkin'>
                            <img src="./img/farmer_logo-2.gif" alt="sprite" className='sprite' />
                            <div className="upgrade_autofarm">
                                <h5 className="upgrade_header">
                                    CryptoFarm
                                </h5>
                                {!skins.includes('./img/farmer_logo-2.gif') && (
                                    <div className="upgrade_price_block">
                                        <img src="./img/money-shop.png" alt="money" />
                                        <p className="upgrade_txt">1 000 000</p>
                                    </div>
                                )}
                            </div>
                            {!skins.includes('./img/farmer_logo-2.gif') && (
                                <button className="buy_btn" onClick={(e) => buySkinHandler(e, './img/farmer_logo-2.gif')}>
                                    <span>
                                        Buy
                                    </span>
                                </button>
                            )}
                            {skins.includes('./img/farmer_logo-2.gif') && currentSkin !== './img/farmer_logo-2.gif' && (
                                <button className="buy_btn select_btn" onClick={(e) => changeSkinHandler(e, './img/farmer_logo-2.gif')}>
                                    <span>
                                        Select
                                    </span>
                                </button>
                            )}
                            {currentSkin === './img/farmer_logo-2.gif' && (
                                <button className="buy_btn select_btn active_btn">
                                    <span>
                                        Active
                                    </span>
                                </button>
                            )}
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className="upgrade_bottom skin_block" id='secondSkin'>
                            <img src="./img/coin-btn.png" alt="sprite" className='sprite' />
                            <div className="upgrade_autofarm">
                                <h5 className="upgrade_header">
                                    Farmer
                                </h5>
                            </div>
                            {currentSkin !== './img/coin-btn.png' && (
                                <button className="buy_btn select_btn" onClick={(e) => changeSkinHandler(e, './img/coin-btn.png')}>
                                    <span>
                                        Select
                                    </span>
                                </button>
                            )}
                            {currentSkin === './img/coin-btn.png' && (
                                <button className="buy_btn select_btn active_btn">
                                    <span>
                                        Active
                                    </span>
                                </button>
                            )}
                        </div>
                    </SwiperSlide>
                </Swiper>
            </div>
        </main>
    );
}

export default Shop;
