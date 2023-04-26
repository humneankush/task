import { useState, useEffect } from "react";

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
        <div className="row">
            <div className="col-sm-6 mb-3 mb-sm-0">
                <div className="col-6 mt-3">
                    {timers.map((timer) => (
                        <div className="col-md-4 mb-3" key={timer.id}>
                            <div className="card">
                                <div className="card-body">
                                    <span className="card-text">
                                        {Math.floor(timer.remainingTime / 1000).toLocaleString()},
                                        {(timer.remainingTime % 1000).toLocaleString("en-US", {
                                            minimumIntegerDigits: 3,
                                            useGrouping: false,
                                        })}
                                    </span>
                                    <p className="card-title">{new Date(timer.id).toLocaleString()}</p>
                                    <button onClick={() => onHandleDelete(timer.id)} className="btn btn-danger">
                                        Delete
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className="col-sm-6">
                <div>
                    <h1>New Timer</h1>
                    <form onSubmit={onHandleAdd} className="w-50">
                        <div className="form-group">
                            <input type="number" className="form-control w-100" name="seconds" min="1" required />
                        </div>
                        <button type="submit" className="btn btn-primary">
                            Add
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default TimerList;

