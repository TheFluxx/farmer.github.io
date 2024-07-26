import { useSelector, useDispatch } from 'react-redux';
import { increment, increase, raiseEnergy, fetchUserPoints, addClicks } from '../../store/slices/coinSlice';
import { useEffect, useState, useRef } from 'react';
import format from '../../utils/format';
import './Coin.css';

function Coin() {
    const tg = window.Telegram.WebApp;

    const count = useSelector((state) => state.coin.count);
    const able = useSelector((state) => state.coin.able);
    const maximum = useSelector((state) => state.coin.maximum);
    const oneTap = useSelector((state) => state.coin.oneTap);
    const skin = useSelector((state) => state.coin.current_skin); // Используем текущий скин
    const loading = useSelector((state) => state.coin.loading);
    const hasLoaded = useSelector((state) => state.coin.hasLoaded);
    const dispatch = useDispatch();
    const telegram_id = tg.initDataUnsafe.user.id;

    const [counter, setCounter] = useState(1);
    const [clicks, setClicks] = useState([]);
    const [displayCount, setDisplayCount] = useState(count);
    const [displayEnergy, setDisplayEnergy] = useState(able);
    const [isIncrementing, setIsIncrementing] = useState(false);
    const [isRequestPending, setIsRequestPending] = useState(false);

    const pointsToAdd = oneTap;
    const energyToReduce = 10;
    const countRef = useRef(count);
    const energyRef = useRef(able);

    useEffect(() => {
        dispatch(fetchUserPoints(telegram_id));
    }, [dispatch, telegram_id]);

    useEffect(() => {
        countRef.current = count;
        setDisplayCount(count);
    }, [count]);

    useEffect(() => {
        energyRef.current = able;
        setDisplayEnergy(able);
    }, [able]);

    const drawCount = (e) => {
        const y = e.targetTouches ? e.targetTouches[e.targetTouches.length - 1].clientY : e.clientY;
        const x = e.targetTouches ? e.targetTouches[e.targetTouches.length - 1].clientX : e.clientX;

        setClicks([...clicks, { id: counter, x, y }]);
        setCounter(counter + 1);
    };

    const handleAnimationEnd = (id) => {
        setClicks((prevClicks) => prevClicks.filter(click => click.id !== id));
    };

    const incrementMoney = async (e) => {
        if (isRequestPending || able < energyToReduce) {
            console.log("Request is pending or not enough able value");
            return;
        }

        setIsRequestPending(true); // Блокируем кнопку
        setIsIncrementing(true);
        window.Telegram.WebApp.HapticFeedback.notificationOccurred('success');
        drawCount(e);

        const newCount = countRef.current + pointsToAdd;
        const newEnergy = energyRef.current - energyToReduce;

        animateCount(countRef.current, newCount);
        animateEnergy(energyRef.current, newEnergy);

        try {
            await dispatch(increment());
            await dispatch(increase());
            await dispatch(addClicks({ telegram_id, clicks: pointsToAdd, energy: newEnergy }));

            countRef.current = newCount;
            energyRef.current = newEnergy;
        } catch (error) {
            console.error("Error occurred while incrementing money:", error);
        }

        setIsIncrementing(false);
        setIsRequestPending(false); // Разблокируем кнопку
    };

    useEffect(() => {
        const interval = setInterval(() => {
            dispatch(raiseEnergy());
        }, 100);

        return () => clearInterval(interval);
    }, [dispatch]);

    const animateCount = (start, end) => {
        if (start === end) return;
        const duration = 500;
        const stepTime = 20;
        const steps = duration / stepTime;
        const increment = (end - start) / steps;

        let current = start;
        const step = () => {
            current += increment;
            setDisplayCount(Math.floor(current));
            if ((increment > 0 && current < end) || (increment < 0 && current > end)) {
                requestAnimationFrame(step);
            } else {
                setDisplayCount(end);
            }
        };
        requestAnimationFrame(step);
    };

    const animateEnergy = (start, end) => {
        if (start === end) return;
        const duration = 500;
        const stepTime = 20;
        const steps = duration / stepTime;
        const decrement = (start - end) / steps;

        let current = start;
        const step = () => {
            current -= decrement;
            setDisplayEnergy(Math.floor(current));
            if ((decrement > 0 && current > end) || (decrement < 0 && current < end)) {
                requestAnimationFrame(step);
            } else {
                setDisplayEnergy(end);
            }
        };
        requestAnimationFrame(step);
    };

    if (loading && !hasLoaded) {
        return (
            <div className="loading-screen">
                <div className="loading-animation">
                    <div className="loading-text">Loading...</div>
                </div>
            </div>
        );
    }

    return (
        <div className="coin noselect">
            <div className="coin_count">
                <img src="./img/money-mini.png" alt="money" className="coin_mini" />
                <p className="coin_txt">{format(displayCount.toString())}</p>
            </div>
            <button
                className="coin_btn noselect"
                onTouchStart={incrementMoney}
                disabled={able < energyToReduce || isRequestPending}
                style={{ opacity: able < energyToReduce || isRequestPending ? 0.5 : 1 }}
            >
                <img src={skin} alt="coin" draggable="false" className='noselect' />
            </button>
            <div className="coin_band">
                <div className="coin_band_num">
                    <img src="./img/volt.png" alt="volt" />
                    <p className="coin_band_txt">{displayEnergy} <span>/ {maximum}</span></p>
                </div>
                <div className="coin_band_cont">
                    <div className="coin_band_block" style={{ width: `${(displayEnergy / maximum) * 100}%` }}></div>
                </div>
            </div>

            <div className="relative mt-4" style={{ zIndex: 10 }}>
                {clicks.map((click) => (
                    <div
                        key={click.id}
                        className="absolute text-5xl font-bold coin_new_tap"
                        style={{
                            top: `${click.y}px`,
                            left: `${click.x}px`,
                            zIndex: 20,
                        }}
                        onAnimationEnd={() => handleAnimationEnd(click.id)}
                    >
                        +{pointsToAdd}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Coin;
