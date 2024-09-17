import { useEffect, useState } from 'react';

function UserData({ userInfoData }) {
  return (
    <ul>
      {userInfoData.map((item) => {
        const name = item.name;
        const email = item.email;
        const body = item.body;

        return (
          <li key={name}>
            <strong>{`Name: ${name}`}</strong>
            <p>{`Email: ${email.toLowerCase()}`}</p>
            <p>{`Address: ${body}`}</p>
          </li>
        );
      })}
    </ul>
  );
}

async function fetchUserInfoData(userId) {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/users?userId=${userId}`
  );
  const data = await response.json();
  return data;
}

function App() {
  const [filterUserId, setFilterUserId] = useState(''); // Store the input value
  const [filteredUserId, setFilteredUserId] = useState(''); // Store the userId that is being fetched
  const [loading, setLoading] = useState(false);
  const [userInfoData, setUserInfoData] = useState([]);
  const [error, setError] = useState(null); // Store any potential errors

  useEffect(() => {
    if (filteredUserId) {
      setLoading(true);
      fetchUserInfoData(filteredUserId)
        .then((data) => {
          setUserInfoData(data);
          setError(null); // Clear any previous errors
        })
        .catch((error) => setError(error.message))
        .finally(() => setLoading(false));
    }
  }, [filteredUserId]);

  const handleInputChange = (event) => {
    setFilterUserId(event.target.value);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault(); // Prevent form submission from reloading the page

    if (filterUserId.trim() === '' || isNaN(filterUserId)) {
      setError('Please enter a valid numeric user ID.');
    } else {
      setError(null); // Clear any previous errors
      setFilteredUserId(filterUserId); // Trigger the fetching of data
    }
  };

  return (
    <div>
      <h1>User Data Information App</h1>
      <h3>with user input filter option</h3>

      <form onSubmit={handleFormSubmit}>
        <label htmlFor="userId">Enter User ID:</label>
        <input
          type="text"
          id="userId"
          value={filterUserId}
          onChange={handleInputChange}
          placeholder="Enter User ID"
        />
        <button type="submit">Filter Tasks</button>
      </form>
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {userInfoData.length > 0 && (
        <>
          <h3>{`User's Data Information:`}</h3>
          <UserData userInfoData={userInfoData} />
        </>
      )}
    </div>
  );
}

export default App;
