import React, { useEffect, useState } from 'react';
import './Profile.css'; // Updated styles

const Profile = () => {
  const [profile, setProfile] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    mobile: "",
    region: "",
    role: "",
    nic: "",
    password: "",
    education: "",
    occupation: "",
    experience: ""
  });

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/profile');
      const profileData = await response.json();
      setProfile(profileData);
    } catch (error) {
      console.error('Error fetching profile:', error);
    }
  };

  const profileFields = [
    { label: "First Name", value: profile.firstName },
    { label: "Last Name", value: profile.lastName },
    { label: "Username", value: profile.username },
    { label: "Email", value: profile.email },
    { label: "Mobile", value: profile.mobile },
    { label: "Region", value: profile.region },
    { label: "Role", value: profile.role },
    { label: "NIC", value: profile.nic },
    { label: "Education", value: profile.education },
    { label: "Occupation", value: profile.occupation },
    { label: "Experience", value: profile.experience }
  ];

  return (
    <div className="profile-wrapper">
      {/* Gradient Left Section */}
      <div className="gradient-background">
        Welcome to Your Profile
      </div>

      {/* Profile Form Right Section */}
      <div className="profile-container">
        <div className="profile-card">
          <h2 className="profile-title">Profile Details</h2>
          <div className="profile-section">
            {profileFields.map((field, index) => (
              <div className="profile-field" key={index}>
                <label>{field.label}:</label>
                <input type="text" value={field.value} readOnly />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
