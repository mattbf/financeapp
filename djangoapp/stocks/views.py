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
 Get stock info.
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

# requests.get(
#     'https://www.alphavantage.co/query?',
#     params=request.query_params
# )
