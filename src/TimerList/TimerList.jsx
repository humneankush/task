import { useState, useEffect } from "react";
import './timerList.css'

const TimerList = () => {
    const [timers, setTimers] = useState([]);

    useEffect(() => {
        const id = setInterval(() => {
            const now = new Date().getTime();
            setTimers((timers) =>
                timers.map((time) => {
                    const remainingTime = Math.max(0, time.endTime - now);
                    if (remainingTime === 0) {
                        onHandleDelete(time.id);
                    }
                    return { ...time, remainingTime };
                })
            );
        }, 10);
        return () => clearInterval(id);
    }, []);

    const onHandleDelete = (id) => {
        setTimers((timers) => timers.filter((timer) => timer.id !== id));
    };

    const onHandleAdd = (event) => {
        event.preventDefault();
        console.log(event, "event")
        const seconds = parseInt(event.target.elements.seconds.value);
        const now = new Date().getTime();
        const endTime = now + seconds * 1000;
        setTimers((timers) => [...timers, { id: now, endTime, remainingTime: seconds * 1000 }]);
        event.target.reset();
    };


    return (
        <div className="mainRow">
            <div class="mainColumn">
                {timers.map((timer) => (
                    <div className="" key={timer.id}>
                        <div className="mainCard">
                            <span className="">
                                <p className="deleteX" onClick={() => onHandleDelete(timer.id)}>x</p>
                                {Math.floor(timer.remainingTime / 1000).toLocaleString()},
                                {(timer.remainingTime % 1000).toLocaleString("en-US", {
                                    minimumIntegerDigits: 3,
                                    useGrouping: false,
                                })}
                            </span>
                            <p className="">{new Date(timer.id).toLocaleString()}</p>
                            <button onClick={() => onHandleDelete(timer.id)} className="deleteButton">
                                Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>
            <div className="">
                <div>
                    <h4>New Timer</h4>
                    <form onSubmit={onHandleAdd} className="">
                        <div className="form-group">
                            <input type="number" className="" name="seconds" min="1" required />
                        </div>
                        <button type="submit" className="addButton">
                            Add
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default TimerList;

