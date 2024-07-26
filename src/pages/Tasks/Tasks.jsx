import './Tasks.css';
import Task from '../../components/Task/Task';
import { useSelector } from 'react-redux';

function Tasks() {
    const tasksList = useSelector((state) => state.tasks.tasks);

    return (
        <main className="tasks noselect">
            <header className="header">
                <h2 className="header_txt">Tasks List</h2>
            </header>
            <hr />
            <div className="tasks_list">
                {tasksList.map((task) => (
                    <Task
                        key={task.id}
                        id={task.id}
                        name={task.name}
                        img={task.img}
                        price={task.price}
                        link={task.link}
                        channel_id={task.channel_id}  // передаем channelId
                    />
                ))}
            </div>
        </main>
    );
}

export default Tasks;
