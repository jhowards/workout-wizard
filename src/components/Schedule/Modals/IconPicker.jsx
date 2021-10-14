import React, { Component } from "react";
import FontIconPicker from "@re.d_beard./react-fonticonpicker";
import "@re.d_beard./react-fonticonpicker/dist/fonticonpicker.base-theme.react.css";
import "@re.d_beard./react-fonticonpicker/dist/fonticonpicker.material-theme.react.css";

class IconPicker extends Component {
  constructor(props) {
    super(props);
    if (this.props.edit === true) {
      this.state = {
        value: props.selectedIcon,
      };
    } else {
      this.state = {
        value: "",
      };
    }
  }
  handleChange = (value) => {
    this.setState({ value });
    this.props.setselectedIcon(value);
  };

  render() {
    const props = {
      icons: [
        "fas fa-bell fa-lg",
        "fas fa-address-card fa-lg",
        "fas fa-address-book fa-lg",
        "fas fa-anchor fa-lg",
        "fas fa-utensils fa-lg",
        "fas fa-futbol fa-lg",
        "fas fa-taxi fa-lg",
        "fas fa-shopping-cart fa-lg",
        "fas fa-shopping-basket fa-lg",
        "fas fa-camera fa-lg",
        "fas fa-key fa-lg",
        "fas fa-bed fa-lg",
        "fas fa-shower fa-lg",
        "fas fa-university fa-lg",
        "fas fa-handshake fa-lg",
        "fas fa-graduation-cap fa-lg",
        "fas fa-paw fa-lg",
        "fas fa-tv fa-lg",
        "fas fa-book fa-lg",
      ],
      theme: "bluegrey",
      renderUsing: "class",
      value: this.state.value,
      onChange: this.handleChange,
      isMulti: false,
      iconsPerPage: 15,
    };
    return <FontIconPicker {...props} />;
  }
}

export default IconPicker;
