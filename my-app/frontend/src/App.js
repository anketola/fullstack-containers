import React, { useEffect, useState } from 'react';

function App() {
  const [messages, setMessages] = useState([]);
  const [error, setError] = useState(null);
  const [newMessage, setNewMessage] = useState(''); 
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    async function fetchMessages() {
      try {
        const response = await fetch('http://localhost:3001/wallmessages');
        if (!response.ok) {
          throw new Error('Failed to fetch messages');
        }
        const data = await response.json();
        setMessages(data);
      } catch (error) {
        setError(error.message);
      }
    }

    fetchMessages();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!newMessage.trim()) {
      alert("Oh no. You forgot to push some keyboard buttons to form a message.");
      return;
    }
    setIsSubmitting(true);
    try {
      const response = await fetch('http://localhost:3001/wallmessages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: newMessage }), // Sending the message
      });
      if (!response.ok) {
        throw new Error('Failed to post message');
      }      
      const newMessageData = await response.json();
      setMessages((prevMessages) => [...prevMessages, newMessageData]);
      setNewMessage('');
    } catch (error) {
      setError(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="App">
      <h1>Message Wall</h1>
      <h2>the highly exciting and useful fullstack app</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <div>
        <form onSubmit={handleSubmit}>
          <textarea
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)} 
            placeholder="Write something exciting here...."
            rows="5"
            cols="60"
            disabled={isSubmitting}
          />
          <br />
          <button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Submitting...' : 'Submit'}
          </button>
        </form>
      </div>

      <div>
        {messages.length === 0 ? (
          <p>No messages to display.</p>
        ) : (
          messages.map((message) => (
            <div key={message.id}>
              <p>{message.text}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default App;