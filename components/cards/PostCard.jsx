"use client"; // Ensure this is at the top

import {
  Bookmark,
  BookmarkBorder,
  BorderColor,
  Delete,
  Favorite,
  FavoriteBorder,
} from "@mui/icons-material";
import Link from "next/link";
import { useEffect, useState } from "react";
import PushPinIcon from '@mui/icons-material/PushPin';
import LocalHospitalOutlinedIcon from '@mui/icons-material/LocalHospitalOutlined';
import PlaceIcon from '@mui/icons-material/Place';

// The PostCard component
const PostCard = ({ post, creator, loggedInUser, update }) => {
  const [like, setLike] = useState(false);
  const [saved, setSaved] = useState(false);
  const [userData, setUserData] = useState(null);

  const getUser = async () => {
    try {
      const response = await fetch(`/api/user/${loggedInUser.id}`);
      const data = await response.json();
      setUserData(data);
    } catch (error) {
      console.error("Failed to fetch user data:", error);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  useEffect(() => {
    if (userData) {
      if (userData.likedPosts?.some((item) => String(item) === String(post._id))) {
        setLike(true);
      }
      if (userData.savedPosts?.some((item) => String(item) === String(post._id))) {
        setSaved(true);
      }
    }
  }, [userData, post._id]);

  const handleSave = async () => {
    setSaved(!saved);
    try {
      const response = await fetch(
        `/api/user/${loggedInUser.id}/save/${post._id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      setUserData(data);
      update();
    } catch (error) {
      console.error("Failed to save the post:", error);
    }
  };

  const handleLike = async () => {
    if (userData.pinsCount > 0) {
      setLike(!like);
      try {
        const response = await fetch(
          `/api/user/${loggedInUser.id}/like/${post._id}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const data = await response.json();
        setUserData(data);
        update();
      } catch (error) {
        console.error("Failed to like the post:", error);
      }
    }
  };

  const handleDelete = async () => {
    try {
      await fetch(`/api/post/${post._id}/${loggedInUser.id}`, {
        method: "DELETE",
      });
      update();
    } catch (error) {
      console.error("Failed to delete the post:", error);
    }
  };

  if (!userData) {
    return <p>Loading...</p>;
  }

  return (
    <div className="w-full max-w-xl rounded-lg flex flex-col gap-4 bg-dark-1 p-5 max-sm:gap-2">
      {/* Component content */}
    </div>
  );
};

export default PostCard;
