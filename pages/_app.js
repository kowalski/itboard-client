import App from 'next/app'
import React from 'react'
import withReduxStore from '../lib/with-redux-store'
import { Provider } from 'react-redux'
import * as actions from '../store/actions/index'
import Cookies from 'js-cookie'
import './nprogress.css'

import NProgress from 'nprogress'
import Router from 'next/router'

Router.events.on('routeChangeStart', () => {
  NProgress.start()
})
Router.events.on('routeChangeComplete', () => NProgress.done())
Router.events.on('routeChangeError', () => NProgress.done())


class MyApp extends App {
  static async getInitialProps({ Component, ctx }) {
    let pageProps = {}
    const { reduxStore, req } = ctx
    const isServer = typeof window === 'undefined'

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx)
    }

    if (!isServer) {
      Cookies.set('previous_url', window.location.href, {path: '/'})
    }
 
    if (isServer && req.cookies.session_cookie && req.cookies.payload_cookie) {
      await reduxStore.dispatch(actions.onAuthStateChange(req.headers.cookie))
    }

    return { pageProps }
  }

  componentDidMount() {
    const firstVisit = Cookies.get('visited_before')
    if (!firstVisit) {
      Cookies.set('visited_before', false, {path: '/'})
    }
  }

  render () {
    const { Component, pageProps, reduxStore } = this.props
    return (
      <Provider store={reduxStore}>
        <Component {...pageProps}/>
      </Provider>
    )
  }
}

export default withReduxStore(MyApp)