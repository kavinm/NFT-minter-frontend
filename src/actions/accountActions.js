export const addAccount = (provider, dispatch) => {
  dispatch({type: "ADD", payload: provider})
}

export const clearAccount = (dispatch) => {
  dispatch({type: "CLEAR"})
}