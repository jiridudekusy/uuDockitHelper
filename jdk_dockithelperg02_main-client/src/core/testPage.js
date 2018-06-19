import React from "react";
import createReactClass from "create-react-class";
import UU5 from "uu5g04";
import "uu5g04-bricks";
import "uu_plus4u5g01-bricks";
import ns from "ns";

const Home = createReactClass({
  //@@viewOn:mixins
  mixins: [UU5.Common.BaseMixin, UU5.Common.ElementaryMixin, UU5.Common.RouteMixin],
  //@@viewOff:mixins

  //@@viewOn:statics
  statics: {
    tagName: ns.tag("NotAuthenticated")
  },
  //@@viewOff:statics

  //@@viewOn:propTypes
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
  _selectValue(input) {
    this.setState({
      myValue: input.value
    });
  },
  _createSelectBox() {
    let items = [];
    items.push(<UU5.Forms.Select.Option value="item1">Test 1</UU5.Forms.Select.Option>);
    items.push(<UU5.Forms.Select.Option value="item2">Test 2</UU5.Forms.Select.Option>);
    items.push(<UU5.Forms.Select.Option value="item3">Test 3</UU5.Forms.Select.Option>);

    return (
      <UU5.Forms.Select
        value={this.state.myValue}
        onChange={this._selectValue}
        label="test"
        {...this.getMainPropsToPass()}
      >
        {items}
      </UU5.Forms.Select>
    );
  },
  //@@viewOff:componentSpecificHelpers

  //@@viewOn:render
  render() {
    return this._createSelectBox();
  }
  //@@viewOff:render
});

export default Home;
