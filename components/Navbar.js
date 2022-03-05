import Link from 'next/link'

const Navbar = () => {
  return (
    <nav>
      <div>
        <Link href='/'><a>Home</a></Link>
        <Link href='/token-list'><a>Tokens</a></Link>
        <Link href='/about'><a>About</a></Link>
      </div>
    </nav>
  )
}

export default Navbar