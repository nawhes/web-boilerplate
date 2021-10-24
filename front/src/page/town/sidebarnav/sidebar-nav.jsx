import React from 'react';

import participantsIcon from '@assets/img/participants.svg';
import chatIcon from '@assets/img/chat.svg';
import './sidebar-nav.scss';

const SidebarNav = ({ icon, setIcon }) => {
    const changeSidebar = (e) => {
        const target = e.target.id === '' ? e.target.querySelector('.icon').id : e.target.id;
        target === icon ? setIcon('') : setIcon(target);
    }
    return (
        <div id='sidebar'>
            <button className={icon === 'chat' ? 'icon-button-select' : 'icon-button'} onClick={changeSidebar}>
                <img className='icon' id='chat' src={chatIcon} />
            </button>
            <button className={icon === 'participant' ? 'icon-button-select' : 'icon-button'} onClick={changeSidebar}>
                <img className='icon' id='participant' src={participantsIcon} />
            </button>
        </div>
    )
}

export default SidebarNav;