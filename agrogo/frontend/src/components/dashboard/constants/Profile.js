import React, { useEffect, useState } from 'react';
//import './profilecss.css';

const ProfilePage = () => {
    const [profile, setProfile] = useState(null);
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        fetchProfile();
        fetchPosts();
    }, []);

    // Fetch profile data
    const fetchProfile = async () => {
        try {
            const response = await fetch('http://localhost:3000/api/profile');
            const profileData = await response.json();
            setProfile(profileData);
        } catch (error) {
            console.error('Error fetching profile:', error);
        }
    };

    // Fetch posts data
    const fetchPosts = async () => {
        try {
            const response = await fetch('http://localhost:3000/api/posts');
            const postsData = await response.json();
            setPosts(postsData);
        } catch (error) {
            console.error('Error fetching posts:', error);
        }
    };

    return (
        <div className="container">
            <div className="sidebar">
                <h1>SocialConnect</h1>
                <ul>
                    <li><a href="index.html">Feed</a></li>
                    <li><a href="video.html">Videos</a></li>
                    <li><a href="groups.html">Groups</a></li>
                    <li><a href="bookmarks.html">Bookmarks</a></li>
                    <li><a href="job.html">Jobs</a></li>
                    <li><a href="events.html">Events</a></li>
                    <li><a href="courses.html">Courses</a></li>
                </ul>
                <div className="profile-section">
                    <input type="text" placeholder="Search..." />
                    <div className="profile">
                        <img src="images/profile.png" alt="Profile Picture" />
                        <a href="profile.html" className="profilename">
                            <span>{profile?.name || 'Profile Name'}</span>
                        </a>
                    </div>
                </div>
            </div>
            <div className="main-content">
                <div className="profile-header">
                    <div className="profile-info">
                        <img src="images/profile.png" alt="Profile Picture" className="profileimage" />
                        <div className="profile-details">
                            <h2>{profile?.name || 'Profile Name'}</h2>
                            <p>{profile?.details || 'Profile Details'}</p>
                        </div>
                    </div>
                </div>
                <div className="post-input">
                    <img src="images/profile.png" alt="Profile Picture" />
                    <input type="text" placeholder="What's on your mind..." />
                    <button>Photo/Video</button>
                </div>
                <div className="feed">
                    {posts.map(post => (
                        <div key={post.id} className="post">
                            <div className="post-header">
                                <img src="images/profile.png" alt="Profile Picture" />
                                <div className="post-info">
                                    <h3>{post.username}</h3>
                                    <span>{new Date(post.createdAt).toLocaleString()}</span>
                                </div>
                            </div>
                            <div className="post-content">
                                <p>{post.caption}</p>
                                <img src={post.image} alt="Post Image" />
                            </div>
                            <div className="post-actions">
                                <span>{post.likes} people like</span>
                                <button>Like</button>
                                <button>Comment</button>
                                <button>Share</button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;
