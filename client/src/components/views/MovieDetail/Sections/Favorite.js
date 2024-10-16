import { useEffect, useState } from "react"
import Axios from 'axios'
import { Button } from 'antd';

function Favorite(props) {
    const movieId = props.movieId;                  // Movie ID
    const userFrom = props.userFrom;                // Login User ID
    const movieTitle = props.movieInfo.title;
    const moviePost = props.movieInfo.backdrop_path;
    const movieRunTime = props.movieInfo.runtime;

    const [FavoriteNumber, setFavoriteNumber] = useState(0)  // Favorite 갯수
    const [Favorited, setFavorited] = useState(false)        // 해당 movie에 대한 Favorite 유무

    let variables = {
        userFrom : userFrom,
        movieId : movieId,
        movieTitle : movieTitle,
        moviePost : moviePost,
        movieRunTime : movieRunTime
    }

    useEffect(() => {
        // 얼마나 많은 사람이 이 영화를 Favorite 리스트에 넣었는지 그 숫자 정보 얻기
        Axios.post('/api/favorite/favoriteNumber', variables)
            .then(response => {
                console.log(response.data)
                setFavoriteNumber(response.data.favoriteNumber)
                if(response.data.success) {
                } else {
                    alert('숫자 정보를 가져오는데 실패 했습니다.')
                }
             })

        // 내가 이 영화를 이미 Favorite 리스트에 넣었는지 아닌지 정보 얻기
        Axios.post('/api/favorite/favorited', variables)
            .then(response => {
            if(response.data.success) {
                setFavorited(response.data.favorited)
            } else {
                alert('정보를 가져오는데 실패 했습니다.')
            }
        })

    }, [])

    const onClickFavorite = () => {
        // 이미 페이보릿이 되어 있는지?
        // 이미 페이보릿이 되어 있다면, 페이보릿 해제와 -1을 한다!
        if(Favorited) {
            Axios.post('/api/favorite/removeFromFavorite', variables)
            .then(response => {
                if(response.data.success) {
                    setFavoriteNumber(FavoriteNumber - 1)
                    setFavorited(!Favorited)
                } else {
                    alert('Favorite 리스트에서 지우는 걸 실패 했습니다.')
                }
            })
        } else {    // 이미 페이보릿이 되어 있지 않다면, 페이보릿을 하고 +1을 한다!
            Axios.post('/api/favorite/addToFavorite', variables)
            .then(response => {
                if(response.data.success) {
                    setFavoriteNumber(FavoriteNumber + 1)
                    setFavorited(!Favorited)
                } else {
                    alert('Favorite 리스트에서 추가 하는 걸 실패 했습니다.')
                }
            })
        }
    }

    return (
        <div>
            {/* Favorite을 누르지 않았더라면 "Not Favorite" 문구 출력, 눌렀을경우 "Add to Favorite" 츨력  */}
            <Button onClick={onClickFavorite}>{Favorited ? "Not Favorite" : "Add to Favorite"} {FavoriteNumber}</Button>
        </div>
    )
}

export default Favorite
