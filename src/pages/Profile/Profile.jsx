import React from 'react';
import './Profile.css';

function Profile() {
    const invitationLink = "https://t.me/FarmerTapBot?start=5295136531";
    const tg = window.Telegram.WebApp;

    const copyToClipboard = () => {
        window.Telegram.WebApp.HapticFeedback.impactOccurred('heavy'); // Trigger haptic feedback

        if (navigator.clipboard) {
            navigator.clipboard.writeText(invitationLink).then(() => {
                alert('Invitation link copied to clipboard!');
            }, (err) => {
                console.error('Could not copy text: ', err);
            });
        } else {
            console.error('Clipboard API not supported');
        }
    };

    const sendInvitation = () => {
        window.Telegram.WebApp.HapticFeedback.notificationOccurred('success'); // Trigger haptic feedback

        const message = `Join me on Farmer TapBot! Click the link to get started: ${invitationLink}`;
        const telegramLink = `https://t.me/share/url?url=${encodeURIComponent(invitationLink)}&text=${encodeURIComponent(message)}`;
        window.Telegram.WebApp.openTelegramLink(telegramLink);
    };

    return (
        <main className="profile">
            <header className="header noselect">
                <h2 className="header_txt">Profile</h2>
            </header>
            <hr />
            <div className="profile_info noselect">
                <img src="./img/farmer_logo.gif" alt="Profile GIF" className="profile_big_img" />
                <div className="profile_info_block">
                    <p className="profile_name">{tg.initDataUnsafe.user.first_name}</p>
                    <p className="profile_username">@{tg.initDataUnsafe.user.username}</p>
                    <p className="profile_username profile_id">ID: {tg.initDataUnsafe.user.id}</p>
                </div>
            </div>
            <hr />
            <div className="profile_referal noselect">
                <h2 className="referal_header">Invite friends and earn coins </h2>
                <div className="referal_block">
                    <span>0 FRIEND</span>
                </div>
                <div className="referal_blocks">
                    <div className="referal_mini">
                        <p className="referal_txt">
                            Invite Friends without <br />Telegram Premium! For each friend, you’ll receive:
                        </p>
                        <div className="referal_money">
                            <p className="money_txt">+ 50 000</p>
                            <img src="./img/money-mini.png" alt="money" className="small-image" />
                        </div>
                    </div>
                    <svg width="23" height="6" viewBox="0 0 23 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M23 3L18 0.113249V5.88675L23 3ZM0 3.5H18.5V2.5H0V3.5Z" fill="#E8E22E" fill-opacity="0.52" />
                    </svg>
                    <div className="referal_mini">
                        <p className="referal_txt">
                            For each friend with Telegram Premium,  <br />you will receive:
                        </p>
                        <div className="referal_money">
                            <p className="money_txt">+ 250 000</p>
                            <img src="./img/money-mini.png" alt="money" className="small-image" />
                        </div>
                    </div>
                </div>
            </div>
            <div className="profile_link">
                <div className="big_link_btn">
                    <span>{invitationLink}</span>
                </div>
                <div className="small_link_btn" onClick={copyToClipboard}>
                    <svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M3.2232 10.8125H2.46427C2.06171 10.8125 1.67563 10.6526 1.39098 10.3679C1.10633 10.0833 0.946411 9.69722 0.946411 9.29466V2.4643C0.946411 2.06174 1.10633 1.67567 1.39098 1.39101C1.67563 1.10636 2.06171 0.946442 2.46427 0.946442H9.29463C9.69719 0.946442 10.0833 1.10636 10.3679 1.39101C10.6526 1.67567 10.8125 2.06174 10.8125 2.4643V3.22323M7.77677 6.25894H14.6071C15.4454 6.25894 16.125 6.93851 16.125 7.7768V14.6072C16.125 15.4454 15.4454 16.125 14.6071 16.125H7.77677C6.93848 16.125 6.25891 15.4454 6.25891 14.6072V7.7768C6.25891 6.93851 6.93848 6.25894 7.77677 6.25894Z" stroke="#B2B2B2" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                </div>
            </div>
            <div className="invite_friend_btn" onClick={sendInvitation}>
                <span>Invite a Friend</span>
            </div>
        </main>
    );
}

export default Profile;