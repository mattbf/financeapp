import React, {useState, useEffect} from 'react';
import axios from 'axios';

function useStockSearch(keywords) {
  const [params, setParams] = useState({
    apikey: 'B62IP93O6OGM4LCA',
    function: 'SYMBOL_SEARCH',
    keywords: keywords,
  })
  const [request, setRequest] = useState({
    method: 'GET',
    url: 'http://localhost:8000/api/stocks/',
    params: params
  })
  const [results, setResults] = useState({
    isLoading: false,
    results: [],
  })

  useEffect(() => {
    setParams({
      apikey: 'B62IP93O6OGM4LCA',
      function: 'SYMBOL_SEARCH',
      keywords: keywords,
    })
    console.log(params.keywords)
    setResults({
      isLoading: true,
      results: []
    })
    axios(request)
      .then(function(response) {
        setResults({
          isLoading: false,
          results: response.data,
        })
      })
      .catch(function (error) {
      // handle error
      console.log(error);
  })
}, [keywords])
  //console.log(results)

  return results
}

export default useStockSearch


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

// const srchRes = []
//
// results.data.bestMatches.map((match, index) =>
//   srchRes.push([id: index, symbol: match["1. symbol"]])
//   console.log(srchRes)
// )
