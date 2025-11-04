import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Join() {
    const [username, setUsername] = useState('');
    const [room, setRoom] = useState('');
    const navigate = useNavigate();

    const handleJoin = (e) => {
        e.preventDefault();
        if (username.trim() !== '') {
            // If room is empty, default to 'Public'
            const roomToJoin = room.trim() === '' ? 'Public' : room;
            navigate(`/chat?username=${username}&room=${roomToJoin}`);
        } else {
            alert('Username is required.');
        }
    };

    return (
        <div className="join-container">
            <header className="join-header">
                <h1><i className="fas fa-comments"></i> Real-Time Chat</h1>
            </header>
            <main className="join-main">
                <form onSubmit={handleJoin}>
                    <div className="form-control">
                        <label htmlFor="username">Username</label>
                        <input
                            type="text"
                            name="username"
                            id="username"
                            placeholder="Enter username..."
                            required
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>
                    <div className="form-control">
                        <label htmlFor="room">Room (Optional)</label>
                        <input
                            type="text"
                            name="room"
                            id="room"
                            placeholder="Enter room number..."
                            value={room}
                            onChange={(e) => setRoom(e.target.value)}
                        />
                    </div>
                    <button type="submit" className="btn">Join Chat</button>
                </form>
            </main>
        </div>
    );
}

export default Join;