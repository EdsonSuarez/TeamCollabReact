import "./styles.css";
import React, { Fragment, useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave, faPlus } from "@fortawesome/free-solid-svg-icons";
import { useForm } from "react-hook-form";
import { saveTask, saveTaskImg,  editTask, deleteTask, getTasks, getOneTask, updateTask, getTeam, addDetail, getUsersTask, deleteDetail, getManyTask } from "../../services/task";
// import Task from './components/Task/Task';
{/* <Task></Task> */}

export default function Task() {

    const [taskData, setTaskData] = useState({name:'', description:'', boardId:'', priority:'', file:''})
    // const [taskName, setTaskName] = useState("")
    // const [taskDescription, setTaskDescription] = useState("")
    // const [taskPriority, setTaskPriority] = useState("")
    // const [taskFile, setTaskFile] = useState("")

    const [errormsg, setErrormsg] = useState("")
    const [errormsgUser, setErrormsgUser] = useState("")
    const [successmsg, setSuccessmsg] = useState("")
    const [successmsgUser, setSuccessmsgUser] = useState("")

    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const onSubmit = (task) => {
        console.log(task);
    }

    const handleFile = (e) => {
        if (!e) file = ''
        const file = e.target.files[0]
        console.log(file);
    }

    const save = (task) => {
        if(task) {
            saveTask(task)
                .then(response => 
                    {response.json()
                        console.log(response);
                    })
        }
    }

    // const changeTeam = (team)=>{
    //     if(team){
    //       boardsUser(team._id).then(response=>{
    //         setsprints(response.data.boards)
    //         const datos = response.data.boards
    //         changeSprint(datos[0]);
    //         // console.log("sprints",datos[0])
    //       })  
    //     }  
    // }
 
    const deleteLocalInfo = () => {
        localStorage.removeItem('task')
        // this.flagEditTask = false;
        // this.flagImage = true;  
    }

    const closeAlert = (time) => {
        setTimeout(() => {}, time)
    }

    return (
        <>
            <div className="modal fade" id="modalTask" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h2 className="modal-title" id="exampleModalLabel">Create Task</h2>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={deleteLocalInfo}></button>
                        </div>
                        <div className="col-12 col-lg-12">
                            <div className="alert alert-success alert-dismissible" role="alert">
                                <div className="alert-message">{successmsg}</div>
                                <button type="button" className="btn-close" onClick={closeAlert(0)} data-dismiss="alert"
                            aria-label="Close" />
                            </div>
                        </div>
                        <div className="col-12 col-lg-12">
                            <div className="alert alert-danger alert-dismissible" role="alert">
                                <div className="alert-message">{errormsg}</div>
                                <button type="button" className="btn-close" onClick={closeAlert(0)} data-dismiss="alert"
                            aria-label="Close" />
                            </div>
                        </div>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="modal-body">
                                <input 
                                    // onChange={(e) => setTaskData({...taskData, name: e.target.value})}
                                    defaultValue={taskData.name}
                                    // value={task.name}
                                    className="form-control" 
                                    type="text" 
                                    required
                                    placeholder="Task"
                                    {...register("name")}
                                />
                                <br />
                                <textarea 
                                    // onChange={(e) => setTaskData({...taskData, description: e.target.value})}
                                    defaultValue={taskData.description} 
                                    type="text" 
                                    className="form-control" 
                                    required 
                                    placeholder="Description" 
                                    {...register("description")}
                                />
                                <br />
                                <select 
                                    // onChange={(e) => setTaskData({...taskData, priority: e.target.value})}
                                    defaultValue={taskData.priority}
                                    className="form-select" 
                                    required 
                                    {...register("priority")}
                                    >
                                    <option defaultValue>Priority</option>
                                    <option value="1">Low</option>
                                    <option value="2">Medium</option>
                                    <option value="3">High</option>
                                </select>
                                <br />
                                <div className="mb-3">
                                    <label htmlFor="formFile" className="form-label">Load image</label>
                                    <input 
                                        // onChange={handleFile}
                                        defaultValue={taskData.file[0]}
                                        // onChange={(e) => setTaskFile(e.target)}
                                        // onChange={(e) => setTaskData({...taskData, file: e.target.value})}
                                        accept=".png, .jpg, .jpeg, .gif, image/*"
                                        className="form-control" 
                                        type="file" 
                                        id="formFile" 
                                        {...register("file")}
                                    />
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button className="btn btn-info btn-xs m-1" onClick={save(taskData)}>
                                    <FontAwesomeIcon icon={faSave} />
                                </button>
                                <button type="submit" className="btn btn-secondary" data-bs-dismiss="modal" onClick={deleteLocalInfo}>
                                Close
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

            <a id="task-window" data-bs-toggle="modal" data-bs-target="#modalTask" className="return-board-button">
                <FontAwesomeIcon icon={faPlus} className="return-board-icon"/>
            </a>
        </>
    )
}