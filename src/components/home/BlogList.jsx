import { Link } from "react-router-dom";

const BlogList = () => {
    const dummyBlogs = [
  {
    id: 1,
    title: "First Blog Post",
    author: "Divanshu",
    date: "2025-07-06",
    content: "This is a short preview of the first blog..."
  },
  {
    id: 2,
    title: "Another Day, Another Blog",
    author: "Jane Doe",
    date: "2025-07-05",
    content: "Blogging is fun when you build your own platform!"
  }
];
  return (
    <div className="p-6 grid gap-4">
        {dummyBlogs.map((blog) => (
            <span key={blog.id} className="p-4 text-center bg-white dark:bg-gray-800 dark:text-white hover:shadow">
                <h2 className="text-xl font-semibold">{blog.title}</h2>
                <p className="text-sm text-gray-600 dark:text-gray-600">By {blog.author} on {blog.date}</p>
                <p className="mt-6">{blog.content}</p>
                <Link to={`/fullBlog/${blog.id}`} className="text-blue-500 hover:underline mt-2 inline-block">Read More</Link>
                <span className=""></span>
            </span>
        ))}
    </div>
  )
}

export default BlogList