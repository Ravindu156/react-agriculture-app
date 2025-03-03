import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../../assest/styles/Profile.css';


const Profile = () => {
  const [userData, setUserData] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    email: '',
    mobile: '',
    gender: '',
    region: '',
    nic: '',
  });

  // Fetch user data on component mount
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get('/api/profile', {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        setUserData(response.data);
        setFormData(response.data);
      } catch (error) {
        console.error('Error fetching profile:', error);
      }
    };

    fetchProfile();
  }, []);

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle profile update
  const handleSaveChanges = async () => {
    try {
      const response = await axios.put('/api/profile', formData, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      setUserData(response.data);
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  // Handle edit mode toggle
  const handleEdit = () => {
    setIsEditing(true);
  };

  return (
    <div className="profile-container">
      <h2 className="profile-title">User Profile</h2>
      {userData ? (
        <div className="profile-details">
          <div className="profile-field">
            <label>First Name:</label>
            {isEditing ? (
              <input
                type="text"
                name="firstname"
                value={formData.firstname}
                onChange={handleChange}
              />
            ) : (
              <p>{userData.firstname}</p>
            )}
          </div>
          <div className="profile-field">
            <label>Last Name:</label>
            {isEditing ? (
              <input
                type="text"
                name="lastname"
                value={formData.lastname}
                onChange={handleChange}
              />
            ) : (
              <p>{userData.lastname}</p>
            )}
          </div>
          <div className="profile-field">
            <label>Email:</label>
            {isEditing ? (
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
            ) : (
              <p>{userData.email}</p>
            )}
          </div>
          <div className="profile-field">
            <label>Mobile:</label>
            {isEditing ? (
              <input
                type="text"
                name="mobile"
                value={formData.mobile}
                onChange={handleChange}
              />
            ) : (
              <p>{userData.mobile}</p>
            )}
          </div>
          <div className="profile-field">
            <label>Gender:</label>
            {isEditing ? (
              <input
                type="text"
                name="gender"
                value={formData.gender}
                onChange={handleChange}
              />
            ) : (
              <p>{userData.gender}</p>
            )}
          </div>
          <div className="profile-field">
            <label>Region:</label>
            {isEditing ? (
              <input
                type="text"
                name="region"
                value={formData.region}
                onChange={handleChange}
              />
            ) : (
              <p>{userData.region}</p>
            )}
          </div>
          <div className="profile-field">
            <label>NIC:</label>
            {isEditing ? (
              <input
                type="text"
                name="nic"
                value={formData.nic}
                onChange={handleChange}
              />
            ) : (
              <p>{userData.nic}</p>
            )}
          </div>

          {isEditing ? (
            <button className="save-btn" onClick={handleSaveChanges}>
              Save Changes
            </button>
          ) : (
            <button className="edit-btn" onClick={handleEdit}>
              Edit Profile
            </button>
          )}
        </div>
      ) : (
        <p>Loading profile...</p>
      )}
    </div>
  );
};

export default Profile;
