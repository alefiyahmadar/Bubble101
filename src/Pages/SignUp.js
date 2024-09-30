import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useContext, useEffect } from "react";
import { MediaContext } from "../Contexts/contextProvider";

export const SignUpPage = () => {
  const {
    setIsLoggedIn,
    loggedInUser,
    setLoggedInUser,
    GetUsers,
    SetUsersArr,
  } = useContext(MediaContext);

  const navigate = useNavigate();
  const SignUpHandler = async () => {
    try {
      const creds = {
        email: loggedInUser.email,
        password: loggedInUser.password,
        someUserAttribute1: loggedInUser.firstName,
        someUserAttribute2: loggedInUser.lastName,
        username: loggedInUser.username,
        profileImg:
          "https://i.pinimg.com/736x/a8/57/00/a85700f3c614f6313750b9d8196c08f5.jpg",
        bookMark: [],
      };

      const res = await fetch("/api/auth/signup", {
        method: "POST",
        body: JSON.stringify(creds),
      });

      const { createdUser } = await res.json();
      console.log(createdUser);
      localStorage.setItem("user", JSON.stringify(createdUser));

      const currentUser = JSON.parse(localStorage.getItem("user"));
      const updatedArray = [...GetUsers, currentUser];
      SetUsersArr(updatedArray);
      console.log(GetUsers);

      localStorage.setItem("usersArray", JSON.stringify(updatedArray));
    } catch (e) {
      console.log(e);
    }

    setIsLoggedIn(true);
    navigate("/");
    console.log(loggedInUser);
  };

  useEffect(() => {
    const storedUsers = localStorage.getItem("usersArray");
    if (storedUsers) {
      SetUsersArr(JSON.parse(storedUsers));
    }
  }, [SetUsersArr]);

  console.log(GetUsers);

  return (
    <div>
      <div className="loginContainer" style={{ height: "70vh" }}>
        <h3 style={{ marginBottom: "1rem" }}>Bubble</h3>
        <h5
          style={{
            marginTop: "0rem",
            color: "gray",
            fontSize: "15px",
            padding: "1rem",
          }}
        >
          Sign up to see photos and videos from your friends.
        </h5>
        <span>
          <input
            onChange={(e) =>
              setLoggedInUser({ ...loggedInUser, numberEmail: e.target.value })
            }
            placeholder="Mobile Number or email"
          />
          <input
            onChange={(e) =>
              setLoggedInUser({ ...loggedInUser, firstName: e.target.value })
            }
            placeholder="First Name"
          />
          <input
            onChange={(e) =>
              setLoggedInUser({ ...loggedInUser, lastName: e.target.value })
            }
            placeholder="Last Name"
          />
          <input
            onChange={(e) =>
              setLoggedInUser({ ...loggedInUser, username: e.target.value })
            }
            placeholder="Username"
          />
          <input
            onChange={(e) =>
              setLoggedInUser({ ...loggedInUser, password: e.target.value })
            }
            placeholder="password"
          />
          <button onClick={SignUpHandler}>Sign up</button>

          <p>OR</p>
          <h4>
            Have an account?{" "}
            <NavLink
              to={"/login"}
              style={{
                textDecoration: "none",
                fontWeight: "bold",
                color: "#60a5fa",
              }}
            >
              Log in
            </NavLink>
          </h4>
        </span>
      </div>
    </div>
  );
};
