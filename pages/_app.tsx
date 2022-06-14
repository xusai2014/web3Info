// @ts-nocheck
import '../style.less';
import App, {AppProps, Container} from 'next/app'
import React, {useState} from 'react';
import LeftBody from "../components/LeftBody";
import RightBody from "../components/RightBody";
import Router from "next/router";
import axios from 'axios';
import { baseUrl } from '../config/autoconfig';


export default class MyApp extends App {
    constructor(props) {
        super(props);
        this.state = {
            loadStart: true
        }
    }

    componentDidMount() {

        Router.onRouteChangeComplete =  (props) => {

            this.setState({loadStart:true});
        }
    }


    render() {
        const {Component, pageProps, router} = this.props;
        const {
            asPath
        } = router;

        return asPath !== "/page1"?<div>

            <LeftBody setLoadStart={(v) => this.setState({loadStart: v})}
                      loadStart={this.state.loadStart}
            >

            </LeftBody>
            <Component
                setLoadStart={(v) => this.setState({loadStart: v})}
                loadStart={this.state.loadStart}
                {...pageProps} />
            <RightBody
            ></RightBody>
        </div>:<Component></Component>
    }
}
