import PublicPage     from "../public";
import nookies  from 'nookies'
import _get from 'lodash/get'
export class PrivatePage extends PublicPage{

  static async getInitialProps(ctx){
    const publicPageProps = await super.getInitialProps(ctx);
    const {token} = nookies.get(ctx)

    if (!token) {
      ctx.router.redirect('login',ctx,{});
    }
    
    return {
      ...publicPageProps
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