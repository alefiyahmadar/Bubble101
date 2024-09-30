import { useContext, useState } from "react";
import { NavLink } from "react-router-dom";
import { MediaContext } from "../Contexts/contextProvider";
import { useNavigate } from "react-router-dom";

export const LoginPage = () => {
  const [logUsername, setUsername] = useState();
  const [logPassword, setPassword] = useState();

  const { setIsLoggedIn, GuestHandler } = useContext(MediaContext);
  const navigate = useNavigate();

  const LogInHandler = () => {
    const usersList = JSON.parse(localStorage.getItem("usersArray"));
    console.log(usersList);
    console.log(logUsername);
    if (
      usersList.find(
        (e) => e.username === logUsername && e.password === logPassword
      )
    ) {
      console.log("userExist");

      const GetUser = usersList.find(
        (e) => e.username === logUsername && e.password === logPassword
      );
      localStorage.setItem("user", JSON.stringify(GetUser));
      setIsLoggedIn(true);
      navigate("/");
    } else {
      console.log("userNotFound");
    }
  };

  return (
    <div style={{}}>
      <div className="loginContainer">
        <h3>Bubble</h3>
        <span>
          <input
            type="email"
            onChange={(e) => setUsername(e.target.value)}
            placeholder="username or email"
            value={logUsername}
          />

          <input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            placeholder="password"
            value={logPassword}
          />
          <button onClick={LogInHandler}>Log in</button>

          <h4>
            Don't have an account?{" "}
            <NavLink
              to={"/signup"}
              style={{
                textDecoration: "none",
                fontWeight: "bold",
                color: "#60a5fa",
              }}
            >
              Sign up
            </NavLink>
          </h4>
          <p>OR</p>
          <button onClick={GuestHandler}>Log in as a Guest</button>
        </span>
      </div>
    </div>
  );
};
