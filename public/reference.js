// Reference component
function Reference() {
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [content, setContent] = React.useState('');
  const [references, setReferences] = React.useState([]);

  function handleSubmit(e) {
    e.preventDefault();
    if (name && email && content) {
      const newReference = {
        name,
        email,
        reference_content: content,
      };
      fetch('../api/addReference', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newReference),
      })
        .then(response => response.json())
        .then(result => {
          console.log('Reference added successfully:', result);
          fetchReferences();
        })
        .catch(error => {
          console.error('Error adding reference:', error);
        });

      setName('');
      setEmail('');
      setContent('');
    }
  }

  function fetchReferences() {
    console.log('Fetching references...');
    fetch('/home/ubuntu/Portfolio/api.js/references')
      .then(response => response.json())
      .then(data => {
        setReferences(data);
      })
      .catch(error => {
        console.error('Error fetching references:', error);
      });
  }

  React.useEffect(() => {
    fetchReferences();
  }, []);

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
            <p>{reference.reference_content}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

ReactDOM.render(<React.Fragment><Reference /></React.Fragment>, document.getElementById('references'));

