import Post from "@lib/models/Post"
import User from "@lib/models/User"
import { connectToDB } from "@lib/mongodb/mongoose"
import { writeFile } from "fs/promises"

export const POST = async (req) => {
  const path = require("path")
  const currentWorkingDirectory = process.cwd()
  
  try {
    await connectToDB()

    const data = await req.formData()

    let postPhoto = data.get("postPhoto")

    const dataimg = new FormData();
    dataimg.append("file", postPhoto);
    dataimg.append("upload_preset", "social");
    dataimg.append("cloud_name", "hritiksarraf");

    let url= await fetch("https://api.cloudinary.com/v1_1/hritiksarraf/image/upload", {
      method: "POST",
      body: dataimg,
    })

    let imgUrl= await url.json();
    

      

    

    postPhoto = imgUrl.url

    const newPost = await Post.create({
      creator: data.get("creatorId"),
      caption: data.get("caption"),
      tag: data.get("tag"),
      postPhoto: postPhoto
    })

    await newPost.save()

    // Update the user's posts array
    await User.findByIdAndUpdate(
      data.get("creatorId"),
      { $push: { posts: newPost._id } },
      { new: true, useFindAndModify: false }
    )

    return new Response(JSON.stringify(newPost), { status: 200 })
  } catch (err) {
    console.error(err)
    return new Response("Failed to create a new post", { status: 500 })
  }
}