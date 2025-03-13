import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import profileImage from "../../Images/profilepage.jpg";

function Profile() {
  const [user, setUser] = useState(null); // Initially set to null
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");
  const navigate = useNavigate();

  // Fetch user profile data
  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setUser(null); // Clear old data
        navigate("/login");
        return;
      }

      try {
        const res = await fetch("http://localhost:5000/api/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();
        if (res.ok) {
          if (!data || Object.keys(data).length === 0) {
            localStorage.removeItem("token");
            setUser(null);
            navigate("/login");
          } else {
            setUser(data);
            setFormData(data);
          }
        } else {
          localStorage.removeItem("token");
          setUser(null);
          navigate("/login");
        }
      } catch (error) {
        console.error("Fetch Error:", error);
        localStorage.removeItem("token");
        setUser(null);
        navigate("/login");
      }
    };

    fetchUserData();
  }, [navigate]);

  // If no user data is available, prevent rendering
  if (!user) {
    return null;
  }

  // Handle form input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Enable edit mode
  const handleEditClick = () => {
    setIsEditing(true);
  };

  // Cancel editing and revert changes
  const handleCancel = () => {
    setIsEditing(false);
    setFormData(user);
    setStatusMessage("");
  };

  // Submit updated profile data
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;
    setLoading(true);

    const token = localStorage.getItem("token");
    if (!token) {
      alert("No token found, please login.");
      navigate("/login");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/api/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (res.ok) {
        setUser(data);
        setIsEditing(false);
        setStatusMessage("Profile Updated Successfully!");
      } else {
        setStatusMessage(data.message);
      }
    } catch (error) {
      console.error("Update Error:", error);
      setStatusMessage("Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  // Logout function (clears all user data)
  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
    navigate("/login");
  };

  return (
    <div
      style={{
        padding: "20px",
        fontFamily: "Arial",
        backgroundImage: `url(${profileImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        minHeight: "100vh",
        backgroundAttachment: "fixed",
      }}
    >
      <h1 style={{ textAlign: "center", color: "black", fontWeight: "bold", fontSize: "3rem" }}>
        User Profile
      </h1>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <div
          style={{
            width: "500px",
            padding: "20px",
            border: "1px solid #ccc",
            borderRadius: "10px",
            boxShadow: "0 0 10px rgba(0,0,0,0.3)",
            backgroundColor: "rgba(255, 255, 255, 0.8)",
          }}
        >
          <form onSubmit={handleSubmit}>
            {Object.entries(formData).map(([key, value]) =>
              !["_id", "__v", "password", "createdAt", "updatedAt"].includes(key) ? (
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
                      backgroundColor: !isEditing ? "#f3f3f3" : "white",
                      cursor: !isEditing ? "not-allowed" : "text",
                    }}
                  />
                </div>
              ) : null
            )}

            {statusMessage && (
              <p style={{ color: "green", fontWeight: "bold", textAlign: "center" }}>
                {statusMessage}
              </p>
            )}

            {!isEditing ? (
              <button
                type="button"
                onClick={handleEditClick}
                style={{
                  backgroundColor: "blue",
                  color: "white",
                  padding: "10px",
                  border: "none",
                  borderRadius: "5px",
                  cursor: "pointer",
                  width: "100%",
                  marginBottom: "10px",
                }}
              >
                Edit Profile
              </button>
            ) : (
              <>
                <button
                  type="submit"
                  disabled={loading}
                  style={{
                    backgroundColor: loading ? "gray" : "green",
                    color: "white",
                    padding: "10px",
                    border: "none",
                    borderRadius: "5px",
                    cursor: "pointer",
                    width: "100%",
                    marginBottom: "10px",
                  }}
                >
                  {loading ? "Saving..." : "Save Changes"}
                </button>
                <button
                  type="button"
                  onClick={handleCancel}
                  style={{
                    backgroundColor: "red",
                    color: "white",
                    padding: "10px",
                    border: "none",
                    borderRadius: "5px",
                    cursor: "pointer",
                    width: "100%",
                  }}
                >
                  Cancel
                </button>
              </>
            )}
          </form>

          <button
            onClick={() => navigate("/dashboard")}
            style={{
              backgroundColor: "#333",
              color: "white",
              padding: "10px",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
              width: "100%",
              marginTop: "15px",
            }}
          >
            Back to Dashboard
          </button>

          <button
            onClick={handleLogout}
            style={{
              backgroundColor: "black",
              color: "white",
              padding: "10px",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
              width: "100%",
              marginTop: "10px",
            }}
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}

export default Profile;
