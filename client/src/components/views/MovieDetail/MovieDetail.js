import React, { useEffect, useState } from 'react';
import { API_URL, API_KEY, IMAGE_BASE_URL } from '../../Config';
import MainImage from '../LandingPage/Sections/MainImage';
import MovieInfo from './Sections/MovieInfo';
import GridCards from '../commons/GridCards';
import Favorite from './Sections/Favorite';
import Comment from './Sections/Comment'            // 댓글
import { useSelector } from "react-redux";
import LikeDislikes from './Sections/LikeDislikes';
import CommentCount from './Sections/CommentCount'; // 댓글 카운트
import NotFound from '../commons/NotFound';         // 페이지 없음
import Axios from 'axios'
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';

import { Row } from 'antd';

function MovieDetail(props) {
    const user = useSelector(state => state.user)

    const movieId = props.match.params.movieId;
    const [Movie, setMovie] = useState([])
    const [Casts, setCasts] = useState([])
    const [ActorToggle, setActorToggle] = useState(false)
    const [Comments, setComments] = useState([]);           // Comments(댓글)가 담길 빈 배열을 만들어 준다.
    const [CommentCounts, setCommentCounts] = useState(0);   // Comments(댓글)의 갯수
    const variable = { movieId : movieId }                  // movieId : movieId 값

    useEffect(() => {
        let endpointCrew = `${API_URL}movie/${movieId}/credits?api_key=${API_KEY}`

        let endponitInfo = `${API_URL}movie/${movieId}?api_key=${API_KEY}`

        fetch(endponitInfo)
        .then(response => response.json())
        .then(response => {
            // console.log(response)
            setMovie(response)
        })

        // 영화 출연자 가져오기
        fetch(endpointCrew)
        .then(response => response.json())
        .then(response => {
            // console.log('responseForCrew', response)
            setCasts(response.cast)
        })

        // 해당 Movie의 모든 댓글을 가져오기
        getCommentsFunction();
    }, [])

    // 해당 Movie의 모든 댓글을 가져오기
    const getCommentsFunction = () => {
        Axios.post('/api/comment/getComments', variable)
        .then((response) => {
            if(response.data.success) {
                // console.log(response.data.comments);
                setComments(response.data.comments);             // 댓글리스트에 댓글들 넣기
                setCommentCounts(response.data.comments.length); // 댓글갯수
            } else {
                alert('코멘트 정보를 가져오는 것을 실패 하였습니다.')
            }
        });
    }

    const refreshFunction = (newComment, status) => {
        // status를 구분짓지 말고 그냥 getCommentsFunction()으로 통일해도 될것 같은데....

        // 자식컴포넌트에서 버튼을 클릭하면, 자식에서 받아온 comment정보(새 댓글)를 newComment라고 한다.
        if(status === 'create') {
            // setComments(Comments.concat(newComment))    // Comments(댓글)가 담긴 배열에 자식에서 받아온 newComment(새 댓글)를 추가한다.
            getCommentsFunction()
        } else if(status === 'delete') {
            // setComments(Comments.filter(comment=>comment._id !== newComment))   // singleComment에서 삭제한 CommentId를 전달받아, Comments Status를 업데이트한다!
            getCommentsFunction()
        }
    }

    // 배우 더보기 버튼 클릭 시, 배우를 더 보여준다
    const toggleActorView = () => {
        setActorToggle(!ActorToggle)
    }

    // 존재하지 않는 영화 페이지인 경우
    if(Movie.success === false) {
        return <NotFound movie/>
    } else {
        return (
            <div>
                {/* Header */}

                <MainImage
                    image={`${IMAGE_BASE_URL}w1280${Movie.backdrop_path}`}
                    title={Movie.original_title}
                    text={Movie.overview}
                />

                {/* Body */}
                <div style={{ width: '85%', margin : '1rem auto '}}>
                    <div style={{ display :'flex', justifyContent : 'flex-end'}} >
                        {/* 로그인을 한 유저에게만, "Add to Favorite" Button 보이게 하기 */}
                        {user.userData && user.userData.isAuth &&
                            <Favorite movieInfo={Movie} movieId={movieId} userFrom={localStorage.getItem('userId')}/>
                        }
                    </div>

                    {/* Movie Info */}
                    <MovieInfo 
                        movie = {Movie}
                    />

                    <br />
                    {/* Actors Grid */}

                    <div style={{display : 'flex', justifyContent : 'center', margin : '2rem' }}>
                        <Button type="button" onClick={toggleActorView}> 배우 더 보기... </Button>
                    </div>

                    {/* ActorToggle 인 경우에만 배우들의 사진을 보여줘라! */}
                    {ActorToggle && 
                        <Row gutter={[16, 16]} >
                            {Casts && Casts.map((cast, index) => (
                                <React.Fragment key={index}>
                                    <GridCards
                                        character={cast.character}  // 배역명
                                        image={cast.profile_path ?  // 배우 프로필 사진
                                            // poster_path값이 없을 경우 null값 처리
                                            `${IMAGE_BASE_URL}w500${cast.profile_path}` : null}
                                        characterName={cast.name}   // 배우명
                                    />
                                </React.Fragment>
                            ))}
                        </Row>
                    }
                    <div style={{display : 'flex', justifyContent : 'center', margin : '2rem' }}>
                        <LikeDislikes
                            movie
                            userId={localStorage.getItem('userId')}
                            movieId={movieId}
                            user={user}
                        />
                    </div>

                    {/* 댓글 수 */}
                    <CommentCount
                        CommentCounts={CommentCounts}
                    />

                    {/* Comment */}
                    <Comment
                        refreshFunction={refreshFunction}
                        commentLists={Comments}
                        movieId={movieId}
                    />
                </div>
            </div>
        )
    }
}

export default MovieDetail
