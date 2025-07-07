import { useParams } from "react-router-dom"
import Navbar from "../components/home/Navbar";

const BlogDetails = () => {
    const {id} = useParams();

  return (
    <div>
        <div className="text-center p-6">
            <h1 className="text-2xl font-bold">Full Blog Details</h1>
            <p>Blog: {id}</p>
        </div>
    </div>
  )
}

export default BlogDetails