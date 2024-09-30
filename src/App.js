import "./App.css";
import { React } from "react";
import { Routes, Route, NavLink } from "react-router-dom";
import { HomePage } from "./Pages/HomePage";
import { ExplorePage } from "./Pages/ExplorePage";

import { useContext } from "react";
import { MediaContext } from "./Contexts/contextProvider";
import { UserPage } from "./cards/userPage";
import { useState, useRef } from "react";
import { ResizablePopUp } from "./cards/resizablePop";
import { AddNewPost } from "./Pages/AddnewPost";
import { LoginPage } from "./Pages/LoginPage";
import { SignUpPage } from "./Pages/SignUp";
import { useLocation } from "react-router-dom";

function App() {
  const [selectedImage, setSelectedImage] = useState(null);
  const fileInputRef = useRef(null);
  const {
    showCreateDiv,
    setCreateDiv,
    getCmtBarMob,
    isLoggedIn,
    newPostObj,
    setPostObj,
    storedUser,
  } = useContext(MediaContext);

  const { showSinglePost, AddPostBtn } = useContext(MediaContext);

  const HandleImgChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      setSelectedImage(file);
    }
    console.log(file.name);
    setPostObj({ ...newPostObj, image: file, username: storedUser.username });
  };
  const location = useLocation();

  return (
    <div
      className="App"
      style={{
        backgroundColor:
          window.innerWidth > 430
            ? showSinglePost || showCreateDiv
              ? "rgba(0, 0, 0, 0.3)"
              : ""
            : "",
        position:
          window.innerWidth > 430
            ? showSinglePost || showCreateDiv
              ? "fixed"
              : ""
            : getCmtBarMob
            ? "fixed"
            : null,
      }}
    >
      <nav
        style={{
          display: isLoggedIn
            ? window.innerWidth > 430
              ? "block"
              : "flex"
            : "none",
        }}
        className="nav"
      >
        <NavLink className="brandName">
          <img
            style={{ paddingLeft: "1rem" }}
            width="24"
            height="24"
            src="https://img.icons8.com/material-outlined/24/bubble.png"
            alt="bubble"
          />{" "}
          <span>
            <img
              style={{ paddingRight: "0" }}
              width="24"
              height="24"
              src="https://img.icons8.com/material-outlined/24/bubble.png"
              alt="bubble"
            />
            Bubble
          </span>
        </NavLink>

        <NavLink to="/">
          <span>
            <img
              width="24"
              height="24"
              src="https://img.icons8.com/material-sharp/24/home.png"
              alt="home"
            />
            {window.innerWidth > 430 ? "Home" : null}
          </span>
        </NavLink>
        <NavLink to="/explore">
          <span>
            {window.innerWidth > 430 ? (
              <img
                width="24"
                height="24"
                src="https://img.icons8.com/material-outlined/24/compass.png"
                alt="compass"
              />
            ) : (
              <img
                width="24"
                height="24"
                src="https://img.icons8.com/ios-filled/24/search--v1.png"
                alt="search--v1"
              />
            )}
            {window.innerWidth > 430 ? "Explore" : null}
          </span>
        </NavLink>
        <NavLink
          style={{ display: window.innerWidth > 430 ? "none" : "" }}
          to="/bookmark"
        >
          <span>
            <img
              width="24"
              height="24"
              src="https://img.icons8.com/material-outlined/24/bookmark-ribbon--v1.png"
              alt="bookmark-ribbon--v1"
            />
            {window.innerWidth > 430 ? "Bookmark" : null}
          </span>
        </NavLink>
        <NavLink
          style={{ display: window.innerWidth < 430 ? "none" : "" }}
          onClick={() => setCreateDiv(true)}
        >
          <span>
            <img
              width="24"
              height="24"
              src="https://img.icons8.com/material-outlined/24/add.png"
              alt="add"
            />
            {window.innerWidth > 430 ? "Create" : null}
          </span>
        </NavLink>

        <NavLink onClick={() => location.reload()}>
          <span>
            <img
              width="24"
              height="24"
              src="https://img.icons8.com/ios-glyphs/30/logout-rounded-left.png"
              alt="logout-rounded-left"
            />
            {window.innerWidth > 430 ? "Logout" : null}
          </span>
        </NavLink>

        <div
          style={{ display: window.innerWidth > 430 ? "none" : "flex" }}
          class="circle-image"
        >
          <img
            width="20"
            height="20"
            alt=""
            src={JSON.parse(localStorage.getItem("user")).profileImg}
          />
        </div>
      </nav>

      <img
        onClick={() => setCreateDiv(false)}
        style={{
          display:
            window.innerWidth > 430
              ? showCreateDiv
                ? "flex"
                : "none"
              : "none",
        }}
        className="cross"
        width="24"
        height="24"
        src="https://img.icons8.com/material-outlined/24/multiply--v1.png"
        alt="multiply--v1"
      />

      <div
        className="createDivContainer"
        style={{
          display:
            window.innerWidth > 430
              ? showCreateDiv
                ? "flex"
                : "none"
              : "none",
        }}
      >
        <span className="pCreate">
          Create new post <button onClick={AddPostBtn}>Share</button>
        </span>
        <div className="imgUpload">
          <input
            type="file"
            accept="image/*"
            onChange={HandleImgChange}
            style={{ display: "none" }}
            ref={fileInputRef}
          />

          <button
            style={{ display: selectedImage ? "none" : "flex" }}
            onClick={() => fileInputRef.current.click()}
          >
            Select from computer
          </button>

          {selectedImage && (
            <div
              className="imgDiv"
              style={{
                backgroundImage: selectedImage
                  ? `url("${selectedImage}")`
                  : "none",
              }}
            >
              <img src={URL.createObjectURL(selectedImage)} alt="Selected" />
            </div>
          )}
        </div>

        <div className="postUpload">
          <span className="spanCreate">
            <div class="circle-image">
              <img width="30" height="30" alt="" src={storedUser.profileImg} />
            </div>
            <h3>{storedUser.username}</h3>
          </span>

          <textarea
            onChange={(e) =>
              setPostObj({ ...newPostObj, content: e.target.value })
            }
            placeholder="Write a caption..."
          />
        </div>
      </div>

      {getCmtBarMob ? <ResizablePopUp /> : null}

      <Routes>
        <Route
          path="/"
          element={isLoggedIn ? <HomePage /> : <LoginPage />}
        ></Route>
        <Route
          path="/explore"
          element={isLoggedIn ? <ExplorePage /> : <LoginPage />}
        ></Route>
        <Route
          path="/user/:usernameId"
          element={isLoggedIn ? <UserPage /> : <LoginPage />}
        ></Route>
        <Route
          path="/newPost"
          element={isLoggedIn ? <AddNewPost /> : <LoginPage />}
        ></Route>
        <Route path="/signup" element={<SignUpPage />}></Route>
        <Route path="/login" element={<LoginPage />}></Route>
      </Routes>
    </div>
  );
}

export default App;
