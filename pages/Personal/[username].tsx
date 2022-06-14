import React, {useEffect} from "react";
import Head from "next/head";
import MainBody from "../../components/MainBody";
import Header from "../../components/Header";
// @ts-ignore
import styles from './style.module.less';
import CONSTANTS from '../../config/CONSTANTS';
import { useRouter } from 'next/router';
import { shareFunc } from '../../config/utils';

export default ({setLoadStart,loadStart}) => {
    const router = useRouter()
    const { username ='' } = router.query;
    if(!username){
        return null;
    }
    // @ts-ignore
    let item:any = {};
    Object.keys(CONSTANTS).map(key=>{
        if(key === username){
            item = CONSTANTS[key]
        }
    })
    useEffect(()=>{
         // @ts-ignore
         shareFunc(global.wx, {
            title: `车唧唧-${item.name}频道`, // 分享标题
              desc: item.description, // 分享描述
              link: window.location.href, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
              imgUrl: item.url, // 分享图标
              success: function () {
                // 设置成功
              }
        });
    }, [])

    return <>
        <Head>
            <title>车唧唧</title>
            <link rel="icon" href="/favicon.jpg"/>
            <meta name={'keywords'} content={'车唧唧,汽车社区,汽车界的小家雀儿,汽车快讯'}/>
            <meta name={'description'} content={'车唧唧口号是汽车社区新势力，欢迎大家来到这里一起唧唧歪歪，有态度、更年轻、有个性的汽车发声根据地'}/>
        </Head>
        <Header></Header>
        <div className={styles.container}>

            <div><img src={item.url} /></div>
            <div className={styles.info}>
            {
                `${item.name}频道`
            }
                <br />
            </div>


        </div>
        <div className={styles.shortCon}>
            <div className={styles.short}>
                简介：{item.description}
            </div>
        </div>
        
        <div style={{marginBottom: '60px'}}>
        <MainBody
            matchParam={{
                o_name:item.name
            }}
            setLoadStart={setLoadStart} loadStart={loadStart}></MainBody>
        </div>    
    </>
}