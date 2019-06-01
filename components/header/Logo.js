import Link from 'next/link'
import LogoSVG from '../../static/logo.svg'

const Logo = (props) => {
  return(
    <Link href="/"> 
      <a className={props.black ? 'black' : null}>
        <LogoSVG />
        <span>Board</span>
        <style jsx>{`
        a {
          display: flex;
          flex: 0 1 250px;
          align-items: center;
          margin-right: 22px;
          color: #f0f1f7;
          font-weight: 600;
          font-size: 24px;
        }
        a:hover {
          color: #f0f1f7;
        }
        span {
          margin-left: 8px;
        }
        .black {
          flex: 1 0 100%;
          margin: 70px 0;
          justify-content: center;
        }
        .black span {
          color: #1f1f1f;
        }
        `}</style>
      </a>
    </Link>
  )
}

export default Logo