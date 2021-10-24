import React from 'react';
import Participant from './participant/participant.jsx';
import Chat from './chat/chat.jsx';
import './sidebar.scss';

const Sidebar = ({ icon, setIcon, twitter, frontman, username }) => {
    if (icon === 'participant') {
        return (<Participant
            setIcon={setIcon}
            frontman={frontman} />)
    } else if (icon === 'chat') {
        return (<Chat
            setIcon={setIcon}
            twitter={twitter}
            username={username}
        />)
    } else {
        return null;
    }
}

export default Sidebar;