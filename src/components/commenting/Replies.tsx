import React from 'react'

interface RepliesProps {
    replayedComments: []
}

interface itemProps {
    text: string;
}

const Replies: React.FC<RepliesProps> = ({ replayedComments }) => {
    return (
        replayedComments?.map((item: itemProps, index) => {
            return (
                <div className='replayed_comment' key={index}>
                    <p className='replayed_comment_text'>{item.text}</p>
                    <span className='replay_dots'></span>
                </div>
            )
        })
    )
}

export default Replies