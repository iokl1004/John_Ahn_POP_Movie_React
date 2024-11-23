import React from 'react'
import { useEffect, useState } from 'react';
import { API_URL, API_KEY, IMAGE_BASE_URL } from '../../Config';
import MainImage from './Sections/MainImage';
import GridCards from '../commons/GridCards';
import { Row } from 'antd';

function LandingPage() {

    const [Movies, setMovies] = useState([]);
    const [MainMovieImage, setMainMovieImage] = useState(null);
    const [CurrentPage, setCurrentPage] = useState(0);

    useEffect(()=> {
        const endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=1`;
        fetchMovies(endpoint)
    }, [])

    // 영화정보 가져오기
    const fetchMovies = (endpoint) => {
        fetch(endpoint)
        .then(response => response.json())
        .then(response => {
            // console.log(response)
            setMovies([...Movies, ...response.results]);    // 기존 Movies state에 가져온 영화정보를 추가한다!
            setMainMovieImage(response.results[0]);
            setCurrentPage(response.page)
        })
    }

    // 추가 영화정보 가져오기
    const loadMoreItems =() => {
        const endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=${CurrentPage + 1}`;
        fetchMovies(endpoint)
    }
    
    return (
        <div style={{ width : '100%', margin: '0'}}>
            {/* Main Image */}
            {MainMovieImage &&
                <MainImage
                    image={`${IMAGE_BASE_URL}w1280${MainMovieImage.backdrop_path}`}
                    title={MainMovieImage.original_title}
                    text={MainMovieImage.overview}
                />
            }

            <div style= {{ width : '85%', margin : '1rem auto'}}>
                <h2>Movies by latest</h2>
                <hr />

                {/* Movie Grid Cards */}
                <Row gutter={[16, 16]} >
                    {Movies && Movies.map((movie, index) => (
                        <React.Fragment key={index}>
                            <GridCards
                                landingPage
                                image={movie.poster_path ?
                                    // poster_path값이 없을 경우 null값 처리
                                    `${IMAGE_BASE_URL}w500${movie.poster_path}` : null}
                                movieId={movie.id}
                                movieName={movie.original_title}
                                vote_average={movie.vote_average}   // 평점
                                overview={movie.overview}           // 소개글
                            />
                        </React.Fragment>
                    ))}
                </Row>

            </div>

            {/* 추가로 영화정보 가져오기 */}
            <div style={{ display : 'flex', justifyContent : 'center' }}>
                <button onClick={loadMoreItems}> Load More </button>
            </div>

        </div>
    )
}

export default LandingPage
