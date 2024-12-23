import React from 'react'
import { Comment, Avatar } from 'antd';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import Axios from 'axios';
import LikeDislikes from './LikeDislikes';

function SingleComment(props) {

    console.log(props);

    const user = useSelector((state) => state.user);        // Login한 유저의 정보를 가져온다!
    const [OpenReply, setOpenRelpy] = useState(false);      // 대댓글 상태
    const [CommentValue, setCommentValue] = useState("")    // 대댓글

    // 대댓글 달기 버튼 클릭 시 대댓글입력 폼 유무
    const onClickReplyOpen = () => {
        setOpenRelpy(!OpenReply)
    }

    // 대댓글 값 변화
    const onHandleChange = (e) => {
        setCommentValue(e.currentTarget.value)
    }

    // 댓글 서버에 전송
    const onSubmit = (e) => {
        e.preventDefault(); // Submit 버튼 클릭 시, 새로고침 방지

        // 입력한 사람의 정보, 코멘트의 내용 여러가지 정보를 DB에 넣어줘야함
        const variables = {
            content : CommentValue          // 대댓글
          , writer : user.userData._id      // 대댓글단 유저의 ID (Login 한 유저의 ID)
          , movieId : props.movieId         // 비디오 ID
          , responseTo : props.comment._id  // 댓글단 유저의 ID
        }

        if(!variables.writer) {
            alert("로그인 후 댓글이용이 가능합니다.");
        } else if(!variables.content.trim()) {   // Space바만 따다다닥 눌렀을때 예외처리
          alert("코멘트를 작성해 주세요.");
        } else {
            Axios.post('/api/comment/saveComment', variables)
            .then((response) => {
            if(response.data.success) {
                setCommentValue("");
                setOpenRelpy(false);                        // Submit 완료 후, 코멘트 작성창 닫기!
                props.refreshFunction(response.data.result, 'create') // 상위 컴포넌트에 새로운 댓글목록을 다시 전달함.
            } else {
                alert('코멘트를 저장하지 못했습니다.')
            }})
        }
    }

    // 댓글삭제기능 추가    20241107(목)
    const onClickReplyDelete = (e) => {
        if(props.comment.writer == null ) {
            alert('탈퇴한 회원의 댓글삭제문의는 관리자에게 문의 바랍니다.')
            return;
        }
        if(props.comment.writer._id !== user.userData._id)
        {
            alert('본인이 작성한 댓글만 삭제가 가능합니다.')
            return;
        }
        else
        {
            // 대댓글이 있는지 확인
            const variables = {
                commentId : props.comment._id   // comment Id
              , movieId : props.movieId         // 비디오 ID
            }

            Axios.post('/api/comment/getReplyComment', variables)
            .then((response) => {
            if(response.data.success === true) {   // 대댓글의 갯수가 0일경우 삭제
                alert('댓글 삭제에 성공하였습니다.');
                props.refreshFunction(variables.commentId, 'delete')    // 상위 컴포넌트에 삭제한 commentId를 전달해줌.
            } else {
                console.log(response.data.success);                     // 댓글 갯수 확인
                alert('대댓글이 존재하여, 댓글을 삭제하지 못하였습니다.')   // 대댓글의 갯수가 0이 아닐경우 미삭제
            }})
        }
    }

    const actions = [
        // 해당 댓글에 대한 좋아요/싫어요 가져오기
        <LikeDislikes userId={localStorage.getItem('userId')} commentId={props.comment._id}/>
        , <span
            onClick={onClickReplyOpen}
            key="comment-basic-reply-to"
        >
            댓글쓰기
        </span>
        , <span
            onClick={onClickReplyDelete}
            key="comment-basic-reply-to"
        >
            댓글삭제
        </span>
        
    ]

    return (
        <div>
            <Comment
                actions={actions}
                author={props.comment.writer != null ? props.comment.writer : '탈퇴한 회원'}
                avatar={<Avatar src={props.comment.writer != null ? props.comment.writer.image : 'null'} />}
                content={<p>{props.comment.content}</p>}
            />
            
            {/* 대댓글 달기 버튼을 클릭 하였을때만 보이도록! */}
            {OpenReply && (
                <form style={{ display : 'flex'}} onSubmit={onSubmit}>
                    <textarea
                        style = {{ width : '100%', borderRadius : '5px' }}
                        onChange = {onHandleChange}
                        value = {CommentValue}
                        placeholder='코멘트를 작성해 주세요'
                    />
                    <br />
                    <button
                        className='btn-e btn-e-xlg btn-e-red'
                        disabled={!CommentValue}
                        onClick={onSubmit}
                    >
                        댓글등록
                    </button>
                </form>
            )}
        </div>
    )
}

export default SingleComment
