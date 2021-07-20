import React, { useState, useEffect } from "react";
import { boardGet } from "../../actions/board";
import { useDispatch, useSelector } from "react-redux";
import './style.css';

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
    <input type="checkbox" checkbox="checkbox" />
    <div className="menu">
      <span className="material-icons icon"></span>
      <div className="menuAll">
        <div className="menuUpper">
          <div className="containerTitleMenu">
            <h3 className="titleMenu">Teams/Proyect</h3>
            <span className="material-icons" >add_circle_outline</span>
          </div>
          <div className="buttonsMenu">
            <div>
              <div className="containerButton" >
                <div className="change" > </div>
              </div>
              <div className="containerButton" >
                <div className="change" > </div>
                <span className="spacer"></span>
                <span className="material-icons icono"> delete</span>
                <span className="material-icons icono" > edit_note</span>
              </div >
            </div >
          </div >
        </div >
        <div className="menuLower">
          <div className="containerTitleMenu">
            <h3 className="titleMenu">Sprints</h3>
            <span className="material-icons" >add_circle_outline</span >
          </div>
          <div className="buttonsMenu" >
            <div>
              <div className="containerButton" >
                <div className="change"> </div >
              </div >

              <div className="containerButton" >
                <div className="change" > </div >
                <span className="spacer"></span>
                <span className="material-icons icono" > delete</span >

                <span className="material-icons icono" > edit_note</span>
              </div >
            </div >
          </div >
        </div >
      </div >
    </div >


    <div className="card-header text-center title">
      <div className="col-lg-12">
        <div className="form-group"></div>
      </div>
    </div>


    <div className="contents">
      <div className="containerToDo">
    <h3 className="titleSections">To-Do</h3>
      <div className="container">

        {/* AQUI LAS CARD */}

        <div class="card" style={{width: 150}}>
          <img src="..." class="card-img-top" alt="..." />
          <div class="card-body">
            <h5 class="card-title">Card title</h5>
            <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
            <a href="#" class="btn btn-primary">Go somewhere</a>
          </div>
        </div>

      </div>
    </div>


    <div className="containerDoing">
      <h3 className="titleSections">Doing</h3>
      <div className="container" >

        {/* AQUI LAS CARD */}

        <div class="card" style={{width: 150}}>
            <img src="..." class="card-img-top" alt="..." />
            <div class="card-body">
              <h5 class="card-title">Card title</h5>
              <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
              <a href="#" class="btn btn-primary">Go somewhere</a>
            </div>
        </div>
        
      </div>
    </div>

    <div className="containerDone">
      <h3 className="titleSections">Done</h3>
      <div className="container" >      

        {/* AQUI LAS CARD */}

        <div class="card" style={{width: 150}}>
            <img src="..." class="card-img-top" alt="..." />
            <div class="card-body">
              <h5 class="card-title">Card title</h5>
              <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
              <a href="#" class="btn btn-primary">Go somewhere</a>
            </div>
        </div>

      </div>
    </div>

    <div className="containerTesting">
      <h3 className="titleSections">Testing</h3>
      <div className="container">

        {/* AQUI LAS CARD */}

        <div class="card" style={{width: 150}}>
            <img src="..." class="card-img-top" alt="..." />
            <div class="card-body">
              <h5 class="card-title">Card title</h5>
              <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
              <a href="#" class="btn btn-primary">Go somewhere</a>
            </div>
          </div>

      </div>
    </div>

    <div className="containerOtro">
        <h3 className="titleSections"></h3>
        <form onSubmit={handleSubmit}>
          <button type="submit" classNameName="btn btn-pink m-2">Log in</button>
        </form> 
    </div>
    </div>

    </>
  );
}


