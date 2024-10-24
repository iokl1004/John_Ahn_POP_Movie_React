import './Comment.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComment } from "@fortawesome/free-solid-svg-icons";

function CommentCount(props) {
    return (
        <div className="view-comment">
            <h4 className="view-comment-heading">
                <strong>
                    댓글목록
                    <span className="text-deep-orange f-s-22r m-l-15">
                        <i className="far fa-comment-dots m-r-5">
                            <FontAwesomeIcon icon={faComment} />
                        </i>
                        {props.CommentCounts}
                    </span>
                </strong>
            </h4>
        </div>
    )
}

export default CommentCount