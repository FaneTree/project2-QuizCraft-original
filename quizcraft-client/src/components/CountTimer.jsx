import { useState, useEffect } from 'react';

const CountTimer = () => {
    const [counter, setCounter] = useState(10);

    useEffect(() => {
        counter > 0 && setTimeout(() => setCounter(counter -1) , 1000 )
    }, [counter]);

    return(
        <div>
            
        </div>
    );
};

export default CountTimer;