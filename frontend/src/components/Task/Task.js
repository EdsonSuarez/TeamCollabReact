import "./styles.css";
import React, { Fragment, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSave,
  faPlus,
  faUserPlus,
  faUserMinus
} from "@fortawesome/free-solid-svg-icons";
import { useForm } from "react-hook-form";
import { Alert } from "@material-ui/lab";
import {
  saveTask,
  saveTaskImg,
  getTasks,
  getOneTask,
  updateTask,
  getTeam,
  addDetail,
  getUsersTask,
  deleteDetail,
  getManyTask,
} from "../../services/task";

export default function Task() {
  const [taskData, setTaskData] = useState({
    name: "",
    description: "",
    boardId: "",
    priority: "",
  });
  const [taskFile, setTaskFile] = useState(null)

  const [errormsg, setErrormsg] = useState("");
  const [errormsgUser, setErrormsgUser] = useState("");
  const [successmsg, setSuccessmsg] = useState("");
  const [successmsgUser, setSuccessmsgUser] = useState("");
  const [flagImage, setFlagImage] = useState(true);
  const [flagEditTask, setFlagEditTask] = useState(false);
  const [teamMembers, setTeamMembers] = useState([]);
  const [teamTasks, setTeamTasks] = useState([]);
  const [taskId, setTaskId] = useState("");

  const onInit = () => {
    

    setTaskId(localStorage.getItem("task"));
    if (localStorage.getItem("task")) {
      setTaskData({
        ...taskData,
        priority: taskData.priority,
      });
      console.log('Hay task');
      setFlagEditTask(true);
      setFlagImage(false);
      getOneTask(localStorage.getItem("task"))
        .then((res) => {
          setTaskData(res.data.userTask);
          // console.log(res.data.userTask)
        })
        .catch((error) => {
          console.log(error);
        });
    }
    else {
      setTaskData({
        ...taskData,
        name: "",
        description: "",
        boardId: localStorage.getItem("sprint"),
        priority: "Priority", 
      });
    }

    getTasks().then((res) => {
      setTeamTasks(res.data.userTask);
      // console.log(res.data.userTask)
    });
  };

  const onChange = (e) => {
    const file = e.target.files[0];
    setTaskFile(file)
    console.log(file);
    console.log("task file", file['name']);
  }

  const onSave = (task) => {
    if (flagEditTask == true) {
      updateTask(taskData)
        .then((res) => {
          console.log(res.data.task);
          setFlagEditTask(true);
          setSuccessmsg("Task updated successfully")
          setTaskData({name: "",
          description: "",
          boardId: "",
          priority: ""})
          window.location.reload();
        })
        .catch((err) => {
          console.log(err);
          setErrormsg("Error updating task")
          closeAlert(3000);
        })
    } else {
      setTaskData({...taskData, boardId: localStorage.getItem('sprint')})
      if ( !taskData.name || !taskData.description || ! taskData.boardId) {
        console.log(taskData);
        console.log(taskData.boardId);
        console.log('Failed process: Incomplete data');
        setErrormsg('Failed process: Incomplete data');
        closeAlert(3000);
      } else {
        const data = new FormData();
        if (taskFile) {
          data.append('image', taskFile, taskFile['name']);
          data.append('name', taskData.name);
          data.append('description', taskData.description);
          data.append('boardId', taskData.boardId);
          data.append('priority', taskData.priority);
          console.log(data);
          saveTaskImg(data)
            .then((res) => {
              localStorage.setItem('task', res.data.result._id);
              setTaskData({
                name: "",
                description: "",
                boardId: "",
                priority: ""
              })
              window.location.reload();
            })
            .catch((err) => {
              console.log(err);
              setErrormsg(err);
              closeAlert(3000);
            })
            
        }
        else {
          saveTask(task)
            .then((res) => {
              console.log(res);
              localStorage.setItem('task', res.data.result._id)
              setSuccessmsg("Task created succesfully");
              closeAlert(3000);
            })
            .catch((err) => {
              setErrormsg("Failed process");
              console.log(err.message);
              closeAlert(3000);
            });
        }
      }
    }
  };

  const getTaskInfo = () => {

  }

  const usersTeam = () => {
    console.log(flagEditTask);
    if (flagEditTask == true) {
      getUsersTask(taskId)
        .then((res) => {
          console.log(res.data.users);
          setTeamMembers(res.data.users);
        })
        .catch((error) => console.log(error));
    } else {
      const teamId = localStorage.getItem("team");
      getTeam(teamId)
        .then((res) => {
          console.log(res.data.team);
          setTeamMembers(res.data.team);
        })
        .catch((error) => console.log(error));
    }
  };

  const userAdd = (member) => {
    setTaskId(localStorage.getItem("task"));
    console.log(member);
    let taskDetail = {userId: member.userId._id, taskId: taskId}

    addDetail(taskDetail)
      .then((res) => {
        setSuccessmsgUser(`Task assigned to ${member.userId.fullName}`);
        closeAlert(3000);
      })
      .catch((error) => {
        setErrormsgUser(error.message);
        closeAlert(3000);
        console.log(error);
      })
  };

  const userDelete = (member) => {
    console.log(member);
    deleteDetail(member._id)
      .then((res) => {
        setSuccessmsgUser("Task unassigned");
        closeAlert(3000);
      })
      .catch((error) => {
        setErrormsgUser(error.message);
        closeAlert(3000);
      });
  };

  const { register, handleSubmit } = useForm();
  const onSubmit = (data) => {
    console.log(data);
  };

  const deleteLocalInfo = () => {
    localStorage.removeItem("task");
    setFlagEditTask(false);
    setFlagImage(true);
  };

  const closeAlert = (time) => {
    setTimeout(() => {
      setErrormsg("");
      setSuccessmsg("");
      setSuccessmsgUser("");
      setErrormsgUser("");
    }, time);
  };

  return (
    <>
      <a
        id="task-window"
        data-bs-toggle="modal"
        data-bs-target="#modalTask"
        className="return-board-button"
        onClick={onInit}
      >
        <FontAwesomeIcon icon={faPlus} className="return-board-icon" onClick={deleteLocalInfo}/>
      </a>

      <div
        className="modal fade"
        id="modalTask"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
          <div className="modal-content">
            <div className="modal-header">
              <h2 className="modal-title" id="exampleModalLabel">
                Create Task
              </h2>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={deleteLocalInfo}
              ></button>
            </div>
            <div className="container alertaTask">
              {successmsg !== "" ? (
                <Alert
                  variant="outlined"
                  severity="success"
                  className="alertaTask"
                  onClose={() => closeAlert(0)}
                >
                  {successmsg}
                </Alert>
              ) : (
                <></>
              )}

              {errormsg !== "" ? (
                <Alert
                  variant="outlined"
                  severity="error"
                  className="alertaTask"
                  onClose={() => closeAlert(0)}
                >
                  {errormsg}
                </Alert>
              ) : (
                <></>
              )}
            </div>

            <div className="modal-body">
              <input
                onChange={(e) =>
                  setTaskData({ ...taskData, name: e.target.value })
                }
                defaultValue={taskData.name}
                // value={task.name}
                className="form-control"
                type="text"
                required
                placeholder="Task"
              />
              <br />
              <textarea
                onChange={(e) =>
                  setTaskData({ ...taskData, description: e.target.value })
                }
                defaultValue={taskData.description}
                type="text"
                className="form-control"
                required
                placeholder="Description"
              />
              <br />
              <select
                onChange={(e) =>
                  setTaskData({ ...taskData, priority: e.target.value })
                } 
                value={taskData.priority}
                className="form-select"
                required
              >
                <option defaultValue>Priority</option>
                <option value="1">Low</option>
                <option value="2">Medium</option>
                <option value="3">High</option>
              </select>
              <br />
              <div className="mb-3">
                <label htmlFor="formFile" className="form-label">
                  Load image
                </label>
                  <input
                  value={taskFile}
                    onChange={onChange}
                    accept=".png, .jpg, .jpeg, .gif, image/*"
                    className="form-control"
                    type="file"
                    id="formFile"
                  />
              </div>
            </div>
            <div className="modal-footer">
              <button
                className="btn btn-info btn-xs m-1"
                onClick={() => onSave(taskData)}
              >
                <FontAwesomeIcon icon={faSave} />
              </button>
              <button
                className="btn btn-success btn-xs m-1"
                onClick={usersTeam}
              >
                <FontAwesomeIcon
                  icon={faUserPlus}
                  data-bs-toggle="modal"
                  data-bs-target="#modalTeamm"
                />
              </button>
              <button
                type="submit"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                onClick={deleteLocalInfo}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>

      <div
        className="modal fade"
        id="modalTeamm"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h2 className="modal-title" id="exampleModalLabel">
                Team
              </h2>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <div className="container alertaTask">
                {successmsgUser !== "" ? (
                  <Alert
                    variant="outlined"
                    severity="success"
                    className="alertaTask"
                    onClose={() => closeAlert(0)}
                  >
                    {successmsgUser}
                  </Alert>
                ) : (
                  <></>
                )}

                {errormsgUser !== "" ? (
                  <Alert
                    variant="outlined"
                    severity="error"
                    className="alertaTask"
                    onClose={() => closeAlert(0)}
                  >
                    {errormsgUser}
                  </Alert>
                ) : (
                  <></>
                )}
              </div>

              {!teamMembers.length ? (
                <div>
                  <span>No team members assigned</span>
                  <span className="spacer" />
                </div>
              ) : (
                teamMembers.map((member, index) =>
                  member.userId != null ? (
                    <div className="displayFlex" key={index}>
                      <span>{member.userId.fullName}</span>
                      <span className="spacer"></span>
                      {!flagEditTask == true ? (
                      <button
                        className="btn btn-success btn-xs m-1"
                        onClick={()=> userAdd(member)}
                      >
                        <FontAwesomeIcon icon={faUserPlus} />
                      </button>
                      ) : (<></>)} 
                      <button
                        className="btn btn-danger btn-xs m-1"
                        onClick={()=> userDelete(member)}
                      >
                        <FontAwesomeIcon icon={faUserMinus} />
                      </button>
                      
                    </div>
                  ) : (
                    <p></p>
                  )
                )
              )}
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
