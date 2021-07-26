import React, { useState, useEffect } from "react";
import './style.css';
import {boardsUser, tasksBoard, teamsUser, deleteSprint} from '../../services/board';
import {getTeamAdmin, deleteTeam} from '../../services/team';
import {updateTask, getOneTask, deleteTask } from '../../services/task';
import {isAdmin, isScrumMaster} from '../../services/auth';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle, faAngleRight, faAngleLeft, faListAlt, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import Team from "../Team/Team";
import TeamAdd from "../Team/TeamAdd";
import Sprint from "../Sprint/Sprint";
import SprintAdd from "../Sprint/SprintAdd";
import Task from "../Task/Task";
import ModalDetailTask from "./modalDetailTask";

export default function Board() {

  const [toggle, setToggle] = useState(false);
  const [teamProject, setTeamProject] = useState([]);   
  const [sprints, setSprints] = useState([]);   
  const [taskToDo, setTaskToDo] = useState([]);   
  const [taskDoing, setTaskDoing] = useState([]);   
  const [taskTesting, setTaskTesting] = useState([]);   
  const [taskDone, setTaskDone] = useState([]);   
  const [teamSelect, setTeamSelect] = useState([]);
  const [sprintSelect, setSprintSelect] = useState([]);
  const [dataModal, setdataModal] = useState([]);      
  const [projectName, setProjectName] = useState([]);
  const [active, setActive] = useState("");
  const [activeSprint, setActiveSprint] = useState("");
  
  const cambio = ()=>{
    setToggle(!toggle)    
  };

  const inicio = ()=>{
    if(isAdmin()){  
      getTeamAdmin().then(response =>{  
        const datos = response.data.team;
        const datosActivos = datos.filter(data => data.projectId.active !== false)
        setTeamProject(datosActivos);
        setTeamSelect(datosActivos[0]);
        changeTeam(datosActivos[0]);
      })
      
    }else{
      teamsUser().then(response =>{
        const datos = response.data.teamsUser;        
        const result = []
        datos.forEach(element =>{
          result.push(element.teamId)  
        })
        const datosActivos = result.filter(data => data.projectId.active !== false)
        setTeamProject(datosActivos);
        changeTeam(datosActivos[0]);
      })
    }
  };

  const changeTeam = (team)=>{
    if(team){
      setTeamSelect(team);      
      setProjectName(team.projectId.name)
      someFunct(team._id);
      boardsUser(team._id).then(response=>{
        localStorage.setItem('team', team._id);
        setProjectName(team.projectId.name)
        const datos = response.data.boards
        if(datos.length > 0){
          setSprints(datos)
          changeSprint(datos[0]);
        }else{          
          setSprints([]);
          setTaskToDo([]);
          setTaskDoing([]);
          setTaskTesting([]);
          setTaskDone([]);
        } 
        
      })  
    }
    
  }

  const changeSprint = (sprint)=>{
    let taskToDoObj = [];
    let taskDoingObj = [];
    let taskTestingObj = [];
    let taskDoneObj = [];
    if(sprint){
      someFunctSprint(sprint._id);
      tasksBoard(sprint._id).then(response=>{ 
        localStorage.setItem('sprint', sprint._id);  
        const data = response.data.tasks;        
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
          setTaskToDo(taskToDo.filter(task=> task._id !== anterior._id));
          break;
        case 'doing':          
          setTaskDoing(taskDoing.filter(task=> task._id !== anterior._id));          
          break;
        case 'testing':          
          setTaskTesting(taskTesting.filter(task=> task._id !== anterior._id));          
          break;
        case 'done':
          setTaskDone(taskDone.filter(task=> task._id !== anterior._id));    
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

  const datosModal = (id) => { 
    localStorage.setItem('task', id );
    getOneTask(id).then(response =>{
      const datos = response.data.userTask;
      setdataModal(datos)  
    })
  }

  const handleModalDetailTask = (taskId) => {
    setTaskToDo(taskToDo.filter(task => task._id !== taskId))
    setTaskDoing(taskDoing.filter(task => task._id !== taskId))
    setTaskTesting(taskTesting.filter(task => task._id !== taskId))
    setTaskDone(taskDone.filter(task => task._id !== taskId))
  }

  const handleNewTask = (value)=>{

    console.log("value de task", value)
    setTaskToDo(taskToDo=>[...taskToDo, value]);
  }

  function getRandom() {
    return Math.random();
  }

  function someFunct(_id) {
    setActive(_id);
  }

  function someFunctSprint(_id) {
    setActiveSprint(_id);
  }
  
  useEffect(()=> inicio(),[] )
  

  const modalTeamOpen = (team) =>{
    setTeamSelect(team);
  }
  const handleTeamAdd = (res) => {
    setTeamProject(teamProject => [...teamProject, res]);
  }
  const handleSprintAdd = (res) => {
    console.log("jejeje",res);
    setSprints(sprints => [...sprints, res]);
  }
  const modalSprintOpen = (sprint) => {
    setSprintSelect(sprint);
  }

  const deleteTeamF = (team) => {
    console.log("team",team);
    console.log("antes",sprints);
    changeTeam(team);
    console.log("despues",sprints);

    // const resultado = window.confirm(
    //   `Do you want to delete the ${team.name}?`
    //   );

      // if (resultado === true) {
      //     console.log("teamProject", teamProject);
      //     console.log("teamSelect", teamSelect);
      //   sprints.forEach(sprint => {
      //     console.log("sprint", sprint);
          // deleteSprintF(sprint);
        // });

      // }
  }

  const deleteTasks = (tasks) => {
    tasks.forEach(task => {
      deleteTask(task._id)
      .then((res) => {
          console.log('Deleted task');
          console.log(res);
      })
      .catch((err) => console.log(err))    
    });

  }
  const deleteSprintF = (sprint) => {
    const resultado = window.confirm(
      `Do you want to delete the ${sprint.name}?`
      );
      if (resultado === true) {
        let arrayTasks = [taskToDo, taskDoing, taskTesting, taskDone];
        let count = 0;
        arrayTasks.forEach(tasks => {
          count++;
          console.log(count);
          deleteTasks(tasks);
        });

        deleteSprint(sprint._id).then(response => {
          console.log(response.data.message);
          setSprints(sprints.filter( sprint1 => sprint1 !== sprint));

        });
      }
  }
  return (
    <>
    <Task newTask={handleNewTask} /> 
    <input type="checkbox" checkbox="checkbox" onChange={cambio}/>
    <div className="menu">
    {toggle ? <FontAwesomeIcon icon={faAngleLeft} className="iconHead icon" /> :
            <FontAwesomeIcon icon={faAngleRight} className="iconHead icon" />  }
      <div className="menuAll">
        <div className="menuUpper">
          <div className="containerTitleMenu">
            <h3 className="titleMenu">Teams/Proyect</h3>          
            {isAdmin() || isScrumMaster() ? <FontAwesomeIcon icon={faPlusCircle} className="iconHead iconos" data-bs-toggle="modal" data-bs-target="#modalAddTeam" />  
            : <span></span>}
          </div>
          <div className="buttonsMenu">

            {teamProject.map(team =>(
            <div key={getRandom()} >
              {!isScrumMaster() && !isAdmin() 
                ?
                <div className={`containerButton ${active === team._id ? "colorFondo" : ""}`} >
                  <div className="change" onClick={()=> changeTeam(team)} > {team.name}/{team.projectId.name}</div>
                </div>
                :
                <div className={`containerButton ${active === team._id ? "colorFondo" : ""}`} >
                  <div className="change" onClick={()=> changeTeam(team)} > {team.name}/{team.projectId.name} 
                  
                  </div>
                  <span className="spacer"></span>                  
                  <FontAwesomeIcon icon={faListAlt} className="iconHead iconos" data-bs-toggle="modal" data-bs-target="#modalTeam" onClick={() => modalTeamOpen(team)}/> 
                  <FontAwesomeIcon icon={faTrashAlt} className="iconHead iconos" onClick={()=> deleteTeamF(team)}/>  
                </div >           
              }  
            </div>
            ))}

          </div >
        </div >
        <div className="menuLower">
          <div className="containerTitleMenu">
            <h3 className="titleMenu">Sprints</h3>
            {isAdmin() || isScrumMaster() ? <FontAwesomeIcon icon={faPlusCircle} data-bs-toggle="modal" data-bs-target="#modalAddSprint"className="iconHead iconos" />  
              : <span></span>}
          </div>
          <div className="buttonsMenu">

              {sprints.map(sprint =>(
            <div key={getRandom()} >
              {!isScrumMaster() && !isAdmin() 
                ?
                <div className={`containerButton ${activeSprint === sprint._id ? "colorFondo" : ""}`} >
                  <div className="change" onClick={()=> changeSprint(sprint)} > {sprint.name}</div>
                </div>
                :
                <div className={`containerButton ${activeSprint === sprint._id ? "colorFondo" : ""}`} >
                  <div className="change" onClick={()=> changeSprint(sprint)} > {sprint.name}</div>
                  <span className="spacer"></span>
                  <FontAwesomeIcon icon={faListAlt} data-bs-toggle="modal" data-bs-target="#modalSprint" className="iconHead iconos" onClick={() => modalSprintOpen(sprint)} /> 
                  <FontAwesomeIcon icon={faTrashAlt} className="iconHead iconos" onClick = {() => deleteSprintF(sprint)} /> 
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
        <div className="form-group">{projectName}</div>
      </div>
    </div>


    <div className="contents">
      <div className="containerToDo">
    <h3 className="titleSections">To-Do</h3>
      <div className="container">

        {taskToDo.map(task =>(
          <div key={getRandom()} >
            <div className="cardTask" style={task.priority == '1' ?{background:"#d0e6a5"}: task.priority == '2'?{background:"#ffdd95"}: {background:"#fc887b"}} >  
                        
              <div className="card-body">
                <h5 className="card-title" data-bs-toggle="modal" data-bs-target="#detaTask" onClick={()=> datosModal(task._id)}>{task.name}</h5>  
                <p className="task-card-text">{task.description}</p>
                <div className="row">
                  <div className="btn-group" role="group">
                    <button className="btn botonCard btn-warning btn-sx textSize" onClick={()=> updateTasks(task, "doing")}> Doing </button>
                    <button className="btn botonCard btn-success btn-sx textSize" onClick={()=> updateTasks(task, "done")}> Done  </button>
                    <button className="btn botonCard btn-light btn-sx textSize" onClick={()=> updateTasks(task, "testing")}> Testing </button>
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
            <div className="cardTask" style={task.priority == '1' ?{background:"#d0e6a5"}: task.priority == '2'?{background:"#ffdd95"}: {background:"#fc887b"}}>              
              <div className="card-body">
                <h5 className="card-title" data-bs-toggle="modal" data-bs-target="#detaTask" onClick={()=> datosModal(task._id)}>{task.name}</h5>  
                <p className="task-card-text">{task.description}</p>
                <div className="row">
                  <div className="btn-group" role="group">
                    <button className="btn botonCard btn-danger btn-sx textSize" onClick={()=> updateTasks(task, "to-do")}> To-do </button>
                    <button className="btn botonCard btn-success btn-sx textSize" onClick={()=> updateTasks(task, "done")}> Done  </button>
                    <button className="btn botonCard btn-light btn-sx textSize" onClick={()=> updateTasks(task, "testing")}> Testing </button>
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
            <div className="cardTask" style={task.priority == '1' ?{background:"#d0e6a5"}: task.priority == '2'?{background:"#ffdd95"}: {background:"#fc887b"}}>              
              <div className="card-body">
                <h5 className="card-title" data-bs-toggle="modal" data-bs-target="#detaTask" onClick={()=> datosModal(task._id)}>{task.name}</h5>  
                <p className="task-card-text">{task.description}</p>
                <div className="row">
                  <div className="btn-group" role="group">
                    <button className="btn botonCard btn-danger btn-sx textSize" onClick={()=> updateTasks(task, "to-do")}> To-do </button>
                    <button className="btn botonCard btn-warning btn-sx textSize"onClick={()=> updateTasks(task, "doing")} > Doing </button>
                    <button className="btn botonCard btn-light btn-sx textSize" onClick={()=> updateTasks(task, "testing")}> Testing  </button>
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
            <div className="cardTask" style={task.priority == '1' ?{background:"#d0e6a5"}: task.priority == '2'?{background:"#ffdd95"}: {background:"#fc887b"}}>              
              <div className="card-body">
                <h5 className="card-title" data-bs-toggle="modal" data-bs-target="#detaTask" onClick={()=> datosModal(task._id)}>{task.name}</h5>  
                <p className="task-card-text">{task.description}</p>
                <div className="row">
                  <div className="btn-group" role="group">
                    <button className="btn botonCard btn-danger btn-sx textSize" onClick={()=> updateTasks(task, "to-do")}> To-do </button>
                    <button className="btn botonCard btn-warning btn-sx textSize" onClick={()=> updateTasks(task, "doing")}> Doing </button>
                    <button className="btn botonCard btn-success btn-sx textSize" onClick={()=> updateTasks(task, "done")}> Done  </button>
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

    <div id="modalAddTeam"
      className="modal fade"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <TeamAdd onTeamAdd={handleTeamAdd}/>
    </div>
    
    <div id="modalSprint"
      className="modal fade"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    ><Sprint sprint={sprintSelect}/></div>

    <div id="modalAddSprint"
      className="modal fade"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    ><SprintAdd onSprintAdd={handleSprintAdd}/></div>

    <div id="detaTask" className="modal fade" tabIndex="-1">
      <ModalDetailTask datos={dataModal} onModalDetailTask={handleModalDetailTask}/>
    </div>

    </>
  );
}


