let chat = [];
let setChat = () => {/* Do Nothing */ };
function chatManager(socket, prevChat) {
    chat = chat.concat(prevChat).reverse();
    socket.on('chat', (message) => {
        chat = chat.concat(message);
        if (chat.length > 50)
            chat = chat.slice(chat.length - 50)
        setChat(chat);
    });

    const chatToAll = (message) => {
        socket.emit('chatToAll', message)
    }

    return {
        run: function (_setChat) {
            setChat = _setChat;
            setChat(chat);
        },
        chatToAll
    };
}

export default chatManager;