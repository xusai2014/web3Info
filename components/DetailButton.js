
export default (props) => {
    const { href } = props;
    return (
        <>
            <div className="detail">
                <a href={href} target="_blank">了解详情</a>
            </div>
            <style jsx>{`
            .detail {
                width: 100%;
                text-align: center;
                margin-top: 1.5vw;
            }
                .detail a {
                    color: #17C0FF;
                    font-size: .7vw;
                    display: inline-block;
                    width:5.5vw;
                    height:2vw;
                    line-height: 2vw;
                    border:1px solid rgba(92,211,255,1);
                }
             `}</style>
        </>
    )
}

