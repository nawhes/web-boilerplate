import React, { useEffect, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';

import sideArrow from '@assets/img/sidearrow.svg';

let scrollEnd;
const Chat = ({ setIcon, twitter, username }) => {
    const [to, setTo] = useState('Everyone');
    const [list, setList] = useState(['Everyone', 'Nearby', 'Someone']);
    const [show, setShow] = useState(false);
    const [chat, setChat] = useState([]);

    const handleClose = () => setIcon(null);

    const handleModal = () => {
        setShow(!show);
    }

    const selectTo = () => {
        handleModal();
        toast('Nearby랑 Someone은 껍데기만 있어요 (react-hot-toast)', {
            icon: '❌',
            duration: 1000
        });
    }

    const chooseOption = (e) => {
        setTo(e.target.innerText);
        handleModal();
    }

    const addChat = (e) => {
        if (e.key === 'Enter' && e.target.value.length !== 0) {
            const msg = {
                sender: username,
                receiverType: to,
                content: e.target.value
            }
            e.target.value = '';
            twitter.chatToAll(msg);
        }
    }



    useEffect(() => {
        twitter.run(setChat, document.querySelector('#chat-content'));
        scrollEnd = document.querySelector('#scroll-end');
    }, [])
    useEffect(() => {
        scrollEnd?.scrollIntoView({ behavior: "smooth", block: "end" });
    }, [chat])
    
    return (
        <div id='side'>
            <div id='chat-wrap'>
                <div className='room-wrap'>
                    <p>Chat</p>
                    <button className='arrow-wrap' onClick={handleClose}>
                        <img className='side-arrow' src={sideArrow} />
                    </button>
                </div>
                <div id='chat-content'>
                    {chat.map((ele, idx) => {
                        return (<div key={idx} className='chat'>
                            <div className='from'>From {ele.sender} to {ele.receiverType}</div>
                            <span>{ele.content}</span>
                        </div>)
                    })}
                    <div id='scroll-end'></div>
                </div>
                <div id='chat-input-wrap'>
                    <div id='to-wrap'>
                        <span>To</span>
                        <button id='to' onClick={selectTo}>{to}</button>
                        <div id='btn-wrap' style={{ display: !show ? 'none' : 'flex' }}>
                            {list.map((ele, idx) => 
                                <button key={idx} 
                                    onClick={chooseOption} 
                                    style={{ background: to === ele ? '#90ADFF' : 'rgb(202, 216, 255)' }}>
                                    {ele}
                                </button>
                            )}
                        </div>
                        <Toaster 
                            position='bottom-left' />
                    </div>
                    <input id='message-input' onKeyPress={addChat} type='text' placeholder='Message...' />
                </div>
            </div>
        </div>
    );
}

export default Chat;