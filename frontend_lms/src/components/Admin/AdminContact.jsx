import React, { useEffect, useState } from "react";
import axios from "axios";

const API_CONTACT = "http://127.0.0.1:8000/Contact/contact/";

export default function AdminContact() {
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchMessages();
    }, []);

    const fetchMessages = async () => {
        try {
            const response = await axios.get(API_CONTACT, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`, // agar token use kar rahi ho
                },
            });
            setMessages(response.data);
        } catch (error) {
            console.error("Error fetching messages:", error);
        } finally {
            setLoading(false);
        }
    };
    const markAsSeen = async (id) => {
    try {
        // 1. State ko turant update karo (instant Seen dikhane ke liye)
        setMessages(prevMessages =>
            prevMessages.map(msg =>
                msg.id === id ? { ...msg, is_seen: true } : msg
            )
        );

        // 2. Backend ko bhi update bhejo
        await axios.put(`${API_CONTACT}${id}/mark_seen/`, {}, {
            headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });

    } catch (error) {
        console.error("Error marking message as seen:", error);
        // Agar error aaye to optionally alert ya state rollback kar sakti ho
    }
};

    if (loading) return <p>Loading messages...</p>;

    return (
        <div className="container mt-4">
            <h2 className="mb-4">📩 Contact Messages</h2>
            {messages.length === 0 ? (
                <p>No messages yet.</p>
            ) : (
                <table className="table table-bordered shadow-sm">
                    <thead className="table-dark">
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Message</th>
                            <th>Received</th>
                            <th>Seen</th>
                        </tr>
                    </thead>
                    <tbody>
                        {messages.map((msg) => (
                            <tr key={msg.id}>
                                <td>{msg.id}</td>
                                <td>{msg.name}</td>
                                <td>{msg.email}</td>
                                <td>{msg.message}</td>
                                <td>{new Date(msg.created_at).toLocaleString()}</td>
                             
                                <td>
                                    {msg.is_seen ? (
                                        "✅ Seen"
                                    ) : (
                                        <button className="btn btn-sm btn-primary" onClick={() => markAsSeen(msg.id)}>
                                            Mark as Seen
                                        </button>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}
