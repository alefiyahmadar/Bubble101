import React from "react";

import { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { MediaContext } from "../Contexts/contextProvider";
import { SinglePostCard } from "./singlePostCard";
import { PostCard } from "./postCard";

export const UserPage = () => {
  const { usernameId } = useParams();

  const {
    DataPost,
    SinglePost,
    showSinglePost,
    setShowSinglePost,
    showSaved,
    setShowSaved,
    StoredPost,
    storedUser,
    FollowHandler,
  } = useContext(MediaContext);

  useEffect(() => {
    setShowSinglePost(false);
  }, [setShowSinglePost]);

  const users = JSON.parse(localStorage.getItem("usersArray"));

  const GetDp = users.find((e) =>
    e.username === usernameId ? e.profileImg : ""
  );

  const getUser = users.find((e) => e.username === storedUser.username);
  console.log(getUser);
  const getNumberOfPost = DataPost.filter((e) => e.username === usernameId);

  return (
    <div className="explore-container">
      <div className="userInfoContainer">
        <div className="imgContainer">
          <img
            alt=""
            className="circle-image-user"
            src={GetDp.profileImg}
          ></img>
        </div>
        <div className="userInfo">
          <span
            style={{
              display:
                JSON.parse(localStorage.getItem("user")).username === usernameId
                  ? "flex"
                  : "none",
            }}
          >
            <h3 className="userInfoP">{GetDp.username}</h3>
            <button>Edit profile</button>
            <button>View Archive</button>
          </span>
          <h3
            style={{
              display:
                JSON.parse(localStorage.getItem("user")).username === usernameId
                  ? "none"
                  : "flex",
            }}
            className="userInfoP"
          >
            {GetDp.username}
          </h3>

          <div>
            <p>
              <b>{getNumberOfPost.length}</b> Post
            </p>
            <p>
              <b>{GetDp.followers.length}</b> Followers
            </p>
            <p>
              <b>{GetDp.following.length}</b> Following
            </p>
          </div>
          <span className="userName">
            <p>
              {GetDp.someUserAttribute1} {GetDp.someUserAttribute2}
            </p>
            <p>{GetDp.status}</p>
          </span>

          <button
            style={{
              display:
                JSON.parse(localStorage.getItem("user")).username === usernameId
                  ? "none"
                  : "block",
            }}
            className="followBtn"
            onClick={() => FollowHandler(GetDp)}
          >
            {getUser.following.includes(GetDp.username) ? "Unfollow" : "Follow"}
          </button>
        </div>
        <div className="userPgTogglePost">
          <img
            width="18"
            height="18"
            src="https://img.icons8.com/ios/24/grid.png"
            alt="grid"
          />
          <button
            style={{
              borderTop: showSaved ? "1px solid wheat" : "1px solid black",
            }}
            onClick={() => setShowSaved(false)}
          >
            {" "}
            POSTS
          </button>
          <img
            width="18"
            height="18"
            style={{
              display:
                JSON.parse(localStorage.getItem("user")).username === usernameId
                  ? "flex"
                  : "none",
            }}
            src="https://img.icons8.com/material-sharp/24/bookmark-ribbon--v1.png"
            alt="bookmark-ribbon--v1"
          />{" "}
          <button
            style={{
              borderTop: !showSaved ? "1px solid wheat" : "1px solid black",
              display:
                JSON.parse(localStorage.getItem("user")).username === usernameId
                  ? "flex"
                  : "none",
            }}
            onClick={() => setShowSaved(true)}
          >
            SAVED
          </button>
        </div>
      </div>

      <div
        className="PopUpSinglePost"
        style={{ display: showSinglePost ? "flex" : "none" }}
      >
        <img
          onClick={() => setShowSinglePost(false)}
          style={{
            display: showSinglePost ? "block" : "none",
            position: "absolute",
            right: "0",
          }}
          className="cross"
          width="24"
          height="24"
          src="https://img.icons8.com/material-outlined/24/multiply--v1.png"
          alt="multiply--v1"
        />
        {SinglePost.map((e) => (
          <SinglePostCard {...e} />
        ))}
      </div>

      <div
        className="userPgData"
        style={{ display: showSaved ? "none" : "block" }}
      >
        {StoredPost.map((e) =>
          e.username === usernameId ? <PostCard {...e} overlay /> : null
        )}
      </div>

      <div
        className="userPgData"
        style={{ display: showSaved ? "block" : "none" }}
      >
        {GetDp.bookMark.map((e) => (
          <PostCard {...e} overlay />
        ))}
      </div>
    </div>
  );
};
