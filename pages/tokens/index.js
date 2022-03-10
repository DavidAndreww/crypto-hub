import Link from 'next/link'
import Head from 'next/head'
// styles are imported into JSX elements from corresponding css module
import styles from '../../styles/Tokens.module.css'
import { getAllCoins } from '../../api/coinRequests'


const Tokens = ({ json }) => {
  
  const getTotalSupply = (coin) => {
    return coin.maxSupply 
    ? (coin.maxSupply - coin.circulatingSupply).toLocaleString()
    : (coin.totalSupply - coin.circulatingSupply).toLocaleString()
  }
  
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
            <Link href={`tokens/${coin.code}`} key={coin.name}>
              <div className={styles.coinOverview} >
                <div className={styles.coinLogo}>
                  <img src={coin.png32} />
                  <h2 className={styles.coinLink}>{coin.name}</h2>
                </div>
                <div>
                  <h4>Rank {coin.rank}</h4>
                </div>
                <div>
                  <h4>Supply Remaining: {getTotalSupply(coin)}</h4>
                </div>
                <div>
                  <h4>Current rate: { new Intl.NumberFormat('en-US', {style: 'currency', currency: 'USD'}).format(coin.rate) }</h4>
                </div>
              </div>
            </Link>
          ))}          
        </>
      )}
    </>
  )
}

export default Tokens

// get static props runs before page loads - json is returned as props to component
export const getStaticProps = async () => {
  const json = await getAllCoins()

  return {
    props: {
      json
    }
  }
}

