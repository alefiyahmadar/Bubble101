import React from "react";

import { useContext } from "react";
import { MediaContext } from "../Contexts/contextProvider";
import { useNavigate } from "react-router-dom";

export const SinglePostCard = (post) => {
  const { _id, content, username, image } = post;

  const {
    GetUsers,
    isPostLiked,
    LikeHandler,
    StoredPost,
    BookMarkHandler,
    isPostBookmarked,
    setCmt,
    AddCmtBtn,
    getCmt,
  } = useContext(MediaContext);
  console.log(GetUsers);

  const navigate = useNavigate();
  const getLocation = window.location.href;
  console.log(getLocation);

  const getProfile = GetUsers.find((e) =>
    e.username === username ? e.profileImg : null
  );
  const getCurrPost = StoredPost.find((e) => e._id === _id);

  return (
    <div className="popUpContainer" key={_id}>
      <img
        className="singlePostImg"
        style={{ display: image ? "flex" : "none" }}
        src={image}
        alt=""
      />

      <div className="singlePostInfo">
        <span className="singlePostSpan">
          <div class="circle-image">
            <img
              alt=""
              src={
                getProfile.username === username ? getProfile.profileImg : ""
              }
            />
          </div>
          <h2 className="linkH2" onClick={() => navigate(`/user/${username}`)}>
            {username}
          </h2>
        </span>

        <div className="scrollable-div">
          <span>
            <div class="circle-image">
              <img
                alt=""
                src={
                  getProfile.username === username ? getProfile.profileImg : ""
                }
              />
            </div>
            <p className="para">
              {" "}
              <b>{username}</b> {content}
            </p>
          </span>

          <ul className="content-list">
            {getCurrPost.comments.map(({ _id, username, text }) => {
              const getCmtImg = GetUsers.find((e) =>
                e.username === username ? e.profileImg : null
              );
              console.log(getCmtImg);

              return (
                <li key={_id}>
                  <span>
                    <div class="circle-image">
                      <img
                        alt=""
                        src={
                          getCmtImg.username === username
                            ? getCmtImg.profileImg
                            : ""
                        }
                      />
                    </div>
                    <h3>{username}</h3>
                  </span>
                  <p className="text">{text}</p>
                </li>
              );
            })}
          </ul>
          <div className="commentBar">
            <div className="commentImgs">
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
            <div className="addComment">
              <input
                placeholder="Add a comment..."
                onChange={(e) => setCmt(e.target.value)}
                value={getCmt}
              />
              <button onClick={() => AddCmtBtn(_id)} className="PostCmtBtn">
                post
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
