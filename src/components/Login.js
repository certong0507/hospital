import React from 'react';

class Login extends React.Component {

   constructor(props) {
      super(props);
      this.state = {
         username: '',
         password: '',
         message: ''
      };

      this.handleUsernameChange = this.handleUsernameChange.bind(this);
      this.handlePasswordChange = this.handlePasswordChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
   }

   handleUsernameChange(e) {
      this.setState({ username: e.target.value });
   }

   handlePasswordChange(e) {
      this.setState({ password: e.target.value });
   }

   handleInputValidation() {
      if ((this.state.username) && (this.state.password)) {
         return true;
      }
      return false;
   }

   handleSubmit(e) {
      e.preventDefault();

      if (this.handleInputValidation()) {
         const url = 'http://localhost:5000/api/user/' + this.state.username + '/' + this.state.password;

         fetch(url, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
         }).then(response => response.json())
            .then((json) => {
               console.log(json);

               if (json.length > 0) {
                  this.props.history.push({
                     pathname: '/cms',
                     state: {
                        loginInfoObj: json
                     }
                  });
               } else {
                  this.setState({
                     username: '',
                     password: '',
                     message: "Wrong username or password"
                  });
               }

            })
            .catch((err) => {
               console.log(err)
            })

         // fetch('http://localhost:5000/api/letters')
         //    .then(response => response.json())
         //    .then(json => console.log(json))
         //    .catch((err) => {
         //       console.log(err);
         //    })

         // fetch('https://jsonplaceholder.typicode.com/todos/1')
         //    .then(response => response.json())
         //    .then(json => console.log(json))
      }else{
         this.setState({
            message: 'Username and Password cannot be empty'
         })
      }
   }

   render() {
      return (
         <div>
            <h2>Login Page</h2>
            <form onSubmit={this.handleSubmit} >
               <div className="form_input_wrapper">
                  <label>Username: </label>
                  <input type="text" name="username" value={this.state.username} onChange={this.handleUsernameChange} />
               </div>

               <div className="form_input_wrapper">
                  <label>Password: </label>
                  <input type="text" name="password" value={this.state.password} onChange={this.handlePasswordChange} />
               </div>

               <input type="submit" value="Login" />
            </form>
            <div>
               <h3>
                  {this.state.message}
               </h3>
            </div>
         </div>
      );
   }
}

export default Login;