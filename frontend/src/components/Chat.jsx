import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import io from 'socket.io-client';

// Establish the socket connection once
const socket = io('http://localhost:4000');

function Chat() {
    const location = useLocation();
    const [username, setUsername] = useState('');
    const [room, setRoom] = useState('');
    const [messages, setMessages] = useState([]);
    const [users, setUsers] = useState([]);
    const [currentMessage, setCurrentMessage] = useState('');
    
    const messagesEndRef = useRef(null);

    // Scroll to the latest message
    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(scrollToBottom, [messages]);

    useEffect(() => {
        const searchParams = new URLSearchParams(location.search);
        const user = searchParams.get('username');
        const roomName = searchParams.get('room');

        setUsername(user);
        setRoom(roomName);

        // Emit 'joinRoom' event when component mounts
        socket.emit('joinRoom', { username: user, room: roomName });

        // Listener for incoming messages
        socket.on('message', (message) => {
            setMessages(prevMessages => [...prevMessages, message]);
        });

        // Listener for room user updates
        socket.on('roomUsers', ({ users }) => {
            setUsers(users);
        });

        // Cleanup on component unmount
        return () => {
            socket.off('message');
            socket.off('roomUsers');
        };
    }, [location.search]);

    const handleSendMessage = (e) => {
        e.preventDefault();
        if (currentMessage.trim()) {
            socket.emit('chatMessage', currentMessage);
            setCurrentMessage('');
        }
    };

    return (
        <div className="chat-container">
            <header className="chat-header">
                <h1>Real-Time Chat</h1>
            </header>
            <main className="chat-main">
                <div className="chat-sidebar">
                    <h3><i className="fas fa-users"></i> Room Name:</h3>
                    <h2 id="room-name">{room}</h2>
                    <h3><i className="fas fa-users"></i> Online Users:</h3>
                    <ul id="users">
                        {users.map(user => (
                            <li key={user.id} className={user.username === username ? 'current-user' : ''}>
                                {user.username} {user.username === username && '(You)'}
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="chat-messages">
                    {messages.map((msg, index) => (
                        <div key={index} className={`message ${msg.username === username ? 'my-message' : ''} ${msg.isAdmin ? 'admin-message' : ''}`}>
                            <p className="meta">
                                {msg.isAdmin ? '' : `${msg.username} `}
                                <span>{msg.timestamp}</span>
                            </p>
                            <p className="text">{msg.message}</p>
                        </div>
                    ))}
                    <div ref={messagesEndRef} />
                </div>
            </main>
            <div className="chat-form-container">
                <form id="chat-form" onSubmit={handleSendMessage}>
                    <input
                        id="msg"
                        type="text"
                        placeholder="Enter Message"
                        required
                        autoComplete="off"
                        value={currentMessage}
                        onChange={(e) => setCurrentMessage(e.target.value)}
                    />
                    <button className="btn" type="submit"><i className="fas fa-paper-plane"></i> Send</button>
                </form>
            </div>
        </div>
    );
}

export default Chat;