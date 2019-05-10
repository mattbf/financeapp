import json
import requests
from datetime import datetime

api_token = 'B62IP93O6OGM4LCA'  # API token from alpha vantage
api_url_base = 'https://www.alphavantage.co/query?'


def format_data(json, selector, dateFormat):
    newObj = []
    # print(json[selector])
    for key in json[selector]:
        # print(key)
        newObj.append({
            # (datetime.strptime(key, '%Y-%m-%d %H:%M:%S'))
            # (datetime.strptime(key, dateFormat))
            'date': key,
            'open': json[selector][key]["1. open"],
            'close': json[selector][key]["4. close"],
            'volume': json[selector][key]["5. volume"],
        })
    return newObj


def get_series_data(symbol, apikey):

    dailyParams = {
        'symbol': symbol,
        'function': 'TIME_SERIES_INTRADAY',
        'interval': '5min',
        'apikey': apikey,
        'outputsize': 'compact',
    }

    historicParams = {
        'symbol': symbol,  # request.query_params.symbol
        'function': 'TIME_SERIES_DAILY',
        'apikey': apikey,
        'outputsize': 'compact',
    }

    dailyData = requests.get(
        'https://www.alphavantage.co/query?',
        params=dailyParams
    )
    dailyFormated = format_data(
        json.loads(dailyData.content.decode('utf-8')),
        "Time Series (5min)",
        '%Y-%m-%d %H:%M:%S'
    )

    historicData = requests.get(
        'https://www.alphavantage.co/query?',
        params=historicParams
    )
    historicFormated = format_data(
        json.loads(historicData.content.decode('utf-8')),
        "Time Series (Daily)",
        '%Y-%m-%d'
    )

    # Make calcs, categorize time data into slices,
    # add kpis, and package all together

    # return Response({'data': json.loads(data.content.decode('utf-8')),
    #                  'request': {'method': request.method,
    #                              'path': request.path,
    #                              'params': request.query_params,
    #                              },
    #                  })
    Response = {
        'data': {
            'daily': dailyFormated,
            'historic': historicFormated,
        },
        'kpis': {
            'PE': 5,
        }

    }

    if historicData.status_code == 200 and dailyData.status_code == 200:
        return Response
    else:
        return None


data = get_series_data('MSFT', 'B62IP93O6OGM4LCA')

if data is not None:
    print("Here's your info: ")
    print(data)
    # for k, v in account_info['account'].items():
    #     print('{0}:{1}'.format(k, v))
else:
    print('[!] Request Failed')

    # formating logic
    #
    # for obj in json[selector]:
    #     for key in obj.key():
    #         newObj.append({
    #             'date': datetime.datetime(datetime.strptime(key, '%b %d %Y %I:%M%p')),
    #             'open': json["1. open"],
    #             'close': json["4. close"],
    #             'volume': json["5. volume"],
    #         })
