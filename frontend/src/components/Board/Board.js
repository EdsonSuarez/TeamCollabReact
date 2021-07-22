import React, { useState, useEffect } from "react";
import './style.css';
import {boardsUser, tasksBoard, teamsUser} from '../../services/board';
import {getTeamAdmin} from '../../services/team';
import {updateTask} from '../../services/task';
import {isAdmin, isUser, isScrumMaster} from '../../services/auth';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle, faAngleRight, faAngleLeft, faListAlt, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { useHistory } from "react-router-dom";
import Task from "../Task/Task";

export default function Board() {

  const [toggle, setToggle] = useState(false);
  const [teamProject, setTeamProject] = useState([]);   
  const [sprints, setsprints] = useState([]);   
  const [taskToDo, setTaskToDo] = useState([]);   
  const [taskDoing, setTaskDoing] = useState([]);   
  const [taskTesting, setTaskTesting] = useState([]);   
  const [taskDone, setTaskDone] = useState([]);    
  let history = useHistory();
  
  const cambio = ()=>{
    setToggle(!toggle)    
  };

  const inicio = ()=>{
    console.log("se ejecuta")
    if(isAdmin()){  
      getTeamAdmin().then(response =>{  
        setTeamProject(response.data.team);
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
        const data = response.data.tasks;
        let taskToDoObj = [];
        let taskDoingObj = [];
        let taskTestingObj = [];
        let taskDoneObj = [];
        data.forEach(task => {
          switch (task.status) {
            case 'to-do':
              taskToDoObj.push(task);
              break;
            case 'doing':
              taskDoingObj.push(task);
              break;
            case 'testing':
              taskTestingObj.push(task);
              break;
            case 'done':
              taskDoneObj.push(task);
              break;
            default:
              break;
          }
        });
        setTaskToDo(taskToDoObj);
        setTaskDoing(taskDoingObj);
        setTaskTesting(taskTestingObj);
        setTaskDone(taskDoneObj);
      })

    }
  }

  const updateTasks = (task, stado) => {    
    task.status = stado;  
    updateTask(task).then(response =>{
      const anterior = response.data.task;
      switch (anterior.status) {
        case 'to-do':      
          console.log("todo", taskToDo)
          const index = taskToDo.indexOf(anterior);
          taskToDo.splice(index, 1);    
          console.log("todo", taskToDo)
          setTaskToDo(taskToDo=>[...taskToDo]);
          break;
        case 'doing':          
          const index2 = taskDoing.indexOf(anterior);
          taskDoing.splice(index2, 1);
          setTaskDoing(taskDoing=>[...taskDoing]);
          break;
        case 'testing':          
          const index3 = taskTesting.indexOf(anterior);
          taskTesting.splice(index3, 1);
          setTaskTesting(taskTesting=>[...taskTesting]);
          break;
        case 'done':
          const index4 = taskDone.indexOf(anterior);
          taskDone.splice(index4, 1);
          setTaskDone(taskDone=>[...taskDone]);
          break;
        default:
          break;
      }

      switch (task.status) {
        case 'to-do':                       
          setTaskToDo(taskToDo=>[...taskToDo, task]);
          break;
        case 'doing':    
          setTaskDoing(taskDoing=>[...taskDoing, task]);
          break;
        case 'testing':
          setTaskTesting(taskTesting=>[...taskTesting, task]);
          break;
        case 'done':    
          setTaskDone(taskDone=>[...taskDone, task]);
          break;
        default:
          break;
      }
    })
  }

  function getRandom() {
    return Math.random();
  }
  
  useEffect(()=> inicio(),[] )
  

  return (
    <>
    <Task></Task>
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
                  <FontAwesomeIcon icon={faListAlt} className="iconHead iconos" /> 
                  <FontAwesomeIcon icon={faTrashAlt} className="iconHead iconos" />      
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
            <div className="card" style={task.priority == '1' ?{background:"#d0e6a5"}: task.priority == '2'?{background:"#ffdd95"}: {background:"#fc887b"}} >  
                        
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
            <div className="card" style={task.priority == '1' ?{background:"#d0e6a5"}: task.priority == '2'?{background:"#ffdd95"}: {background:"#fc887b"}}>              
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
            <div className="card" style={task.priority == '1' ?{background:"#d0e6a5"}: task.priority == '2'?{background:"#ffdd95"}: {background:"#fc887b"}}>              
              <div className="card-body">
                <h5 className="card-title">{task.name}</h5>  
                <p className="card-text">{task.description}</p>
                <div className="row">
                  <div className="btn-group" role="group">
                    <button className="btn btn-warning btn-sx textSize" onClick={()=> updateTasks(task, "to-do")}> To-do </button>
                    <button className="btn btn-success btn-sx textSize"onClick={()=> updateTasks(task, "doing")} > Doing </button>
                    <button className="btn btn-light btn-sx textSize" onClick={()=> updateTasks(task, "testing")}> Testing  </button>
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
            <div className="card" style={task.priority == '1' ?{background:"#d0e6a5"}: task.priority == '2'?{background:"#ffdd95"}: {background:"#fc887b"}}>              
              <div className="card-body">
                <h5 className="card-title">{task.name}</h5>  
                <p className="card-text">{task.description}</p>
                <div className="row">
                  <div className="btn-group" role="group">
                  <button className="btn btn-warning btn-sx textSize" onClick={()=> updateTasks(task, "to-do")}> To-do </button>
                    <button className="btn btn-success btn-sx textSize" onClick={()=> updateTasks(task, "doing")}> Doing </button>
                    <button className="btn btn-light btn-sx textSize" onClick={()=> updateTasks(task, "done")}> Done  </button>
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

    </>
  );
}


