import {useReducer }from "react"

const initialValue = {
    value: "",
    isTouched: false
}

const useInput = (valueFunc)=>{
    const inputReducer = (state,action) =>{
        if(action.type === "INPUT"){
            return {
                value: action.value,
                isTouched: state.isTouched
            }
        }
        if(action.type === "BLUR"){
            return {
                value: state.value,
                isTouched: true
            }
        }
        if(action.type === "RESET"){
            return{
                value: "",
                isTouched: false
            }
        }
        return initialValue
    }
    const [initialState,dispatch] = useReducer(inputReducer, initialValue)
    const inputChangeHandler = (e)=>{
        dispatch({type: "INPUT", value: e.target.value})
    }
    const blurHandler = ()=>{
        dispatch({type: "BLUR"})
    }
    const resetHandler = ()=>{
        dispatch({type: "RESET"})
    }
    const isValueValid = valueFunc(initialState.value)
    const hasError = !isValueValid && initialState.isTouched
    return{
        value: initialState.value,
        inputChangeHandler,
        blurHandler,
        resetHandler,
        hasError,
        isValueValid
    }
}

export default useInput