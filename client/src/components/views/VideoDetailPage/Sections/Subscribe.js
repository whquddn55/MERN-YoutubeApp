import React, {useEffect, useState} from 'react';
import {Button} from 'antd';
import axios from 'axios';

function Subscribe(props) {
    const [subscribeNumber, setSubscribeNumber] = useState(0);
    const [subscribed, setSubscribed] = useState(false);

    useEffect(() => {
        let variable = {
            userTo : props.userTo
        }
        axios.post('/api/subscribe/subscribeNumber', variable)
            .then(response => {
                if (response.data.success) {
                    setSubscribeNumber(response.data.subscribeNumber);
                }
                else {
                    alert("Fail to get subscribe number");
                }
            });

        let subscribedVariable = {
            userTo : props.userTo,
            userFrom : props.userFrom
        }
        axios.post('/api/subscribe/subscribed', subscribedVariable)
            .then(response => {
                if (response.data.success) {
                    setSubscribed(response.data.subscribed);
                }
                else {
                    alert("Fail to get subscribed info");
                }
            })
    }, []);



    const onSubscribeClick = (event) =>{
        let subscribeVariable = {
            userTo : props.userTo,
            userFrom : props.userFrom
        }
        if (!subscribed) {
            axios.post('/api/subscribe/subscribe', subscribeVariable)
                .then(response => {
                    if (response.data.success) {

                    }
                    else {
                        alert("Fail to subscribe");
                    }
                        
                })
            setSubscribed(true);
            setSubscribeNumber(subscribeNumber + 1);
        }
        else {
            axios.post('/api/subscribe/unsubscribe', subscribeVariable)
                .then(response => {
                    if (response.data.success) {

                    }
                    else {
                        alert("Fail to unsubscribe");
                    }
                        
                })
            setSubscribed(false);
            setSubscribeNumber(subscribeNumber - 1);
        }
    }

    return (
        <div>
            <Button 
                style = {{
                    backgroundColor : `${subscribed ? '#aaaaaa': '#CC0000'}`, borderRadius: '4px',
                    color : 'white', fontWeight: '500',
                    fontSize : '1rem', textTransform: 'uppercase'
                }}
                size = 'large'
                onClick = {props.userFrom && onSubscribeClick}
                >
                    {subscribeNumber} {subscribed ? "subscribed" : "subscribe"}
            </Button>
        </div>
    )
}

export default Subscribe;
