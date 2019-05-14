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
  // const [chartReq, setChartReq] = useState({
  //   method: 'GET',
  //   url: 'http://localhost:8000/api/stocks/',
  //   params: {
  //     function: 'TIME_SERIES_INTRADAY',
  //     symbol: ' ',
  //     interval: '5min',
  //     apikey: 'demo',
  //   },
  // })
  const [chartDailyData, setchartDailyData] = useState({
    isLoading: false,
    isReq: false,
    isError: false,
    data: [],
  })
  const [chartData, setChartData] = useState({
    isLoading: false,
    isReq: false,
    isError: false,
    data: [],
  })
  const [symbolInfo, setSymbolInfo] = useState({
    isLoading: false,
    isReq: false,
    isError: false,
    data: [],
  })
  const [symbolStats, setSymbolStats] = useState({
    isLoading: false,
    isReq: false,
    isError: false,
    data: [],
  })
  let newDailyJson = []
  let newJson = []

  //General posting to api
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
          console.log(response)
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

  //General getting data from api
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

  //Get the intra day stok price for one stock
  function getDailyChart(symbol) {
    if (symbol == 'RESET') {
      setchartDailyData({
         isLoading: false,
         isReq: false,
         isError: false,
         data: [],
       })
       return
    }
        setchartDailyData({
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
                 newDailyJson.push({
                   date: new Date(Date.parse(key)),
                   open: response.data.data["Time Series (5min)"][key]["1. open"]
                 })
             });
           }).then(function() {
             setchartDailyData({
               isLoading: false,
               isReq: true,
               isError: false,
               data: newDailyJson
             })
           })
           .catch(function (error) {
             setchartDailyData({
               isLoading: false,
               isReq: true,
               isError: true,
               data: [],
             })
           console.log(error);
       })
  }

  //Get historic stock price for one stock
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
             function: 'TIME_SERIES_DAILY',
             symbol: symbol,
             apikey: 'demo',
           },
         })
           .then(function(response) {
             var keys = Object.keys(response.data.data["Time Series (Daily)"])
             keys.forEach(function(key){
                 newJson.push({
                   date: new Date(Date.parse(key)),
                   open: response.data.data["Time Series (Daily)"][key]["1. open"]
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
       })
  }


  // get stock info for one SYMBOL
  function getSymbolInfo(symbol, apikey) {
    axios({
      method: 'GET',
      url: 'http://localhost:8000/api/stocks/symbol/',
      params: {
        symbol: symbol,
        apikey: apikey,
      },
    })
    .then(function(response) {
      console.log(response)
      setSymbolInfo({
        isLoading: false,
        isError: false,
        results: response.data,
      })
    })
      .catch(function (error) {
        setSymbolInfo({
          isLoading: false,
          isError: true,
          results: [],
        })
      console.log(error);
      })
    return
  }

  // get kpis
  function getSymbolStats(symbol, apikey) {
    setSymbolStats({
      isLoading: true,
      isError: false,
      results: [],
    })
    axios({
      method: 'GET',
      url: 'http://localhost:8000/api/stocks/symbol/kpis/',
      params: {
        symbol: symbol,
        apikey: apikey,
      },
    })
    .then(function(response) {
      console.log(response)
      setSymbolStats({
        isLoading: false,
        isError: false,
        results: response.data,
      })
    })
      .catch(function (error) {
        setSymbolStats({
          isLoading: false,
          isError: true,
          results: [],
        })
      console.log(error);
      })
    return
  }

    return {
      response,
      doPost,
      doGet,
      chartDailyData,
      getDailyChart,
      getChart,
      chartData,
      symbolInfo,
      getSymbolInfo,
      getSymbolStats,
      symbolStats,
    }

}

export default StockAPI
