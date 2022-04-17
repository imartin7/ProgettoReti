import {Component}  from 'react';
import Context      from '../../context';

export class TodaysComponent extends Component{
  static contextType  = Context;
  constructor(props,context){
    super(props,context);

    if(context){
      const { router } = context;
      if(router){
        this.router = router;
      }
    }
  }
}

export default TodaysComponent;
