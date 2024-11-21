import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';

export default function NotFound() {
  return (
    <div class="container">
        <div class="row justify-content-center"> 
            <div class="col-md-6 text-center">
                <h1>404</h1>
                <h3>페이지를 찾을 수 없습니다.</h3>
                <p>죄송합니다. 더 이상 존재하지 않는 페이지입니다.</p>
                <a href="/" class="btn btn-primary">홈으로 이동</a>
            </div>
        </div>
    </div>
  )
}