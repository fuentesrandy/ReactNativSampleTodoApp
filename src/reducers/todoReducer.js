import * as todoActionTypes from "../actionTypes/todoActionTypes"

const initalState = {
    metadata: {
        isFetching: false
    },
    error: undefined,
    data: []
};

//state must be Immutable 
export default (state = initalState, action) => {

    switch (action.type) {

        case todoActionTypes.FETCH_TODO:
        case todoActionTypes.FETCH_TODOS_LIST:
            state = {
                ...state,
                metadata: {
                    ...state.metadata,
                    isFetching: true
                }
            };
            break;
        case todoActionTypes.FETCH_TODOS_LIST_COMPLETE:
            state = {
                ...state,
                data: action.payload,
                metadata: {
                    ...state.metadata,
                    isFetching: false
                }
            };
            break;
        case todoActionTypes.ADD_TODO_COMPLETE:
            state = {
                ...state,
                data: state.data.concat([action.payload]) // concat returns new array so state is not mutated 
            };
            break;
        case todoActionTypes.REMOVE_TODO:
            state = {
                ...state,
                data: state.data.filter(x => x.id !== action.payload.id) // filter returns new array so state is not mutated 
            };
            break;
        case todoActionTypes.TOGGLE_TODO_COMPLETE:
            state = {
                ...state,
                data: state.data.map(todo => { // map returns new array so state is not mutated 
                    if (todo.id === action.payload.id) {
                        return {
                            ...todo,
                            isComplete: !todo.isComplete
                        }
                    } else {
                        return todo
                    }
                })
            };
            break;
        default:
            return state;
    }

    return state;
}