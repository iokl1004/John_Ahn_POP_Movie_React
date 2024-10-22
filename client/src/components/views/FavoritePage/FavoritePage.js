import React, { useEffect, useState } from 'react'
import './favorite.css'
import Axios from 'axios'
import { Popover } from 'antd';
import { IMAGE_BASE_URL } from '../../Config';
import No_Image from '../commons/img/No_Image.png';

function FavoritePage() {

    const [Favorites, setFavorites] = useState([]);

    useEffect(() => {
        fetchFavoredMovie()
    }, [])

    const fetchFavoredMovie = () => {
        Axios.post('/api/favorite/getFavoredMovie', { userFrom : localStorage.getItem('userId') })
        .then(response => {
            if(response.data.success) {
                // console.log(response.data)
                setFavorites(response.data.favorites)
            } else {
                alert('영화 정보를 가져오는데 실패 했습니다.')
            }
        })
    }

    const onClickDelete = (movieId, userFrom) => {
        const variables = {
            movieId,
            userFrom
        }

        Axios.post('/api/favorite/removeFromFavorite', variables)
        .then(response => {
            if(response.data.success) {
                fetchFavoredMovie()
            } else {
                alert("리스트에서 지우는데 실패했습니다.")
            }
        })
    }

    const onClickMovie = () => {
        alert("ㄹㅇㅋ");
    }

    const renderCards = Favorites.map((favorite, index) => {
        const content = (
            <div>
                {favorite.moviePost ?
                    <img src={`${IMAGE_BASE_URL}w500${favorite.moviePost}`} /> : No_Image  // API 서버에 파일이 존재하지 않을 경우
                }
            </div>
        )
        
        return (
            <tr key={index}>
                <Popover content={content} title={`${favorite.movieTitle}`}>
                    <td><a href={`/movie/${favorite.movieId}`}>{favorite.movieTitle}</a></td>
                </Popover>
                <td>{favorite.movieRunTime}분</td>
                <td><button onClick={() => onClickDelete(favorite.movieId, favorite.userFrom)}>Remove</button></td>
            </tr>
        )
    }) 

    return (
        <div style = {{ width: '85%', margin: '3rem auto' }}>
            <h2> 나의 Favorite 영화 </h2>
            <hr />

            <table>
                <thead>
                    <tr>
                        <th>제목</th>
                        <th>러닝타임</th>
                        <th>Favorites 제거</th>
                    </tr>
                </thead>
                <tbody>
                    {renderCards}
                </tbody>
            </table>
        </div>
    )
}

export default FavoritePage
