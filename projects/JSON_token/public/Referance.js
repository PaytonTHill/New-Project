function Reference() {
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [content, setContent] = React.useState('');
  const [references, setReferences] = React.useState([]);

  function handleSubmit(e) {
    e.preventDefault();
    if (name && email && content) {
      const newReference = {
        id: Math.random().toString(36).substring(7),
        name,
        email,
        content,
      };
      setReferences([...references, newReference]);
      setName('');
      setEmail('');
      setContent('');
    }
  }

  return (
    <div>
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
            <p>{reference.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

const ReferenceComponent = Reference();

ReactDOM.render(ReferenceComponent, document.getElementById('references'));
