import Link from 'next/link'
import Head from 'next/head'
// styles are imported into JSX elements from corresponding css module
import styles from '../styles/Token-List.module.css'

const coinList = ({ json }) => {

  return (
    <>
      <Head>
        <title>CryptoHub | Tokens</title> 
      </Head>
      {json.length === 0 ? (
        <h3>loading...</h3>
      ) : (
        <>
          {json.map(coin => (
            <Link href={`tokens/${coin.name}`} key={coin.name}>
              <div className={styles.coinOverview} >
                <img src={coin.png32} />
                <h2 className={styles.coinLink}>{coin.name}</h2>
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

// get static props runs before page loads - json is returned as props to component
export const getStaticProps = async () => {
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

  return {
    props: {
      json
    }
  }
}