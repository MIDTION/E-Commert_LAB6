import requests
from bs4 import BeautifulSoup
import json
import os

games = {
    'Arena of Valor': 'Arena_of_Valor',
    'Wuthering Waves': 'Wuthering_Waves',
    'Free Fire': 'Free_Fire_(video_game)',
    'PUBG Mobile': 'PUBG_Mobile'
}

results = {}

for name, title in games.items():
    url = f"https://en.wikipedia.org/wiki/{title}"
    response = requests.get(url)
    if response.status_code == 200:
        soup = BeautifulSoup(response.text, 'html.parser')
        infobox = soup.find('table', class_='infobox')
        if infobox:
            img = infobox.find('img')
            if img:
                img_url = 'https:' + img['src']
                # Get the original size by removing the /thumb/ part if possible
                img_url = img_url.replace('/thumb', '')
                parts = img_url.split('/')
                img_url = '/'.join(parts[:-1]) # remove the last part which is the resized name
                results[name] = img_url
            else:
                results[name] = None
        else:
            results[name] = None

with open('game_urls.json', 'w') as f:
    json.dump(results, f, indent=2)
print("Done!")
