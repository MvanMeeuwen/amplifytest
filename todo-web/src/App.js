import React, { Component } from 'react';
import logo from './qalogo.svg';
import './App.css';
import Amplify, {API, Auth} from 'aws-amplify';
import { withAuthenticator} from 'aws-amplify-react';

Amplify.configure({
  Auth: {
      userPoolId: 'eu-west-1_YTEukGzRd',
      userPoolWebClientId: '18bq0gviedt7n1c0a48modi9pq',
      identityPoolId: 'eu-west-1:c0801ff1-f57b-4b77-9c3c-ad583c677445',
      region: 'eu-west-1',
  },
  API: {
      endpoints: [
          {
              name: "TodoAPI",
              endpoint: "https://4rxy8dospk.execute-api.eu-west-1.amazonaws.com/api/",
              custom_header: async () => {
                 return { Authorization: (await Auth.currentSession()).idToken.jwtToken }
              }
          }
        ]
      }
    }
 );

class App extends Component {
  state = {test: [],
            user: []}

  componentDidMount() {
    API.get("TodoAPI", "todo").then(response => {
      console.log("response", response);
      this.setState({test: response['test'],
                            user: response['user']});
    }).catch(error =>{
      console.log(error.response)
    })
  }

  render() {
    return (
<div className="App">
       <header className="App-header">
         <img src={logo} className="App-logo" alt="logo" />

         <p>
           The current user is {this.state.user}
         </p>
       </header>
     </div>
    );
  }
}

export default withAuthenticator(App);
