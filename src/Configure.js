import React, { useState } from 'react';
import { Redirect } from "react-router-dom";

function Configure(props) {
    const [messageCount, setMessageCount] = useState(0);
    const [meanTime, setMeanTime] = useState(0);
    const [failureRate, setFailureRate] = useState(0);
    const [processCount, setProcessCount] = useState(0);

    return(
        <div>
            <form onSubmit={handleSubmit} method='post'>
                <label>Message Count</label>
                <br/>
                <input type="text" id="message_count" value={messageCount} onChange={(event) => {setMessageCount(event.target.value)}}/>
                <br/>
                <label>Mean Time of message sending</label>
                <br/>
                <input type="text" id="mean_time" value={meanTime} onChange={(event) => {setMeanTime(event.target.value)}}/>
                <br/>
                <label>Failure Rate</label>
                <br/>
                <input type="text" id="failure_rate" value={failureRate} onChange={(event) => {setFailureRate(event.target.value)}}/>
                <br/>
                <label>Send Processes</label>
                <br/>
                <input type="text" id="process_count" value={processCount} onChange={(event) => {setProcessCount(event.target.value)}}/>
                <br/>
                <input type="submit" value="Submit" />
                <br/>
            </form>
        </div>)
    
    function handleSubmit(event) {
        fetch('/configure', {
            method: 'POST',
            cache: 'no-cache',
            headers: {'content_type':'application/json'},
            body: JSON.stringify({
                'message_count': messageCount,
                'mean_time': meanTime,
                'failure_rate': failureRate,
                'process_count': processCount,
            })
        }).then(response => {
            // Redirect('/monitor')
        })
    }
}


export default Configure;