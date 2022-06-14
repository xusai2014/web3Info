import Post from '../../components/Post';
import Header from '../../components/Header';
import axios from "axios";
import {Server_baseUrl} from "../../config/autoconfig";
import React, {useEffect, useState} from "react";
import styles from './style.module.less';
import { shareFunc } from '../../config/utils';

export default ({data = {}}:any) => {
    useEffect(()=>{
        const {
            t_desc = '',
            t_img,
            t_title = '',
        } = data;
        // @ts-ignore
        shareFunc(global.wx, {
            title: t_title, // 分享标题
            desc: t_desc, // 分享描述
            link: window.location.href, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
            imgUrl: t_img, // 分享图标
            success: function () {
              // 设置成功
            }
        });
        
    }, [])
    // @ts-ignore
    return <>
    <Header></Header>
    <div className={styles.container} >
        <Post {...data} single={true} />

    </div></>
}
export async function getServerSideProps(context) {
    const { query } = context;
    const { id ='' } = query;

    try {
        const data  = await axios.get(`${Server_baseUrl}/api/article/item?id=${id}`, {
            withCredentials: true,
            headers: {
                'Access-Control-Allow-Origin': '*'
            }
        })
        console.log(data.data,'>>>>>>>data')
        return {
            props: {
                data: data.data.data
            }, // will be passed to the page component as props
        }

    } catch (e) {
        return {
            props: {}, // will be passed to the page component as props
        }
    }



}
