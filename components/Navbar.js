import Link from 'next/link'

const Navbar = () => {
  return (
    <nav>
        <Link href='/'><h2 className='logo'>CryptoHub</h2></Link>
        <Link href='/'><a>Home</a></Link>
        <Link href='/token-list'><a>Tokens</a></Link>
        <Link href='/about'><a>About</a></Link>
    </nav>
  )
}

export default Navbar