import React from "react";
import createReactClass from "create-react-class";
import PropTypes from "prop-types";
import UU5 from "uu5g04";
import "uu5g04-bricks";
import ns from "ns";
import UuDockitSetBook from "../bricks/uuDockit-setBook";
import UuDockitPageSelect from "../bricks/uuDockit-selectPage";

export default createReactClass({
  //@@viewOn:mixins
  mixins: [UU5.Common.BaseMixin, UU5.Common.ElementaryMixin],
  //@@viewOff:mixins

  //@@viewOn:statics
  statics: {
    tagName: ns.tag("UuDockitSelectPageModal")
    // classNames: {
    //   main: ns.css("uudockit-editor"),
    //   text: ns.css("uudockit-editor-text")
    // }
  },
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {
    onSelect: PropTypes.func
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
  _handleBookChange(book) {
    console.log(`changing book to ${JSON.stringify(book)}`);
    this.setState({
      book: book
    });
  },
  _getSelectPageComponent() {
    if (this.state.book) {
      console.log("Book state: " + JSON.stringify(this.state.book, null, 2));
      return (
        <UU5.Bricks.Div style={{ marginBottom: "100%" }}>
          <UuDockitPageSelect onSelect={this._handlePageChange} book={this.state.book} />
          <UU5.Bricks.Button onClick={this._handlePageSelect}>Select Page</UU5.Bricks.Button>
        </UU5.Bricks.Div>
      );
    }
  },
  _handlePageChange(pageCode) {
    this.setState({ pageCode: pageCode });
  },
  _handlePageSelect() {
    if (this.props.onSelect) {
      this.props.onSelect({
        book: this.state.book,
        code: this.state.pageCode
      });
    }
  },
  //@@viewOff:componentSpecificHelpers

  //@@viewOn:render
  render() {
    return (
      <UU5.Bricks.Div {...this.getMainPropsToPass()}>
        <UuDockitSetBook onBookSet={this._handleBookChange} />
        {this._getSelectPageComponent()}
      </UU5.Bricks.Div>
    );
  }
  //@@viewOff:render
});
