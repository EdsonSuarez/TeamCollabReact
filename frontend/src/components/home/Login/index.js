import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {loginUser} from "../../../services/user"
// import { login, updatePost } from "../../../actions/posts";

export default function Login() {

  const dispatch = useDispatch();
  const post = useSelector((state) => state.posts);
  const [postData, setPostData] = useState({
    email: "",
    password: "",
  });


  const handleSubmit = async (event) => {
    event.preventDefault();
    // dispatch(login(postData));
    // if(post.length != 0) {
    //     console.log("POST!!!: ", post);
    //     console.log("POST!!!: ", post[0].jwtToken);
    //     const jwt = String(post[0].jwtToken);
    //     localStorage.setItem('token', jwt);
    // }
    await loginUser(postData).then(response =>{  
      const jwt = String(response.data.jwtToken);      
      localStorage.setItem('token', jwt);
    } );
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}

      >
        <input
          type="text"
          id="login"
          className="fadeIn second"
          name="email"
          placeholder="User"
          onChange={(e) => setPostData({ ...postData, email: e.target.value })}
          value={postData.email}
          required
        />
        <input
          type="password"
          id="password"
          className="fadeIn third"
          name="password"
          placeholder="Password"
          onChange={(e) =>
            setPostData({ ...postData, password: e.target.value })
          }
          value={postData.password}
          required
        />
        <button type="submit" className="btn btn-pink m-2">Log in</button>
      </form>
    </>
  );
}
