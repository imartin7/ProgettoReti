import Router           from 'next/router';
import { pathToRegexp } from "path-to-regexp";

class TodaysRouter {

  constructor(){
    this.get      = this.getRoute;
    this.redirect = this.redirect.bind(this);
  }

  getInitialPage = () => {
    return '/';
  }

  redirect(key,context={},params){
    const { href,as } = this.getRoute(key,params);
    const checkServer = () => Object.prototype.toString.call(global.process) === '[object process]';
    if (checkServer() && context && context.res) {
      context.res.setHeader('Location', as);
      context.res.statusCode = 303;
    } else {
      Router.replace(href,as).then(() => window.scrollTo(0, 0));
    }
  }

  getRoutesList(){
    const home = this.getInitialPage();
    return {
      '':        { href: home, as: home },
      '/':       { href: home, as: home },
      'login':   { href: '/account/login', as: '/account/login' },
    };
  }

  replacePathKeys = (path,keys,params) => {
    path = path.replace(/\\/g,'');

    for(let {name} of keys){
      path = path.replace(`:${name}`, params[name])
    }

    return path;
  }

  getRoute(key,params={}){
    const routes      = this.getRoutesList();
    const { href,as } = routes[key] || {href:key,as:key};
    let asKeys        = [];
    let hrefKeys      = [];

    pathToRegexp(as,   asKeys);
    pathToRegexp(href, hrefKeys);

    let asRoute   = this.replacePathKeys(as,    asKeys,   params);
    let hrefRoute = this.replacePathKeys(href,  hrefKeys, params);

    return {
      as:   asRoute,
      href: hrefRoute
    };
  }
}
export default TodaysRouter;
