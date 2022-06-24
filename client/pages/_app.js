import "../styles/globals.css";
import { persistor, store } from "../store/store";
import { Provider } from "react-redux";
import { SessionProvider } from "next-auth/react";
import App          from 'next/app';
import TodaysRouter from "../services/router";
import Context      from "../context";
import { PersistGate } from 'redux-persist/integration/react';

class TodaysApp extends App{
  static async getInitialProps(appContext){
    TodaysApp.updateAppContext(appContext);
    const appProps = App.getInitialProps(appContext);
    return {...appProps}
  }

  static updateAppContext(appContext){
    let {ctx} = appContext;
    ctx.router = new TodaysRouter();
    ctx.baseUrl = process.env.REACT_APP_BASE_API_URL;
  }

  initServices = () => {
    const router  = new TodaysRouter();
    const baseUrl = process.env.REACT_APP_BASE_API_URL;
    return { router, baseUrl};
  }

  render(){
    const { 
      Component, 
      router,
      ...pageProps
    } = this.props;

    const services = this.initServices();
    return (
      <>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <Context.Provider value={services}>
              <SessionProvider session={pageProps.session}>
                <Component {...pageProps} />
              </SessionProvider>
            </Context.Provider>
          </PersistGate>
        </Provider>
      </>
    );
  }
  
}

export default TodaysApp;