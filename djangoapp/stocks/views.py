from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status
import json
import requests
from datetime import datetime
import array as arr

# from .models import Customer
# from .serializers import *


@api_view(['GET', 'POST'])
def get_stocks(request):
    """
 Make any/custom request to api
 """
    if request.method == 'GET':

        data = requests.get(
            'https://www.alphavantage.co/query?',
            params=request.query_params
        )

        return Response({'data': json.loads(data.content.decode('utf-8')),
                         'request': {'method': request.method,
                                     'path': request.path,
                                     'params': request.query_params,
                                     },
                         })


@api_view(['GET', 'POST'])
def get_quote(request):
    """
 gte quote
 """
    if request.method == 'GET':

        data = requests.get(
            'https://www.alphavantage.co/query?',
            params=request.query_params
        )

        dataFormated = format_quote(
            json.loads(data.content.decode('utf-8')),
            "Global Quote",
        )

        return Response({'data': dataFormated,
                         'request': {'method': request.method,
                                     'path': request.path,
                                     'params': request.query_params,
                                     },
                         })


@api_view(['GET', 'POST'])
def get_sector(request):
    """
 gte quote
 """
    frameDict = {
        "realtime": 'Rank A: Real-Time Performance',
        "day": 'Rank B: 1 Day Performance',
        "fiveDay": 'Rank C: 5 Day Performance',
        "month": 'Rank D: 1 Month Performance',
        "threeMonth": 'Rank E: 3 Month Performance',
        "year": 'Rank G: 1 Year Performance',
        "YTD": 'Rank F: Year-to-Date (YTD) Performance',
        "threeYear": 'Rank H: 3 Year Performance',
        "fiveYear": 'Rank I: 5 Year Performance',
        "tenYear": 'Rank J: 10 Year Performance',
    }

    if request.method == 'GET':

        data = requests.get(
            'https://www.alphavantage.co/query?',
            params=request.query_params
        )

        dataFormated = format_sectors(
            json.loads(data.content.decode('utf-8')),
            frameDict[request.query_params.get('frame')]
        )

        return Response({'data': dataFormated,
                         'request': {'method': request.method,
                                     'path': request.path,
                                     'params': request.query_params,
                                     },
                         })


def format_sectors(json, selector):
        # print(json[selector])
    newObj = []
    sector = json[selector]
    for key, value in sector:
        if (float(value) < 0):
            pos = False
        else:
            pos = True
        newObj.append({
            'sector': key,
            'change': value,
            'isPos': pos,
        })

    return newObj


def format_quote(json, selector):
        # print(json[selector])
    quote = json[selector]
    if (float(json[selector]["09. change"]) < 0):
        pos = False
    else:
        pos = True

    # print(key)
    newObj = {
        'LTD': quote["07. latest trading day"],
        'open': quote["02. open"],
        'symbol': quote["01. symbol"],
        'high': quote["03. high"],
        'low': quote["04. low"],
        'volume': quote["06. volume"],
        'price': quote["05. price"],
        'change': quote["09. change"],
        'percentChange': quote["10. change percent"],
        'isPos': pos,
    }
    return newObj


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
            'high': json[selector][key]["2. high"],
            'low': json[selector][key]["3. low"],
            'volume': json[selector][key]["5. volume"],
        })
    return newObj[::-1]


@api_view(['GET', 'POST'])
def get_stock_info(request):
    """
 Get stock info.
 - pass the symbol as a parameter
 - make two requests (One to INTRADAY and one to DAILY)
 - Reformat data into correct output
 - Create 'data' package with Day, Week, Month, 6 months, YTD, 1 Year, 5 Year, MAX
 - add 'KPIs' to package
 """
    if request.method == 'GET':

        dailyParams = {
            'symbol': request.query_params.get('symbol'),
            'function': 'TIME_SERIES_INTRADAY',
            'interval': '30min',
            'apikey': request.query_params.get('apikey'),
            'outputsize': 'full',
        }

        historicParams = {
            'symbol': request.query_params.get('symbol'),  # request.query_params.symbol
            'function': 'TIME_SERIES_DAILY',
            'apikey': request.query_params.get('apikey'),
            'outputsize': 'full',
        }

        dailyData = requests.get(
            'https://www.alphavantage.co/query?',
            params=dailyParams,
        )
        dailyFormated = format_data(
            json.loads(dailyData.content.decode('utf-8')),
            "Time Series (30min)",
            '%H:%M:%S'
        )

        historicData = requests.get(
            'https://www.alphavantage.co/query?',
            params=historicParams,
        )
        historicFormated = format_data(
            json.loads(historicData.content.decode('utf-8')),
            "Time Series (Daily)",
            '%Y-%m-%d'
        )

        # historicOrdered = arr.array('i', historicFormated)
        # Make calcs, categorize time data into slices,
        # add kpis, and package all together

        # Response = {
        #     'data': {
        #         'daily': dailyFormated,
        #         'historic': historicFormated,
        #     },
        #     'kpis': {
        #         'PE': 5,
        #     },
        #     'request': {'method': request.method,
        #                 'path': request.path,
        #                 'params': request.query_params,
        #                 },
        #
        # }

    if historicData.status_code == 200 and dailyData.status_code == 200:
        return Response({
            'daily': dailyFormated,
            'historic': {
                'fiveDays': historicFormated[:5],
                'month':  historicFormated[:30],
                'sixMonths':  historicFormated[:180],
                'year':  historicFormated[:365],
                'fiveYears':  historicFormated[:1825],
                'max': historicFormated,
            },
            'kpis': {
                'open': 120,
                'close': dailyFormated[-1],
                'PE': 5,
            },
            'request': {'method': request.method,
                        'path': request.path,
                        'params': request.query_params,
                        },

        })
    else:
        return None


@api_view(['GET', 'POST'])
def get_stock_kpis(request):

    if request.method == 'GET':

        Params = {
            'symbol': request.query_params.get('symbol'),
            'function': 'TIME_SERIES_DAILY',
            'apikey': request.query_params.get('apikey'),
            'outputsize': 'full',
        }

        Data = requests.get(
            'https://www.alphavantage.co/query?',
            params=Params,
        )

        dataFormated = format_data(
            json.loads(Data.content.decode('utf-8')),
            "Time Series (Daily)",
            '%Y-%m-%d'
        )

        # WH = max(obj['high'] for obj in dataFormated)
        Larr = []
        Harr = []
        for obj in dataFormated:
            Harr.append(obj['high'])
            Harr = list(map(float, Harr[:365]))
        WH = max(Harr)
        for obj in dataFormated:
            Larr.append(obj['low'])
            Larr = list(map(float, Larr[:365]))
        WL = min(Larr)

        # SMAdata = requests.get(
        #     'https://www.alphavantage.co/query?',
        #     params={
        #         'symbol': request.query_params.get('symbol'),
        #         'function': 'TIME_SERIES_DAILY',
        #         'apikey': request.query_params.get('apikey'),
        #         'outputsize': 'full',
        #     },
        # )
        #
        # kpidataFormated = format_data(
        #     json.loads(Data.content.decode('utf-8')),
        #     "Time Series (Daily)",
        #     '%Y-%m-%d'
        # )

        # 'PE': 5.23,
        # 'MarketCap': 10190,
        # 'SMA': 100,

        if Data.status_code == 200:
            return Response({
                            'kpis': [
                                {
                                    'symbol': request.query_params.get('symbol'),
                                    'name': '52 Week High',
                                    'value': WH,
                                    'prefix': '',
                                    'suffix': '',
                                    'tooltip': 'The highest stock value in the past 52 weeks',
                                    'trend': False,
                                },
                                {
                                    'symbol': request.query_params.get('symbol'),
                                    'name': '52 Week Low',
                                    'value': WL,
                                    'prefix': '',
                                    'suffix': '',
                                    'tooltip': 'The lowest stock value in the past 52 weeks',
                                    'trend': False,
                                },
                                {
                                    'symbol': request.query_params.get('symbol'),
                                    'name': 'Test KPI',
                                    'value': 1000.79,
                                    'prefix': '',
                                    'suffix': 'B',
                                    'tooltip': 'Test kpi with tooltip',
                                    'trend': True,
                                },
                            ],
                            'request': {'method': request.method,
                                        'path': request.path,
                                        'params': request.query_params,
                                        },
                            })
        else:
            return Response({
                'request': {'method': request.method,
                            'path': request.path,
                            'params': request.query_params,
                            },
            })


@api_view(['GET', 'POST'])
def get_stock_graph(request):

    if request.method == 'GET':

        frameDict = {
            "fiveDays": slice(0, 5),
            "month": slice(0, 30),
            "sixMonths": slice(0, 180),
            "year": slice(0, 365),
            "fiveYears": slice(0, 1825),
            "max": slice(0, -1),
        }
        # a = [1, 2, 3, 4]
        # print(a[mapDict["first"]])

        if (request.query_params.get('function') == 'TIME_SERIES_INTRADAY'):
            Params = {
                'symbol': request.query_params.get('symbol'),
                'function': request.query_params.get('function'),
                'interval': '30min',
                'apikey': request.query_params.get('apikey'),
                'outputsize': 'full',
            }

            Data = requests.get(
                'https://www.alphavantage.co/query?',
                params=Params,
            )
            dataFormated = format_data(
                json.loads(Data.content.decode('utf-8')),
                "Time Series (30min)",
                '%Y-%m-%d'
            )
        else:
            Params = {
                'symbol': request.query_params.get('symbol'),
                'function': request.query_params.get('function'),
                'apikey': request.query_params.get('apikey'),
                'outputsize': 'full',
            }

            Data = requests.get(
                'https://www.alphavantage.co/query?',
                params=Params,
            )
            dataFormated = format_data(
                json.loads(Data.content.decode('utf-8')),
                "Time Series (Daily)",
                '%Y-%m-%d'
            )[frameDict[request.query_params.get('frame')]]

        if Data.status_code == 200:
            return Response({
                            'data': dataFormated,
                            'request': {'method': request.method,
                                        'path': request.path,
                                        'params': request.query_params,
                                        },
                            })
        else:
            return Response({
                'request': {'method': request.method,
                            'path': request.path,
                            'params': request.query_params,
                            },
            })
