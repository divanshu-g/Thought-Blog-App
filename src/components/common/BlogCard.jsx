import { Link } from "react-router-dom";

const BlogCard = ({ blog, onDelete, showActions = false }) => {
  return (
    <div className="p-4 rounded shadow">
      <h2 className="text-xl font-bold">{blog.title}</h2>
      <div
        className="text-gray-600 prose dark:prose-invert max-w-none"
        dangerouslySetInnerHTML={{
          __html: (blog.excerpt || blog.content)?.slice(0, 300) + "...",
        }}
      ></div>
      <Link to={`/fullBlog/${blog.id}`} className="text-blue-600 block mt-2">
        Read More
      </Link>

      {showActions && (
        <button onClick={onDelete} className="mt-2 text-red-500">
          Delete
        </button>
      )}
    </div>
  );
};

export default BlogCard;
