import React, { useEffect, useState } from 'react'
import SingleComment from './SingleComment'

function ReplyComment(props) {
    const [ChildCommentNumber, setChildCommentNumber] = useState(0)
    const [OpenReplyComments, setOpenReplyComments] = useState(false);

    useEffect(() => {
        let commentNumber = 0;
        props.commentLists.map((comment, index) => {
            if(comment.responseTo === props.parentCommentId) {
                commentNumber++;
            }
        });
        setChildCommentNumber(commentNumber);
    }, [props.commentLists])    // props.commentLists가 변경 될 때마다 실행되게 해라

    const renderReplyComment = (parentCommentId) => 
        props.commentLists.map((comment, index) => (
            <React.Fragment key={index}>
                {comment.responseTo === parentCommentId && (
                    <div style={{ width : '80%', marginLeft : '40px' }}>
                        <SingleComment
                            refreshFunction={props.refreshFunction}
                            comment={comment}
                            movieId={props.movieId}
                        />
                        <ReplyComment
                            refreshFunction={props.refreshFunction}
                            commentLists={props.commentLists}
                            movieId={props.movieId}
                            parentCommentId = {comment._id}
                        />
                    </div>
                )}
            </React.Fragment>
        ));
    

    const onHandleChange = () => {
        setOpenReplyComments(!OpenReplyComments);
    };

    return (
        <div>
            {ChildCommentNumber > 0 && (
                <p
                    style={{ fontSize : '14px', margin : 0, color : 'gray'}}
                    onClick={onHandleChange}
                >
                    View {ChildCommentNumber} more comment(s)
                </p>
            )
            }

            { OpenReplyComments && renderReplyComment(props.parentCommentId) }
        </div>
    )
}

export default ReplyComment
