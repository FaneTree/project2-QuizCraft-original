import React,{ useState, useEffect } from "react";
import { collection, getDocs, doc, deleteDoc } from 'firebase/firestore';
import { db } from '../firebase';

export default function Listgames(){
    return(
        <div>
            <h1>List Games</h1>
            <p>This child componet will be later removed.</p>
            <p>It's mainly to test the path of fetching data from Firestore.</p>
        </div>
    )
}
