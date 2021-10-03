import React from "react";
class Greeting extends React.Component {
  state = {
    hour: null,
    username: "James",
  };

  componentDidMount() {
    this.getHour();
  }

  getHour = () => {
    const date = new Date();
    const hour = date.getHours();
    this.setState({
      hour,
    });
  };

  render() {
    const { hour, username } = this.state;
    return (
      <h2>
        {hour < 12 ? `Good Morning ${username}` : `Good Evening ${username}`}
      </h2>
    );
  }
}
export default Greeting;
