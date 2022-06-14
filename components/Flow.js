// @ts-nocheck
import Pagination from '../components/Pagination'
import BannerPoint from '../components/BannerPoint'
import DetailButton from '../components/DetailButton'
import {useEffect, useState} from "react";
import { useSprings, animated, useTrail, interpolate } from 'react-spring';
import { useGesture } from 'react-use-gesture';
const Banner818 = (props) => {

    const cards = [
        '/flow-phone.png',
        '/flow-phone.png',
        '/flow-phone.png',
        '/flow-phone.png',
        '/flow-phone.png'
    ]
    const to = i => ({ x: 0, y: i * -4, scale: 1, rot: -10 + Math.random() * 20, delay: i * 100 })
    const from = i => ({ x: 0, rot: 0, scale: 1.5, y: -1000 })
    const trans = (r, s) => `perspective(1500px) rotateX(30deg) rotateY(${r / 10}deg) rotateZ(${r}deg) scale(${s})`

    const [gone] = useState(() => new Set([4,3,2,1,0])) // The set flags all the cards that are flicked out
    const [springsProps, set] = useSprings(cards.length, i => ({ ...from(i), from: to(i) })) // Create a bunch of springs using the helpers above
    const bind = useGesture({
        onDrag: ({ args: [index], down, delta: [xDelta], distance, direction: [xDir], velocity }) => {
            const trigger = velocity > 0.2 // If you flick hard enough it should trigger the card to fly out
            const dir = xDir < 0 ? -1 : 1 // Direction should either point left or right
            if (!down && trigger) gone.add(index) // If button/finger's up and trigger velocity is reached, we flag the card ready to fly out
            set((i) => {
                if (index !== i) return // We're only interested in changing spring-data for the current spring
                const isGone = gone.has(index)
                const x = isGone ? (200 + window.innerWidth) * dir : down ? xDelta : 0 // When a card is gone it flys out left or right, otherwise goes back to zero
                const rot = xDelta / 100 + (isGone ? dir * 10 * velocity : 0) // How much the card tilts, flicking it harder makes it rotate faster
                const scale = down ? 1.1 : 1 // Active cards lift up a bit
                return { x, rot, scale, delay: undefined, config: { friction: 50, tension: down ? 800 : isGone ? 200 : 500 } }
            })
            if (!down && gone.size === cards.length) setTimeout(() => gone.clear() || set(i => to(i)), 600)
        },
    });

    const {setAnimateFunc, setRollbackFunc } = props;
    useEffect(()=>{
        setAnimateFunc([
            ()=>setTrail({opacity: 1}),
            ()=>{
                gone.clear() || set(i => to(i));
            }
        ])
        setRollbackFunc({opacity: 0})
    },[]);
    const [ trail, setTrail] =useTrail(4,() => ({opacity: 0}));



    return (
        <>
            <div className="wrap">
                <div className="flex-wrap">
                    <div className="text-wrap">
                        <animated.p
                            style={{
                                fontSize: '2vw',
                                opacity: trail[0].opacity.interpolate(x=>x)}}
                        >高效的流量变现工具</animated.p>
                        <animated.p
                            style={{
                                fontSize: '0.9vw',
                                lineHeight: '1.75vw',
                                marginTop: '0.8vw',
                                opacity: trail[1].opacity.interpolate(x=>x)}}
                        >
                            结合流量特点，给各BU变现进行精准赋能<br />
                        </animated.p>
                        <animated.div
                            style={{
                                opacity: trail[2].opacity.interpolate(x=>x)}}
                        >
                            <DetailButton href="https://leads.autohome.com.cn/landingpage/html/auto_m?seriesId=448&channelId=1" />
                        </animated.div>
                    </div>
                    <animated.div className="img-wrap"
                                  style={{
                                      width: '45vw',
                                      height: '100vh',
                                      position: 'relative',
                                      opacity: trail[2].opacity.interpolate(x=>x)}}
                    >
                        {/*<animated.img*/}


                            {/*src="/flow-phone.png"/>*/}
                        {
                            springsProps.map(({ x, y, rot, scale }, i) => (
                                <animated.div key={i}
                                              style={{
                                                  position: 'absolute',
                                                  width: '45vw',
                                                  height: '100vh',
                                                  willChange: 'transform',
                                                  display: 'flex',
                                                  alignItems: 'center',
                                                  justifyContent: 'center',
                                                  transform: interpolate([x, y], (x, y) => `translate3d(${x}px,${y}px,0)`)
                                              }}>
                                    {/* This is the card itself, we're binding our gesture to it (and inject its index so we know which is which) */}
                                    <animated.div {...bind(i)}
                                                  style={{
                                                      backgroundColor: 'white',
                                                      backgroundSize: 'auto 85%',
                                                      backgroundRepeat: 'no-repeat',
                                                      backgroundPosition: 'center center',
                                                      width: '45vh',
                                                      maxWidth: '15vw',
                                                      height: '85vh',
                                                      maxHeight: '27.5vw',
                                                      willChange: 'transform',
                                                      borderRadius: '0.5vw',
                                                      boxShadow:'0 12.5px 100px -10px rgba(50, 50, 73, 0.4), 0 10px 10px -10px rgba(50, 50, 73, 0.3)',
                                                      transform: interpolate([rot, scale], trans),
                                                      backgroundImage: `url(${cards[i]})` }}
                                    />
                                </animated.div>
                            ))
                        }
                    </animated.div>
                </div>
                {/* <BannerPoint /> */}
                <Pagination num={5}/>
            </div>

            <style jsx>{`


      .wrap {
          width: 100vw;
          height: 100vh;
          color: #333;
          background: #F4F4F4;
          position: relative
      }
      .flex-wrap{
          display: flex;
          height: 100vh;
        align-items: center;
        justify-content: center;
      }
      .text-wrap{
          text-align: center;
          padding-top:3.5vw;
      }
      .text-wrap .text-tit {
          font-size: 2vw;
      }
      .text-wrap .text-des {
          font-size: 0.9vw;
          line-height: 1.75vw;
          margin-top: 0.8vw;
      }
      .img-wrap {
        width: 100vw;
        height: 100vh;
        position: relative;
      }
     .img-wrap img {
         width: 37.15vw;
         height: 39.8vw;
     }
    `}</style>
        </>
    )
}

export default Banner818
