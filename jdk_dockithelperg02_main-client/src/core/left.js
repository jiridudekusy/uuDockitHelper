import React from "react";
import createReactClass from "create-react-class";
import PropTypes from "prop-types";
import UU5 from "uu5g04";
import Plus4U5 from "uu_plus4u5g01";
import "uu5g04-bricks";
import ns from "ns";

import Lsi from "./lsi.js";
import "./left.less";

export const Left = createReactClass({
  //@@viewOn:mixins
  mixins: [UU5.Common.BaseMixin, UU5.Common.ElementaryMixin, UU5.Common.CcrReaderMixin],
  //@@viewOff:mixins

  //@@viewOn:statics
  statics: {
    tagName: ns.tag("Left"),
    classNames: {
      main: ns.css("left"),
      menu: ns.css("left-menu"),
      menuItem: ns.css("left-menu-item"),
      aboutAuth: ns.css("about-authors"),
      aboutApp: ns.css("about-app")
    },
    lsi: Lsi.leftLinks
  },
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {
    home: PropTypes.bool
  },
  //@@viewOff:propTypes

  //@@viewOn:getDefaultProps
  getDefaultProps() {
    return {
      home: null
    };
  },
  //@@viewOff:getDefaultProps

  //@@viewOn:standardComponentLifeCycle
  //@@viewOff:standardComponentLifeCycle

  //@@viewOn:interface
  //@@viewOff:interface

  //@@viewOn:overridingMethods
  //@@viewOff:overridingMethods

  //@@viewOn:componentSpecificHelpers
  _setRoute(url) {
    this.getCcrComponentByKey(UU5.Environment.CCRKEY_ROUTER) &&
      this.getCcrComponentByKey(UU5.Environment.CCRKEY_ROUTER).setRoute(url.code);
  },
  _getItems() {
    return [
      {
        content: "Home",
        code: "/home",
        indent: 0
      },
      {
        content: "Editor",
        code: "/editor",
        indent: 0
      },
      {
        indent: 0,
        content: '<uu5string/>Documentation <UU5.Bricks.Badge content="new" colorSchema="default"/>',
        code: "/help"
      },
      {
        indent: 1,
        content: '<uu5string/>General <UU5.Bricks.Badge content="new" colorSchema="default"/>'
      },
      {
        code: "/help/snippets",
        indent: 2,
        content: '<uu5string/>Snippets <UU5.Bricks.Badge content="new" colorSchema="default"/>'
      },
      {
        indent: 1,
        content: '<uu5string/>Components <UU5.Bricks.Badge content="new" colorSchema="default"/>'
      },
      {
        code: "/help/uuContentKit",
        indent: 2,
        content: '<uu5string/>uuContentKit <UU5.Bricks.Badge content="new" colorSchema="default"/>'
      },
      {
        indent: 1,
        content: '<uu5string/>Changelog <UU5.Bricks.Badge content="new" colorSchema="default"/>'
      },
      {
        code: "/help/changelog",
        indent: 2,
        content: '<uu5string/>jdkBookKit Helper <UU5.Bricks.Badge content="new" colorSchema="default"/>'
      },
      {
        href: "https://github.com/jiridudekusy/uu5-to-markdown/blob/master/doc/CHANGELOG.md",
        indent: 2,
        content: '<uu5string/>UU5 to Markdown <UU5.Bricks.Badge content="new" colorSchema="default"/>'
      },
      {
        content: "About",
        code: "/about",
        indent: 0
      }
    ];
  },

  //@@viewOff:componentSpecificHelpers

  //@@viewOn:render
  render() {
    return (
      <UU5.Bricks.Div {...this.getMainPropsToPass()}>
        <Plus4U5.App.Menu
          ref_={ref => (UU5.Environment.App.menuRef = ref)}
          className={this.getClassName("menu")}
          items={this._getItems()}
          onClick={this._setRoute}
        />
      </UU5.Bricks.Div>
    );
  }
  //@@viewOff:render
});

export default Left;
