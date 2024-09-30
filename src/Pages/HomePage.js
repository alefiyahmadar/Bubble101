import React from "react";

import { useContext } from "react";
import { MediaContext } from "../Contexts/contextProvider";
import { PostCard } from "../cards/postCard";
import { SinglePostCard } from "../cards/singlePostCard";

import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const HomePage = () => {
  const {
    showSinglePost,
    SinglePost,
    setShowSinglePost,
    GetUsers,
    storedUser,
    FollowHandler,
  } = useContext(MediaContext);

  const { StoredPost } = useContext(MediaContext);
  console.log(GetUsers);
  const userList = JSON.parse(localStorage.getItem("usersArray"));

  useEffect(() => {
    window.scrollTo(0, 0); // For modern browsers
    document.documentElement.scrollTop = 0; // For older browsers
  }, []);

  const navigate = useNavigate();

  return (
    <div className="explore-container">
      <div className="suggestBox">
        <span>
          <div class="circle-image">
            <img
              width="30"
              height="30"
              alt=""
              src={JSON.parse(localStorage.getItem("user")).profileImg}
            />
          </div>
          <h2 onClick={() => navigate(`/user/${storedUser.username}`)}>
            {JSON.parse(localStorage.getItem("user")).username}
          </h2>
          <p>
            {JSON.parse(localStorage.getItem("user")).someUserAttribute1}
            {JSON.parse(localStorage.getItem("user")).someUserAttribute2}
          </p>
        </span>
        <h4>Suggested for you</h4>
        <ul className="suggestUl">
          {userList.map((e) => {
            const getCurrentUser = JSON.parse(
              localStorage.getItem("usersArray")
            ).find((e) => e.username === storedUser.username);
            console.log(getCurrentUser);

            return (
              <li
                key={e._id}
                style={{
                  display:
                    JSON.parse(localStorage.getItem("user")).username ===
                    e.username
                      ? "none"
                      : "flex",
                }}
              >
                <span>
                  <div class="circle-image">
                    <img width="30" height="30" alt="" src={e.profileImg} />
                  </div>
                  <h5
                    className="linkH2"
                    onClick={() => navigate(`/user/${e.username}`)}
                  >
                    {e.username}
                  </h5>

                  <button onClick={() => FollowHandler(e)}>
                    {getCurrentUser.following.includes(e.username)
                      ? "Unfollow"
                      : "Follow"}
                  </button>
                </span>
              </li>
            );
          })}
        </ul>
      </div>

      <div
        className="PopUpSinglePost"
        style={{ display: showSinglePost ? "flex" : "none" }}
      >
        <img
          onClick={() => setShowSinglePost(false)}
          style={{
            display:
              window.innerWidth > 430
                ? showSinglePost
                  ? "block"
                  : "none"
                : "none",
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

      <div className="homeHeader">
        <span style={{ display: "flex" }}>
          <img
            style={{ paddingRight: "0" }}
            width="24"
            height="24"
            src="https://img.icons8.com/material-outlined/24/bubble.png"
            alt="bubble"
          />
          Bubble
        </span>

        <img
          onClick={() => navigate("/newPost")}
          style={{ position: "absolute", right: "10%", paddingRight: "0.5rem" }}
          width="24"
          height="24"
          src="https://img.icons8.com/material-outlined/24/add.png"
          alt="add"
        />
      </div>

      <div style={{ paddingTop: window.innerWidth < 430 ? "4rem" : "" }}>
        {StoredPost.map((e) => (
          <PostCard {...e} />
        ))}
      </div>
    </div>
  );
};
