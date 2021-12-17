import React from 'react';

export default function Friend (props) {
    const { details } = props

    if (!details){
        return <h3>Fetching......</h3>
    }
    return (
        <div>
            <h2>{details.first_name ?? details.name}</h2>
            <p>Email: {details.email}</p>
        </div>
    )
}