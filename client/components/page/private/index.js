import PublicPage     from "../public";
import { getSession, useSession } from "next-auth/react";

export class PrivatePage extends PublicPage{

  static async getInitialProps(ctx){
    const publicPageProps = await super.getInitialProps(ctx);
    
    return {
      ...publicPageProps
    }
  }

  async componentDidMount(){
    const session = await getSession(this.context);

    if (!session) {
      this.context.router.redirect('login',this.context,{});
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