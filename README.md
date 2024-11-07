# John_Ahn_POP_Movie_React

인프런 강의에서 배운 Movie_React를 직접 수정해 보자!

20241016(수)

1. RightMenu

- 문구 수정 완료.

2. LoginPage

- 문구 수정 완료.

3. (로그인 후) RightMenu

- 문구 수정 완료.

4. RegisterPage

- 문구 수정 완료.

5. RegisterPage

- Alert창 수정 완료.
  - 이미 가입이 된 이메일인 경우, "undefined" Alert이 나옴.
  - "이미 가입된 Email이 존재합니다." Alert창이 나오도록 수정.

---

20241018(금)

1. MovieDetail

- 문구 수정 완료
- 로그인을 하지 않은 경우, "Add to Favorite" Button 숨기기
- 배우 사진 높이 조절
  - 변경 전 : height: '320px'
  - 변경 후 : height: '500px'
- API 서버에 배우의 사진이 존재하지 않을 경우의 예외처리

---

20241019(토)

1. Favorite

- 문구 수정 완료
- Movie Title 클릭 시, 해당 영화정보 페이지로 이동되도록 수정

2. Footer

- Happy Coding 부분 삭제 (추후 디자인 예정)

---

20241022(화)

1. MovieDetail

- 영화 "좋아요", "싫어요" 기능 구현 (완료)

---

20241023(수)

1. MovieDetail

- 댓글 기능 구현 (완료)
  - 댓글 좋아요/싫어요 기능 (완료)
  - 대댓글 기능 (완료)
  - 비 Login 및 댓글이 공란인 경우 예외처리 (완료)

---

20241024(목)

1. Comment

- 댓글을 확인하기 편하게 가시성을 돋보이게끔 "댓글목록", "댓글쓰기" 추가 (완료)
- 해당 Movie의 댓글 수 보이게끔 추가 (완료)
- 버튼명 수정 및 CSS 설정 (완료)

---

20241026(토)

1. Comment

- 댓글이 없을 경우, 댓글이 존재하지 않다는 문구 추가 (완료)
- 댓글쓰기 왼쪽에 말풍선 이미지 추가 (완료)

---

20241027(일)

1. Navbar

- 로그인, 로그아웃에 따른 RightMenu바 메뉴설정 (완료)
- 메뉴 디자인 수정 (완료)
  - 소메뉴 위치 수정

---

20241030(수)

1. FeedBack 문구 짤리는 현상 수정 (완료)

- Login
- Register

---

20241101(금)

1. 회원정보 수정 (진행중)

- 회원정보 수정 페이지 Form에 로그인 정보값 가져오기(성, 이름, Email) (완료)
  - localStorage에 로그인 정보를 담아서 가져오는 방식으로 선정.

---

20241103(일)

1. 회원정보 수정 (진행중)

- 회원정보 수정 BackEnd 수정개발 진행중
  - user_reducer.js
    - MODIFY_USER 추가 (완료)
  - types.js
    - MODIFY_USER 추가 (완료)
  - user_actions.js
    - export function modifyUser 추가 (완료)
  - ModifyPage.js 수정
    - onSubmit 버튼 클릭시, dispatch 부분 추가 (수정중)
  - users.js
    - router.post("/modify", (req, res) => { ...... 추가 (수정중)

---

20241104(월)

1. 회원정보 수정 (완료)

- 회원정보 수정 BackEnd 수정개발
  - ModifyPage.js 수정
    - onSubmit 버튼 클릭시, dispatch 부분 추가 (완료)
  - users.js
    - router.post("/modify", (req, res) => { ...... 추가 (완료)

---

20241107(목)

1. 회원정보 수정 (완료)

- 회원정보 수정 후, 로그아웃 되도록 수정

2. 댓글 로직 추가 (완료)

- 댓글 삭제 시, 본인이 작성한 댓글이 아닐경우 댓글 삭제 되지 않도록 처리
- 댓글 삭제 시, 대댓글이 존재 할 경우, 댓글 삭제 되지 않도록 처리
