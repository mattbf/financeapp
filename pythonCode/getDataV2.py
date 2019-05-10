# Getting Alpha Vantage data using the alphavantage python package
# from alpha_vantage.timeseries import TimeSeries
# ts = TimeSeries(key='EJ69MPM068NGTJ30', output_format='pandas')
# data, meta_data = ts.get_intraday(
#     symbol='MSFT', interval='1min', outputsize='compact')
# print(data)

# Making request to the Alpha vantage API using the request python package
import json
import requests
import datetime

api_token = 'B62IP93O6OGM4LCA'  # API token from alpha vantage
api_url_base = 'https://www.alphavantage.co/query?'
# ex. function=TIME_SERIES_INTRADAY&symbol=MSFT&interval=5min&apikey=demo'
#  api_url = '{}orgs/{}/repos'.format(api_url_base, username)

# payload = {'key1': 'value1', 'key2': 'value2'}
# r = requests.get('https://httpbin.org/get', params=payload)


def format_data(json, selector):
    newObj = []
    for obj in json.data[selector]:
        for key in obj.key():
            newObj.append({
                'date': datetime.datetime(datetime.strptime(key, '%b %d %Y %I:%M%p')),
                'open': json.data["1. open"],
                'close': json.data["4. close"],
                'volume': json.data["5. volume"],
            })
    return newObj


def get_series_data(symbol, apikey):

    # api_url = '{0}account'.format(api_url_base)
    # outputsize=compact change to full for all data
    # change to TIME_SERIES_DAILY
    parameters = {'function': 'TIME_SERIES_INTRADAY',
                  'symbol': 'MSFT', 'interval': '5min', 'apikey': 'demo'}
    # response = requests.get(api_url_base, params=parameters)

    dailyParams = {
        'symbol': 'MSFT',
        'function': 'TIME_SERIES_INTRADAY',
        'interval': '5min',
        'apikey': 'demo',
    }

    historicParams = {
        'key': 'value',
    }

    dailyData = requests.get(
        'https://www.alphavantage.co/query?',
        params=request.query_params
    )
    dailyFormated = format_data(json.loads(dailyData.content.decode('utf-8')))

    historicData = requests.get(
        'https://www.alphavantage.co/query?',
        params=request.query_params
    )
    historicFormated = format_data(json.loads(historicData.content.decode('utf-8')))

    # Make calcs, categorize time data into slices,
    # add kpis, and package all together

    return Response({'data': json.loads(data.content.decode('utf-8')),
                     'request': {'method': request.method,
                                 'path': request.path,
                                 'params': request.query_params,
                                 },
                     })

    response = requests.get(
        'https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=MSFT&interval=5min&apikey=demo')
    if response.status_code == 200:
        return Response({'data': json.loads(data.content.decode('utf-8')),
                         })
    else:
        return None


data = get_series_data(symbol, apikey)

if data is not None:
    print("Here's your info: ")
    print(data)
    # for k, v in account_info['account'].items():
    #     print('{0}:{1}'.format(k, v))
else:
    print('[!] Request Failed')
