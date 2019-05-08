import React, {useEffect, useState} from 'react';
import axios from 'axios';
const API_URL = 'http://localhost:8000';

function StockAPI() {
  const [response, setResponse] = useState({
    isLoading: false,
    isError: false,
    results: [],
  })

  function doPost(req) {
    setResponse({
      isLoading: true,
      isError: false,
      results: [],
    })
    axios(req)
      .then(function(response) {
        setResponse({
          isLoading: false,
          isError: false,
          results: response.data,
        })
      })
      .catch(function (error) {
        setResponse({
          isLoading: false,
          isError: true,
          results: [],
        })
      console.log(error);
      })
    }

    return {response, doPost}

}

export default StockAPI
