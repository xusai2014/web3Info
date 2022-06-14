//@ts-nocheck
import Pagination from '../components/Pagination'
import BannerPoint from '../components/BannerPoint'
import DetailButton from '../components/DetailButton'
import Cube3D from '../components/Cube3D'
import {useEffect} from "react";
import { useSpring, animated, useTrail } from 'react-spring'
const AutoSales = (props) => {

    const {setAnimateFunc, setRollbackFunc } = props;
    useEffect(()=>{
        setAnimateFunc([
            ()=>setTrail({opacity: 1})

        ])
        setRollbackFunc({opacity: 0})
    },[]);
    const calc = (x, y) => [-(y - window.innerHeight / 2) / 20, (x - window.innerWidth / 2) / 20, 1.1]
    const trans = (x, y, s) => `perspective(600px) rotateX(${x}deg) rotateY(${y}deg) scale(${s})`

    const [springProps, set] = useSpring(() => ({ xys: [0, 0, 1], config: { mass: 5, tension: 350, friction: 40 } }));
    const [ trail, setTrail] =useTrail(4,() => ({opacity: 0}));
    return (
        <>
            <div className="auto-sales">
                <div className="flex-wrap">
                    <div className="img-wrap">
						<Cube3D />
                    </div>
                    <div className="text-wrap">
                        {
                            trail.map(({ opacity }, k)=>{
                                return k == 1?(<animated.p style={{
                                        fontSize: '2vw',
                                    opacity:opacity.interpolate(x=>x)}} className="text-tit">智能营销包装</animated.p>):
                                    k === 2?(
                                    <animated.p
                                        style={{
                                            fontSize: '0.9vw',
                                            lineHeight: '1.75vw',
                                            marginTop: '0.8vw',
                                            opacity:opacity.interpolate(x=>x)}}
                                        className="text-des">
                                        智能营销投放全流程，大屏可视化呈现，<br />
                                        让客户了解智能营销的项目价值，<br />
                                        辅助决策，提升售卖。<br />
                                        同时帮助管理者全方位呈现投放过程及物料状态，<br />
                                        对各维度数据及生产内容一目了然。
                                    </animated.p>
                                ): k === 3? <animated.div style={{opacity:opacity.interpolate(x=>x)}}>
                                            <DetailButton href="http://smart.listed.autohome.com.cn/#/index" /></animated.div>:null

                            })
                        }

                    </div>
                </div>

                {/* <BannerPoint /> */}

                <Pagination num={2}/>
            </div>

            <style jsx>{`

      .auto-sales{
        width: 100vw;
        height: 100vh;
        color: #fff;
        position: relative;
          background:#000 url('/auto-sales-bg.png') no-repeat center;
          background-size: cover
      }
      .flex-wrap{
          display: flex;
          height: 100vh;
        align-items: center;
        justify-content: center;
      }
      .auto-sales .img-wrap {

      }
      .auto-sales .img-wrap .cube {
          width: 45vw;
      }
      .auto-sales .img-wrap .cube img {
            width: 45vw;
      }
      .auto-sales .img-wrap img {
        //   width: 100vw;
      }
      .text-wrap{

          text-align: center;
          width:23.5vw;

      }
      .text-wrap .text-tit {
          font-size: 2vw;
      }
      .text-wrap .text-des {
           font-size: 0.9vw;
          line-height: 1.75vw;
          margin-top: 0.8vw;
      }

    `}</style>
        </>
    )
}

export default AutoSales
