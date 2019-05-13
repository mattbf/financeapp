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
            'volume': json[selector][key]["5. volume"],
        })
    return newObj


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

        SMAdata = requests.get(
            'https://www.alphavantage.co/query?',
            params={
                'symbol': request.query_params.get('symbol'),
                'function': 'TIME_SERIES_DAILY',
                'apikey': request.query_params.get('apikey'),
                'outputsize': 'full',
            },
        )

        kpidataFormated = format_data(
            json.loads(Data.content.decode('utf-8')),
            "Time Series (Daily)",
            '%Y-%m-%d'
        )

        return Response({
                        'kpis': {
                            '52High': 120,
                            '52Low': dailyFormated[-1],
                            'PE': 5,
                            'MarketCap': 5,
                            'SMA': 5,
                        },
                        'request': {'method': request.method,
                                    'path': request.path,
                                    'params': request.query_params,
                                    },
                        })
