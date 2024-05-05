import requests

reponse = requests.get(
    'http://challenge01.root-me.org/web-serveur/ch2/index.php',
    headers={'User-Agent': 'admin'}
    )
 
if reponse.status_code == 200:
    print(reponse.text)
else:
    print('Error')