import { useEffect, useState } from 'react';
import useAuth  from '../hooks/useAuth';
import { getUserById, getBlogsByUser, deleteBlog } from '../services/userService';
import BlogCard from '../components/common/BlogCard';

const UserProfile = () => {
  const { currentUser } = useAuth();
  const [userData, setUserData] = useState(null);
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    if (currentUser) {
      getUserById(currentUser.uid).then(setUserData);
      getBlogsByUser(currentUser.uid).then(setBlogs);
    }
  }, [currentUser]);

  const handleUpdateProfile = () => {
    // open modal or inline form to update name/bio/profilePic
  };

  const handleDeleteBlog = async (blogId) => {
    await deleteBlog(blogId);
    setBlogs(blogs.filter(blog => blog.id !== blogId));
  };

  if (!userData) return <div>Loading...</div>;

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="flex items-center gap-4">
        <img src={userData.profilePic || 'https://via.placeholder.com/100'} alt="profile" className="w-20 h-20 rounded-full object-cover" />
        <div>
          <h2 className="text-2xl font-bold">{userData.name}</h2>
          <p>{userData.email}</p>
          <p className="text-gray-600">{userData.bio || 'No bio added yet'}</p>
          <button onClick={handleUpdateProfile} className="mt-2 text-blue-600">Edit Profile</button>
        </div>
      </div>

      <div className="mt-8">
        <h3 className="text-xl font-semibold">Your Blogs</h3>
        <div className="grid gap-4 mt-4">
          {blogs.map(blog => (
            <BlogCard
              key={blog.id}
              blog={blog}
              onDelete={() => handleDeleteBlog(blog.id)}
              showActions={true}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
