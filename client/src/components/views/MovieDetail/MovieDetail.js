import React, { useEffect, useState } from 'react';
import { List } from 'antd'
import { API_URL, API_KEY, IMAGE_BASE_URL } from '../../Config';
import MainImage from '../LandingPage/Sections/MainImage';
import MovieInfo from './Sections/MovieInfo';
import GridCards from '../commons/GridCards';
import Favorite from './Sections/Favorite';
import { useSelector } from "react-redux";
import LikeDislikes from './Sections/LikeDislikes';

import { Row } from 'antd';

function MovieDetail(props) {
    const user = useSelector(state => state.user)

    let movieId = props.match.params.movieId
    const [Movie, setMovie] = useState([])
    const [Casts, setCasts] = useState([])
    const [ActorToggle, setActorToggle] = useState(false)

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
    }, [])

    const toggleActorView = () => {
        setActorToggle(!ActorToggle)
    }

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
                    <button onClick={toggleActorView}> 배우 더 보기... </button>
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
                    />
                </div>
            </div>
        </div>
    )
}

export default MovieDetail
