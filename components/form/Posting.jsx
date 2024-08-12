"use client";

import { AddPhotoAlternateOutlined } from "@mui/icons-material";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";

const Posting = ({ post, apiEndpoint }) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: post,
  });

  const router = useRouter();

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
        router.push(`/`)
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleCollage = async (data) => {
    try{
      const response = await fetch(apiEndpoint, {
        method: "POST",
        body: collage,
      });
    } catch (err) {
      console.log(err);
    }
  };

  const [userData, setUserData] = useState(null)
  const getUser = async () => {
    try {
      const response = await fetch(`/api/user/${loggedInUser.id}`);
      const data = await response.json();
      console.log("Fetched user data:", data); // Log the fetched user data for debugging
      setUserData(data);
      
      console.log(data.collage);
        if(userData.collage !=''){
          setCollageForm(false);
          console.log(collageForm)
        }
      
    } catch (error) {
      console.error("Failed to fetch user data:", error);
    }
  };

  // Use useEffect to fetch the user data on component mount
  useEffect(() => {
  getUser();
    
  }, []);

  const [collageForm, setCollageForm] = useState(true)
  useEffect(()=>{
    if(userData !=null){
      
    if(userData.collage !=''){
      setCollageForm(false);
      
    }
  }
  
  },[userData]);

  const [collage, setCollage] = useState('')



  return (
    <>
    {(collageForm? (
      <form className="flex flex-col gap-7 pb-24" onSubmit={handleCollage} action="">
      <div>
          <label htmlFor="collage" className="text-light-1">
            Update your collage to make a post
          </label>
          <textarea
            onChange={(e)=>{setCollage(e.target.value)}}
            type="text"
            rows={1}
            placeholder="Collage name"
            className="w-full input"
            id="collage"
            name='collage'
          />
        </div>
        <button
        type="submit"
        className="py-2.5 rounded-lg mt-10 bg-purple-1 hover:bg-pink-1 text-light-1"
      >
        Update
      </button>

      </form>
    ):(
      <form
      className="flex flex-col gap-7 pb-24"
      onSubmit={handleSubmit(handlePublish)}
    >
      <label
        htmlFor="photo"
        className="flex gap-4 items-center text-light-1 cursor-pointer"
      >
        {watch("postPhoto") ? (
          // Check profile photo is a string or a file
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
          <AddPhotoAlternateOutlined
            sx={{ fontSize: "100px", color: "white" }}
          />
        )}
        <p>Upload a photo</p>
      </label>
      <input
        {...register("postPhoto", {
          validate: (value) => {
            if (
              typeof value === "null" ||
              (Array.isArray(value) && value.length === 0) ||
              value === "underfined"
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
          type="text"
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
          club
        </label>
        <select
          {...register("tag", { required: "Tag is required" })}
          type="text"
          placeholder="#tag"
          className="w-full input"
        >
          <option value="fire">fire</option>
          <option value="ice">ice</option>
          <option value="water">water</option>
          <option value="earth">earth</option>
          <option value="cloud">cloud</option>
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
    ))}
    
    
    </>
  );
};

export default Posting;
