import React from "react";

import { useContext } from "react";
import { MediaContext } from "../Contexts/contextProvider";
import { PostCard } from "../cards/postCard";
import { SinglePostCard } from "../cards/singlePostCard";
import { useEffect } from "react";

export const ExplorePage = () => {
  const {
    DataPost,
    getPost,
    showSinglePost,
    setShowSinglePost,
    SinglePost,
    GetExploreScroll,
    showPost,
    setPost,
    GetNewArray,
    StoredPost,
  } = useContext(MediaContext);
  

  useEffect(() => {
    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
  }, []);

  console.log(DataPost);
  console.log(SinglePost);
  console.log(getPost)


  return (
    <div className="explore-container">
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
      <div className="exploreInput"  >
        <img
          onClick={() => setPost(false)}
          style={{ display: showPost ? "flex" : "none" }}
          width="24"
          height="24"
          src="https://img.icons8.com/ios/24/long-arrow-left.png"
          alt="long-arrow-left"
        />

        <input  placeholder="Search"></input>
      </div>
      <div className="imgContainer">
        <div
          className="image-grid"
          style={{
            display:
              window.innerWidth > 430 ? "none" : (showPost ? "none" :"grid")
          }}
        >
          {getPost.map((e) => (
            <img
              className="image-item"
              onClick={() => GetExploreScroll(e._id)}
              src={e.image}
              alt=""
            ></img>
          ) )}
        </div>
        <div 
        style={{ display: showPost ? "block" : "none" , paddingTop:"1rem"  }} 
        >
          {GetNewArray.map((e) => (
            <PostCard {...e} />
          ))}
        </div>
      </div>

      <div style={{ display: window.innerWidth < 430 ? "none" : "block" }}>
        {StoredPost.map((e) => (
          <PostCard {...e} overlay />
        ))}
      </div>
    </div>
  );
};
