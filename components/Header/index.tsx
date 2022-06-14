import Router from "next/router";
import styles from './index.module.less';
export default () => {

    return <><div className={styles.container}>
        <i className={styles.back} onClick={()=>{
            window.history.length <= 1?Router.push('/'):Router.back()
            
        }}>&#xe61e;</i>
    </div>
    <div className={styles.content}></div>
    </>
}