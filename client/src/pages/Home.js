import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const url = '/api';
function Home() {
  const [data, setData] = useState('');
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [dataUpload, setDataUpload] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!dataUpload) return;
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ text: dataUpload }),
    });

    const result = await res.json();
    console.log(result);
  };

  const fetchData = async (url) => {
    try {
      setLoading(true);
      const res = await fetch(url);
      const serverData = await res.json();
      setData(serverData.text);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      setData(err.message);
    }
  };

  useEffect(() => {
    fetchData(url);
  }, []);
  return (
    <Wrapper>
      <p>{loading ? 'Loading...' : data}</p>
      <button onClick={() => fetchData(url)}>Fetch text</button>
      <form className="form-input" onSubmit={handleSubmit}>
        <input type="text" value={dataUpload} onChange={(e) => setDataUpload(e.target.value)} />
        <button type="submit">submit</button>
      </form>
    </Wrapper>
  );
}
const Wrapper = styled.section`
  p {
    display: block;
    margin: 5rem auto 0 auto;
    max-width: 50rem;
  }
  button,
  button:active,
  button:focus {
    outline: none;
    border: none;
    color: white;
    border-radius: 2px;
    margin: 1.5rem;
    background-color: rgb(75 129 232);
    font-size: 1.6rem;
    padding: 1rem 2rem;

    &:hover {
      background-color: rgba(75, 129, 232, 0.8);
      cursor: pointer;
    }
  }
`;
export default Home;
