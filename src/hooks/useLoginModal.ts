import { useState } from 'react'

export const useLoginModal = () => {

    const [isModalVisible, setModalVisible] = useState(false)

    const handleVisibility = () => {
        setModalVisible(!isModalVisible)
    }


  return { handleVisibility, isModalVisible }
}
