from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status
import json
import requests

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
            'key': 'value',
        }

        historicParams = {
            'key': 'value',
        }

        dailyData = requests.get(
            'https://www.alphavantage.co/query?',
            params=request.query_params
        )

        historicData = requests.get(
            'https://www.alphavantage.co/query?',
            params=request.query_params
        )

        # Make calcs, categorize time data into slices,
        # add kpis, and package all together

        return Response({'data': json.loads(data.content.decode('utf-8')),
                         'request': {'method': request.method,
                                     'path': request.path,
                                     'params': request.query_params,
                                     },
                         })

# requests.get(
#     'https://www.alphavantage.co/query?',
#     params=request.query_params
# )
