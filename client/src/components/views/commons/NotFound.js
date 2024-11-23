import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';

function NotFound(props) {
  return (
    <div class="container" style={{ marginTop: "15%"}}>
        <div class="row justify-content-center">
            <div class="col-md-6 text-center">
                <h1>404</h1>

                {props.movie ? <h3>영화정보가 존재하지 않습니다.</h3> : <h3>페이지를 찾을 수 없습니다.</h3>}
                {props.movie ? <p>올바른 Movie Id를 입력해주세요</p> : <p>죄송합니다. 더 이상 존재하지 않는 페이지입니다.</p>}
                <a href="/" class="btn btn-primary">홈으로 이동</a>
            </div>
        </div>
    </div>
  )
}

export default NotFound