export const changeState = (obj) => ({
  "type":"CHANGE_STATE",
  "value":obj,
})

export const openPopup = () => ({
  "type":"OPEN_POPUP",
})

export const closePopup = () => ({
  "type":"CLOSE_POPUP",
})

export const addRequest = (req) => ({
  "type":"ADD_REQUEST",
  "req":req,
})

export const acceptRequest = (userId, taskId) => ({
  "type":"ACCEPT_REQUEST",
  "userId": userId,
  "taskId": taskId,
})

export const addJob = (taskId) => ({

})

export const setMyAskTasks = (tasks) => ({
  "type":"SET_ASK_TASKS",
  "tasks":tasks
})

export const setMyDoTasks = (tasks) => ({
  "type":"SET_DO_TASKS",
  "tasks":tasks
})

export const setSearchTasks = (tasks) => ({
  "type":"SET_SEARCH_TASKS",
  "tasks":tasks,
})


export const logoutState =() => ({
  "type":"LOGOUT",
})
