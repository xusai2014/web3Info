// @ts-nocheck
import React, { useState } from 'react';
import ActiveLink from './ActiveLink';
import ProductApi from '../pages/api/product';
const productData = ProductApi().json.data;
const Nav = () => {
  const [visable, setVisable] = useState(false);
  const dropView = () => {
    setVisable(true);
  }
  const dropNone = () => {
    setVisable(false);
  }
  return (
    <nav>
      <div className="header">
        <h1 className="logo">
          <a href="#/">
            <img width="175" src="/logo.svg"/>
          </a>
        </h1>
        <div className="drop"  onMouseMove={dropView}>
          <div className="drop-title">
            <span>资料列表</span>
          </div>
          <div className="drop-down" onMouseLeave={dropNone} style={visable === true ? { 'height': 'auto' } : { 'height': '0' }} >
            <div className="drop-content">
                {productData && productData.map((item, i) => { 
                  return (
                    <div className="drop-content-item">
                      <div className="drop-content-tit">{item.title}</div>
                      <div className="drop-content-name">
                        {item && item.children.map((product, j) => { 
                          return (
                           <a href={product.url} target="_blank">{product && product.name}</a>
                          )
                        })}
                      </div>
                    </div>
                  )
                })}
              </div>
          </div>
        </div>
        <ul className="nav">
          <li>
            <ActiveLink activeClassName="active" href="/">
              <a className="nav-link">首页</a>
            </ActiveLink>
          </li>
          <li>
            <ActiveLink href="/#">
              <a className="nav-link">产品介绍</a>
            </ActiveLink>
          </li>
          <li>
            <ActiveLink href="/#">
              <a className="nav-link">团队风采</a>
            </ActiveLink>
          </li>
          <li>
            <ActiveLink href="/#">
              <a className="nav-link">联系我们</a>
            </ActiveLink>
          </li>
          <li>
            <ActiveLink href="/#">
              <a className="nav-link">关于我们</a>
            </ActiveLink>
          </li>
        </ul>
      </div>
      <style jsx>{`
      .header {
          position: fixed;
          height: 60px;
          background: rgba(0,0,0,.8);
          z-index: 2;
          font-size: 14px;
          top: 0;
          width: 100%;
          color: #fff;
        }
        .header .logo {
          float: left;
          margin: -32px 0px;
        }
        .header .logo img {
          float: left;
        }
      .nav {
        float: left;
        // margin-left: 3.1vw;
        font-size: 14px;
        color: #fff;
      }
      .nav li {
        position: relative;
        display: block;
        float: left;
        margin-left: 4.5rem;
        text-align: center;
      }
      .nav-link {
        text-decoration: none;
        display: block;
        height: 60px;
        line-height: 60px;
      }
      .active {
        color: #fff;
      }
      .drop {
        display: inline-block;
        float: left;
        padding-top: 15px;
        width: 12vw;
        margin-left: 2.6vw;
        position: relative;
      }
      .drop .drop-title {
        background: transparent;
        border: 1px solid #4C4C4C;
        height: 32px;
        color: #999;
        border-radius: 3px;
        position: relative;
        line-height: 30px;
        padding: 0 10px;
        cursor: pointer;
      }
      .drop .drop-title:after {
        content: "";
        display: block;
        position: absolute;
        top: 12px;
        right: 12px;
        width: 0;
        height: 0;
        border-right: 5px solid transparent;
        border-left: 5px solid transparent;
        border-top: 5px solid #666;
      }
      .drop .drop-down {
        position: fixed;
        left: 0;
        right: 0;
        top: 59px;
        background:rgba(0,0,0,.74);
        z-index: -1;
        transition: all .3s;
        overflow: hidden;
      }
      .drop .drop-down .drop-content {
        padding:1vw 0 1vw 7.5vw;
      }
       .drop .drop-down .drop-content-tit {
        width:10vw;
        text-align: right;
      }
      .drop .drop-down .drop-content .drop-content-item{
        display: flex;
        margin-bottom: 1.7vw;
      }
      .drop .drop-down .drop-content .drop-content-item .drop-content-name{
        margin-left: 2vw;
        // width: 608px;
      }
      .drop-content-name a,.drop-content-name span {
        display: inline-block;
        // width: 86px;
        margin-right: 2vw;
        text-align: left;
        color: #999;
      }
    `}</style>
    </nav>)

}

export default Nav
