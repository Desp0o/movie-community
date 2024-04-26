
import { useSelector } from 'react-redux'

interface RootState{
    addPostModalStore:{
        defaultPost: boolean;
        pollPost: boolean;
        quizPost: boolean;
        openImageUpload: boolean;
    }
}

export const usePostAddModalHook = () => {
  const addPostModalStates = useSelector((state:RootState) => state.addPostModalStore)
  return { addPostModalStates }
}
