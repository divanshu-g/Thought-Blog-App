import BlogList from "../components/home/BlogList";

const Home = () => {
  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Latest Blogs</h1>
      <BlogList />
    </div>
  );
};

export default Home;
