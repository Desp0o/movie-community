import React, { useEffect, useRef, useState } from 'react'
import DateFormater from '../dateFormater/DateFormater'
import Author from './Author'
import { useUserHook } from '../../hooks/useUserHook'
import axios from 'axios'
import { QueryObserverResult, RefetchOptions, RefetchQueryFilters } from 'react-query'
import ReplayComment from '../commenting/ReplayComment'
import Replies from '../commenting/Replies'
import { dotsForComments } from '../../assets/newSvg/dotsForComments'
import SettingForComment from '../commenting/SettingForComment'

interface CommentsSectionProps {
    commentsData: [];
    id: number;
    refetch: <TPageData>(options?: (RefetchOptions & RefetchQueryFilters<TPageData>) | undefined) => Promise<QueryObserverResult<any, unknown>>
}

interface commentProps {
    feed_id: number;
    id: number;
    comments: [];
    text: string;
    created_at: string;
    user: {
        name: string;
        id: number;
    }
}

const CommentsSection: React.FC<CommentsSectionProps> = ({ commentsData, id, refetch }) => {
    const { user } = useUserHook()
    const writeCommentRef = useRef<HTMLTextAreaElement>(null)
    const [commentValue, setCommentValue] = useState<{
        img: File | undefined;
        text: string;
    }>({
        img: undefined,
        text: "",
    });
    const [isFaded, setFaded] = useState(true)
    const [visibleReplyIndex, setVisibleReplyIndex] = useState<number | null>(null);

    const toggleReply = (index: number) => {
        setVisibleReplyIndex((prevIndex) => (prevIndex === index ? null : index));
    };


    //fade or not button
    useEffect(() => {
        if (commentValue.text.length > 0) {
            setFaded(false)
        } else {
            setFaded(true)
        }
    }, [commentValue])

    //increase comment input height
    useEffect(() => {
        if (writeCommentRef.current) {
            if (commentValue.text !== '') {
                // Adjust the textarea height based on the scroll height
                writeCommentRef.current.style.height = "36px"
                if (writeCommentRef.current.scrollHeight > 36) {
                    writeCommentRef.current.style.height = `${writeCommentRef.current.scrollHeight}px`;
                }

                // Ensure the textarea height does not exceed 400px
                if (writeCommentRef.current.scrollHeight > 400) {
                    writeCommentRef.current.style.height = '400px';
                    writeCommentRef.current.style.overflow = 'auto'
                } else {
                    writeCommentRef.current.style.overflow = 'hidden'
                }
            }

            if (commentValue.text === '') {
                writeCommentRef.current.style.height = "36px"
            }
        }
    }, [commentValue.text])

    const sendComment = async () => {
        const token = localStorage.getItem('token')

        if (!isFaded) {
            try {
                await axios.post(`${import.meta.env.VITE_ADD_COMMENT}${id}`, commentValue, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "multipart/form-data, application/json, text/plain, */*"
                    }
                })
                setCommentValue({...commentValue, text: ''})
                refetch()
            } catch (error) {
                console.log(error)
            }
        }
    }


    return (
        <div className="comments_section">
            {
                commentsData && (
                    <div className="comments_array">
                        {commentsData.map((item: commentProps, index: number) => {
                            return (
                                <div className="single_comment_parent" key={index}>
                                    <div className="single_comment">
                                        <div className='single_comment_inner'>
                                            <p className="single_comment_userName">{item.user.name}</p>
                                            <p className="single_comment_text">{item.text}</p>
                                        </div>

                                        {
                                            item.user.id === user.userID && <span className='dots_for_comments_settings'>
                                                <SettingForComment commentID={item.id} refetchCallbac={refetch} />
                                            {dotsForComments}
                                        </span>
                                        }
                                        
                                    </div>

                                    <div className="single_comment_date_replay">
                                        <DateFormater date={item.created_at} />
                                        <p className="single_comment_replay" onClick={() => toggleReply(index)}>
                                            Reply
                                        </p>
                                        {item.comments.length > 0 && <p className="single_comment_replay">View all replies</p>}

                                    </div>

                                    {item.comments.length > 0 &&
                                        <div className='replayed_comments_section'>
                                            <Replies replayedComments={item.comments} refetchCallBack={refetch} mainCommentID={item.id}/>
                                        </div>
                                    }

                                    {/* replay container */}

                                    <div className={visibleReplyIndex === index ? 'replay_container visible' : 'replay_container '}>
                                        {
                                            <ReplayComment id={item.id} feedID={item.feed_id} refetchCallback={refetch} mentionedUser={item.user.name}/>
                                        }


                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )
            }

            <div className="write_comment">
                <Author avatar={user.avatar} />
                <textarea
                    ref={writeCommentRef}
                    value={commentValue.text}
                    placeholder="Write comment..."
                    className="write_comment_input"
                    onChange={(e) => setCommentValue({ ...commentValue, text: e.target.value })}
                />

                <span onClick={sendComment}><CommentBtn faded={isFaded} /></span>
            </div>

        </div>
    )
}

export default CommentsSection


interface CommentBtnProps {
    faded: boolean;
}
export const CommentBtn: React.FC<CommentBtnProps> = ({ faded }) => {
    return (
        <div className={faded ? "comment_btn" : "comment_btn active"}>
            <p>Add comment</p>
        </div>
    )
}