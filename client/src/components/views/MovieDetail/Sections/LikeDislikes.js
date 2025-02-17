import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Tooltip } from 'antd';
import {
  LikeOutlined,
  DislikeOutlined,
  LikeFilled,
  DislikeFilled,
} from '@ant-design/icons';
import Axios from 'axios';

function LikeDislikes(props) {
    const user = useSelector((state) => state.user);        // Login한 유저의 정보를 가져온다!
    const [Likes, setLikes] = useState(0);                      // 좋아요 갯수
    const [LikeAction, setLikeAction] = useState('');           // 좋아요 눌렀는지 판단 여부 변수
    const [Dislikes, setDislikes] = useState(0);                // 싫어요 갯수
    const [DisLikeAction, setDisLikeAction] = useState('');     // 싫어요 눌렀는지 판단 여부 변수

    let variable = {};
    if (props.movie) {
        variable = { movieId: props.movieId, userId: props.userId };
    }
    else {
        variable = { commentId : props.commentId, userId: props.userId };
    }

    useEffect(() => {
        // 좋아요 가져오기
        Axios.post('/api/like/getLikes', variable).then((response) => {
            if (response.data.success) {

                //얼마나 많은 좋아요를 받았는지
                setLikes(response.data.likes.length);

                //내가 좋아요를 이미 눌렀는지
                response.data.likes.map((like) => {
                    if (like.userId === props.userId) {
                        //pros.userId는 로그인한 사용자의 Id이기때문
                        setLikeAction('liked');
                    }
                });
            } else {
                alert('Like에 대한 정보를 가져오지 못했습니다.');
            }
        });

        // 싫어요 가져오기
        Axios.post('/api/like/getDislikes', variable).then((response) => {
            if (response.data.success) {
                //얼마나 많은 싫어요를 받았는지
                setDislikes(response.data.dislikes.length);
                
                //내가 싫어요를 이미 눌렀는지
                response.data.dislikes.map((dislike) => {
                    if (dislike.userId === props.userId) {
                        //pros.userId는 로그인한 사용자의 Id이기때문
                        setDisLikeAction('disliked');
                    }
                });
            } else {
                alert('DisLike에 대한 정보를 가져오지 못했습니다.');
            }});
        }, []);

        // 좋아요 클릭
        const onLike = () => {
            if (!user.userData._id) {

                alert("로그인 후 Like 기능이 가능합니다.");
                return;
            }
            // 클릭이 안되어 있을때
            if (LikeAction === '') {
                Axios.post('/api/like/upLike', variable).then((response) => {
                if (response.data.success) {
                    setLikes(Likes + 1);        // 좋아요 + 1
                    setLikeAction('liked');     // 좋아요 액션값 설정

                    // 싫어요가 클릭이 되어 있을경우
                    if (DisLikeAction !== '') {
                        setDisLikeAction('');       // 싫어요 액션값을 빈 값으로 설정
                        setDislikes(Dislikes - 1);  // 싫어요 - 1
                    }
                } else {
                    alert('Like를 올리지 못했습니다.');
                }
                });
            } else {    // 좋아요 클릭이 되어 있을 경우
                Axios.post('/api/like/unLike', variable).then((response) => {
                if (response.data.success) {
                    setLikes(Likes - 1);    // 좋아요 - 1
                    setLikeAction('');      // 좋아요 액션 값을 빈 값으로 설정
                } else {
                    alert('Like를 내리지 못했습니다.');
                }
                });
            }
        };

        // 싫어요 클릭
        const onDislike = () => {
            if (!user.userData._id) {
                alert("로그인 후 DisLike 기능이 가능합니다.");
                return;
            }

            if (DisLikeAction !== '') { // 싫어요 액션값이 빈 값이 아닌 경우 (싫어요가 이미 클릭 되어 있는 경우)
                Axios.post('/api/like/unDislike', variable).then((response) => {
                if (response.data.success) {
                    setDislikes(Dislikes - 1);  // 싫어요 - 1
                    setDisLikeAction('');       // 싫어요 액션값 빈 값으로 설정
                } else {
                    alert('dislike를 지우지 못했습니다.');
                }
                });
            } else {    // 싫어요 액션값이 빈 값인 경우 (싫어요가 클릭 되어 있지 않는 경우)
                Axios.post('/api/like/upDislike', variable).then((response) => {
                if (response.data.success) {
                    setDislikes(Dislikes + 1);      // 싫어요 + 1
                    setDisLikeAction('disliked');   // 싫어요 설정값 설정

                    if (LikeAction !== '') {        // 만약 좋아요 액션값이 빈 값이 아닌 경우? (좋아요가 이미 클릭되어 있는 경우)
                    setLikeAction('');              // 좋아요 액션 값 빈 값 설정
                    setLikes(Likes - 1);            // 좋아요 - 1
                    }
                } else {
                    alert('dislike를 올리지 못했습니다.');
                }});
            }
        };

    return (
        <div>
            <span key="comment-basic-like">
                <Tooltip title="Like">
                {LikeAction === '' ? <LikeOutlined onClick={onLike} /> : <LikeFilled onClick={onLike} />}
                </Tooltip>
                <span style={{ paddingLeft: '4px', cursor: 'auto' }}> {Likes}</span>
            </span>&nbsp;&nbsp;

            <span key="comment-basic-dislike" style={{ marginLeft: '4px' }}>
                <Tooltip title="Dislike">
                {DisLikeAction === '' ? (
                    <DislikeOutlined onClick={onDislike} />
                ) : (
                    <DislikeFilled onClick={onDislike} />
                )}
                </Tooltip>
                <span style={{ paddingLeft: '4px', cursor: 'auto' }}> {Dislikes}</span>
            </span>&nbsp;&nbsp;
        </div>
    );
}

export default LikeDislikes;