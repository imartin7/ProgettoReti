import "../styles/globals.css";
import { wrapper, store } from "../store/store";
import { Provider } from "react-redux";
import { SessionProvider } from "next-auth/react";
import App          from 'next/app';
import TodaysRouter from "../services/router";
import Context      from "../context";

class TodaysApp extends App{
  static async getInitialProps(appContext){
    TodaysApp.updateAppContext(appContext);
    const appProps = App.getInitialProps(appContext);
    return {...appProps}
  }

  static updateAppContext(appContext){
    let {ctx} = appContext;
    ctx.router = new TodaysRouter();
  }

  initServices = () => {
    const router  = new TodaysRouter();
    return { router};
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
          <Context.Provider value={services}>
            <SessionProvider session={pageProps.session}>
              <Component {...pageProps} />
            </SessionProvider>
          </Context.Provider>
        </Provider>
      </>
    );
  }
  
}

export default wrapper.withRedux(TodaysApp);