import React from 'react'
import { Descriptions } from 'antd';

function MovieInfo(props) {
    
    let { movie } = props;

    const addComma = (price) => {
        let returnString = price?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        return returnString;
    }

    console.log(movie)

    return (
        <Descriptions title="Movie Info" bordered>
            <Descriptions.Item label="제목">{movie.original_title}</Descriptions.Item>
            <Descriptions.Item label="개봉">{movie.release_date}</Descriptions.Item>
            <Descriptions.Item label="수익">{addComma(movie.revenue)} USD</Descriptions.Item>
            <Descriptions.Item label="러닝타임">{movie.runtime}분</Descriptions.Item>
            <Descriptions.Item label="평균 평점" span={2}>
                {movie.vote_average}
            </Descriptions.Item>
            <Descriptions.Item label="평가 횟수">{movie.vote_count}</Descriptions.Item>
            <Descriptions.Item label="개봉유무">{movie.status}</Descriptions.Item>
            <Descriptions.Item label="대중성">{movie.popularity}</Descriptions.Item>
        </Descriptions>
    )
}

export default MovieInfo
