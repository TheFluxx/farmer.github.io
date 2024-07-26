import './Task.css';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { checkSubscriptionAndUpdateTask } from '../../store/slices/coinSlice';

function Task(props) {
    const { id, name, img, price, link, channel_id } = props;
    const [buttonText, setButtonText] = useState('Start');
    const [showModal, setShowModal] = useState(false);
    const [modalMessage, setModalMessage] = useState('');
    const [hasChecked, setHasChecked] = useState(false);
    const dispatch = useDispatch();
    const tasks_id_done = useSelector((state) => state.coin.tasks_id_done);
    const tg = window.Telegram.WebApp;
    const telegram_id = tg.initDataUnsafe.user.id;

    const handleStartClick = (e) => {
        tg.HapticFeedback.notificationOccurred('success');
        e.preventDefault();
        window.Telegram.WebApp.openTelegramLink(link);
        setTimeout(() => {
            setHasChecked(true);
        }, 1000); // задержка в 5 секунд перед отображением кнопки "Check"
    };

    const handleCheckClick = async () => {
        tg.HapticFeedback.notificationOccurred('success');
        const result = await dispatch(checkSubscriptionAndUpdateTask({ telegram_id, channel_id, task_id: id, price: price }));
        if (result.payload.isMember) {
            setModalMessage(`🎉 Congratulations, you have earned: ${price} $FARM coins!`);
        } else {
            setModalMessage('😢 You have not subscribed 😢');
        }
        setShowModal(true);
    };

    const handleModalClose = () => {
        setShowModal(false);
    };

    const isSubscribed = tasks_id_done.includes(id);

    return (
        <div className="task">
            <img src={img} alt="sprite" />
            <div className="upgrade_autofarm task_mid">
                <h5 className="upgrade_header">
                    {name}
                </h5>
                <div className="upgrade_price_block">
                    <img src="./img/money-shop.png" alt="money" />
                    <p className="upgrade_txt">{price}</p>
                </div>
            </div>
            {!isSubscribed && !hasChecked && (
                <button className="buy_btn start_btn" onClick={handleStartClick}>
                    <span>Start</span>
                </button>
            )}
            {!isSubscribed && hasChecked && (
                <button className="buy_btn check_btn" onClick={handleCheckClick}>
                    <span>Check</span>
                </button>
            )}
            {isSubscribed && (
                <button className="buy_btn done_btn">
                    <span>Done</span>
                </button>
            )}

            {/* {showModal && (
                <div className="modal">
                    <div className="modal-content">
                        <span className="close" onClick={handleModalClose}>&times;</span>
                        <p>{modalMessage}</p>
                    </div>
                </div>
            )} */}
        </div>
    );
}

export default Task;
