import { useState, useEffect } from 'react';

const CountTimer = (props) => {
    let [counter, setCounter] = useState(10);
    counter = props.timer

    const countDown = (count) => {
        if (count > 0){
            console.log(count);
            setTimeout(() => setCounter(count-1), 1000);
        }
        countDown(count-1)
    }
    
    useEffect(() => {
        counter > 0 && setTimeout(() => setCounter(currentCounter => {return currentCounter -1}) , 1000 )
    }, [counter]);

    return(
        <div>   
            { counter }
        </div>
    );
};

export default CountTimer;