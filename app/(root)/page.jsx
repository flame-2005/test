import PostList from './PostList';

const apiUrl = process.env.NEXT_PUBLIC_API_URL;
const Home = async () => {
  // Fetch data on the server side
  const response = await fetch(`${apiUrl}api/post`);
  const feedPost = await response.json();

  return (
    <div className="flex flex-col gap-10">
      <PostList feedPost={feedPost} />
    </div>
  );
};

export default Home;
