// import { combineReducers } from 'redux';

const defaultState = {
  showPopup:false,
  authorized: "",
  email:'',
  password:'',
  firstName:'',
  lastName:'',
  balance:0,
  picture:'',
  userId:'',
  walletId:'',
  location:{lat:41.394043, lng:2.199148},
  myRequests:{
  },
  myJobs:{
    id1: {
      location:{lat:41.396071, lng:2.180780},
      taskRequestedByName: "Some Guy",
      taskAcceptedById:":)",
      title:"Teach me to dance",
      time:120,
      description:"Describe describe describe",
      picture:"./assets/sample-guy.jpeg",
      status: "User Requested",
    },
    id2: {
      location:{lat:41.401712, lng:2.206584},
      taskRequestedByName: "Another",
      taskAcceptedById:"Person",
      title:"Help",
      time:100,
      description:"Describe describe describe",
      picture:"../assets/sample-guy.jpeg",
      status: "Request Accepted",
    }
  },
  allJobs:{
      id1: {
        taskId: "121212",
        taskRequestedByName: "John Doe",
        taskAcceptedById:"",
        status:"Submitted",
        title:"Put up shelves",
        description:"Describe describe describe",
        time:60,
        picture:"../assets/sample-guy.jpeg",
        location:{lat:41.396071, lng:2.180780},
      },
      id2: {
        taskId: "121213",
        location:{lat:41.393807, lng:2.179250},
        taskRequestedByName: "Jon Doe",
        taskAcceptedById:"",
        title:"Put up shelves",
        time:60,
        description:"Describe describe describe",
        status:"Submitted",
        picture:"../assets/sample-guy.jpeg"
      },
      id3: {
        taskId: "121214",
        location:{lat:41.401712, lng:2.206584},
        taskRequestedByName: "Jon Doe",
        taskAcceptedById:"",
        title:"Put up shelves",
        time:60,
        description:"Describe describe describe",
        status:"Submitted",
        picture:"./assets/sample-guy.jpeg"
      }
  },
  users: {"122323" : {

    }
  }
}

const reducers = (state = defaultState, action) => {
  switch (action.type) {
    case "CHANGE_STATE":
      return {
        ...state,
        ...action.value,
      }
    case "OPEN_POPUP":
      return {
        ...state,
        showPopup:true,
      }
    case "CLOSE_POPUP":
      return {
        ...state,
        showPopup:false,
      }
    case "ADD_REQUEST":
      return {
        ...state,
        myRequests:{
          ...state.myRequests,
          [action.req.taskId]:action.req}
      }
    case "ACCEPT_REQUEST":
      let newState = {...state};
      let newRequest = {...state.myRequests[action.taskId]}
      newRequest.taskAcceptedById = action.userId;
      newRequest.status = "Request Accepted";
      let myNewRequests = {...state.myRequests}
      myNewRequests[action.taskId] = newRequest
      return {
        ...state,
        myRequests:{
          ... myNewRequests
        }
      }
    case "SET_ASK_TASKS":
      newState = {...state}
      newState.myRequests = normalize(action.tasks, "taskId");
      return newState;
    case "SET_DO_TASKS":
      newState = {...state}
      newState.myJobs = normalize(action.tasks, "taskId");
      return newState;
    case "SET_SEARCH_TASKS":
      newState = {...state}
      newState.allJobs = normalize(action.tasks, "taskId");
      return newState;
    case "LOGOUT":
      return defaultState;
    default:
    return state;
  }
}
// const reducers = combineReducers({
//   //reducer names
// })
const normalize = (arr, id) => {
  console.log(arr)
  let newObj = {};
  arr.forEach((elem) => {
    newObj[elem[id]] = elem;
  })
  return newObj;
}


export default reducers;
