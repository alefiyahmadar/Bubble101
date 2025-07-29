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
    newUser,setNewUser , Name ,setFirst ,lastName , setLast , UserName , setUserName , Password , setPassword ,Email ,setEmail , setShowAlert
  } = useContext(MediaContext);

  const navigate = useNavigate();
  const SignUpHandler = () => {
    

    

    navigate("/")
    
setIsLoggedIn(true)

setShowAlert(true)
setAlertMsg(`Welcome ${newUser.username}✨`)

   SetUsersArr([...GetUsers , newUser])

   const upgradedArr = [...GetUsers , newUser]

   localStorage.setItem("usersArray" , JSON.stringify(upgradedArr))
      


   

   




    setIsLoggedIn(true);
    navigate("/");
    
    setLoggedInUser(newUser)
  };

  useEffect(() => {
    const storedUsers = localStorage.getItem("usersArray");
    if (storedUsers) {
      SetUsersArr(JSON.parse(storedUsers));
    }
  }, [SetUsersArr]);

  
  console.log(loggedInUser);
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
            onChange={(e) =>setNewUser({...newUser , Email:e.target.value})
              
            }
            placeholder="Mobile Number or email"
          />
          <input
            onChange={(e) =>
              setNewUser({...newUser , firstName:e.target.value})
            }
            placeholder="First Name"
          />
          <input
            onChange={(e) =>
              setNewUser({...newUser , lastName:e.target.value})
            }
            placeholder="Last Name"
          />
          <input
            onChange={(e) =>
              setNewUser({...newUser , username:e.target.value})
            }
            placeholder="Username"
          />
          <input
            onChange={(e) =>
              setNewUser({...newUser , password:e.target.value})
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
