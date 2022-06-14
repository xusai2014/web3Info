//@ts-nocheck
import Pagination from '../components/Pagination'
import BannerPoint from '../components/BannerPoint'
import DetailButton from '../components/DetailButton'
import { useEffect } from "react";
import { useSpring, animated, useTrail } from 'react-spring';
const Prophet = (props) => {

    const { setAnimateFunc, setRollbackFunc } = props;
    useEffect(() => {
        setAnimateFunc([
            () => setTrail({ opacity: 1 })

        ])
        setRollbackFunc({ opacity: 0 })
    }, []);
    const [trail, setTrail] = useTrail(4, () => ({ opacity: 0 }));

    return (
        <>
            <div className="prophet">
                <div className="flex-wrap">
                    <div className="text-wrap">
                        <animated.p
                            style={{
                                fontSize: '2vw',
                                opacity: trail[0].opacity.interpolate(x => x)
                            }}
                            className={"text-tit"}>先知·先觉·先行</animated.p>
                        <animated.p
                            style={{
                                fontSize: '0.9vw',
                                lineHeight: '1.75vw',
                                marginTop: '0.8vw',
                                opacity: trail[1].opacity.interpolate(x => x)
                            }}
                            className="text-des">
                            实时 · 智能 · 营销数据平台提供<br />
                        一体化营销闭环解决方案，为车企研发、营<br />
                        销、服务赋能
                        </animated.p>
                        <animated.div
                            style={{ opacity: trail[2].opacity.interpolate(x => x) }}
                        ><DetailButton href="https://bigdata.autohome.com.cn/OEMSolution/assert/#/" /></animated.div>
                    </div>
                    <div className="img-wrap">
                        <div className="window">
                            <animated.img
                                style={{
                                    width: '43vw',
                                    opacity: trail[3].opacity.interpolate(x => x)
                                }}
                                src="/prophet-window.png" />
                        </div>
                    </div>
                </div>
                {/* <BannerPoint /> */}
                <Pagination num={3} />
            </div>

            <style jsx>{`

      .prophet{
        width: 100vw;
        height: 100vh;
        color: #fff;
        position: relative;
        background:#000 url('/prophet-bg.png') no-repeat center;
        background-size: cover
      }
      .flex-wrap{
          display: flex;
          height: 100vh;
        align-items: center;
        justify-content: center;
      }
      .prophet .img-wrap {

      }
      .prophet .img-wrap .window {
          width: 38.1vw

      }
     .prophet .img-wrap .window img {
           width: 38.1vw
     }
      .text-wrap {
          text-align: center;
          p:nth-child(1){
              font-size: 2vw;
          }
          p:nth-child(2){
              font-size: 0.9vw;
              line-height: 1.75vw;
              margin-top: 0.8vw;
          }
      }


    `}</style>
        </>
    )
}

export default Prophet
