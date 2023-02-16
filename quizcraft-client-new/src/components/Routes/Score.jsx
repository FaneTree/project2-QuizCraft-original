import React from 'react';
import { useEffect, useState } from 'react';

export default function Score(props) {

    return (
        <div>
            Current points: { props.points }
        </div>
    )
}