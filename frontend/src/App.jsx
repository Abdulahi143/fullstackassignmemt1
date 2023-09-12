import React, { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';

function App() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState("");
  const [experienceYears, setExperienceYears] = useState("");
  const [programmingLanguage, setProgrammingLanguage] = useState("");

  const [verifiedEngineers, setVerifiedEngineers] = useState([]);
  const [unverifiedEngineers, setUnverifiedEngineers] = useState([]);

  // Function to fetch unverified engineers
  const fetchUnverifiedEngineers = async () => {
    try {
      const response = await axios.get("http://localhost:3000/unverified");
      setUnverifiedEngineers(response.data);
    } catch (err) {
      console.error("Error fetching unverified engineers:", err);
    }
  };

  // Function to fetch verified engineers
  const fetchVerifiedEngineers = async () => {
    try {
      const response = await axios.get("http://localhost:3000/verified");
      setVerifiedEngineers(response.data);
    } catch (err) {
      console.error("Error fetching verified engineers:", err);
    }
  };

  // Fetch unverified and verified engineers when the component mounts
  useEffect(() => {
    fetchUnverifiedEngineers();
    fetchVerifiedEngineers();
  }, []);

  // Function to delete an engineer by ID
  const deleteEngineer = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/remove-eng/${id}`);
      // After successfully deleting, refetch the unverified engineers
      fetchUnverifiedEngineers();
      console.log("Engineer deleted successfully!");
    } catch (err) {
      console.error("Error deleting engineer:", err);
    }
  };

  // Function to reset the form fields
  const resetForm = () => {
    setName("");
    setEmail("");
    setAge("");
    setExperienceYears("");
    setProgrammingLanguage("Must_choose");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (
      name.trim() === "" ||
      email.trim() === "" ||
      age.trim() === "" ||
      experienceYears.trim() === "" ||
      programmingLanguage === "Must_choose"
    ) {
      console.error("Please fill in all the required fields.");
      return;
    }

    try {
      const data = await axios.post("http://localhost:3000/", {
        name,
        email,
        age,
        experienceYears,
        programmingLanguage,
      });

      console.log("Successfully added the engineer!");
      fetchUnverifiedEngineers();
      resetForm(); // Reset the form fields after a successful submission
    } catch (err) {
      console.error("Error for adding eng:", err);
    }
  };

  const verifyEngineer = async (engineer) => {
    try {
      await axios.put(`http://localhost:3000/verify/${engineer._id}`);
      fetchUnverifiedEngineers();
      fetchVerifiedEngineers();
      console.log("Engineer verified successfully!");
    } catch (err) {
      console.error("Error verifying engineer:", err);
    }
  };

  const unverifyEngineer = async (engineer) => {
    try {
      await axios.put(`http://localhost:3000/unverify/${engineer._id}`);
      fetchUnverifiedEngineers();
      fetchVerifiedEngineers();
      console.log("Engineer unverified successfully!");
    } catch (err) {
      console.error("Error unverifying engineer:", err);
    }
  };

  return (
    <div className="container">
      <div className="form">
        <h2>Engineer Admission Web</h2>
        <form className="input-group" onSubmit={handleSubmit}>
          <input
            value={name}
            onChange={(event) => setName(event.target.value)}
            type="text"
            placeholder="Name"
          />

          <input
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            type="email"
            placeholder="Email"
          />

          <input
            value={age}
            onChange={(event) => setAge(event.target.value)}
            type="number"
            placeholder="Age"
          />

          <input
            value={experienceYears}
            onChange={(event) => setExperienceYears(event.target.value)}
            type="number"
            placeholder="Experience Years"
          />

          <select
            value={programmingLanguage}
            onChange={(event) => setProgrammingLanguage(event.target.value)}
          >
            <option value="Must_choose">Choose Mastered Programming Language</option>
            <option value="None_of_the_above">None</option>
            <option value="JavaScript">JavaScript</option>
            <option value="Python">Python</option>
            <option value="Java">Java</option>
            <option value="C">C</option>
            <option value="C#">C#</option>
          </select>
          <button>Add</button>
        </form>
      </div>

      {/* Unverified Engineers */}
      <div className="engineer">
        <div className="engineer-list">
          <h2>Waiting list</h2>
          {unverifiedEngineers.map((engineer, index) => (
            <div className="engineer-details" key={index}>
              <h3>{engineer.name}</h3>
              <p>Email: {engineer.email}</p>
              <p>Age: {engineer.age}</p>
              <p>Experience: {engineer.experienceYears} Years</p>
              <p>Skills: {engineer.programmingLanguage}</p>
              <div className="engineer-buttons">
                <button className="verify" onClick={() => verifyEngineer(engineer)}>Verify</button>
                <button
                  className="delete"
                  onClick={() => deleteEngineer(engineer._id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Verified Engineers */}
      <div className="engineer">
        <div className="engineer-list">
          <h2>Verified list</h2>
          {verifiedEngineers.map((engineer, index) => (
            <div className="engineer-details" key={index}>
              <h3>{engineer.name}</h3>
              <p>Email: {engineer.email}</p>
              <p>Age: {engineer.age}</p>
              <p>Experience: {engineer.experienceYears} Years</p>
              <p>Skills: {engineer.programmingLanguage}</p>
              <div className="engineer-buttons">
                <button className="unverify" onClick={() => unverifyEngineer(engineer)}>Unverify</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
