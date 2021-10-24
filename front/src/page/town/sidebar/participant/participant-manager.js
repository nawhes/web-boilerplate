let users = [];
let setUsers = () => {/* Do Nothing */ };

const updateUserNames = (setUsers) => {
    const usernames = Object.values(users).reduce((prev, curr) => {
        prev.push(curr.username);
        return prev;
    }, []);
    setUsers([...usernames]);
}

function participantManager(socket) {
    socket.on('showUsers', async (_users) => {
        users = _users;
        updateUserNames(setUsers);
    })
    socket.on('exit', (exitedUser) => {
        delete users[exitedUser];
        updateUserNames(setUsers);
    })
    return {
        run: function (_setUsers) {
            setUsers = _setUsers;
            updateUserNames(setUsers);
        }
    };
}

export default participantManager;