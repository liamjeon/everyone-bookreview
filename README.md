## 모두의 책리뷰
추천 도서를 공유하는 웹 사이트입니다.
베스트셀러와 유저가 직접 등록한 리뷰를 공유하고, 댓글 기능을 이용하여 유저들간 자유롭게 의견을 남길 수 있습니다.  

![모두의책](https://user-images.githubusercontent.com/78454645/140516769-f59631bd-55d0-4e6a-bb13-696f7eaeabeb.png)

## 웹사이트 링크
http://liamproject.shop/

## 시연영상
https://www.youtube.com/watch?v=F7ZPA0Mku0w


## 소개
- 베스트 셀러 리뷰와 유저 추천 책 리뷰를 보고 싶은 분들
- 베스트셀러로 순위 변동 실시간 반영
- 유저 추천 책 등록시 url 넣으면 책 제목 작가 책이미지 줄거리 확인 가능
- 책 이미지 click시 모달창이 띄워지며 책정보와 리뷰목록 및 내용 확인 가능
- 로그인 하지 않아도 베스트셀러 리뷰와 유저 추천 책 리뷰를 볼 수 있으나 리뷰와 유저 추천 책 등록은 로그인한 회원만 가능

## 기술 스택
- 개발 언어 : HTML5, CSS, javascript, python
- 개발 환경 : flask web framework
- 데이터베이스 : mongodb
- 형상관리 툴 : git
- Server : AWS EC2 (Ubuntu 18.04 LTS) 


## 요구 사항
### SSR vs CSR
- SSR은 한 번에 그려지는 장점, SEO에 강점
- CSR은 전체적인 시간은 SSR보다 비슷하거나 더 오래 걸릴 수도 있지만 로딩창을 먼저 보여줌으로써 사용자의 인내심을 늘려준다.

### JWT
- 발급 후 토큰 검증만 하면 되기 때문에 추가 저장소가 필요 없다. 가볍다.
- 필요한 모든 정보를 자체적으로 지니고 있기(self-contained)때문에 두 개체 사이에서 손쉽게 전달 될 수 있다.

