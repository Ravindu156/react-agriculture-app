import React, { useState, useEffect } from "react";

function Profile() {
  const [user, setUser] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    const token = localStorage.getItem("token");
    try {
      const res = await fetch("http://localhost:5000/api/profile", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      setUser(data);
      setFormData(data);
    } catch (error) {
      console.log("Fetch Error:", error);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    try {
      const res = await fetch("http://localhost:5000/api/profile/update", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        alert("Profile Updated Successfully 🔥🥳");
        setIsEditing(false);
        fetchUserData(); // 👉 Re-fetch User Data here 🔥
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.log("Update Error:", error);
    }
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h2 style={{ textAlign: "center" }}>User Profile</h2>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <div
          style={{
            width: "500px",
            padding: "20px",
            border: "1px solid #ccc",
            borderRadius: "10px",
            boxShadow: "0 0 10px rgba(0,0,0,0.3)",
          }}
        >
          <form onSubmit={handleSubmit}>
            {Object.entries(formData).map(([key, value]) =>
              key !== "_id" &&
              key !== "__v" &&
              key !== "password" &&
              key !== "createdAt" &&
              key !== "updatedAt" ? (
                <div key={key} style={{ marginBottom: "15px" }}>
                  <label style={{ fontWeight: "bold" }}>{key.toUpperCase()}</label>
                  <input
                    type="text"
                    name={key}
                    value={value}
                    onChange={handleChange}
                    disabled={!isEditing}
                    style={{
                      width: "100%",
                      padding: "10px",
                      border: "1px solid #ccc",
                      borderRadius: "5px",
                      marginTop: "5px",
                    }}
                  />
                </div>
              ) : null
            )}

            {isEditing ? (
              <button
                type="submit"
                style={{
                  backgroundColor: "green",
                  color: "white",
                  padding: "10px",
                  border: "none",
                  borderRadius: "5px",
                  cursor: "pointer",
                  width: "100%",
                }}
              >
                Save Changes
              </button>
            ) : (
              <button
                type="button"
                onClick={() => setIsEditing(true)}
                style={{
                  backgroundColor: "blue",
                  color: "white",
                  padding: "10px",
                  border: "none",
                  borderRadius: "5px",
                  cursor: "pointer",
                  width: "100%",
                }}
              >
                Edit Profile
              </button>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}

export default Profile;
