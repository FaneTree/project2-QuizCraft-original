import { useState, useEffect } from 'react';

const CountTimer = (props) => {
    let [counter, setCounter] = useState(10);
    counter = props.timer

    useEffect(() => {
        counter > 0 && setTimeout(() => setCounter(counter -1) , 1000 )
    }, [counter]);

    return(
        <div>
            { counter }
        </div>
    );
};

export default CountTimer;