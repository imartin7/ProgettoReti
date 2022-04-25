import PublicPage     from "../public";
import cookie         from 'react-cookies';

export class PrivatePage extends PublicPage{

  static async getInitialProps(ctx){
    const publicPageProps = await super.getInitialProps(ctx);
    const token = cookie.load('token');
    
    if (!token) {
      ctx.router.redirect('login',ctx,{});
    }
    
    return {
      ...publicPageProps
    }
  }

  async componentDidMount(){
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