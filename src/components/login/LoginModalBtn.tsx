import React, { MouseEvent } from 'react';

interface LoginModalBtnProps {
    title: string;
    btnWidth?: string;
    funName: () => void;
}

const LoginModalBtn: React.FC<LoginModalBtnProps> = ({ title, btnWidth, funName }) => {
    const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
        event.preventDefault(); 
        funName(); 
    };

    return (
        <button className='login_modal_reusable_btn' style={{width:`${btnWidth}`}} onClick={handleClick}>
            <p>{title}</p>
        </button>
    );
};

export default LoginModalBtn;
