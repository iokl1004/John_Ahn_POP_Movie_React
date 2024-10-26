import React, { useState } from 'react'
import Axios from 'axios';
import { useSelector } from 'react-redux';
import SingleComment from './SingleComment';  // 댓글
import ReplyComment from './ReplyComment';    // 대댓글
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComment as faRegComment} from "@fortawesome/free-regular-svg-icons";   // 공란 comment 이미지
import { faComment as faSolComment} from "@fortawesome/free-solid-svg-icons";     // 채워진 comment 이미지
import './Comment.css';

function Comment(props) {
  const movieId = props.movieId;                      // Movie ID
  const user = useSelector((state) => state.user);    // Redux를 이용하여, Login한 유저의 정보를 가져온다!
  const [commentValue, setCommentValue] = useState(); // 댓글

  const handleClick = (e) => {
      setCommentValue(e.currentTarget.value);
  }

  const onSubmit = (e) => {
    // 댓글 버튼 클릭 시, 새로고침 방지
    e.preventDefault();

    const variables = {
      content : commentValue      // 댓글
    , writer : user.userData._id  // Login 한 유저의 ID
    , movieId : movieId           // Movie ID
  }

    if(!variables.writer) {
      alert("로그인 후 댓글이용이 가능합니다.");
    } else if(!variables.content.trim()) {   // Space바만 따다다닥 눌렀을때 예외처리
      alert("코멘트를 작성해 주세요.");
    } else {
      // 입력한 사람의 정보, 코멘트의 내용 여러가지 정보를 DB에 넣어줘야함
      Axios.post('/api/comment/saveComment', variables)
      .then((response) => {
        if(response.data.success) {
          // console.log(response.data.result)
          setCommentValue("");
          props.refreshFunction(response.data.result) // 부모컴포넌트 DB에 저장된 댓글 정보를 전달해줌.
        } else {
          alert('코멘트를 저장하지 못했습니다.')
        }
      })
    }
  }

  return (
    <div>
      {/* 댓글이 한개라도 없을 경우, 등록된 댓글이 없다고 표시해주기. */}
      {props.commentLists.length === 0 &&
        <div className="css-upjkrn">
          <i className="far fa-comment-dots m-r-5">
            <FontAwesomeIcon icon={faRegComment} size='2xl' />
          </i>
          <strong>등록된 댓글이 없습니다.</strong>
        </div>
      }

      {/* Coment Lists */}
      {props.commentLists &&
        props.commentLists.map((comment, index) => (
          !comment.responseTo && (
            <React.Fragment key={index}>
              <SingleComment
                refreshFunction={props.refreshFunction}
                comment={comment}
                movieId={movieId}
                key={index}
              />
              <ReplyComment
                refreshFunction={props.refreshFunction}
                commentLists={props.commentLists}
                parentCommentId = {comment._id}
                movieId={movieId}
              />
            </React.Fragment>)
      ))}

      {/* Root Comment Form */}

      <h4 className="comment-write-heading">
        <i className="far fa-comment-dots m-r-5">
          <FontAwesomeIcon icon={faSolComment} />
        </i>
        <strong>댓글쓰기</strong>
      </h4>
      <form style={{ display : 'flex'}} onSubmit={onSubmit} >
        <textarea
          style = {{ width : '100%', borderRadius : '5px' }}
          onChange={handleClick}
          value={commentValue}
          placeholder='코멘트를 작성해 주세요'
        />
        <br />
        <button
          disabled={!commentValue}
          className='btn-e btn-e-xlg btn-e-red'
          onClick={onSubmit}
        >
          댓글등록
        </button>
      </form>
    </div>
  )
}

export default Comment
