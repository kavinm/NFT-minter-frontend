const initialState = {}

export const accountReducer = (state = initialState, action) => {

  switch(action.type) {
    case "ADD":
      return action.payload
    case "CLEAR":
      return initialState
    default:
      return state

  }


}