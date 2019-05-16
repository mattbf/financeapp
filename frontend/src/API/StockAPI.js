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
  const [quote, setQuote] = useState({
    isLoading: false,
    isError: false,
    data: [],
  })
  const [sectors, setSectors] = useState({
    isLoading: false,
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

  //get stock quote
  function getQuote(symbol, apikey) {
    console.log("symbol in api: " + symbol)
    axios({
      method: 'GET',
      url: 'http://localhost:8000/api/stocks/quote/',
      params: {
        function: 'GLOBAL_QUOTE',
        symbol: symbol.symbol,
        apikey: apikey,
      },
    })
      .then(function(response) {
          setQuote({
            isLoading: false,
            isError: false,
            data: response.data,
          })
        })
        .catch(function (error) {
          setQuote({
            isLoading: false,
            isError: true,
            data: [],
          })
        console.log(error);
        })
  }

  //get sector performance
  function getSectors(frame, apikey) {
    console.log("frame in api: " + frame)
    setSectors({
      isLoading: true,
      isError: false,
      data: response.data,
    })
    axios({
      method: 'GET',
      url: 'http://localhost:8000/api/sector/',
      params: {
        function: 'SECTOR',
        apikey: apikey,
        frame: frame,
      },
    })
      .then(function(response) {
          setSectors({
            isLoading: false,
            isError: false,
            data: response.data,
          })
        })
        .catch(function (error) {
          setSectors({
            isLoading: false,
            isError: true,
            data: [],
          })
        console.log(error);
        })
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
  function getChart(config) {
    if (config.symbol == 'RESET') {
      setChartData({
         isLoading: false,
         isReq: false,
         isError: false,
         data: [],
       })
       return
    }
    if (config == {}) {
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
           url: 'http://localhost:8000/api/stocks/symbol/graph/',
           params: {
             function: config.timeFunc,
             symbol: config.symbol,
             apikey: config.apikey,
             frame: config.frame,
           },
         }).then(function(response) {
             setChartData({
               isLoading: false,
               isReq: true,
               isError: false,
               data: response.data
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
      getQuote,
      quote,
      getSectors,
      sectors
    }

}

export default StockAPI
