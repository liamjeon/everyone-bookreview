from flask import Flask, render_template, jsonify, request, redirect, url_for
import jwt
from datetime import datetime, timedelta
import hashlib
from bs4 import BeautifulSoup
import requests
from urllib.request import urlopen

app = Flask(__name__)

from pymongo import MongoClient

client = MongoClient('localhost', 27017)
db = client.dbbook

SECRET_KEY = '18'


@app.route('/')
def home():
    rows = db.articles.find({}, {'id': False})
    return render_template('index.html', rows=rows)


@app.route('/login')
def login():
    return render_template('login.html')


@app.route('/main_page')
def main_page():
    rows = db.articles.find({}, {'id': False})
    token_receive = request.cookies.get('mytoken')
    try:
        payload = jwt.decode(token_receive, SECRET_KEY, algorithms=['HS256'])
        user_info = db.bookReview_team.find_one({"id": payload['id']})
        user_id = user_info['id']
        return render_template('main.html', rows=rows, user_id=user_id)
    except jwt.ExpiredSignatureError:
        return redirect(url_for("home", msg="로그인 시간이 만료되었습니다."))
    except jwt.exceptions.DecodeError:
        return redirect(url_for("home", msg="로그인 정보가 존재하지 않습니다."))


db = client.bestseller

# 교보문고 베스트셀러 url에서 책의 제목, 저자, 출판사, 발간 날짜, 이미지 정보를 가져오고 bestseller 콜렉션에 저장
def insert_bookinfo():
    headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)AppleWebKit/537.36 (KHTML, like Gecko) Chrome/73.0.3683.86 Safari/537.36'}
    data = requests.get('http://www.kyobobook.co.kr/bestSellerNew/bestseller.laf?orderClick=d79', headers=headers)

    soup = BeautifulSoup(data.text, 'html.parser')

    lis = soup.select('#main_contents > ul > li')

    for li in lis:
        image_url = li.select_one('div.cover > a > img')['src']
        title = li.select_one('div.detail > div.title > a > strong').text
        if title is not None:
            stat = li.select_one('div.detail > div.author')
            stat_temps = stat.text.split()
            author = ""
            publish = ""
            publish_date = ""
            flag = 0
            for stat_temp in stat_temps:
                if stat_temp == "|":
                    flag += 1
                elif stat_temp == "저자" or stat_temp == "더보기":
                    pass
                else:
                    if flag == 0:
                        author += stat_temp + " "
                    elif flag == 1:
                        publish += stat_temp + " "
                    else:
                        publish_date += stat_temp + " "
            doc = {
                'title': title,
                'author': author,
                'publish_date': publish_date,
                'publish': publish,
                'image_url': image_url
            }
            db.bestseller.insert_one(doc)

    print('완료!')


# 기존 bestseller 콜렉션을 삭제 후, 크롤링하여 DB에 저장
def insert_all():
    db.bestseller.drop()  # bestseller 실시간 최신화를 위해 콜렉션 삭제
    insert_bookinfo() # 크롤링하여 DB에 저장

# 실행하기
insert_all()


@app.route('/bestSeller')
def best_seller():
    token_receive = request.cookies.get('mytoken')
    try:
        payload = jwt.decode(token_receive, SECRET_KEY, algorithms=['HS256'])
        user_info = db.bookReview_team.find_one({"id": payload['id']})
        user_id = user_info['id']
        print(payload)
        html = urlopen('https://www.kyobobook.co.kr/bestSellerNew/bestseller.laf')
        data = BeautifulSoup(html, 'html.parser')

        book_page_urls = []

        return render_template('bestSeller.html', user_id=user_id)
    except jwt.ExpiredSignatureError:
        return redirect(url_for("home", msg="로그인 시간이 만료되었습니다."))
    except jwt.exceptions.DecodeError:
        return redirect(url_for("home", msg="로그인 정보가 존재하지 않습니다."))


# @app.route('/login_main')
# def login_main():
#     rows = db.articles.find({}, {'id': False})
#     token_receive = request.cookies.get('mytoken')
#
#     try:
#         payload = jwt.decode(token_receive, SECRET_KEY, algorithms=['HS256'])
#         user_info = db.bookReview_team.find_one({"id": payload['id']})
#
#         return render_template('main.html', id=user_info["id"], rows=rows)
#     except jwt.ExpiredSignatureError:
#         return redirect(url_for("login", msg="로그인 시간이 만료되었습니다."))
#     except jwt.exceptions.DecodeError:
#         return redirect(url_for("login", msg="로그인 정보가 존재하지 않습니다."))


@app.route('/joinMem')
def joinMem():
    return render_template('joinMem.html')


@app.route('/join_info', methods=['POST'])
def join_info():
    id_receive = request.form['id_give']
    pw_receive = request.form['pw_give']
    pw_hash = hashlib.sha256(pw_receive.encode('utf-8')).hexdigest()

    doc = {
        'id': id_receive,
        'pw': pw_hash
    }

    db.bookReview_team.insert(doc)

    return jsonify({'result': 'success', 'msg': '가입이 되었습니다.'})


@app.route('/viewList', methods=['POST'])
def view():
    token_receive = request.cookies.get('mytoken')

    try:
        payload = jwt.decode(token_receive, SECRET_KEY, algorithms=['HS256'])

        user_info = db.bookReview_team.find_one({"id": payload['id']})
        user_id = user_info['id']
        url_receive = request.form['url_give']
        reviewMemo_receive = request.form['reviewMemo_give']
        reviewTitle_receive = request.form['reviewTitle_give']

        headers = {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)AppleWebKit/537.36 (KHTML, like Gecko) Chrome/73.0.3683.86 Safari/537.36'}
        data = requests.get(url_receive, headers=headers)

        soup = BeautifulSoup(data.text, 'html.parser')

        title = soup.select_one('meta[property="og:title"]')['content']
        image = soup.select_one('meta[property="og:image"]')['content']
        desc = soup.select_one('meta[property="og:description"]')['content']
        author = soup.select_one('meta[property="og:author"]')['content'].split('-')[0]
        print(author)
        price = soup.select_one('meta[property="og:price"]')['content']

        doc = {
            'id': user_id,
            'title': title,
            'image': image,
            'desc': desc,
            'url': url_receive,
            'author': author,
            'price': price,
            'reviewMemo': reviewMemo_receive,
            'reviewTitle': reviewTitle_receive
        }

        db.articles.insert_one(doc)
        return jsonify({'msg': '등록 완료!'})

    except (jwt.ExpiredSignatureError, jwt.exceptions.DecodeError):
        return jsonify({'msg': '아이고! 로그인을 하셔야죠!'})


@app.route('/logins', methods=['POST'])
def logins():
    id_receive = request.form['id_give']
    pw_receive = request.form['pw_give']
    pw_hash = hashlib.sha256(pw_receive.encode('utf-8')).hexdigest()

    result = db.bookReview_team.find_one({'id': id_receive, 'pw': pw_hash})

    if result is not None:
        payload = {
            'id': id_receive,
            'exp': datetime.utcnow() + timedelta(seconds=60 * 60 * 24)
        }
        token = jwt.encode(payload, SECRET_KEY, algorithm='HS256').decode('utf-8')

        return jsonify({'result': 'success', 'token': token})

    else:
        return jsonify({'result': 'fail', 'msg': '아이디/비밀번호가 일치하지 않습니다.'})


#
# def api_valid():
#     token_receive = request.cookies.get('mytoken')
#
#     try:
#         payload = jwt.decode(token_receive, SECRET_KEY, algorithms=['HS256'])
#         print(payload)
#
#         userinfo = db.bookReview_team.find_one({'id': payload['id']}, {'_id': False})
#         return jsonify({'result': 'success', 'id': userinfo['id']})
#     except jwt.ExpiredSignatureError:
#         return jsonify({'result': 'fail', 'msg': '로그인 시간이 만료되었습니다.'})
#     except jwt.exceptions.DecodeError:
#         return jsonify({'result': 'fail', 'msg': '로그인 정보가 존재하지 않습니다.'})


@app.route('/memo', methods=['GET'])
def listing():
    articles = list(db.articles.find({}, {'_id': False}))
    return jsonify({'all_articles': articles})


if __name__ == '__main__':
    app.run('0.0.0.0', port=2000, debug=True)
