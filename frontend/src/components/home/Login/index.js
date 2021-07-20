import React, { useState, useEffect } from "react";
import { login, updatePost } from "../../../actions/posts";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

export default function Login({ currentId, setCurrentId }) {
  const dispatch = useDispatch();
  const post = useSelector((state) => state.posts);
  const [postData, setPostData] = useState({
    email: "",
    password: "",
  });
  const handleSubmit = async (event) => {
    event.preventDefault();
    dispatch(login(postData));
    if(post.length != 0) {
        console.log("POST!!!: ", post);
        // console.log("POST!!!: ", post[0].jwtToken);
        // const jwt = JSON.stringify(post[0].jwtToken);
        // localStorage.setItem('token', jwt);
    }

    // await axios.post("http://localhost:3001/api/auth/login", postData)
    //   .then(response => console.log("answer", response.data))
    //   .catch(err => console.log(err)) 

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
