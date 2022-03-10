// the square brackets[.....] around the file name, tells next.js to use dynamic routing for this page

const TokenDetails = ({ coinDetails, coinHx }) => {
  console.log('deets', coinDetails)
  console.log('history', coinHx)
  
  return (
    <div className='coinDetails'>
      <img src={coinDetails.png32} />
      <h1>{coinDetails.name}</h1>
      <h4>ATH: {new Intl.NumberFormat('en-US', {style: 'currency', currency: 'USD'}).format(coinDetails.allTimeHighUSD)}</h4>
      <h4>Exchanges: {coinHx.exchanges}</h4>
    </div>
  )
}

export default TokenDetails;

// builds HTML page for each item returned (uses same API as in previous page)
export const getStaticPaths = async () => {
  const response = await fetch('https://api.livecoinwatch.com/coins/list', {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      'x-api-key': process.env.NEXT_PUBLIC_API_KEY
    },
    body: JSON.stringify({
      currency: 'USD',
      sort: 'rank',
      order: 'ascending',
      meta: true
    })
  })
  const json = await response.json()

  // path for each of these values
  const paths = json.map(token => {
    return {
      params: { code: token.code }
    }
  })

  return {
    paths,
    fallback: false
  }
}

export const getStaticProps = async (context) => {
  const name = context.params.code

  const detailsResponse = await fetch("https://api.livecoinwatch.com/coins/single", {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "x-api-key": process.env.NEXT_PUBLIC_API_KEY,
    },
    body: JSON.stringify({
      currency: "USD",
      code: name,
      meta: true,
    }),
  });

  const hxResponse = await fetch("https://api.livecoinwatch.com/coins/single/history", {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "x-api-key": process.env.NEXT_PUBLIC_API_KEY,
    },
    body: JSON.stringify({
      currency: "USD",
      code: name,
      start: 1617035100000,
      end: 1617035400000,
      meta: true,
    }),
  });


  const coinDetails = await detailsResponse.json()
  const coinHx = await hxResponse.json()

  return {
    props: {
      coinDetails,
      coinHx
    }
  }
}
