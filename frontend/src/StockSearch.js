import React, {useState, useEffect} from 'react';
import axios from 'axios';

function StockSearch() {
  const [params, setParams] = useState({
    apikey: 'B62IP93O6OGM4LCA',
    function: 'SYMBOL_SEARCH',
    keywords: " ",
  })
  const [req, setReq] = useState({
    method: 'GET',
    url: 'http://localhost:8000/api/stocks/',
    params: params
  })
  const [results, setResults] = useState([])

  useEffect(() => {
    axios(req)
      .then(function(response) {
        const srchRes = []
        results.data.bestMatches.map((match, index) =>
          srchRes.push([id: index, symbol: match["1. symbol"])
          console.log(srchRes)
        )
        setResults(srchRes)
      })
      .catch(function (error) {
      // handle error
      console.log(error);
  })
  }, [])
  console.log(results.data)
  return
}

export default StockSearch


/*

to return actualy data:

(

  <div>
  { results.data ?
    <ul>
    Hello
    {results.data.bestMatches.map((match, index) =>
      <li key={index}> {match["1. symbol"]} </li>
    )}

    </ul>
    :
    "Loading"
  }
  </div>
)

*/
