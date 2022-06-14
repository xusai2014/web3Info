import React, { useEffect, useState } from "react";
import { navList } from '../config/autoconfig'

const Auto = () => {

    const [pageValue, setPageVale] = useState(0)

    let value = navList[pageValue].value;

    return (
        <div className='box-shell'>
            <div className='box-shell-left'>
                <div className="left-title">
                    AUTOHOME-CLI
                </div>
                {
                    navList.map((item, i) => {
                        let cls = i === pageValue ? 'left-nav-active' : ''
                        return (
                            <div
                                key={`nav-item-${i}`}
                                onClick={setPageVale.bind(null, i)}
                                className={`${cls} left-nav`}
                            >
                                {item.name}
                            </div>
                        )
                    })
                }
            </div>

            <div
                className="box-shell-content"
                dangerouslySetInnerHTML={{ __html: value }}
            >
            </div>
            <style jsx global>{`
               .box-shell-content > h1 {
                    border-bottom: 1px solid #e7e7e7;
                    line-height: 36px;
                    margin-bottom: 20px;
                    font-size: 20px;
               }
                          
                .box-shell-content > p {
                    line-height: 28px;
                    font-size: 14px;
                    text-indent: 28px;
                    margin-bottom: 20px;
                }

                .box-shell-content > pre {
                    line-height: 28px;
                    font-size: 14px;
                    text-indent: 28px;
                    background: #e7e7e7;
                    margin-bottom: 20px;
                }

                .box-shell-content > p > a {
                    color: #1890ff;
                }
            `}</style>

            <style jsx>{`
              .box-shell {
                display: flex;
                height: calc(100vh - 60px);
                box-sizing: border-box;
                overflow: hidden;
                margin-top: 60px;
              }
              
              .box-shell-left {
                width: 280px;
                border-right: 1px solid #d7d7d7;
                background: #f7f7f7;
              }
              
              .box-shell-content {
                flex: 1;
                height: 100%;
                overflow: auto;
                padding: 20px;
              }

              .left-title {
                font-size: 22px;
                font-weight: 600;
                padding: 20px;
                border-bottom: 1px solid #999;
                margin-bottom: 20px;
            }      
            .left-nav {
                line-height: 28px;
                padding-left: 20px;
                padding-bottom: 10px;
                cursor: pointer;
            
            }
            .left-nav:hover {
                color: #1890ff;
            }
            .left-nav-active {
                color: #1890ff;
            }
            `}
            </style>

        </div>
    )
}

export default Auto
