import React, { useState, useEffect } from "react";
import './style.css';
import {boardsUser, tasksBoard, teamsUser} from '../../services/board';
import {getTeamAdmin} from '../../services/team';
import {updateTask} from '../../services/task';
import {isAdmin, isUser, isScrumMaster} from '../../services/auth';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle, faAngleRight, faAngleLeft, faListAlt, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import Team from "../Team/Team";
import { useHistory } from "react-router-dom";

export default function Board() {

  const [toggle, setToggle] = useState(false);
  const [teamProject, setTeamProject] = useState([]);   
  const [sprints, setsprints] = useState([]);   
  const [taskToDo, setTaskToDo] = useState([]);   
  const [taskDoing, setTaskDoing] = useState([]);   
  const [taskTesting, setTaskTesting] = useState([]);   
  const [taskDone, setTaskDone] = useState([]);   
  const [teamSelect, setTeamSelect] = useState([]);
  let history = useHistory();
  
  const cambio = ()=>{
    setToggle(!toggle)    
  };

  const inicio = ()=>{
    if(isAdmin()){  
      getTeamAdmin().then(response =>{  
        setTeamProject(response.data.team);
        setTeamSelect(response.data.team[0]);
        const datos = response.data.team;
        changeTeam(datos[0]);
        // console.log("datos",datos);
      })
      
    }else{
      teamsUser().then(response =>{
        const datos = response.data.teamsUser;
        console.log("datos user", datos)
        const result = []
        datos.forEach(element =>{
          result.push(element.teamId)  
        })
        // console.log("datos2", result)
        setTeamProject(result);
        changeTeam(result[0]);
      })
    }
  };

  const changeTeam = (team)=>{
    if(team){
      setTeamSelect(team);
      boardsUser(team._id).then(response=>{
        localStorage.setItem('team', team._id);
        setsprints(response.data.boards)
        const datos = response.data.boards
        changeSprint(datos[0]);
        // console.log("sprints",datos[0])
      })  
    }  
    
  }

  const changeSprint = (sprint)=>{
    if(sprint){
      tasksBoard(sprint._id).then(response=>{ 
        localStorage.setItem('sprint', sprint._id); 
        let taskToDo = []
        let taskDoing = []
        let taskTesting = []
        let taskDone = []
        const data = response.data.tasks;
        data.forEach(task => {
          switch (task.status) {
            case 'to-do':
              taskToDo.push(task);
              break;
            case 'doing':
              taskDoing.push(task);
              break;
            case 'testing':
              taskTesting.push(task);
              break;
            case 'done':
              taskDone.push(task);
              break;
            default:
              break;
          }
        });
        setTaskToDo(taskToDo);
        setTaskDoing(taskDoing);
        setTaskTesting(taskTesting);
        setTaskDone(taskDone);
      })

    }
  }

  const updateTasks = (task, status) => {
    
    task.status = status;
    updateTask(task).then(response =>{
      history.push("/board");  
    })
  }

  function getRandom() {
    return Math.random();
  }
  
  useEffect(()=> inicio(),[] )

  const modalTeamOpen = (team) =>{
    setTeamSelect(team);
    //console.log(teamSelect);
  }

  const deleteTeam = (team) => {
    console.log(team);
  }
  return (
    <>
    
    <input type="checkbox" checkbox="checkbox" onChange={cambio}/>
    <div className="menu">
    {toggle ? <FontAwesomeIcon icon={faAngleLeft} className="iconHead icon" /> :
            <FontAwesomeIcon icon={faAngleRight} className="iconHead icon" />  }
      <div className="menuAll">
        <div className="menuUpper">
          <div className="containerTitleMenu">
            <h3 className="titleMenu">Teams/Proyect</h3>          
            {isAdmin() || isScrumMaster() ? <FontAwesomeIcon icon={faPlusCircle} className="iconHead iconos" />  
            : <span></span>}
          </div>
          <div className="buttonsMenu">

            {teamProject.map(team =>(
            <div key={getRandom()} >
              {!isScrumMaster() && !isAdmin() 
                ?
                <div className="containerButton" >
                  <div className="change" onClick={()=> changeTeam(team)} > {team.name}/{team.projectId.name}</div>
                </div>
                :
                <div className="containerButton" >
                  <div className="change" onClick={()=> changeTeam(team)} > {team.name}/{team.projectId.name} </div>
                  <span className="spacer"></span>                  
                  <FontAwesomeIcon icon={faListAlt} className="iconHead iconos" data-bs-toggle="modal" data-bs-target="#modalTeam" onClick={() => modalTeamOpen(team)}/> 
                  <FontAwesomeIcon icon={faTrashAlt} className="iconHead iconos" onClick={()=> deleteTeam(team)}/>       
                </div >           
              }  
            </div>
            ))}

          </div >
        </div >
        <div className="menuLower">
          <div className="containerTitleMenu">
            <h3 className="titleMenu">Sprints</h3>
            {isAdmin() || isScrumMaster() ? <FontAwesomeIcon icon={faPlusCircle} className="iconHead iconos" />  
              : <span></span>}
          </div>
          <div className="buttonsMenu">

              {sprints.map(sprint =>(
            <div key={getRandom()} >
              {!isScrumMaster() && !isAdmin() 
                ?
                <div className="containerButton" >
                  <div className="change" onClick={()=> changeSprint(sprint)} > {sprint.name}</div>
                </div>
                :
                <div className="containerButton" >
                  <div className="change" onClick={()=> changeSprint(sprint)} > {sprint.name}</div>
                  <span className="spacer"></span>
                  <FontAwesomeIcon icon={faListAlt} className="iconHead iconos" /> 
                  <FontAwesomeIcon icon={faTrashAlt} className="iconHead iconos" /> 
                </div >           
              }  
            </div>
            ))}

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

        {taskToDo.map(task =>(
          <div key={getRandom()} >
            <div className="card" style={{width: 150}}>              
              <div className="card-body">
                <h5 className="card-title">{task.name}</h5>  
                <p className="card-text">{task.description}</p>
                <div className="row">
                  <div className="btn-group" role="group">
                    <button className="btn btn-warning btn-sx textSize" onClick={()=> updateTasks(task, "doing")}> Doing </button>
                    <button className="btn btn-success btn-sx textSize" onClick={()=> updateTasks(task, "done")}> Done  </button>
                    <button className="btn btn-light btn-sx textSize" onClick={()=> updateTasks(task, "testing")}> Testing </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}      

      </div>
    </div>


    <div className="containerDoing">
      <h3 className="titleSections">Doing</h3>
      <div className="container" >

      {taskDoing.map(task =>(
          <div key={getRandom()} >
            <div className="card" style={{width: 150}}>              
              <div className="card-body">
                <h5 className="card-title">{task.name}</h5>  
                <p className="card-text">{task.description}</p>
                <div className="row">
                  <div className="btn-group" role="group">
                    <button className="btn btn-warning btn-sx textSize" onClick={()=> updateTasks(task, "to-do")}> To-do </button>
                    <button className="btn btn-success btn-sx textSize" onClick={()=> updateTasks(task, "done")}> Done  </button>
                    <button className="btn btn-light btn-sx textSize" onClick={()=> updateTasks(task, "testing")}> Testing </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}  
        
      </div>
    </div>

    <div className="containerDone">
      <h3 className="titleSections">Done</h3>
      <div className="container" >      
      
      {taskDone.map(task =>(
          <div key={getRandom()} >
            <div className="card" style={{width: 150}}>              
              <div className="card-body">
                <h5 className="card-title">{task.name}</h5>  
                <p className="card-text">{task.description}</p>
                <div className="row">
                  <div className="btn-group" role="group">
                    <button className="btn btn-warning btn-sx textSize" onClick={()=> updateTasks(task, "to-do")}> To-do </button>
                    <button className="btn btn-success btn-sx textSize"onClick={()=> updateTasks(task, "doing")} > Doing </button>
                    <button className="btn btn-light btn-sx textSize" onClick={()=> updateTasks(task, "done")}> Done  </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}  

      </div>
    </div>

    <div className="containerTesting">
      <h3 className="titleSections">Testing</h3>
      <div className="container">

      {taskTesting.map(task =>(
          <div key={getRandom()} >
            <div className="card" style={{width: 150}}>              
              <div className="card-body">
                <h5 className="card-title">{task.name}</h5>  
                <p className="card-text">{task.description}</p>
                <div className="row">
                  <div className="btn-group" role="group">
                  <button className="btn btn-warning btn-sx textSize" onClick={()=> updateTasks(task, "to-do")}> To-do </button>
                    <button className="btn btn-success btn-sx textSize" onClick={()=> updateTasks(task, "doing")}> Doing </button>
                    <button className="btn btn-light btn-sx textSize" onClick={()=> updateTasks(task, "testing")}> Testing  </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}  

      </div>
    </div>

    <div className="containerOtro">
        <h3 className="titleSections"></h3>        

    </div>
    </div>

        {/* ---------------- MODALS ------------------*/}

    <div id="modalTeam"
      className="modal fade"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    > <Team team={teamSelect}/>
    </div>

    </>
  );
}


