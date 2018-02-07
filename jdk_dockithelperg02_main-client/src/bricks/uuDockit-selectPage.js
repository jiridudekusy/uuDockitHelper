import React from "react";
import createReactClass from "create-react-class";
import PropTypes from "prop-types";
import UU5 from "uu5g04";
import "uu5g04-bricks";
import ns from "ns";

import Calls from "../calls";

export default createReactClass({
  //@@viewOn:mixins
  mixins: [UU5.Common.BaseMixin, UU5.Common.ElementaryMixin, UU5.Common.LoadMixin, UU5.Common.LsiMixin],
  //@@viewOff:mixins

  //@@viewOn:statics
  statics: {
    tagName: ns.tag("UuDockitSelectPage"),
    // classNames: {
    //   main: ns.css("uudockit-editor"),
    //   text: ns.css("uudockit-editor-text")
    // }
    calls: {
      onLoad: "loadUuDockitBook"
    }
  },
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {
    onSelect: PropTypes.func,
    book: PropTypes.object
    // description: PropTypes.string,
    // textPadding: PropTypes.string
  },
  //@@viewOff:propTypes

  //@@viewOn:getDefaultProps
  //@@viewOff:getDefaultProps

  //@@viewOn:standardComponentLifeCycle
  componentWillMount() {
    // Calls could be set by prop calls by parent component or by interface inside of component like here.
    this.setCalls(Calls);
  },
  //@@viewOff:standardComponentLifeCycle

  //@@viewOn:interface
  //@@viewOff:interface

  //@@viewOn:overridingMethods
  getOnLoadData_(props) {
    return props.book;
  },
  //@@viewOff:overridingMethods

  //@@viewOn:componentSpecificHelpers
  _getChild(dtoOut) {
    let pages = [];
    dtoOut.menu.forEach((page) => (pages.push(...this._transformPage(0, page))));

    return (
      <UU5.Forms.Select label="uuDocKit Page" value={this.state.code} onChange={this._selectPage} {...this.getMainPropsToPass()}>
        {pages}
      </UU5.Forms.Select>);
  },

  _transformPage(indent, page) {
    let prefix = "<uu5string/> " + Array(page.indent + 1).join("-");
    let res = [];
    let label = this._getPageLabel(page);

    if (label.startsWith("<uu5string/>")) {
      label = label.substring("<uu5string/>".length);
    }

    res.push((<UU5.Forms.Select.Option key={page.page} value={page.page}>{prefix + label}</UU5.Forms.Select.Option>));
    if (page.itemList) {
      page.itemList.forEach((item) => res.push(...this._transformPage(indent + 1, item)));
    }
    return res;
  },

  _getPageLabel(page) {
    let label = page.page;
    if (page.label[this.getLanguage()]) {
      label = page.label[this.getLanguage()];
    }
    return label;
  },

  // TODO why after select the value is not visible ?!!
  _selectPage(input) {
    let code = input.value;
    this.setState({
      code: code
    });
    if (this.props.onSelect) {
      this.props.onSelect(code);
    }
  },
  //@@viewOff:componentSpecificHelpers

  //@@viewOn:render
  render() {
    return this.getLoadFeedbackChildren(this._getChild);
  }
  //@@viewOff:render
});
