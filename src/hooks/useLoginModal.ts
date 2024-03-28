import { useDispatch, useSelector } from 'react-redux'
import { setModalVisible } from '../Redux/loginModalSlicer'

interface RootState {
    loginModalStore:{
        isModalVisible: boolean
    }
}

export const useLoginModal = () => {

    const isModalVisible = useSelector((state:RootState) => state.loginModalStore.isModalVisible)
    const dispatch = useDispatch()

    const handleVisibility = () => {
        dispatch(setModalVisible(!isModalVisible))
    }


  return { handleVisibility, isModalVisible }
}
