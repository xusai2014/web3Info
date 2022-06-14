import React, {useState} from "react";
import AVATAR_LIST from '../../config/CONSTANTS';
// @ts-ignore
import styles from './index.module.less';
import Router from "next/router";
import Share from "../Share";

export default ({
                    o_name = '',
                    o_ctime = '',
                    t_desc = '',
                    t_img,
                    t_title = '',
                    o_url = '',
                    t_tags = [],
                    o_type,
                    t_video,
                    _id,
                    single = false,
                    setShareObj =() =>{}
                }) => {

    const [ expand, setExpand] =useState(single);

    const getImgUrl = (o_name)=>{
        let url = '/auto-sales-cube.png';
        Object.keys(AVATAR_LIST).map((key)=>{
            if(AVATAR_LIST[key].name === o_name){
                url  =  AVATAR_LIST[key].url
            }
        })
        return url;

    }

    function getKey(o_name){
        let keyStr = ''
        Object.keys(AVATAR_LIST).map((key) => {
            if(AVATAR_LIST[key].name === o_name){
                keyStr = key;
            }
        })
        return keyStr
    }


    return <div className={styles.container} style={{...single ? { border:"none" }:{}}}
        >
        <img src={getImgUrl(o_name)} className={styles.avatar}
             onClick={() => {
                 Router.push(`/Personal/${getKey(o_name)}`)
             }}
        />
        <div className={styles.content}>
            <div style={{margin: '0 0 5px 0', cursor: 'pointer'}} onClick={()=>{
                Router.push(`/post/${_id}`)
            }}>
                <div className={styles.name}>{o_name}</div>
                <div className={styles.title}>{t_title}</div>

            </div>
            <a href={o_url}  target={'_blank'}><div className={styles.extraContent}>
                {
                    o_type === 'video'?
                        <video
                            className={styles.contentBlock}
                            controls={true}
                            muted={true}


                            src={t_video}
                        ></video>

                        :<img className={styles.contentBlock} src={t_img}/>
                }

            </div></a>
            <a href={o_url} className={styles.href} target={'_blank'}>{o_url.length>30?o_url.substr(0,30)+' ...':o_url}</a>
            {
                t_desc?<div style={{cursor: 'pointer'}} onClick={()=>{
                    Router.push(`/post/${_id}`)
                }}>
                    &nbsp;--&nbsp;{
                    expand?t_desc:
                        t_desc.length > 120 ?<>{t_desc.substr(0,120)+" ......"}</>:t_desc
                }
                </div>:null
            }

            <div className={styles.expand}>
                <span onClick={(e)=>{
                    e.stopPropagation();
                    e.preventDefault();
                    setExpand(!expand);
                }} className={styles.more}>{t_desc?(!expand?'查看更多':'收起'):''}</span>
                <span className={styles.time}>发布时间 {o_ctime}</span>
            </div>
            <div className={styles.tags}>
                {
                    t_tags.map((v)=>{
                        return v ? <a>{`#${String(v).trim()}`}</a> : null;
                    })
                }
            </div>
            <Share setShareObj={setShareObj} description={t_desc} title={t_title} pic={t_img} url={`/post/${_id}`}/>
        </div>

    </div>
}
