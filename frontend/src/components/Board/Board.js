import React, { useState, useEffect } from "react";
import { boardGet } from "../../actions/board";
import { useDispatch, useSelector } from "react-redux";

export default function Board({ currentId, setCurrentId }) {
  const dispatch = useDispatch();
  const post = useSelector((state) => state.posts);
  const [postData, setPostData] = useState();
  const handleSubmit = async (event) => {
    event.preventDefault();
    dispatch(boardGet());
    console.log("POST!!!: ", post);
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}

      >

        <button type="submit" className="btn btn-pink m-2">Log in</button>
      </form>
    </>
  );
}
