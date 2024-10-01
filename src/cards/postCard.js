import React from "react";

import { useContext, useState } from "react";
import { MediaContext } from "../Contexts/contextProvider";
import { useNavigate } from "react-router-dom";

export const PostCard = (post, index) => {
  const { _id, content, username, comments, image, overlay } = post;

  const [More, setMore] = useState(false);

  const {
    GetSinglePost,
    showSinglePost,
    LikeHandler,
    StoredPost,
    getCmt,
    setCmt,
    AddCmtBtn,
    BookMarkHandler,
    isPostBookmarked,
    isPostLiked,
  } = useContext(MediaContext);

  const url = window.location.href;

  const navigate = useNavigate();
  const usersList = JSON.parse(localStorage.getItem("usersArray"));

  const getProfile = usersList.find((e) => e.username === username);
  

  return (
    <div
      className="PostCard-container"
      onClick={url.charAt(23) === "e" && "u" ? () => GetSinglePost(_id) : null}
      key={_id}
    >
      <span>
        <div className="circle-image">
          <img
            width="30"
            height="30"
            alt=""
            src={getProfile.username === username ? getProfile.profileImg : ""}
          />
        </div>

        <h2 className="linkH2" onClick={() => navigate(`/user/${username}`)}>
          {username}
        </h2>
      </span>

      <img
        className="image"
        alt=""
        style={{
          display:
            window.innerWidth > 430 ? (showSinglePost ? "none" : "block") : "",
        }}
        src={image}
      ></img>

      <p style={{ display: image ? "none" : "flex" }}>{content}</p>

      {overlay && (
        <div onClick={() => GetSinglePost(_id)} className="overlay"></div>
      )}
      {overlay && (
        <div className="image-overlay">
          <span className="image1">
            <img
              width="30"
              height="30"
              src={
                isPostLiked(post)
                  ? "https://img.icons8.com/ios-glyphs/30/FA5252/like--v1.png"
                  : "https://img.icons8.com/ios-glyphs/30/FFFFFF/like--v1.png"
              }
              alt="like--v1"
            />
            {StoredPost.map((e) =>
              e._id === _id ? `${e.likes.likeCount}` : ""
            )}
          </span>
          <span className="image2">
            {" "}
            <img
              width="30"
              height="30"
              src="https://img.icons8.com/ios-glyphs/30/FFFFFF/speech-bubble--v1.png"
              alt="speech-bubble--v1"
            />
            {StoredPost.map((e) =>
              e._id === _id ? `${e.comments.length}` : ""
            )}
          </span>
        </div>
      )}

      {overlay || (
        <div className="homePgCmtBar">
          <div className="commentImgs">
            <div className="homePostImg">
              <img
                width="24"
                height="24"
                src={
                  isPostLiked(post)
                    ? "https://img.icons8.com/ios-glyphs/30/FA5252/like--v1.png"
                    : "https://img.icons8.com/material-outlined/24/like--v1.png"
                }
                alt="like--v1"
                onClick={() => LikeHandler(post)}
              />
              <span style={{ position: "absolute" }}>
                {StoredPost.map((e) =>
                  e._id === _id ? `${e.likes.likeCount}` : ""
                )}
              </span>

              <img
                onClick={() => GetSinglePost(_id)}
                width="24"
                height="24"
                src="https://img.icons8.com/material-outlined/24/comments--v1.png"
                alt="comments--v1"
              />
              <img
                width="24"
                height="24"
                src="https://img.icons8.com/ios-filled/24/share-3.png"
                alt="share-3"
              />

              <img
                onClick={() => BookMarkHandler(post)}
                className="bookmarkHome"
                width="24"
                height="24"
                src={
                  isPostBookmarked(post)
                    ? "https://img.icons8.com/ios-glyphs/30/bookmark-ribbon.png"
                    : "https://img.icons8.com/material-outlined/24/bookmark-ribbon--v1.png"
                }
                alt="bookmark-ribbon--v1"
              />
            </div>
            <span>
              <p className="pHome">{username}</p>
              <div
                className="homeParaContainer"
                style={{ maxHeight: More ? "100%" : "2.5em" }}
              >
                <p>
                  {" "}
                  {content}{" "}
                  <button
                    style={{ display: More ? "none" : "flex" }}
                    className="moreMobileBtn"
                    onClick={() => setMore(!More)}
                  >
                    ...More
                  </button>{" "}
                </p>

                <button className="readMoreBtn" onClick={() => setMore(!More)}>
                  {More ? "less" : "...More"}
                </button>
              </div>
            </span>

            <p className="cmtP" onClick={() => GetSinglePost(_id)}>
              View all {comments.length} comments
            </p>

            <div className="inputGrp">
              <input
                className="cmtBarHome"
                placeholder="Add a comment..."
                onChange={(e) => setCmt(e.target.value)}
                value={getCmt}
              />
              <button className="PostCmtBtn" onClick={() => AddCmtBtn(_id)}>
                Post
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
