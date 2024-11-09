import React from 'react'
import { Col } from 'antd';
import No_Image from './img/No_Image.png';

function GridCards(props) {

    const handleMouseOver = () => {
        alert(props.movieName);
    }

    // 렌딩 페이지인 경우
    if(props.landingPage) {
        return (
            // 라지 사이즈 인 경우에는 6size
            // 미디움 사이즈 인 경우에는 3개
            // 가장 작은 사이즈 인 경우에는 1개
            <Col lg={6} md={8} xs={24}>
                <div style={{ position : 'relative' }}>
                    <a href={`/movie/${props.movieId}`} onMouseOver={handleMouseOver}>
                        <img style={{ width : '100%', height: '400px' }} src={props.image} alt={props.movieName} />
                    </a>
                </div>
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
