import React, { useEffect, useRef, useState } from 'react'
import { useDarkModeHook } from '../../hooks/useDarkModeHook'
import { penIcon } from '../../assets/svg/penIcon'
import { canIcon } from '../../assets/svg/canIcon'

interface EditPannelPros{
    editFun: () => void;
    deleteFun: () => void;
}

const EditPannel:React.FC<EditPannelPros> = ({editFun, deleteFun}) => {

    const {isDark} = useDarkModeHook()
    const [isActive, setActive] = useState(false)

    const handlePannel = () => {
        setActive(!isActive)
    }

    const editPanelRef = useRef<HTMLDivElement>(null)
    useEffect(() => {
        const handleClick = (event: MouseEvent) => {
            if (
                editPanelRef.current &&
                event.target instanceof Node &&
                !editPanelRef.current.contains(event.target)
            ) {
                setActive(false);
            }
        };
    
        document.addEventListener("click", handleClick);
    
        return () => {
            document.removeEventListener("click", handleClick);
        };
    }, [isActive]);


  return (
    <div ref={editPanelRef}>
        <p className='pannel_dots' onClick={handlePannel}>. . .</p>

        {
            isActive 
            ?
            <div className={isDark ? "post_setting_pannel dark" : "post_setting_pannel"}>
            <div onClick={()=>editFun()} style={{display:"flex", alignItems:"center", gap:"5px", fontSize:"14px"}}>{penIcon} Edit</div>
            <div onClick={()=>deleteFun()} style={{display:"flex", alignItems:"center", gap:"5px", fontSize:"14px"}}>{canIcon} Delete</div>
            </div>
            :
            <></>
        }
    </div>
  )
}

export default EditPannel