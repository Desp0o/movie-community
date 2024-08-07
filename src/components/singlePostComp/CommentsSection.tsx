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
import { editComment } from '../commenting/EDITcomment'
import { useLoginModal } from '../../hooks/useLoginModal'
import CommentLikeSection from '../commenting/CommentLikeSection'
import { setMainReplayInput } from '../../Redux/commentsSlicer'
import { useDispatch, useSelector } from 'react-redux'

interface CommentsSectionProps {
    commentsData: [];
    id: number;
    //eslint-disable-next-line
    refetch: <TPageData>(options?: (RefetchOptions & RefetchQueryFilters<TPageData>) | undefined) => Promise<QueryObserverResult<any, unknown>>
}

interface commentProps {
    feed_id: number;
    id: number;
    comments: [];
    text: string;
    myCommGul: number;
    guls: number;
    created_at: string;
    user: {
        name: string;
        id: number;
    }
}

interface RootState {
    comRepStroe: {
        mainReplay: boolean
    }
}

const CommentsSection: React.FC<CommentsSectionProps> = ({ commentsData, id, refetch }) => {
    const mainReplayRedux = useSelector((state: RootState) => state.comRepStroe.mainReplay)
    const dispatch = useDispatch()
    const [fetchedCommentsData, setFetchedCommentsData] = useState([]) //fetched comments
    const [displayedComments, setDisplayedComments] = useState(5) //how many comments show 
    const [fullLengtComments, setFullLengthComments] = useState(0)
    const [repliesLength, setRepliesLength] = useState(2) //how many replies show
    const [isReadyEdit, setIsReadyEdit] = useState({
        isReady: false,
        comID: 0
    })
    const { user } = useUserHook()
    const { handleVisibility } = useLoginModal();
    const singleCommentTextRef = useRef<HTMLParagraphElement>(null);
    const writeCommentRef = useRef<HTMLTextAreaElement>(null)
    const commentPanelRefs = useRef<(HTMLSpanElement | null)[]>([]);
    const [settingActiveIndex, setSettingActiveIndex] = useState<number | null>(null)
    const [commentValue, setCommentValue] = useState<{
        img: File | undefined;
        text: string;
    }>({
        img: undefined,
        text: "",
    });
    const [isFaded, setFaded] = useState(true)
    const [visibleReplyIndex, setVisibleReplyIndex] = useState<number | null>(null);

    // comments load
    useEffect(() => {
        const reversed = [...commentsData].reverse();
        setFetchedCommentsData(reversed.slice(0, displayedComments))
        setFullLengthComments(commentsData.length)
    }, [displayedComments, commentsData])

    const loadMoreComments = () => {
        setDisplayedComments(prev => prev + 10)
        console.log(displayedComments);
        console.log(fullLengtComments);
    }

    const showMoreReplies = () => {
        setRepliesLength(prev => prev + 5)
    }

    const toggleReply = (index: number) => {
        setVisibleReplyIndex((prevIndex) => (prevIndex === index ? null : index));
        dispatch(setMainReplayInput())
    };

    useEffect(() => {
        if (!mainReplayRedux) {
            setVisibleReplyIndex(null)
        }
    }, [mainReplayRedux])

    const showSettings = (index: number) => {
        if (index === settingActiveIndex) {
            setSettingActiveIndex(null);
        } else {
            setSettingActiveIndex(index);
        }
    };

    useEffect(() => {
        const handleClick = (event: MouseEvent) => {
            if (
                settingActiveIndex !== null &&
                commentPanelRefs.current[settingActiveIndex] &&
                event.target instanceof Node &&
                !commentPanelRefs.current[settingActiveIndex]!.contains(event.target)
            ) {
                setSettingActiveIndex(null);
            }
        };

        document.addEventListener('click', handleClick);

        return () => {
            document.removeEventListener('click', handleClick);
        };
    }, [settingActiveIndex]);


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
                setCommentValue({ ...commentValue, text: '' })
                refetch()
            } catch (error) {
                console.log(error)
            }
        }
    }


    // get comment textcontent for edit
    const getCommentForEdit = (id: number, text: string) => {

        setIsReadyEdit({ ...isReadyEdit, isReady: true, comID: id })
        setCommentValue({ ...commentValue, text: text })

        // if (writeCommentRef.current) {
        //     writeCommentRef.current.scrollIntoView({ behavior: 'smooth' });
        // }

        window.scrollTo({
            top: 0,
            behavior: "smooth" // This makes the scroll smooth
        });

    }

    // change buttons for comment edit or new commnet
    useEffect(() => {
        if (!isReadyEdit.isReady) {
            setCommentValue({ ...commentValue, text: "" })
        }
        //eslint-disable-next-line
    }, [isReadyEdit.isReady])

    return (
        <div className="comments_section">
            {user.name && localStorage.getItem("token")
                ?
                <div className="write_comment">
                    <Author avatar={user.avatar} />
                    <textarea
                        ref={writeCommentRef}
                        value={commentValue.text}
                        placeholder="Write comment..."
                        className="write_comment_input"
                        onChange={(e) => setCommentValue({ ...commentValue, text: e.target.value })}
                    />
                    {!isReadyEdit.isReady && <span onClick={sendComment}><CommentBtn text='Add Comment' faded={isFaded} /></span>}
                    {isReadyEdit.isReady && <span
                        onClick={() => editComment(refetch, isReadyEdit.comID, commentValue, setIsReadyEdit({ ...isReadyEdit, isReady: false }))}>
                        <CommentBtn text='Edit Comment' faded={isFaded} />
                    </span>
                    }
                </div>
                : <p className='pltc' onClick={handleVisibility}>Please log in to comment.</p>
            }
            {
                fetchedCommentsData && (
                    <div className="comments_array">
                        {fetchedCommentsData.map((item: commentProps, index: number) => {
                            return (
                                <div className="single_comment_parent" key={index}>
                                    <div className="single_comment">
                                        <div className='single_comment_inner'>
                                            <p className="single_comment_userName">{item?.user?.name}</p>
                                            <p className="single_comment_text" ref={(singleCommentTextRef)}>{item?.text}</p>
                                        </div>

                                        {
                                            item?.user?.id === user.userID && <><span ref={(el) => (commentPanelRefs.current[index] = el)} className='dot_normal_pos' onClick={() => showSettings(index)}>
                                                {dotsForComments}
                                            </span>
                                                {index === settingActiveIndex && <div className="comment_panel_and_dots">
                                                    <div>
                                                        <SettingForComment commentID={item?.id} refetchCallbac={refetch} editCom={() => getCommentForEdit(item.id, item.text)} />
                                                    </div>
                                                </div>}
                                            </>
                                        }
                                    </div>

                                    {/* replies */}
                                    <div className="single_comment_date_replay">
                                        <DateFormater date={item.created_at} />
                                        <CommentLikeSection

                                            myRepGul={item.myCommGul}

                                            guls={item.guls}
                                            commentId={item.id}
                                        />
                                        <p className="single_comment_replay" onClick={() => toggleReply(index)}>
                                            Reply
                                        </p>


                                    </div>

                                    {item?.comments?.length > 0 &&
                                        <div className='replayed_comments_section'>
                                            <Replies replayedComments={item.comments.slice(-repliesLength)} refetchCallBack={refetch} mainCommentID={item.id} />
                                        </div>
                                    }
                                    {(item?.comments?.length > 2 && item.comments.length > repliesLength) && <p className="single_comment_replay view_all_replies" onClick={showMoreReplies}>View all replies</p>}
                                    {/* reply container */}

                                    <div className={visibleReplyIndex === index && mainReplayRedux ? 'replay_container visible' : 'replay_container '}>
                                        {
                                            <ReplayComment id={item?.id} feedID={item?.feed_id} refetchCallback={refetch} mentionedUser={item?.user?.name} />
                                        }
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )
            }
            {(commentsData.length > 5 && displayedComments < fullLengtComments) && <p className='vmc' onClick={loadMoreComments}>View more commnets</p>}
        </div>
    )
}

export default CommentsSection

interface CommentBtnProps {
    faded: boolean;
    text: string;
}
export const CommentBtn: React.FC<CommentBtnProps> = ({ faded, text }) => {
    return (
        <div className={faded ? "comment_btn" : "comment_btn active"}>
            <p>{text}</p>
        </div>
    )
}


