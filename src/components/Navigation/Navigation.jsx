import './Navigation.css';
import { useSelector, useDispatch } from 'react-redux';
import { editActive } from '../../store/slices/navigationSlice';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';

function Navigation() {
    const count = useSelector((state) => state.navigation.active);
    const dispatch = useDispatch();
    const tg = window.Telegram.WebApp;

    const changeActive = (e) => {
        tg.HapticFeedback.impactOccurred('heavy');
        const id = e.currentTarget.id;
        dispatch(editActive(id));
    };

    useEffect(() => {
        if (document.querySelector('.active')) document.querySelector('.active').classList.remove('active');
        document.querySelector(`#${count}`).classList.add('active');
    }, [count]);

    useEffect(() => {
        const handleCopy = (e) => {
            e.preventDefault();
            alert('Copying is not allowed!');
        };

        document.addEventListener('copy', handleCopy);

        return () => {
            document.removeEventListener('copy', handleCopy);
        };
    }, []);

    return (
        <div className="navigation">
            <hr />
            <div className="navigation_block">
                <Link className="navigation_content" id='home' onClick={changeActive} to={'/'}>
                    <img src="./img/img1.png" alt="img" />
                    <span>Click</span>
                </Link>
                <Link className="navigation_content" id='shop' onClick={changeActive} to={'/shop'}>
                    <img src="./img/img2.png" alt="img" />
                    <span>Shop</span>
                </Link>
                <Link className="navigation_content" id='tasks' onClick={changeActive} to={"/tasks"}>
                    <img src="./img/img3.png" alt="img" />
                    <span>Tasks</span>
                </Link>
                <Link className="navigation_content" id='profile' onClick={changeActive} to={'/profile'}>
                    <img src="./img/img4.png" alt="img" />
                    <span>Profile</span>
                </Link>
            </div>
        </div>
    );
}

export default Navigation;
