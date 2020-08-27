import * as React from 'react';
import '../Less/app.less';
//import * as ProfilePicture from '../Assets/profile.png';
import SidePanel from './SidePanel/SidePanel'
import Content from './Content/Content'

export default class App extends React.Component {

  constructor(props: any) {
    super(props)
    this.state = {}
  }

  render() {
    return (
      <div className="app">
        <SidePanel />
        <Content />
      </div>
    );
  }
}
