import React from "react";

import { createContext, useEffect, useState } from "react";
import { users } from "../db/users";
import { posts } from "../db/posts";
import { v4 as uuid } from "uuid";

import { useNavigate } from "react-router-dom";

export const MediaContext = createContext();

export const ContextProvider = ({ children }) => {
  const [DataPost, setPostData] = useState([]);
  const [GetNewArray, setNewArray] = useState([]);
  const [SinglePost, setSinglePost] = useState([]);
  const [showSinglePost, setShowSinglePost] = useState(false);
  const [GetUsers, SetUsersArr] = useState(() => {
    const savedUser = localStorage.getItem("usersArray");
    return savedUser ? JSON.parse(savedUser) : users;
  });
  const [getPost, setGetPost] = useState(() => {
    const savedPost = localStorage.getItem("PostArray");
    return savedPost ? JSON.parse(savedPost) : posts;
  });
  const [showCreateDiv, setCreateDiv] = useState(false);
  const [BookMark, setBookmark] = useState([]);
  const [showSaved, setShowSaved] = useState(false);
  const [getCmtBarMob, setCmtMob] = useState(false);
  const [showPost, setPost] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLiked, setLiked] = useState(false);
  const [getCmt, setCmt] = useState("");

  const [loggedInUser, setLoggedInUser] = useState({});

  const [defaultUser, setDefaultUser] = useState({
    _id: uuid(),
    firstName: "Adarsh",
    lastName: "Balika",
    username: "adarshbalika",
    password: "adarshBalika123",
    numberEmail: "adarshbalika@gmail.com",
    profileImg:
      "https://images.unsplash.com/photo-1483909796554-bb0051ab60ad?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Z2lybCUyMHByb2ZpbGV8ZW58MHx8MHx8fDA%3D",
  });
  const [newPostObj, setPostObj] = useState({
    _id: uuid(),
    image: "",
    content: "",
    likes: {
      likeCount: 0,
      likedBy: [],
      dislikedBy: [],
    },
    username: "",

    comments: [],
  });

  const navigate = useNavigate();

  const storedUser = JSON.parse(localStorage.getItem("user"));
  const userArrayStored = JSON.parse(localStorage.getItem("usersArray"));
  const StoredPost = JSON.parse(localStorage.getItem("PostArray"));

  storedUser
    ? localStorage.setItem("user", JSON.stringify(storedUser))
    : localStorage.setItem("user", JSON.stringify(defaultUser));

  userArrayStored
    ? localStorage.setItem("usersArray", JSON.stringify(userArrayStored))
    : localStorage.setItem("usersArray", JSON.stringify(GetUsers));

  StoredPost
    ? localStorage.setItem("PostArray", JSON.stringify(StoredPost))
    : localStorage.setItem("PostArray", JSON.stringify(getPost));

  const FetchData = async () => {
    const getData = await fetch("/api/posts");
    const PostData = await getData.json();

    setPostData(PostData.posts);
  };

  useEffect(() => {
    FetchData();
  }, []);

  const GetSinglePost = (id) => {
    const findPost = StoredPost.find((e) => e._id === id);

    setSinglePost([findPost]);
    setShowSinglePost(true);
    setCmtMob(true);
  };

  const GetExploreScroll = (id) => {
    setPost(true);

    const getPost = StoredPost.find((e) => e._id === id);

    const getOtherPost = StoredPost.filter((e) => e._id !== id);
    const NewArray = [getPost, ...getOtherPost];
    setNewArray(NewArray);
  };

  const GuestHandler = () => {
    setIsLoggedIn(true);
    navigate("/");
    const getDefault = userArrayStored.find(
      (e) => e.username === "adarshbalika"
    );
    console.log(getDefault);
    const getUsersArray = JSON.parse(localStorage.getItem("usersArray"));

    localStorage.setItem("user", JSON.stringify(getDefault));
    localStorage.setItem("usersArray", JSON.stringify(getUsersArray));
  };

  const AddPostBtn = () => {
    console.log(newPostObj);
    const GetArray = JSON.parse(localStorage.getItem("PostArray"));
    const updatedArr = [...GetArray, newPostObj];
    setGetPost(updatedArr);
    console.log(updatedArr);
    localStorage.setItem("PostArray", JSON.stringify(updatedArr));

    setCreateDiv(false);
  };

  const AddCmtBtn = (id) => {
    console.log(id, getCmt);
    console.log(StoredPost);
    const addCmt = StoredPost.map((e) =>
      e._id === id
        ? {
            ...e,
            comments: [
              ...e.comments,
              {
                _id: uuid(),
                username: storedUser.username,
                text: getCmt,
                votes: { upvotedBy: [], downvotedBy: [] },
              },
            ],
          }
        : e
    );
    console.log(addCmt);
    setGetPost(addCmt);
    setCmt("");
  };
  localStorage.setItem("PostArray", JSON.stringify(getPost));

  const BookMarkHandler = (post) => {
    SetUsersArr((prevUser) =>
      prevUser.map((user) => {
        if (user.username === storedUser.username) {
          const isBookmarked = user.bookMark.some(
            (bookmark) => bookmark._id === post._id
          );
          const newBookmarkArray = isBookmarked
            ? user.bookMark.filter((bookmark) => bookmark._id !== post._id)
            : [...user.bookMark, post];
          return { ...user, bookMark: newBookmarkArray };
        }
        return user;
      })
    );
  };

  const LikeHandler = (post) => {
    console.log("click", post);

    setGetPost((prevPost) =>
      prevPost.map((e) => {
        if (e._id === post._id) {
          const isSimilar = e.likes.likedBy.some(
            (u) => u === storedUser.username
          );
          const newArray = isSimilar
            ? e.likes.likedBy.filter((user) => user !== storedUser.username)
            : [...e.likes.likedBy, storedUser.username];

          return {
            ...e,
            likes: {
              ...e.likes,
              likedBy: newArray,
              likeCount: newArray.length,
            },
          };
        }
        return e;
      })
    );
  };
  localStorage.setItem("PostArray", JSON.stringify(getPost));

  console.log(getPost);
  const FollowHandler = (userToFollow) => {
    console.log(userToFollow);
    SetUsersArr((prevUser) =>
      prevUser.map((user) => {
        if (user.username === storedUser.username) {
          const isBookmarked = user.following.some(
            (bookmark) => bookmark === userToFollow.username
          );
          const newBookmarkArray = isBookmarked
            ? user.following.filter(
                (bookmark) => bookmark !== userToFollow.username
              )
            : [...user.following, userToFollow.username];
          return { ...user, following: newBookmarkArray };
        }
        return user;
      })
    );
  };
  console.log(GetUsers);
  localStorage.setItem("usersArray", JSON.stringify(GetUsers));

  const isPostBookmarked = (post) => {
    const currentUserData = userArrayStored.find(
      (user) => user.username === storedUser.username
    );
    return currentUserData?.bookMark.some(
      (bookmark) => bookmark._id === post._id
    );
  };

  const isPostLiked = (post) => {
    const getPost = StoredPost.find((u) => u._id === post._id);
    console.log(getPost);
    return getPost?.likes.likedBy.some((p) => p === storedUser.username);
  };

  return (
    <MediaContext.Provider
      value={{
        DataPost,
        setPostData,
        GetSinglePost,
        SinglePost,
        setSinglePost,
        showSinglePost,
        GetUsers,
        SetUsersArr,
        setShowSinglePost,
        showCreateDiv,
        setCreateDiv,
        BookMark,
        setBookmark,
        showSaved,
        setShowSaved,
        getCmtBarMob,
        setCmtMob,
        GetExploreScroll,
        showPost,
        setPost,
        GetNewArray,
        setNewArray,
        isLoggedIn,
        setIsLoggedIn,
        GuestHandler,
        loggedInUser,
        setLoggedInUser,
        defaultUser,
        setDefaultUser,
        storedUser,
        getPost,
        setGetPost,
        AddPostBtn,
        newPostObj,
        setPostObj,
        StoredPost,
        userArrayStored,
        LikeHandler,
        isLiked,
        setLiked,
        getCmt,
        setCmt,
        AddCmtBtn,
        FollowHandler,
        BookMarkHandler,
        isPostBookmarked,
        isPostLiked,
      }}
    >
      {children}
    </MediaContext.Provider>
  );
};
