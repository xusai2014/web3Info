import styles from './styles.module.less'

export default ({description, pic, title, url, setShareObj =()=>{}}) => {

    function share (e) {
        // @ts-ignore
        window.mobShare.config( {

            appkey: '3184d49693dff', // appkey

            params: {
                url: url?`${window.location.origin}${url}`:window.location.href, // 分享链接
                title, // 分享标题
                description,
                pic,

            }

        } );
        // @ts-ignore
        setShareObj({
            url: url?`${window.location.origin}${url}`:window.location.href, // 分享链接
            title, // 分享标题
            description,
            pic,
        })
        const { id } = e.target;
        // @ts-ignore
        const btn = window.mobShare( id );
        btn.send();
    }


    // @ts-ignore
    return <div onClick={share} className={styles.bg}>
        <span id={'weibo'} className={styles.span}>
            <i  className={styles.iconfont}>&#xe676;</i>
            微博转发
        </span>
        <span id={'weixin'} className={styles.span}>
            <i  className={styles.iconfont}>&#xe6b8;</i>
            微信转发
        </span>
    </div>
}
