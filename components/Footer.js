import ActiveLink from './ActiveLink';
import ProductApi from '../pages/api/product';
const productData = ProductApi().json.data;
const Footer = () => {
  return (
    <>
      <div className="footer">
        <div className="footer-title">
          <p className="tit-zh">欢迎联系我们，提取宝贵意见！</p>
          <p className="tit-en">Welcome to contact us, take valuable advice!</p>
        </div>
        <div className="footer-link-wrap">
          {productData && productData.map((item) => {
            return (
              <ul className="footer-link-item">
                <li>
                  <a className="footer-link tit">{item.title}</a>
                </li>
                {item && item.children.map((product) => {
                  return (
                    <li>
                     { product.url ? <a href={product.url} className="footer-link" target="_blank">{product.name}</a>
                        : <span className= "footer-link">{product.name}</span>}
                    </li>
                  )
                })}
              </ul>

            )
          })}
        </div>
        <div className="footer-bottom">
        </div>
      </div>
      <style jsx>{`

      .footer{
        background:#000 url('/footer-bg.png') no-repeat center;
        width: 100vw;
        height: 100vh;
        color: #fff;
        position: relative;
      }
      .footer-title {
        padding: 25.6vh 0 14.3vh;
        text-align: center;
      }
      .footer-title p.tit-zh {
        margin-bottom: 1.9vh;
        font-size: 2vw;
      }
       .footer-title p.tit-en {
         font-size: 1vw;
       }
       .footer-link-wrap{
         display: flex;
         justify-content: space-between;
         padding: 0 21.6vw;
       }
       .footer-link-wrap li {
         margin-bottom: 3vh;
       }
      .footer-bottom {
        position: absolute;
        bottom: 0;
        left: 0;
        border: 1px solid #333;
        padding-top: 3.7vh;
        width: 100vw;
        height: 11.6vh;
        text-align: center;
      }
      .footer-bottom p {
        margin-bottom: 0.9vh;
      }
      .footer-link-item li .footer-link.tit {
        color: #fff;
        font-size: 0.8vw;
      }
      .footer-link-item li .footer-link {
        color: #C0C0C0;
        font-size:0.7vw;
      }
    `}</style>
    </>
  )
}

export default Footer
