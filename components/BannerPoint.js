
export default (props) => {
    const { activeIndex } = props;
    return (
        <>
            <div className="banner-point">
                <div className="flex-wrap">
                    <span className="point" style={{backgroundColor:activeIndex ===0?'#5CD3FF':'#fff'}} />
                    <span className="point" style={{backgroundColor:activeIndex ===1?'#5CD3FF':'#fff'}} />
                    <span className="point" style={{backgroundColor:activeIndex ===2?'#5CD3FF':'#fff'}} />
                </div>
            </div>
            <style jsx>{`
                .banner-point {
                    position: absolute;
                    height: 100vh;
                    right: 2.25vw;
                    top: 0;
                }
                .banner-point .flex-wrap{
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    height: 100%;
                    align-items: center;
                }
                .banner-point .flex-wrap .point {
                    width: 6px;
                    height: 6px;
                    border-radius: 6px;
                    margin-bottom: 18px;
                    background: #fff;
                }
                .banner-point .flex-wrap .active {
                    width:12px;
                    height:12px;
                    margin-bottom: 18px;
                    border-radius: 12px;
                    text-align: center;
                    background: transparent;
                    // border:1px solid;
                    border-image:linear-gradient(270deg, rgba(149,235,255,0), rgba(98,214,255,0), rgba(92,211,255,1)) 1 1;
                }
                .banner-point .flex-wrap .active .point {
                    display: inline-block;
                     width: 6px;
                    height: 6px;
                    margin-bottom: 6px;
                    border-radius: 6px;
                    background:#5CD3FF;
                }
             `}</style>
        </>
    )
}

