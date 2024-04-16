import { useSelector } from "react-redux"

interface RootState {
    editPostStroe:{
        states:{
            value: boolean,
            id: number | string
        }
    }   
}

export const useEditPotsModal = () => {
    const editPostModal = useSelector((state:RootState) => state.editPostStroe.states)
    return { editPostModal }
}
