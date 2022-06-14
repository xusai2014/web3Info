// @ts-nocheck
import { render } from 'react-dom'
import React, { useState, useCallback } from 'react'
import { useTransition, animated } from 'react-spring'
import Slider from '@farbenmeer/react-spring-slider';

export default function (props) {

    const { pages, setActiveIndex } = props;

    return (<><Slider
        hasArrows={true}
        hasBullets={true}
        onSlideChange={(args)=>{
            setActiveIndex(args);
        }}

        BulletComponent={()=><div></div>}

        ArrowComponent={({onClick, direction})=>(<div className="arrows">
            <a href="javascript:;" className={direction == 'left'?`arrow-left`:'arrow-right'}>
                <img src={`/arrow-${direction}.png`} onClick={onClick} />
            </a>
        </div>)}
    >
        {
            pages.map((v,k)=>{
                return  <div style={{width:'100vw',height:'100vh',backgroundSize:'cover', backgroundImage:`url(${v})`}} alt={''} key={k} src={v} />
            })
        }
    </Slider>
        <style jsx>{`
             .arrows {
                width: 50vw;
                display: inline-block;
                text-align: center;
                margin-top: 35vh;
            
          .arrow-left,.arrow-right {
             width: 3vw;
             height: 3vw;
             img{
                 width: 3vw;
                 height: 3vw;
             }
          }
          .arrow-left{
            margin:0px 0px 0px 35vw;
          }
          .arrow-right{
            margin:0 35vw 0 0
          }
      }
     
        `}
        </style>
        </>)

}


