import React from 'react'
import { Col } from 'antd';
import No_Image from './img/No_Image.png';
import styled from "styled-components";

function GridCards(props) {

    const ImgWrapper = styled.div`
        position : relative;

        .movie_info {
            position : absolute;
            left : 5%;
            right : 5%;
            bottom : 0px;
            z-index : 1;
            font-size : 15px;
            color : #ffffff;
            font-weight : 700;
            display : none;
            // user-select : none;  // 텍스트 복사 방식
        }

        // Mouse hover시 이미지가 짙어지며 영화 관련 소개글이 보일 수 있도록 설정
        &:hover .movie_info {
            display : block;
        }
        
        // Mouse hover시 해당 이미지가 짙어 질 수 있도록 설정
        &:hover .post_thumbnail {
            filter : brightness(0.5);
        }
    `;

    // 렌딩 페이지인 경우
    if(props.landingPage) {
        return (
            // 라지 사이즈 인 경우에는 6size
            // 미디움 사이즈 인 경우에는 3개
            // 가장 작은 사이즈 인 경우에는 1개
            <Col lg={6} md={8} xs={24}>
                <ImgWrapper>
                    <a href={`/movie/${props.movieId}`}>
                        <p className='movie_info'>
                            <div>
                                영화 제목 : {props.movieName}
                            </div>
                            <div>
                                평점 : {props.vote_average}
                            </div>
                            <div>
                                소개글 : {props.overview}
                            </div>
                        </p>
                        <div className='post_thumbnail'>
                            <img style={{ width : '100%', height: '500px' }} src={props.image} alt={props.movieName} />
                        </div>
                    </a>
                </ImgWrapper>
            </Col>
        )
    } else {
        return (
            // 라지 사이즈 인 경우에는 6size
            // 미디움 사이즈 인 경우에는 3개
            // 가장 작은 사이즈 인 경우에는 1개
            <Col lg={6} md={8} xs={24}>
                <div style={{ position : 'relative' }}>
                    <img style={{ width : '100%', height: '500px' }} src={props.image ? props.image : 
                                   No_Image  // API 서버에 파일이 존재하지 않을 경우
                    } alt={props.characterName} />
                    <div style={{ color : 'black', fontSize : '16px', fontFamily : '맑은 고딕'}}>배우 명 : {props.characterName}</div>
                    <div style={{ fontSize : '14px', fontFamily : '맑은 고딕'}}>배역 : {props.character}</div>
                </div>
            </Col>
        )
    }
}

export default GridCards
