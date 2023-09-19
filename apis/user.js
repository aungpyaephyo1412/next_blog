import {axiosInstance} from "@/utils/axiosInstance";
import {useMutation} from "@tanstack/react-query";

const createUser = async ({name,email,password}) => {
    try {
        const res = await axiosInstance.post("/users",{name,email,password});
        return res.data;
    }catch (e) {
        console.log(e)
    }
}
const {mutateAsync:userCreate} = useMutation({
    mutationKey:['post',"user","signUp"],
    mutationFn:createUser
})

const signUser = async ({email,password}) =>{
    try {
        const res = await axiosInstance.post("/users",{email,password});
        return res.data;
    }catch (e) {
        console.log(e)
    }
}
const {mutateAsync:userSign} = useMutation({
    mutationKey:['post',"user","signIn"],
    mutationFn:signUser
})

export {userCreate,userSign}