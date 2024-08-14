import Post from "@lib/models/Post";
import { connectToDB } from "@lib/mongodb/mongoose";

export const GET = async (req) => {
  try {
    await connectToDB();

    // Log a message to confirm connection
    console.log("Connected to the database");

    const feedPosts = await Post.find()

    // Log the retrieved posts
    console.log("Feed posts:", feedPosts);

    return new Response(JSON.stringify(feedPosts), { status: 200 });
  } catch (err) {
    console.error("Error fetching feed posts:", err);
    return new Response("Failed to fetch all Feed Posts", { status: 500 });
  }
};
