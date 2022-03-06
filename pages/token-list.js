import Link from 'next/link'
import Head from 'next/head'
import { useState, useEffect } from 'react'

const fetchData = async () => {
  const response = await fetch('https://api.livecoinwatch.com/coins/list', {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      'x-api-key': '38be70ee-0c30-4d17-bdf1-90027079cb4f'
    },
    body: JSON.stringify({
      currency: 'USD',
      sort: 'rank',
      order: 'ascending',
      meta: true
    })
  })
  const json = await response.json()
  return json
}


const coinList = () => {
  const [coinList, setCoinList] = useState([])

  useEffect(async () => {
    const coins = await fetchData()
    setCoinList(coins)
  }, [])

  return (
    <>
      <Head>
        <title>CryptoHub | Tokens</title> 
      </Head>
      {coinList.length === 0 ? (
        <h3>loading...</h3>
      ) : (
        <>
          {coinList.map(coin => (
            <Link href={`tokens/${coin.name}`} key={coin.name}>
              <div className='coin-overview' >
                <img src={coin.png32} />
                <h2 className='coin-link'>{coin.name}</h2>
                <h4>Current rate: { new Intl.NumberFormat('en-US', {style: 'currency', currency: 'USD'}).format(coin.rate) }</h4>
              </div>
            </Link>
          ))}          
        </>
      )}
    </>
  )
}

export default coinList