import React from 'react'
import { dotsForComments } from '../../assets/newSvg/dotsForComments';
import { useUserHook } from '../../hooks/useUserHook';

interface RepliesProps {
    replayedComments: []
}

interface itemProps {
    text: string;
    user_id: number;
}

const Replies: React.FC<RepliesProps> = ({ replayedComments }) => {
    const { user } = useUserHook()
    return (
        replayedComments?.map((item: itemProps, index) => {
            return (
                <div className='replayed_comment_parent' key={index}>

                    <div className='replayed_comment'>
                        <p className='replayed_comment_text'>{item.text}</p>
                    </div>

                    
                        <span className='dots_for_comments_settings space'>
                            {item.user_id === user.userID  && dotsForComments}
                        </span>
                    
                </div> 
            )
        })
    )
}

export default Replies