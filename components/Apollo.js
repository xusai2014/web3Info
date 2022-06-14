//@ts-nocheck
import Pagination from '../components/Pagination'
import BannerPoint from '../components/BannerPoint'
import DetailButton from '../components/DetailButton'
import {useEffect} from "react";
import { useSpring, animated, useTrail } from 'react-spring';
const Apollo = (props) => {
    const {setAnimateFunc, setRollbackFunc } = props;
    useEffect(()=>{
        setAnimateFunc([
            ()=>setTrail({opacity: 1})

        ])
        setRollbackFunc({opacity: 0})
    },[]);
    const [ trail, setTrail] =useTrail(4,() => ({opacity: 0}));
    return (
        <>
            <div className="wrap">
                {/* <div className="img-wrap">
                    <img src="/apollo-left.png" />
                </div> */}
                <div className="text-wrap">
                    <animated.p
                        style={{
                            fontSize: '2vw',
                            opacity: trail[0].opacity.interpolate(x=>x)}}
                    >Apollo</animated.p>
                    <animated.p
                        style={{
                            fontSize: '0.9vw',
                            lineHeight: '1.75vw',
                            marginTop: '0.8vw',
                            opacity: trail[1].opacity.interpolate(x=>x)}}
                    >
                        通过定制完整性监控指标，在客户端进行数<br/>
                        据采集、然后对数据进行清洗、分析，在数<br />
                        据监控平台可视化展示，并输出分析结果以<br />
                        作为产品体验分析的参考，对产品进行改<br />
                        造，提升产品体验，打造产品品牌。<br />
                    </animated.p>
                    <animated.div

                        style={{opacity: trail[2].opacity.interpolate(x=>x)}}
                    ><DetailButton href="https://bigdata.autohome.com.cn/autoApollo/assert/#/momentView" /></animated.div>
                </div>
                {/* <BannerPoint /> */}
                <Pagination num={6}/>
            </div>

            <style jsx>{`


      .wrap {
          width: 100vw;
          height: 100vh;
          color: #333;
            background: url(/apollo-left.png) no-repeat left;
            background-size: contain;
          position: relative;
          background-color:white;
      }
      .text-wrap{
          width: 45vw;
          margin-left: 50vw;
          text-align: center;
          padding-top: 35vh;
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

export default Apollo
