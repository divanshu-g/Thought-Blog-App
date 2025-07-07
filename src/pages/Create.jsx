import { useState, useContext } from "react"
import BlogEditor from "../components/BlogEditor"
import {AuthContext} from "../context/AuthContext"
import {collection, addDoc, Timestamp} from "firebase/firestore";
import {db} from "../db/Firebase"
import { toast } from "react-toastify";

const Create = () => {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("")

    const {currentUser} = useContext(AuthContext);

    const handlePublish = async() => {

        if(!title || !content ||  !currentUser){
            toast.error("Please write title or something in body before publishing")
            return;
            
        } 
        await addDoc(collection(db, "blogs"),{
            title,
            content,
            authorId: currentUser.id,
            authorEmail:currentUser.email,
            createdAt: Timestamp.now()
        })
        setTitle("");
        setContent("");
    }
   

  return (
    <div className="p-6 max-w-3xl mx-auto">

        <input 
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)} 
        className="w-full text-2xl font-bold mb-4 outline-none"/>

        <BlogEditor value={content} setValue={setContent}/>

        <button onClick={handlePublish} className="mt-4 px-4 py-2 bg-blue-500 text-white rounded">Publish</button>
    </div>
  )
}

export default Create