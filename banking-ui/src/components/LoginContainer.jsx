import React, { Component } from "react";
import axios from "axios";
import FormComponent from "./FormComponent";

class Login extends Component {
  constructor() {
    super();
    this.state = {
      userName: "",
      password: "",
      newUser: false,
      isRegister: false,
      isFirstTime: false,
      securityQuestions: [
        "What is your favourite color",
        "Who is your favourite cricketer",
        "What is the name of your childhood superhero"
      ],
      answer: "",
      securityQuestion: ""
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSuccessRedirect = this.handleSuccessRedirect.bind(this);
    this.handleRedirect = this.handleRedirect.bind(this);
    this.handleNavigate = this.handleNavigate.bind(this);
  }

  handleNavigate() {
    this.props.history.push("/register");
  }

  handleRedirect() {
    if (this.state.newUser === false) {
      this.props.history.push("/customerLanding");
    } else {
      this.props.history.push("/customerRegistration");
    }
  }

  handleSuccessRedirect() {
    const { userName } = this.state;
    let name = {
      username: userName
    };
    console.log(name);
    let url1 = "http://localhost:8080/customers/findbyusername";
    // let newUser = false;
    sessionStorage.setItem("user", userName);
    axios.post(url1, name).then(response => {
      console.log(response.data);
      if (response.data === false) {
        this.setState({
          newUser: true
        });
      } else {
        this.setState({
          newUser: false
        });
      }
      this.handleRedirect();
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    let encrypt = {
      headers: {
        Authorization:
          "Basic " + btoa(this.state.userName + ":" + this.state.password)
      }
    };
    console.log(encrypt);
    let url = "http://localhost:8080/authenticate";
    axios
      .post(url, "", encrypt)
      .then(response => {
        if (response.status === 200) {
          this.setState({
            success: true
          });
          this.handleSuccessRedirect();
        }
      })
      .catch(error => {
        console.log(error);
      });
  }

  handleChange(event) {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  }

  render() {
    return (
      <React.Fragment>
        <FormComponent
          credentials={this.state}
          operation="Login"
          newUser={this.state.newUser}
          onHandleChange={this.handleChange}
          onHandleSubmit={this.handleSubmit}
        />
      </React.Fragment>
    );
  }
}

export default Login;
