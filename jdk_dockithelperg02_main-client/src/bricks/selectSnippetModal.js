import React from "react";
import createReactClass from "create-react-class";
import PropTypes from "prop-types";
import UU5 from "uu5g04";
import "uu5g04-bricks";
import ns from "ns";
import ReactSelect from "./react-select";

export default createReactClass({
  //@@viewOn:mixins
  mixins: [UU5.Common.BaseMixin, UU5.Common.ElementaryMixin],
  //@@viewOff:mixins

  //@@viewOn:statics
  statics: {
    tagName: ns.tag("UuDockitSelectSnippetModal")
  },
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {
    onSelect: PropTypes.func,
    snippets: PropTypes.array
  },
  //@@viewOff:propTypes

  //@@viewOn:getDefaultProps
  //@@viewOff:getDefaultProps

  //@@viewOn:standardComponentLifeCycle
  getInitialState() {
    let snippets = this.props.snippets.map(name => {
      return { value: name, label: name };
    });
    return { snippets };
  },
  //@@viewOff:standardComponentLifeCycle

  //@@viewOn:interface
  focus() {
    this._snippetCombo.focus();
  },
  //@@viewOff:interface

  //@@viewOn:overridingMethods
  //@@viewOff:overridingMethods

  //@@viewOn:componentSpecificHelpers
  _handleSnippetSelect(value) {
    if (this.props.onSelect) {
      this.props.onSelect(value);
    }
  },
  //@@viewOff:componentSpecificHelpers

  //@@viewOn:render
  render() {
    return (
      <UU5.Bricks.Div style={{ marginBottom: "100%" }} {...this.getMainPropsToPass()}>
        <ReactSelect
          label="Component"
          style={{ marginBottom: "100%" }}
          onChange={this._handleSnippetSelect}
          options={this.state.snippets}
          ref_={combo => (this._snippetCombo = combo)}
        />
      </UU5.Bricks.Div>
    );
  }
  //@@viewOff:render
});
