import React, {useState, useEffect} from "react";
import './style.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencilAlt, faTrashAlt, faImage,faUserPlus, faUserMinus} from "@fortawesome/free-solid-svg-icons";
import { deleteTask, getUsersTask, deleteDetail, addDetail, getTeam } from "../../../services/task";

export default function ModalDetailTask({datos, onModalDetailTask, team}) {   

    const [usersTask, setUsersTask] = useState([]);   
    const [usersTeam, setUsersTeam] = useState([]);  
    const [userSelect, setUserSelect] = useState([]);  

    const getTask = () => {
        document.getElementById('task-window')?.click();
    }

    const delTask = () => {
        const taskId = localStorage.getItem("task")
        deleteTask(taskId)
            .then((res) => {
                console.log('Deleted task');
                document.getElementById('btn-close-modal')?.click();
                onModalDetailTask(taskId)
            })
            .catch((err) => console.log(err))
    }

    const listUsers = ()=>{
            try {
                if(datos._id){
                    getUsersTask(datos._id).then(response=>{
                        setUsersTask(response.data.users);
                    });
            }
            } catch (error) {}
    }

    const listUsersTeam = () => {
        if (team) {
            getTeam(team._id).then(res=>{
                setUsersTeam(res.data.team);
                console.log(res.data.team);
            });
        }
    }

    const userDelete = (user) => {
        if(user){
            deleteDetail(user._id).then(response=>{
                setUsersTask(usersTask.filter( user1 => user1 !== user));
              });
        }
    }

    const userAdd = () => {
        let user = userSelect;
        try {
        if(user){
          user = user.split(",")
          let data = { userId:user[0], taskId: datos._id};
          addDetail(data).then(response =>{
            user = {_id: response.data.result._id, userId: {fullName: user[1], roleId: {name: user[2]}, _id: user[0]}}
            console.log(user);
            setUsersTask(usersTask => [...usersTask, user]);
          })
        }
      } catch {}
      }
  
    useEffect(()=> listUsers(),[datos] )

    return (
    <div className="modal-dialog">
        <div className="modal-content" >
            <div className="modal-header">
                <h2 className="modal-title"> {datos.name} </h2>
                <button type="button" className="btn-close" data-bs-dismiss="modal"  aria-label="Close" id="btn-close-modal" ></button>
            </div>
            <div className="modal-body">
                <div className="divCentrado">
                    <h6>{datos.description}</h6>
                </div>

                <div className="divCentrado">
                    {datos.imageUrl ? <img src={datos.imageUrl} alt="Img task" className="imagen" /> : <FontAwesomeIcon style={{width:200, height:100}} icon={faImage}/>}                    
                </div>

                <div >
                    <h6>Priority: {datos.priority == 3
                        ? "High"
                        : datos.priority == 2
                        ? "Medium"
                        : "Low"}</h6>
                    <h6>Date: {datos.date}</h6>
                </div>

                
            </div>
            <h3 className="assigned" style={{marginTop: "20px"}}>Assigned users</h3>
            <div className="modal-body" >
          <table className="table">
          <tbody>
          {usersTask && (usersTask.map((user, index) =>(
            <tr key={index}>
              <th scope="row">{index+1}</th>
              <td>{user.userId.fullName}</td>
              {user.userId.roleId.name === 'user' ? <td>Developer</td> : <td>{user.userId.roleId.name}</td>}
              <td><button
                className="btn btn-danger btn-sm"
                title="Delete User"
                style={{padding: "0px 5px 5px 5px"}}
                onClick={() => userDelete(user)}
              >
                  <FontAwesomeIcon icon={faUserMinus} className=" iconos" size="2x"/>      
              </button></td>
            </tr>
          )))}
            
          </tbody>
          </table>
        </div>
        <div className="displayFlex modal-body " style={{ justifyContent : "space-evenly"}}>
          {usersTeam.length > 0 && (
            <>
            <select
              className="form-select ancho"
              aria-label="Default select example"
              onChange = {(event) => setUserSelect(event.target.value)}
              value = {userSelect} 
            >
              <option selected>Open this select menu</option>
            {usersTeam && (usersTeam.map((user) =>(
               <option key={Math.random()} value= {[user.userId._id, user.userId.fullName,  user.userId.roleId.name].toString()}>
                 {user.userId.fullName}
               </option>
            )))}
             
            </select>
           <button type="button" className="btn btn-success btn-sm" onClick={() => userAdd()}>
           Add User
         </button>
            </>
          )}

          {usersTeam.length == 0 && (          
          <button
            type="button"
            className="btn btn-success btn-sm"
            onClick={() => listUsersTeam()}
          >
            <FontAwesomeIcon icon={faUserPlus} className="iconHead iconos" /> 
          </button>
          )}

        </div>

            <div className="modal-footer">   

                <button
                    type="button"
                    className="btn btn-warning btn-xs m-1"
                    onClick={getTask}
                    data-bs-dismiss="modal"
                    >
                    <FontAwesomeIcon icon={faPencilAlt}/>
                </button>
                <button className="btn btn-danger btn-xs m-1" onClick={delTask}>
                    <FontAwesomeIcon icon={faTrashAlt}/>
                </button>
                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal"> Close  </button>
            </div>
        </div>
    </div>
    )
}