from bs4 import BeautifulSoup
import requests


headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)AppleWebKit/537.36 (KHTML, like Gecko) Chrome/73.0.3683.86 Safari/537.36'}

data = requests.get(
    'https://movie.naver.com/movie/bi/mi/basic.naver?code=198623', headers=headers)
soup = BeautifulSoup(data.text, 'html.parser')

genres = soup.select(
    '#content > div.article > div.mv_info_area > div.mv_info > dl > dd:nth-child(2) > p > span:nth-child(1) > a')
imageUrl = soup.select_one(
    '#content > div.article > div.mv_info_area > div.poster > a > img')['src']
print(imageUrl)

# genresArray = []
# for genre in genres:
#     genresArray.append(genre.text)
# print(genresArray)
