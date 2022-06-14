// @ts-nocheck
import Pagination from '../components/Pagination'
import BannerPoint from '../components/BannerPoint'
import { useEffect, useRef, useState } from "react";
import ViewPager from './ViewPager';
import React from "react";
const Banner = (props) => {
    const ref = useRef(null);
    const [activeIndex, setActiveIndex] = useState(0);
    return (
        <>
            <div className="banner">
                <div className="img-wrap">
                    <ViewPager pages={[
                        '/home-banner-1.png',
                        '/home-banner-2.png',
                        '/home-banner-3.png',
                    ]}
                        setActiveIndex={setActiveIndex}
                    />
                </div>
                <div className="text-wrap">
                    {
                        [{
                            title: '',
                            des: '实时 · 智能 · 营销数据平台'
                        }, {
                            title: '',
                            des: '"'
                        }, {
                            title: '高效的流量变现工具',
                            des: '结合流量特点，给各BU变现进行精准赋能'
                        }].map((v, k) => {
                            const { title, des } = v;
                            return <div style={{ display: activeIndex == k ? 'block' : 'none',marginRight: [1,2].includes(k) ? '-3.1vw': '0' }}>
                                <p className="text-tit">{title}</p>
                                <p className="text-des">{des}</p>
                            </div>
                        })
                    }


                </div>

                <BannerPoint activeIndex={activeIndex} />
                <Pagination num={1} />
            </div>

            <style jsx>{`

      .banner{
        width: 100vw;
        height:100vh;
        color: #fff;
        background: #000;
        position: relative;

      }
      .banner .img-wrap {
          width: 100vw;
          height:100vh;
          line-height: 0;
      }
      .banner .img-wrap img {
          width: 100vw;
      }
      .text-wrap{
          position: absolute;
          text-align: center;
          top:42vh;
          right: 20vw;
      }
      .text-wrap .text-tit {
          font-size: 2vw;
      }
      .text-wrap .text-des {
           font-size: 0.9vw;
          line-height: 1.65vw;
          margin-top: 0.8vw;
          width:23.65vw;
          text-align:center;
      }
      .arrows {
          position: absolute;
          width: 100vw;
          bottom:42.5vw;
          left: 0;
          text-align: center;
          padding-left: 85vw;
      }
      .arrows .arrow-left {
          margin-right:85vw;
      }
      .arrows .arrow-left, arrows .arrow-right {
          width: 30vw;
          height: 30vw;
      }
      .arrows .arrow-left img, arrows .arrow-right img{
          width: 30vw;
          height: 30vw;
      }
    `}</style>
        </>
    )
}

export default Banner
