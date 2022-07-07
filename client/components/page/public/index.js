import TodaysComponent from '../../ui/TodaysComponent';

export class PublicPage extends TodaysComponent{
  static async getInitialProps(ctx){        
    return {token:null};
  }
}

export default PublicPage;