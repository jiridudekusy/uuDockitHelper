import React from "react";
import createReactClass from "create-react-class";
import UU5 from "uu5g04";
import "uu5g04-bricks";
import "uu_plus4u5g01-bricks";
import ns from "ns";
import Uu5MdtEditor from "../bricks/uu5md-editor";
import PropTypes from "prop-types";

const Help = createReactClass({
  //@@viewOn:mixins
  mixins: [UU5.Common.BaseMixin, UU5.Common.ElementaryMixin, UU5.Common.RouteMixin],
  //@@viewOff:mixins

  //@@viewOn:statics
  statics: {
    tagName: ns.tag("NotAuthenticated")
  },
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {
    content: PropTypes.string
  },
  //@@viewOff:propTypes

  //@@viewOn:getDefaultProps
  //@@viewOff:getDefaultProps

  //@@viewOn:standardComponentLifeCycle
  componentDidMount() {
    this._editor.setMdContent(this.props.content);
  },
  componentWillReceiveProps(newProps) {
    this._editor.setMdContent(newProps.content);
  },
  //@@viewOff:standardComponentLifeCycle

  //@@viewOn:interface
  //@@viewOff:interface

  //@@viewOn:overridingMethods
  //@@viewOff:overridingMethods

  //@@viewOn:componentSpecificHelpers
  //@@viewOff:componentSpecificHelpers

  //@@viewOn:render
  render() {
    return (
      <div>
        <Uu5MdtEditor ref_={editor => (this._editor = editor)} />
      </div>
    );
  }
  //@@viewOff:render
});

export default Help;
