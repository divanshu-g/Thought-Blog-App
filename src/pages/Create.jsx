import { useEffect, useState, useContext } from "react";
import BlogEditor from "../components/BlogEditor";
import { AuthContext } from "../context/AuthContext";
import { collection, addDoc, serverTimestamp, getDoc, doc } from "firebase/firestore";
import { db } from "../db/Firebase";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";


const Create = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [userData, setUserData] = useState(null);

  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();


  useEffect(() => {
    const fetchUser = async () => {
      if (currentUser) {
        const userRef = doc(db, "users", currentUser.uid);
        const userSnap = await getDoc(userRef);
        if (userSnap.exists()) {
          setUserData(userSnap.data());
        }
      }
    };
    fetchUser();
  }, [currentUser]);

  const handlePublish = async () => {
    if (!title || !content || !currentUser) {
      toast.error("Please write a title and some content before publishing.");
      return;
    }

    try {
    await addDoc(collection(db, "blogs"), {
      title,
      content,
      createdAt: serverTimestamp(),
      authorId: currentUser.uid,
      authorName: userData?.name || "Anonymous",
      authorEmail: currentUser.email,
      authorPic: userData?.profilePic || "https://via.placeholder.com/100",
    });

    setTitle("");
    setContent("");
    toast.success("Blog published!");
    navigate("/"); 
  } catch (error) {
    console.error(error);
    toast.error("Failed to publish blog.");
  }
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full text-2xl font-bold mb-4 outline-none"
      />

      <BlogEditor value={content} setValue={setContent} />

      <button
        onClick={handlePublish}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
      >
        Publish
      </button>
    </div>
  );
};

export default Create;
