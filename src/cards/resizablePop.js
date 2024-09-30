import React from "react";

import { useContext, useState } from "react";
import { MediaContext } from "../Contexts/contextProvider";
import { useNavigate } from "react-router-dom";

export const ResizablePopUp = () => {
  const [height, setHeight] = useState(60);

  const { SinglePost, GetUsers, setCmtMob } = useContext(MediaContext);

  const HandleDrag = (e) => {
    const newY = e.touches[0].clientY;
    const screenHeight = window.innerHeight;
    const newHeight = Math.max(
      10,
      Math.min(90, ((screenHeight - newY) / screenHeight) * 100)
    );
    setHeight(newHeight);
    // height < 20 ? setCmtMob(false) : ""
  };
  const navigate = useNavigate();

  return (
    <div
      className="ResizablePopUp"
      style={{
        height: height > 40 ? `${height}vh` : "0vh" && setCmtMob(false),
        display: window.innerWidth > 430 ? "none" : "block",
      }}
      onTouchMove={HandleDrag}
    >
      <hr></hr>
      <h3>Comments</h3>

      <div>
        <ul style={{ margin: "auto", paddingInline: "0", padding: "1rem" }}>
          {SinglePost.map((e) =>
            e.comments.map(({ username, text, _id }) => (
              <li key={_id} style={{ listStyle: "none" }}>
                <div>
                  {" "}
                  <span
                    style={{
                      display: "flex",
                      padding: "0.5rem",
                      marginBottom: "1rem",
                    }}
                  >
                    <div
                      className="circle-image"
                      style={{ width: "35px", height: "35px" }}
                    >
                      <img
                        width="30"
                        height="30"
                        alt=""
                        src={
                          GetUsers.find((e) =>
                            e.username === username ? e.profileImg : null
                          ).profileImg
                        }
                      />
                    </div>

                    <div>
                      <h2
                        style={{
                          display: "flex",
                          marginBlock: "0",
                          fontSize: "14px",
                          paddingLeft: "0.5rem",
                        }}
                        onClick={() => navigate(`/user/${username}`)}
                      >
                        {username}
                      </h2>
                      <h2
                        style={{
                          display: "flex",
                          marginBlock: "0",
                          fontSize: "12px",
                          paddingLeft: "0.5rem",
                          fontWeight: "500",
                        }}
                      >
                        {text}
                      </h2>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        position: "absolute",
                        right: "0",
                        padding: "1rem",
                      }}
                    >
                      <img
                        width="15"
                        height="15"
                        src="https://img.icons8.com/material-outlined/24/FFFFFF/like--v1.png"
                        alt="like--v1"
                      />
                    </div>
                  </span>
                </div>
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  );
};
