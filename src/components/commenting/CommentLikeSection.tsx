import React, { useEffect, useState } from 'react';
import IconBlock from '../singlePostComp/IconBlock';
import { likeIconComment, likeIconFilledComment } from '../../assets/newSvg/likeIcon';
import { likeComment } from './LikeComment';

interface CommentLikeSectionProps {
    myRepGul: number;
    guls: number;
    commentId: number;
}

const CommentLikeSection: React.FC<CommentLikeSectionProps> = ({ myRepGul, guls, commentId }) => {
    const [comCommentsQuant, setComCommentsQuant] = useState<{ [key: number]: number }>({});
    const [likedComments, setLikedComments] = useState<{ [key: number]: boolean }>({});
    const [icon, setIcon] = useState(likeIconComment);

    useEffect(() => {
        setComCommentsQuant((prevComCommentsQuant) => ({
            ...prevComCommentsQuant,
            [commentId]: guls,
        }));
    }, [commentId, guls]);


    // აიქონის ცვლილება ტრიგერებზე
    useEffect(() => {
        if (likedComments[commentId]) {
            setIcon(likeIconFilledComment);
        } else {
            setIcon(likeIconComment);
        }
    }, [likedComments, commentId]);

    // თუ ჩატვირთვისას უდრის ერთს უნდა გავააქტიუროთ აიქონი და ტრიგერი
    useEffect(() => {
        if (myRepGul === 1) {
            setIcon(likeIconFilledComment);
            setLikedComments((prevLikedComments) => ({
                ...prevLikedComments,
                [commentId]: true, // Toggle the like state
            }));
        }
    }, []);


    //კომენტარზე აიქონის ანთება და რაოდნობის მიმატება გამოკლება
    const handleLikeComment = () => {
        if (likedComments[commentId]) {
            setLikedComments((prevLikedComments) => ({
                ...prevLikedComments,
                [commentId]: false, // Toggle the like state
            }));
            setComCommentsQuant((prevComCommentsQuant) => ({
                ...prevComCommentsQuant,
                [commentId]: prevComCommentsQuant[commentId] - 1,
            }));
        } else {
            setLikedComments((prevLikedComments) => ({
                ...prevLikedComments,
                [commentId]: true, // Toggle the like state
            }));
            setComCommentsQuant((prevComCommentsQuant) => ({
                ...prevComCommentsQuant,
                [commentId]: prevComCommentsQuant[commentId] + 1,
            }));
        }
        likeComment(commentId);        
    };

    return (
        <IconBlock
            icon={icon}
            likeFunction={handleLikeComment}
            quantity={comCommentsQuant[commentId]}
        />
    );
};

export default CommentLikeSection;
