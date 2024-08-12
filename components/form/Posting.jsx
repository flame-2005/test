"use client";

import { AddPhotoAlternateOutlined } from "@mui/icons-material";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";

const Posting = ({ post, apiEndpoint, userDatas }) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: post,
  });

  const router = useRouter();
  const [collage, setCollage] = useState('');
  const [collageForm, setCollageForm] = useState(true);
  const [userData, setUserData] = useState(null);

  const handlePublish = async (data) => {
    try {
      const postForm = new FormData();

      postForm.append("creatorId", data.creatorId);
      postForm.append("caption", data.caption);
      postForm.append("tag", data.tag);

      if (typeof data.postPhoto !== "string") {
        postForm.append("postPhoto", data.postPhoto[0]);
      } else {
        postForm.append("postPhoto", data.postPhoto);
      }

      const response = await fetch(apiEndpoint, {
        method: "POST",
        body: postForm,
      });

      if (response.ok) {
        router.push(`/`);
      } else {
        console.error("Failed to publish post:", response.statusText);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleCollage = async (event) => {
    event.preventDefault(); // Prevent default form submission

    try {
      const response = await fetch(`/api/user/${userDatas.clerkId}/collage`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ collage: collage }), // Ensure 'collage' is defined
      });

      const responseData = await response.json(); // Expect JSON response
      console.log("Response data:", responseData); // Debugging line

      if (response.ok) {
        setCollageForm(false); // Hide collage form on success
        router.push(`/create-post`);
      } else {
        console.error("Failed to update collage:", response.statusText);
      }
    } catch (err) {
      console.error("Error updating collage:", err);
    }
  };

  const getUser = async () => {
    try {
      const response = await fetch(`/api/user/${userDatas.clerkId}`);
      const data = await response.json();
      console.log("Fetched user data by id:", data); // Log the fetched user data for debugging
      setUserData(data);
      
      if (data.collage !== '') {
        setCollageForm(false);
      }
    } catch (error) {
      console.error("Failed to fetch user data:", error);
    }
  };

  useEffect(() => {
    getUser();
  }, [userDatas.clerkId]);

  useEffect(() => {
    if (userData && userData.collage !== '') {
      setCollageForm(false);
    }
  }, [userData]);

  return (
    <>
      {collageForm ? (
        <form className="flex flex-col gap-7 pb-24" onSubmit={handleCollage}>
          <div>
            <label htmlFor="collage" className="text-light-1">
              Update your collage to make a post
            </label>
            <textarea
              onChange={(e) => setCollage(e.target.value)}
              value={collage}
              rows={1}
              placeholder="Collage name"
              className="w-full input"
              id="collage"
              name="collage"
            />
          </div>
          <button
            type="submit"
            className="py-2.5 rounded-lg mt-10 bg-purple-1 hover:bg-pink-1 text-light-1"
          >
            Update
          </button>
        </form>
      ) : (
        <form className="flex flex-col gap-7 pb-24" onSubmit={handleSubmit(handlePublish)}>
          <label
            htmlFor="photo"
            className="flex gap-4 items-center text-light-1 cursor-pointer"
          >
            {watch("postPhoto") ? (
              typeof watch("postPhoto") === "string" ? (
                <img
                  src={watch("postPhoto")}
                  alt="post"
                  width={250}
                  height={200}
                  className="object-cover rounded-lg"
                />
              ) : (
                <img
                  src={URL.createObjectURL(watch("postPhoto")[0])}
                  alt="post"
                  width={250}
                  height={200}
                  className="object-cover rounded-lg"
                />
              )
            ) : (
              <AddPhotoAlternateOutlined sx={{ fontSize: "100px", color: "white" }} />
            )}
            <p>Upload a photo</p>
          </label>
          <input
            {...register("postPhoto", {
              validate: (value) => {
                if (
                  typeof value === "undefined" ||
                  (Array.isArray(value) && value.length === 0)
                ) {
                  return "A photo is required!";
                }
                return true;
              },
            })}
            id="photo"
            type="file"
            style={{ display: "none" }}
          />
          {errors.postPhoto && (
            <p className="text-red-500">{errors.postPhoto.message}</p>
          )}

          <div>
            <label htmlFor="caption" className="text-light-1">
              Caption
            </label>
            <textarea
              {...register("caption", {
                required: "Caption is required",
                validate: (value) => {
                  if (value.length < 3) {
                    return "Caption must be more than 2 characters";
                  }
                },
              })}
              rows={3}
              placeholder="What's on your mind?"
              className="w-full input"
              id="caption"
            />
            {errors.caption && (
              <p className="text-red-500">{errors.caption.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="tag" className="text-light-1">
              Club
            </label>
            <select
              {...register("tag", { required: "Tag is required" })}
              className="w-full input"
            >
              <option value="fire">Fire</option>
              <option value="ice">Ice</option>
              <option value="water">Water</option>
              <option value="earth">Earth</option>
              <option value="cloud">Cloud</option>
            </select>
            {errors.tag && <p className="text-red-500">{errors.tag.message}</p>}
          </div>

          <button
            type="submit"
            className="py-2.5 rounded-lg mt-10 bg-purple-1 hover:bg-pink-1 text-light-1"
          >
            Publish
          </button>
        </form>
      )}
    </>
  );
};

export default Posting;
