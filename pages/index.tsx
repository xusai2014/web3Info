//@ts-nocheck
import Head from 'next/head';

import MainBody from '../components/MainBody/index';
import React, {useState} from "react";
import styles from "../components/MainBody/index.module.less";
import AVATAR_LIST from "../config/CONSTANTS";
import Router from "next/router";
import Publish from "../components/Publish";
import { useEffect } from 'react';
import { shareFunc } from '../config/utils';

export default function Home({setLoadStart, loadStart}) {

    const version = 1;
    const [ shareObj, setShareObj] = useState({});
    useEffect(() => {
        const {
            url = window.location.href,
            title = '车唧唧-汽车新势力，一起唧唧歪歪！', // 分享标题
            description = '车唧唧口号是汽车社区新势力，欢迎大家来到这里一起唧唧歪歪，有态度、更年轻、有个性的汽车发声根据地', // 分享描述,
            pic = `${window.location.origin}/favicon.jpg`, // 分享图标,
        } = shareObj;
        shareFunc(global.wx,{
            title, // 分享标题
            desc:description, // 分享描述
            link: url, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
            imgUrl: pic, // 分享图标
            success: function () {
            // 设置成功
            }
        });
    }, [shareObj])
    return (
        <>
            <Head>
                <title>车唧唧</title>
                <link rel="icon" href="/favicon.jpg"/>
                <meta name={'keywords'} content={'车唧唧,汽车社区,汽车界的小家雀儿,汽车快讯'}/>
                <meta name={'description'} content={'车唧唧口号是汽车社区新势力，欢迎大家来到这里一起唧唧歪歪，有态度、更年轻、有个性的汽车发声根据地'}/>
            </Head>
            <div>
                <div className={styles.containerTop}>
                    {
                        version === 1 ?
                            <div className={styles.list}>
                                <span className={styles.text}>热门频道</span>
                                {
                                    Object.keys(AVATAR_LIST).map((key,index) => {

                                        return (<div key={index} className={styles.item} onClick={() => {
                                            Router.push(`/Personal/${key}`)
                                        }}>
                                            <img src={AVATAR_LIST[key].url} className={styles.img} width={60} height={60}/>
                                            <span>{AVATAR_LIST[key].name}</span>
                                        </div>)
                                    })
                                }

                            </div> :
                            <div style={{display: 'flex'}}>
                                <img width={'100'}
                                     height={'100'}
                                     style={{
                                         borderRadius: '50px',
                                         padding: '8px 0 0 13px',
                                         margin: '10px'
                                     }}
                                     src={'/image.jpg'}
                                />
                                <Publish></Publish>
                            </div>
                    }

                </div>
                <MainBody setShareObj={setShareObj} setLoadStart={setLoadStart} loadStart={loadStart}></MainBody>
            </div>

        </>
    )
}
