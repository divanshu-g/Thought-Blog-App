// src/pages/BlogDetails.jsx
import { useParams } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import { doc, getDoc, updateDoc, arrayUnion } from "firebase/firestore";
import { db } from "../db/Firebase";
import { AuthContext } from "../context/AuthContext";
import { ThumbsUp } from 'lucide-react';
import { Bookmark } from 'lucide-react';

const BlogDetails = () => {
  const { id } = useParams();
  const { currentUser } = useContext(AuthContext);
  const [blog, setBlog] = useState(null);
  // const [liked, setLiked] = useState(false);
  // const [saved, setSaved] = useState(false);

  useEffect(() => {
    const fetchBlog = async () => {
      const docRef = doc(db, "blogs", id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setBlog(docSnap.data());
      }
    };

    fetchBlog();
  }, [id]);

  const handleLike = async () => {
    if (!currentUser || !blog) return;
    const blogRef = doc(db, "blogs", id);
    await updateDoc(blogRef, {
      likes: arrayUnion(currentUser.uid)
    });
    // setLiked(true);
  };

  const handleSave = async () => {
    if (!currentUser || !blog) return;
    const userRef = doc(db, "users", currentUser.uid);
    await updateDoc(userRef, {
      savedBlogs: arrayUnion(id)
    });
    // setSaved(true);
  };

  if (!blog) return <div>Loading blog...</div>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-2">{blog.title}</h1>
      <div className="text-sm text-gray-500 mb-4">
        By {blog.authorName} • {new Date(blog.createdAt?.seconds * 1000).toDateString()}
      </div>

      <div
        className="prose dark:prose-invert"
        dangerouslySetInnerHTML={{ __html: blog.content }}
      />

      <div className="flex gap-4 mt-6">
        <button onClick={handleLike} className="text-blue-500">
          < ThumbsUp />
        </button>
        {currentUser?.uid !== blog.authorId && (
          <button onClick={handleSave} className="text-green-500">
            <Bookmark />
          </button>
        )}
      </div>

      {/* Comment Section Placeholder */}
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-2">Comments</h2>
        <p className="text-gray-500">Coming soon...</p>
      </div>
    </div>
  );
};

export default BlogDetails;
