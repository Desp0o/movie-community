import { useSelector } from 'react-redux'

interface Rootstate {
    voteStore:{
        value: number
    }
}

export const useVoteHook = () => {
    const votes = useSelector((state:Rootstate) => state.voteStore.value)
    return { votes }
}