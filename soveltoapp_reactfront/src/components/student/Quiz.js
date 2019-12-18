import React, { useState, useEffect } from 'react'
import socketIOClient from 'socket.io-client';
import { getStudentQs } from '../../service/Request';
import Question from './Question';
export default function Quiz() {
    const [message, setMessage] = useState('');
    const [questions, setQuestions] = useState([]);
    const socket = socketIOClient('http://localhost:5001');
    socket.on('eventMessageStudent', (message) => {
        console.log('saapunut viesti', message)
        messageSocket = message;
        console.log("tämä näin" + message.idArray);
        setMessage(message);
        let helpme = {idArray: [1,2,3]};
        console.log('näin' + helpme)
        getQuestions(message)
    })
    /* .then(message => messageReturner(message)) */
    let messageSocket = message

    /*if(message) {
        sessionStorage.setItem('started', true)
    }*/

    const getQuestions = (helpme) => {
        getStudentQs(helpme).then(res => setQuestions(res))
    }
 
    console.log(questions);

    if (sessionStorage.getItem('started')) {
        console.log(questions);

        const studentQs = questions.map(result => {

            return (
                <Question result={result} />
            )
        })

        return (
            <div>
                {studentQs}
                {messageSocket.idArray}
            </div>
        )
    }
    else {
        return (
            <div>
                ei oikeuksia {messageSocket}
            </div>
        )
    }

}