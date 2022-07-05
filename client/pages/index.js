import PublicPage from "../components/page/public";

export class Home extends PublicPage{

  static async getInitialProps(ctx){
    const publicPageProps = await super.getInitialProps(ctx);
    ctx.router.redirect('myAccount',ctx,{});
    
    return {
      ...publicPageProps
    }
  }

  render () {
    return <></>;
  }

}

export default Home;