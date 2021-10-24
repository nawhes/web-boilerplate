import React, { useState, useEffect } from 'react';

import underArrow from '@assets/img/underarrow.svg';
import sideArrow from '@assets/img/sidearrow.svg';

const Participant = ({ setIcon, frontman }) => {
    const [users, setUsers] = useState([]);
    const [show, setShow] = useState('flex');

    const handleClose = () => {
        setIcon(null);
    }

    const handleToggle = () => {
        show === 'flex' ? setShow('none') : setShow('flex');
    }

    useEffect(() => {
        frontman.run(setUsers);
    }, [])

    return (
        <div id='side'>
            <div className='side-wrap'>
                <div className='room-wrap'>
                    <p>ROOM1</p>
                    <button className='arrow-wrap' onClick={handleClose}>
                        <img className='side-arrow' src={sideArrow} />
                    </button>
                </div>
                <div id='title-wrap'>
                    <button className='arrow-wrap' onClick={handleToggle}>
                        <img className='arrow' src={underArrow} />
                    </button>
                    <span id='title'>MEMBERS</span>
                </div>
                <div id='content' style={{ display: show }}>
                    {users.map((ele, idx) => <p key={idx}>{ele}</p>)}
                </div>
            </div>
        </div>
    );
}

export default Participant;