import React, { useState, useEffect } from 'react';
import AddReference from './AddReference';
import './App.css'

function ReferenceList() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [content, setContent] = useState('');
  const [references, setReferences] = useState([]);

  function fetchReferences() {
    console.log('Fetching references...');
    fetch('/api/references')
      .then(response => response.json())
      .then(data => {
        setReferences(data);
      })
      .catch(error => {
        console.error('Error fetching references:', error);
      });
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (name && email && content) {
      const newReference = {
        name,
        email,
        reference_content: content,
      };
      fetch('/api/addReference', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newReference),
      })
        .then(response => response.json())
        .then(result => {
          console.log('Reference added successfully:', result);
          setName('');
          setEmail('');
          setContent('');
        })
        .catch(error => {
          console.error('Error adding reference:', error);
        });
    }
  }

  useEffect(() => {
    fetchReferences();
  }, []);

  return (
    <div>
        <AddReference />
        <form onSubmit={handleSubmit}>
            <h2>Add Reference</h2>
            <div>
            <label htmlFor="name">Name:</label>
            <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
            />
            </div>
            <div>
            <label htmlFor="email">Email:</label>
            <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
            />
            </div>
            <div>
            <label htmlFor="content">Reference:</label>
            <textarea
                id="content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                required
            ></textarea>
            </div>
            <button type="submit">Submit</button>
        </form>

      <div id="reference-list">
        {references.map((reference) => (
          <div key={reference.id} className="reference">
            <div className="reference-header">
              <h3>{reference.name}</h3>
              <p>{reference.email}</p>
            </div>
            <p>{reference.reference_content}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ReferenceList;
