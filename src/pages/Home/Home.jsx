import Coin from '../../components/Coin/Coin';
import './Home.css'

function Home() {

    const tg = window.Telegram.WebApp;

    return (
        <main className="home noselect">
            <div className="home_info">
                <div className="home_info_block">
                    {tg.initDataUnsafe?.user && (
                        <>
                            <img src="./img/farmer_logo.gif" alt="photo" className='profile_img' />
                            <h4 className='profile_title'>{tg.initDataUnsafe.user.first_name}</h4>

                        </>
                    )}
                </div>
                <div className="home_info_block">
                    <img src="./img/money-bag.png" alt="money" />
                    <h4 className='profile_title'>Stage: 0</h4>
                </div>
            </div>

            <Coin />
        </main>
    )
}

export default Home