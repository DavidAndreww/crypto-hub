import Link from 'next/link'

const coinList = () => {
  return (
    <ul>
      <Link href='/tokens/bitcoin'><li><a>Bitcoin</a></li></Link>
      <Link href='/tokens/litecoin'><li><a>Litecoin</a></li></Link>
      <Link href='/tokens/ethereum'><li><a>Ethereum</a></li></Link>
      <Link href='/tokens/solana'><li><a>Solana</a></li></Link>
      <Link href='/tokens/cardano'><li><a>Cardano</a></li></Link>
    </ul>
  )
}

export default coinList