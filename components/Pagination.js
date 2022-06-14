
export default (props) => {
    const { num } = props;
    return (
        <>
            <div className="pagination" style={{ background: [5, 6].includes(num) ? '#22A3D2' : 'rgba(33,195,255,.4)' }}>
                <div className="flex-wrap">
                    <div className="page-wrap">
                        <div className="current-page">
                            <span className="num">{num}</span>
                            <span className="en">HOME</span>
                        </div>
                        <div className="split">
                            /
                    </div>
                    </div>
                    <div className="total-page">
                        <div className="total">7</div>
                    </div>
                </div>
            </div>
            <style jsx>{`
            .pagination {
                position: absolute;
                right: 0;
                bottom: 29.3vh;
                background:rgba(33,195,255,.4);
                width: 120px;
                height: 60px;
                font-family: PingFangSC-Regular,PingFang SC,-webkit-pictograph;
                color: #fff;
            }
            .flex-wrap{
                height: 100%;
                display: flex;
                justify-content: center;
                align-items: center;
            }
            .page-wrap{
                display: flex;
                text-align: center;
            }
            .current-page{
                display: flex;
               flex-direction: column
            }
            .num {
                font-size: 30px;
            }
            .en {
                font-size: 12px;
            }
            .split{
                font-size: 38px;
                margin: 8px 5px 0;
            }
            .total {
                font-size: 30px;
                 margin-top: 24px;
            }
             `}</style>
        </>
    )
}

