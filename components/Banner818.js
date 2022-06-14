//@ts-nocheck
import Pagination from '../components/Pagination'
import BannerPoint from '../components/BannerPoint'
import DetailButton from '../components/DetailButton'
import { useSpring, animated, useTrail } from 'react-spring';
import {useEffect} from "react";
const Banner818 = (props) => {
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
            <animated.div className="wrap" style={{
                    width: '100vw',
                    height: '100vh',
                    color: '#fff',
                    background: 'url("/banner818-bg.png") no-repeat center',
                    position: 'relative',
                    backgroundSize:trail[3].opacity.interpolate(x=>`${(2-x)*100}%`),
                    backgroundColor:'#101010'
                    }}>
                <div className="text-wrap">
                    <animated.p
                        style={{
                            fontSize: '2vw',
                            opacity: trail[0].opacity.interpolate(x=>x)}}
                    >818全球超级车展</animated.p>
                    <animated.p
                        style={{
                            fontSize: '.9vw',
                            lineHeight: '1.75vw',
                            marginTop: '.8vw',
                            opacity: trail[1].opacity.interpolate(x=>x)}}
                        className="text-des">
                        </animated.p>
                    <animated.div
                        style={{
                            opacity: trail[2].opacity.interpolate(x=>x)}}
                    ><DetailButton href="#" /></animated.div>
                </div>
                {/* <BannerPoint /> */}
                <Pagination num={4}/>
            </animated.div>

            <style jsx>{`


      .wrap {
          width: 100vw;
          height: 100vh;
          color: #fff;
          background: #000 url('/banner818-bg.png') no-repeat center;
          background-size: cover;
          position: relative
      }

      .text-wrap{
          text-align: center;
          padding-top:3.8vw;
      }
      .text-wrap .text-tit {
          font-size: 2vw;
      }
      .text-wrap .text-des {
          font-size:0.9vw;
          line-height:1.75vw;
          margin-top: 0.8vw;
      }

    `}</style>
        </>
    )
}

export default Banner818
