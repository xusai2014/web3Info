// @ts-nocheck
import { useState, useEffect, useRef } from "react";
const Cube3D = () => {
    const [rotate, setXY] = useState({ x: 33, y: 54 });
    const obj = useRef({});

    const mouseDown = (e) => {
      clearInterval(obj.current);
      const x = e.clientX;
      const y = e.clientY;
      const preX = rotate.x;
      const preY = rotate.y;
      document.body.onmousemove = (ev) => {
        setXY({
          x: preX - (y - ev.clientY),
          y: preY + (x - ev.clientX),
        });
      };
      document.body.onmouseup = () => {
        document.body.onmousemove = null;
        document.body.onmouseup = null;
      };
    }

    useEffect(() => {
      obj.current = setInterval(() => {
        setXY({
          x: rotate.x -= 0.1,
          y: rotate.y -= 0.2,
        });
      }, 30);
      return () => clearInterval(obj.current);
    }, [])

    return (
      <>
        <div className="wrap">
          <div className="cube" onMouseDown={mouseDown} style={{ transform: `rotateY(${rotate.y % 360}deg) rotateX(${rotate.x % 360}deg)` }}>
            <div className="front">
              <img className="img" src="/cube-home.jpg"/>
            </div>
            <div className="back">
              <img className="img" src="/cube-overview.jpg" />
            </div>
            <div className="top">

              <img className="img" src="/cube-content.jpg" />
            </div>
            <div className="bottom">
              <img className="img" src="/cube-idea.jpg" />
            </div>
            <div className="left">
              <img className="img" src="/cube-policy.jpg" />
            </div>
            <div className="right">
              <img className="img" src="/cube-putin.jpg" />
            </div>
          </div>
        </div>
        <style>
          {`
            .wrap {
              width: 45vw;
              height: 45vh;
              perspective: 40vw;
              perspective-origin: 50% 50%;
              user-select: none;
            }
            .wrap:hover .cube {
              // animation: spin 2s linear;
            }
            .cube {
              position: absolute;
              left: 50%;
              top: 50%;
              width: 15vw;
              height: 15vw;
              margin-left: -7.5vw;
              margin-top: -7.5vw;
              transform-style: preserve-3d;
              transform-origin: center center;
              transform: rotateX(40deg) rotateY(40deg);
            }
            @keyframes spin {
              from { transform: rotateY(0) rotateX(0deg); }
              to { transform: rotateY(360deg) rotateX(0deg); }
            }
            .cube div {
              position: absolute;
              width: 15vw;
              height: 15vw;
              border: 1px solid #17C0FF;
              border-radius: 0.05vw;
              overflow: hidden;
            }
            .cube div img{
              width: 15vw;
              height: 15vw;
              pointer-events: none;
            }
            .back {
                transform: translateZ(-7.6vw) rotateY(180deg);
                background: red;
            }
            .right {
              transform: rotateY(-270deg) translateX(7.6vw) translateZ(2px);
              transform-origin: top right;
              background: white;
            }
            .left {
              transform: rotateY(270deg) translateX(-7.5vw) translateZ(2px);
              transform-origin: center left;
              background: orange;
            }
            .top {
              transform: rotateX(-90deg) translateY(-7.6vw) translateZ(-2px);
              transform-origin: top center;
              background: blue;
            }
            .bottom {
              transform: rotateX(90deg) translateY(7.5vw) translateZ(-2px);
              transform-origin: bottom center;
              background: grey;
            }
            .front {
              transform: translateZ(7.6vw);
              background: pink;
            }
          `}
        </style>
      </>
  )
}

export default Cube3D;
