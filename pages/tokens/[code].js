import { getAllCoins, getSingleCoin, getSingleCoinHistory } from "../../api/coinRequests"
import moment from "moment"
import { parseTwoDigitYear } from "moment"

const TokenDetails = ({ coinDetails, coinHx }) => {
  // console.log(coinDetails)
  // console.log(coinHx)

  const coinAge = (days) => {
    let daysRemaining = days
    let age = {
      year: { value: 0, range: 365 },
      month: { value: 0, range: 30 },
      day: { value: 0, range: 1 }
    }

    for (let timeFrame in age) {
      age[timeFrame]['value'] = Math.floor(daysRemaining / age[timeFrame]['range'])
      daysRemaining = daysRemaining - (age[timeFrame]['range'] * age[timeFrame]['value'])
    }

    return `
    ${age.year.value} 
    ${age.year.value > 1 ? 'years' : 'year'} 
    ${age.month.value} 
    ${age.month.value > 1 ? 'months' : 'month'} 
    ${age.day.value} 
    ${age.day.value > 1 ? 'days' : 'day'}`
  }
  
  return (
    <div className='coinDetails'>
      <img src={coinDetails.png32} />
      <h1>{coinDetails.name}</h1>
      <h4>ATH: {new Intl.NumberFormat('en-US', {style: 'currency', currency: 'USD'}).format(coinDetails.allTimeHighUSD)}</h4>
      <h4>Exchanges: {coinHx.exchanges}</h4>
      <h4>Age: {coinAge(coinDetails.age)}</h4>
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
