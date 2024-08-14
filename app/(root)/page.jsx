import PostList from './PostList';

const Home = async () => {
  // Fetch data on the server side
  const response = await fetch(`http://localhost:3000/api/post`);
  const feedPost = await response.json();

  return (
    <div className="flex flex-col gap-10">
      <PostList feedPost={feedPost} />
    </div>
  );
};

export default Home;
