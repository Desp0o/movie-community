import { useSelector } from "react-redux"

interface RootState {
    resPostAddStore:{
        value: boolean
    }   
}

export const useResPostModal = () => {
    const resPostModal = useSelector((state:RootState) => state.resPostAddStore.value)
    return { resPostModal }
}
