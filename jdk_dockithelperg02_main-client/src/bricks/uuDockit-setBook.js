import React from "react";
import createReactClass from "create-react-class";
import UU5 from "uu5g04";
import "uu5g04-bricks";
import ns from "ns";
import { Uri } from "uu_appg01_core";
import PropTypes from "prop-types";

import "./uuDockit-setBook.less";

export default createReactClass({
  //@@viewOn:mixins
  mixins: [UU5.Common.BaseMixin, UU5.Common.ElementaryMixin],
  //@@viewOff:mixins

  //@@viewOn:statics
  statics: {
    tagName: ns.tag("UuDockitSetBook"),
    classNames: {
      main: ns.css("uudockit-setbook"),
      input: ns.css("uudockit-setbook-input"),
      button: ns.css("uudockit-setbook-button")
    }
  },
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {
    onBookSet: PropTypes.func
  },
  //@@viewOff:propTypes

  //@@viewOn:getDefaultProps
  //@@viewOff:getDefaultProps

  //@@viewOn:standardComponentLifeCycle
  //@@viewOff:standardComponentLifeCycle

  //@@viewOn:interface
  //@@viewOff:interface

  //@@viewOn:overridingMethods
  //@@viewOff:overridingMethods

  //@@viewOn:componentSpecificHelpers
  _onSetBook() {
    this.setState({
      bookUri: this._bookUriInput.getValue()
    });
    let uri = Uri.UriBuilder.parse(this._bookUriInput.getValue());
    let book = {
      workspace: uri.workspace
    };
    if (this.props.onBookSet) {
      this.props.onBookSet(book);
    }
  },
  //@@viewOff:componentSpecificHelpers

  //@@viewOn:render
  render() {
    return (
      <UU5.Bricks.Div className={this.getClassName("main")}>
        <UU5.Forms.Text
          label="Book URI"
          placeholder="Book URI"
          value={this.state.bookUri}
          ref_={input => (this._bookUriInput = input)}
          className={this.getClassName("input")}
        />
        <UU5.Bricks.Button onClick={this._onSetBook} className={this.getClassName("button")}>
          Set Book
        </UU5.Bricks.Button>
      </UU5.Bricks.Div>
    );
  }
  //@@viewOff:render
});
