//@ts-nocheck
import React, {useCallback, useEffect, useRef, useState} from 'react';
import Post from '../Post/index';
import axios from 'axios';
import _ from 'lodash';
import styles from './index.module.less';
import  {baseUrl} from '../../config/autoconfig';
export default ({loadStart, setLoadStart, matchParam = {o_name:""}, setShareObj =()=>{}}) => {

    const [list, setList] = useState([]);
    const [videolist, setVideolIst] = useState([]);

    function getVideo() {
        return axios.get(`${baseUrl}/api/article/videolist`, {
            withCredentials: true,
            headers: {
                'Access-Control-Allow-Origin': '*'
            }
        }).then((result) => {

            if (result.data) {
                const {articleList, page} = result.data.data;
                setVideolIst(articleList);
            }
        })
    }

    function getMore() {

        return axios.get(`${baseUrl}/api/article/list/page?page=${list.length / 20 + 1}&o_name=${matchParam.o_name}`, {
            withCredentials: true,
            headers: {
                'Access-Control-Allow-Origin': '*'
            }
        }).then((result) => {
            if (result.data) {
                const {articleList, page} = result.data.data;
                if (list.length / 20 < page) {
                    setList(list.concat(articleList));
                }

            }
        })
    }


    function getScrollTop() {
        let scrollTop = 0;
        if (document.documentElement && document.documentElement.scrollTop) {
            scrollTop = document.documentElement.scrollTop;
        } else if (document.body) {
            scrollTop = document.body.scrollTop;
        }
        return scrollTop;
    }

    //获取当前可视范围的高度
    function getClientHeight() {
        let clientHeight = 0;

        if (document.body.clientHeight && document.documentElement.clientHeight) {
            clientHeight = (document.body.clientHeight < document.documentElement.clientHeight) ? document.body.clientHeight : document.documentElement.clientHeight;
        } else {
            clientHeight = (document.body.clientHeight > document.documentElement.clientHeight) ? document.body.clientHeight : document.documentElement.clientHeight;
        }
        return clientHeight;
    }

    function getScrollHeight() {
        return (Math.max(document.body.scrollHeight, document.documentElement.scrollHeight));
    }

    useEffect(() => {
        if (loadStart) {
            getMore().finally(() => {
                setLoadStart(false);
            });
        }

    }, [loadStart])
    const debouncedSave = _.debounce(() => {
        if (getScrollTop() + getClientHeight() >= getScrollHeight()) {
            getMore();
        }
    }, 500)
    useEffect(function () {
        document.body.addEventListener('scroll', debouncedSave);
        return () => {
            document.body.removeEventListener('scroll', debouncedSave);
        }
    }, [list])

    useEffect(()=>{
        // 页面只有一个视频可以播放
        const videos = document.getElementsByTagName('video');
        for (let i = videos.length - 1; i >= 0; i--) {
            (function(){
                let p = i;
                videos[p].addEventListener('play',function(){
                    pauseAll(p);
                })
            })()
        }
        function pauseAll(index){
            for (let j = videos.length - 1; j >= 0; j--) {
                if (j!=index) videos[j].pause();
            }
        }
        // getVideo();
    }, [])

    return <div className={styles.container}>

        <div className={`${styles.loadContainer} ${!loadStart ? styles.loadFinish : ''}`}>
            <img src={'/loading.gif'}
                 className={styles.loading}
            />
        </div>
        {
            list.map((v, key) => {
                return <Post setShareObj={setShareObj} key={key} {...v}></Post>
            })
        }
        {
            list.length !== 0 ? <div className={styles.more} onClick={() => {
                getMore()
            }}>加载更多</div> : null
        }
    </div>
}
