//@ts-nocheck
import React, {useEffect, useRef, useState} from 'react';
import { ParallaxLayer } from '@react-spring/parallax';
import _ from 'lodash';
export default React.forwardRef((props:any, ref:any) => {
    const {
        children,
        offset,
        speed,
        style,
        parallaxRef,
        parallax,
        setScrollEnabled,
        innerAutomated
    } =  props;
    const [ animateFunc, setAnimateFunc] = useState([]);
    const [ rollbackFunc, setRollbackFunc] = useState(null);

    const myRef = useRef(null);



    useEffect(()=> {
        const dom = parallaxRef && parallaxRef.current.children[0] && parallaxRef.current.children[0];
        if(!dom){
            return;
        }
        const scrollFunc = _.throttle( (e) => {
            if(typeof myRef !== 'undefined' && myRef.current && animateFunc.length>0){
                // @ts-ignore
                var rect = myRef.current.getBoundingClientRect();
                var html = document.documentElement;

                var top = document.documentElement.clientTop; // 非IE为0，IE为2
                var left= document.documentElement.clientLeft;

                if (
                    rect.x >=0 && rect.y <= rect.height * 0.5
                ){
                    animateFunc.map((v)=>{
                        if(typeof v === 'function' ){  v()}
                    })
                } else if(rect.y<-rect.height*0.2) {
                    rollbackFunc && rollbackFunc()
                }
            }

        },500);
        dom.addEventListener('scroll',scrollFunc)
        return () => dom.removeEventListener('scroll',scrollFunc);
    },[animateFunc]);

    return (<React.Fragment>
        <ParallaxLayer

            offset={offset} speed={speed} style={style}
        >
            <div ref={myRef}>
                {React.cloneElement(children, { setAnimateFunc, setRollbackFunc })}
            </div>

        </ParallaxLayer>
        </React.Fragment>);
})
