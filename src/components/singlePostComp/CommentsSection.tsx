import React, { useEffect, useState } from 'react'
import DateFormater from '../dateFormater/DateFormater'
import Author from './Author'
import { useUserHook } from '../../hooks/useUserHook'
import axios from 'axios'
import { QueryObserverResult, RefetchOptions, RefetchQueryFilters } from 'react-query'
import ReplayComment from '../commenting/ReplayComment'

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
    }
}

const CommentsSection: React.FC<CommentsSectionProps> = ({ commentsData, id, refetch }) => {
    const { user } = useUserHook()
    const [commentValue, setCommentValue] = useState<{
        img: File | undefined;
        text: string;
    }>({
        img: undefined,
        text: "",
    });
    const [isFaded, setFaded] = useState(true)
    const [visibleReplies, setVisibleReplies] = useState<{ [key: number]: boolean }>({});

    const toggleReply = (index: number) => {
        setVisibleReplies(prevState => ({
            ...prevState,
            [index]: !prevState[index]
        }));
    };

    useEffect(() => {
        if (commentValue.text.length > 0) {
            setFaded(false)
        } else {
            setFaded(true)
        }
    }, [commentValue])

    const sendComment = async () => {
        const token = localStorage.getItem('token')

        if (!isFaded) {
            try {
                const res = await axios.post(`${import.meta.env.VITE_ADD_COMMENT}${id}`, commentValue, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "multipart/form-data, application/json, text/plain, */*"
                    }
                })
                console.log(res.data);
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
                            const isReplyVisible = visibleReplies[index];
                            return (
                                <div className="single_comment_parent" key={index}>
                                    <div className="single_comment">
                                        <p className="single_comment_userName">{item.user.name}</p>
                                        <p className="single_comment_text">{item.text}</p>
                                    </div>
                                    <div className="single_comment_date_replay">
                                        <DateFormater date={item.created_at} />
                                        <p className="single_comment_replay" onClick={() => toggleReply(index)}>
                                            Reply
                                        </p>
                                        {item.comments.length > 0 && <p className="single_comment_replay">View all replies</p>}
                                    </div>

                                    {/* replay container */}

                                    <div className={isReplyVisible ? 'replay_container visible' : 'replay_container '}>
                                        {
                                            isReplyVisible && (
                                                <ReplayComment id={item.id} feedID={item.feed_id} refetchCallback={refetch} />
                                            )
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
                <input
                    value={commentValue.text}
                    placeholder="Write comment..."
                    className="write_comment_input"
                    alt="comment input"
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