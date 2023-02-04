import { createGlobalState } from "react-hooks-global-state";

const {setGlobalState,useGlobalState}=createGlobalState({
    key:'',
    profilePic:'',
    Name:'',
    Email:'',

})

export{useGlobalState,setGlobalState};