import { useContext } from "react";
import React from "react";

import { MediaContext } from "../Contexts/contextProvider";
import { useNavigate } from "react-router-dom";

export const AddNewPost = () => {
  const { user } = useContext(MediaContext);
  const navigate = useNavigate();

  return (
    <div className="AddNewPostContainer">
      <div className="newPostHead">
        <img
          onClick={() => navigate("/")}
          width="24"
          height="24"
          src="https://img.icons8.com/ios/24/less-than.png"
          alt="less-than"
        />
        <p>New Post</p>
        <button>Share</button>
      </div>
      <img
        className="newPostImg"
        src={
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQq9fs0JFDtFzFlNkiVlUIXnmBfGm5xl1hdyg&usqp=CAU"
        }
        alt=""
      ></img>
      <div className="newPostCaption">
        <div className="circle-image">
          <img src={user.profileImg} alt=""></img>
        </div>
        <textarea placeholder="Add caption..."></textarea>
      </div>
    </div>
  );
};
