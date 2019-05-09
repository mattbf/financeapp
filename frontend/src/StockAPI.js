import React, {useEffect, useState} from 'react';
import axios from 'axios';
const API_URL = 'http://localhost:8000';

function StockAPI() {
  const [response, setResponse] = useState({
    isLoading: false,
    isError: false,
    isSearch: false,
    results: [],
  })
  const [getRes, setGetRes] = useState({
    isLoading: false,
    isError: false,
    results: [],
  })
  const [chartReq, setChartReq] = useState({
    method: 'GET',
    url: 'http://localhost:8000/api/stocks/',
    params: {
      function: 'TIME_SERIES_INTRADAY',
      symbol: ' ',
      interval: '5min',
      apikey: 'demo',
    },
  })
  const [chartData, setChartData] = useState({
    isLoading: false,
    isReq: false,
    isError: false,
    data: [],
  })
  let newJson = []

  function doPost(req) {
    if (req.params.keywords == " " || null) {
      setResponse({
        isLoading: false,
        isError: false,
        isSearch: true,
        results: [],
      })
      return response
    } else {
      setResponse({
        isLoading: true,
        isError: false,
        isSearch: true,
        results: [],
      })
      axios(req)
        .then(function(response) {
          setResponse({
            isLoading: false,
            isError: false,
            isSearch: true,
            results: response.data,
          })
        })
        .catch(function (error) {
          setResponse({
            isLoading: false,
            isError: true,
            isSearch: true,
            results: [],
          })
        console.log(error);
        })
      }
    }

  const doGet = (req) =>  {

      axios(req)
        .then(function(response) {
          setGetRes({
            isLoading: false,
            isError: false,
            results: response.data,
          })
        })
        .catch(function (error) {
          setGetRes({
            isLoading: false,
            isError: true,
            results: [],
          })
        console.log(error);
        })
    return getRes
  }

  function getChart(symbol) {
    if (symbol == 'RESET') {
      setChartData({
         isLoading: false,
         isReq: false,
         isError: false,
         data: [],
       })
       return
    }
        setChartData({
           isLoading: true,
           isReq: true,
           isError: false,
           data: [],
         })
         axios({
           method: 'GET',
           url: 'http://localhost:8000/api/stocks/',
           params: {
             function: 'TIME_SERIES_INTRADAY',
             symbol: symbol,
             interval: '5min',
             apikey: 'demo',
           },
         })
           .then(function(response) {
             var keys = Object.keys(response.data.data["Time Series (5min)"])
             keys.forEach(function(key){
                 newJson.push({
                   date: new Date(Date.parse(key)),
                   open: response.data.data["Time Series (5min)"][key]["1. open"]
                 })
             });
           }).then(function() {
             setChartData({
               isLoading: false,
               isReq: true,
               isError: false,
               data: newJson
             })
           })
           .catch(function (error) {
             setChartData({
               isLoading: false,
               isReq: true,
               isError: true,
               data: [],
             })
           console.log(error);
           console.log(chartData)
       })
  }


    return {response, doPost, doGet, chartData, getChart}

}

export default StockAPI
