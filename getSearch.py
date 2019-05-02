import json
import requests

api_token = 'B62IP93O6OGM4LCA'
api_url_base = 'https://www.alphavantage.co/query?'

parameters = {'function': 'SYMBOL_SEARCH',
              'keywords': 'Micro', 'apikey': 'demo'}

req1 = {
    'url': api_url_base,
    'params': parameters,
}


def get_search(request):

    response = requests.get(request['url'], params=request['params'])

    if response.status_code == 200:
        return json.loads(response.content.decode('utf-8'))
    else:
        return None


data = get_search(req1)

if data is not None:
    print("Here's your info: ")
    print(data)
    # for k, v in account_info['account'].items():
    #     print('{0}:{1}'.format(k, v))
else:
    print('[!] Request Failed')
