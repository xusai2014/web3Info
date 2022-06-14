import Banner from '../components/Banner'
import AutoSales from '../components/AutoSales'
import Prophet from '../components/Prophet'
import Banner818 from '../components/Banner818'
import Flow from '../components/Flow'
import Apollo from '../components/Apollo';
import Footer from '../components/Footer';
import { Parallax } from '@react-spring/parallax';
import ParallaxLayer from './ScrollAnimate';
import {Spring, config} from 'react-spring/web.cjs';
import React, {useRef, useEffect} from "react";
const Body = () => {
    const speed = 1;
    const dta = 0.001;
    const ref = useRef(null);
    const parallax = useRef(null);
    return (
        <>
            <div className="main" style={{height: '100vh'}} ref={ref}>
                <Parallax
                    ref={parallax}
                    horizontal={false} pages={2.617}
                          config={{...config.gentle,clamp:true, tension:0}}
                    innerStyle={{
                        scrollSnapType:'y mandatory'
                    }}
                >
                    <ParallaxLayer
                        offset={0} speed={0}
                        parallaxRef={ref}
                        parallax={parallax}
                    ><Banner /></ParallaxLayer>
                    <ParallaxLayer
                        style={{
                            marginTop:'-100vh'
                        }}
                        offset={1} speed={speed}
                        parallaxRef={ref}
                        parallax={parallax}
                    ><AutoSales /></ParallaxLayer>
                    <ParallaxLayer
                        style={{
                            marginTop:'-350vh'
                        }}
                        parallaxRef={ref}
                        parallax={parallax}
                        offset={2} speed={2*speed}
                    ><Prophet /></ParallaxLayer>

                    <ParallaxLayer
                        style={{
                            marginTop:'-766.5vh'
                        }}
                        parallaxRef={ref}
                        parallax={parallax}
                        offset={3} speed={3*speed}
                    ><Banner818 /></ParallaxLayer>

                    <ParallaxLayer
                        style={{
                            marginTop:'-1359vh'
                        }}
                        parallaxRef={ref}
                        parallax={parallax}
                        offset={4} speed={4*speed}
                    ><Flow /></ParallaxLayer>
                    <ParallaxLayer
                        style={{
                            marginTop:'-2129vh'
                        }}
                        parallaxRef={ref}
                        parallax={parallax}
                        offset={5} speed={5*speed}
                    ><Apollo /></ParallaxLayer>
                    <ParallaxLayer
                        style={{
                            marginTop:'-2628.7vh'
                        }}
                        parallaxRef={ref}
                        parallax={parallax}
                        offset={6} speed={5*speed}
                    ><Footer /></ParallaxLayer>
                </Parallax>
            </div>
            <style jsx>{`


            `}</style>
        </>
    )
}

export default Body
