import './style.css';
import React, { useState, useEffect } from "react";
import {getUsers, deleteDetail, addDetail} from '../../services/team';
import {listUsersAll} from '../../services/user';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle, faTrashAlt } from "@fortawesome/free-solid-svg-icons";

export default function Team({team}) {

    const [users, setUsers] = useState([]);   
    const [usersAll, setUsersAll] = useState([]);  
    const [userSelect, setUserSelect] = useState([]);  

    const listUsers = ()=>{
            try {
                if(team._id){
                getUsers(team._id).then(response=>{
                  setUsers(response.data.team);
              });
            }
            } catch (error) {}

    } 

    const listUsersAllF = () => {
      listUsersAll().then(response => {
        setUsersAll(response.data.user)
      });
    }
    const userDelete = (user) => {
        if(user){
            deleteDetail(user._id).then(response=>{
                setUsers(users.filter( user1 => user1 !== user))
              });
        }
    }

    const userAdd = () => {
      let user = userSelect;
      console.log(userSelect);
      try {
      if(user){
        user = user.split(",")
        let data = { userId:user[0], teamId: team._id};
        addDetail(data).then(response =>{
          user = {_id: response.data.result._id, userId: {fullName: user[1], roleId: {name: user[2]}, _id: user[0]}}
          users.push(user)
          setUsers(users)        
        })
        listUsersAllF()
      }
    } catch {}
    }

    useEffect(()=> listUsers(),[team] )

    return (
    
    <div className="modal-dialog modal-dialog-centered">
      <div className="modal-content">
        <div className="modal-header">
          <h2 className="modal-title" id="exampleModalLabel">Team {team.name}</h2>
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div className="modal-body" >
          <table className="table">
          <thead className="table">
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Role</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
          {users.length > 0 && (users.map((user, index) =>(
            <tr key={Math.random()}>
              <th scope="row">{index+1}</th>
              <td>{user.userId.fullName}</td>
              <td>{user.userId.roleId.name}</td>
              <td><button
                className="btn btn-danger btn-sm m-0"
                title="Delete User"
                onClick={() => userDelete(user)}
              >
                  <FontAwesomeIcon icon={faTrashAlt} className="iconHead iconos" />      
              </button></td>
            </tr>
          )))}
            
          </tbody>
          </table>
        </div>
        <div className="displayFlex modal-body " style={{ justifyContent : "space-evenly"}}>
          {usersAll.length > 0 && (
            <>
            <select
              className="form-select ancho"
              aria-label="Default select example"
              onChange = {(event) => setUserSelect(event.target.value)}
              value = {userSelect} 
            >
              <option selected>Open this select menu</option>
            {usersAll.map((user, index) =>(
               <option key={Math.random()} value= {[user._id, user.fullName,  user.roleId.name].toString()}>
                 {user.fullName}
               </option>
            ))}
             
            </select>
           <button type="button" className="btn btn-success btn-sm" onClick={() => userAdd()}>
           Add User
         </button>
            </>
          )}

          {usersAll.length == 0 && (          
          <button
            type="button"
            className="btn btn-success btn-sm"
            onClick={() => listUsersAllF()}
          >
            <FontAwesomeIcon icon={faPlusCircle} className="iconHead iconos" /> 
          </button>
          )}

        </div>
        <div className="modal-footer">
          <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
            Close
          </button>
        </div>
      </div>
    </div>
    

  );
}
