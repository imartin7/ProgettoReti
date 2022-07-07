import PublicPage     from "../public";
import nookies  from 'nookies'
import _get from 'lodash/get'
export class PrivatePage extends PublicPage{

  static async getInitialProps(ctx){
    const publicPageProps = await super.getInitialProps(ctx);
    const cookies = nookies.get(ctx);
    const token = _get(cookies, 'token');
    const nextAuthToken = _get(cookies, 'next-auth.session-token');

    if (!token && !nextAuthToken) {
      ctx.router.redirect('login',ctx,{});
    }
    
    return {
      ...publicPageProps, token, nextAuthToken
    }
  }

  render(){
    return (
      <>
        {super.render()}
      </>
    );
  }
}

export default PrivatePage;