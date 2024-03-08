import React from 'react';

const LegoList = ({ data }) => {
    if (!data.length) {
        return <h3>Hmmm...it seems there aren't any Lego sets here...</h3>;
    }

    return (
        <ul>
            {data.map((item, index) => (
                <li key={index}>
                    {item.name}
                </li>
            ))}
        </ul>
    );
}

export default LegoList;