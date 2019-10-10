//
import { takeLatest, put } from "redux-saga/effects";
// actions
import * as todoActionType from "../actionTypes/todoActionTypes"


// fake a web service call
const delay = (ms) => new Promise(res => setTimeout(res, ms))

const mockTodoData = [
    {
        id: 1,
        description: "Cut Grass",
        isComplete: false
    },
    {
        id: 2,
        description: "Wash Car",
        isComplete: false
    },
    {
        id: 3,
        description: "Go grocery shopping",
        isComplete: false
    }

]

// *  Generator functions so we can use yield
function* fetchTodoList() {
    yield delay(1500);
    yield put({
        type: todoActionType.FETCH_TODOS_LIST_COMPLETE,
        payload: mockTodoData
    })
}

function* fetchTodo(id) {
    yield delay(1500);
    yield put({
        type: todoActionType.FETCH_TODO_COMPLETE,
        payload: mockTodoData.filter(x => x.id === id)[0]
    })
}

function* addTodo(action) {
    yield delay(500);
    const data = {
        id: Math.floor(Math.random() * 1001),
        ...action.payload,
        isComplete: action.payload.isComplete === true
    }
    yield put({
        type: todoActionType.ADD_TODO_COMPLETE,
        payload: data
    })
}

export default function* todoWatcher() {
    yield takeLatest(todoActionType.FETCH_TODOS_LIST, fetchTodoList);
    yield takeLatest(todoActionType.FETCH_TODO, fetchTodo);
    yield takeLatest(todoActionType.ADD_TODO, addTodo);
}