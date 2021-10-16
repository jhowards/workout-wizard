import React from "react";
import { connect } from "react-redux";

const mapStateToProps = (state) => ({
  user: state.user,
});

class Greeting extends React.Component {
  state = {
    hour: null,
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
    const { hour } = this.state;
    return (
      <h2>
        {hour < 12
          ? `Good Morning ${this.props.user.firstname}`
          : `Good Evening ${this.props.user.firstname}`}
      </h2>
    );
  }
}

export default connect(mapStateToProps)(Greeting);
