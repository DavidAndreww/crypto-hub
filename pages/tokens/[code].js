import { getAllCoins, getSingleCoin, getSingleCoinHistory } from "../../api/coinRequests"

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
 const json = await getAllCoins()

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

  const coinDetails = await getSingleCoin(name)
  const coinHx = await getSingleCoinHistory(name)

  return {
    props: {
      coinDetails,
      coinHx
    }
  }
}
