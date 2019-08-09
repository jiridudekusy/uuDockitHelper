import React from "react";
import createReactClass from "create-react-class";
import UU5 from "uu5g04";
import "uu5g04-bricks";
import "uu_plus4u5g01-bricks";
import ns from "ns";
import UuDockitEditor from "../bricks/uuDockit-editor";
import UuDockitSelectPageModal from "../bricks/uuDockit-selectPageModal";
import Calls from "../calls";
import { Uri } from "uu_appg01_core";
import PropTypes from "prop-types";

const Home = createReactClass({
  //@@viewOn:mixins
  mixins: [
    UU5.Common.BaseMixin,
    UU5.Common.ElementaryMixin,
    UU5.Common.RouteMixin,
    UU5.Common.CallsMixin,
    UU5.Common.CcrReaderMixin
  ],
  //@@viewOff:mixins

  //@@viewOn:statics
  statics: {
    tagName: ns.tag("NotAuthenticated"),
    // classNames: {
    //   main: ns.css("home"),
    //   welcomeRow: ns.css("home-welcome-row"),
    //   welcome: ns.css("home-welcome")
    // }
    calls: {
      loadPage: "loadUuDockitPage",
      updatePage: "updateUuDockitPage"
    }
  },
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {
    params: PropTypes.object
  },
  //@@viewOff:propTypes

  //@@viewOn:getDefaultProps
  //@@viewOff:getDefaultProps

  //@@viewOn:standardComponentLifeCycle
  getInitialState() {
    if (this.props.params && this.props.params.page) {
      let uri = Uri.UriBuilder.parse(this.props.params.page);
      let page = {
        book: {
          workspace: uri.workspace
        },
        code: uri.parameters.code
      };
      return {
        page
      };
    }
  },
  componentWillMount() {
    // Calls could be set by prop calls by parent component or by interface inside of component like here.
    this.setCalls(Calls);
  },
  componentDidMount() {
    if (this.state.page) {
      this._loadPage(this.state.page);
    }
  },

  //@@viewOff:standardComponentLifeCycle

  //@@viewOn:interface
  //@@viewOff:interface

  //@@viewOn:overridingMethods
  //@@viewOff:overridingMethods

  //@@viewOn:componentSpecificHelpers

  _handlePageChange(page) {
    this._modal.close();
    this._loadPage(page);
  },

  _loadPage(page) {
    console.log(`changing page to ${JSON.stringify(page)}`);
    this.setState({ page: page });
    let call = this.getCall("loadPage");
    call({
      data: {
        code: page.code,
        workspace: page.book.workspace
      },
      done: dtoOut => {
        this.setState({ pageRev: dtoOut.sys.rev });
        // this.setState({callFeedback: "ready", joke: dtoOut.data})
        this._editor.setContent(dtoOut);
        this._alertBus.addAlert({
          content: `Page "${page.code}" has been loaded.`
        });
        document.title = this.getLsiItem(dtoOut.name) + " - jdkBookKitHelper";
      },
      fail: dtoOut => {
        this._alertBus.addAlert({
          content: `Page "${page.code}" cannot be loaded. Error : "${JSON.stringify(dtoOut)}"`,
          colorSchema: "red",
          closeTimer: 0
        });
        document.title = this.getLsiItem(dtoOut.name) + " - jdkBookKitHelper";
      }
    });
  },
  _saveContent() {
    console.log("Save content");
    let dtoIn = this._editor.getContent();

    dtoIn.workspace = this.state.page.book.workspace;
    dtoIn.sys = { rev: this.state.pageRev };

    let call = this.getCall("updatePage");
    call({
      data: dtoIn,
      done: dtoOut => {
        this._alertBus.addAlert({
          content: `Page "${dtoIn.code}" has been saved.`
        });
        this.setState({ pageRev: dtoOut.sys.rev });

        //TODO There should be error hanling around this method !!!!
        this._editor.setContent(dtoOut);
        // this.setState({callFeedback: "ready", joke: dtoOut.data})
      },
      fail: dtoOut => {
        this._alertBus.addAlert({
          content: `Page "${dtoIn.code}" cannot be saved. Error : "${JSON.stringify(dtoOut)}"`,
          colorSchema: "red",
          closeTimer: 0
        });
        // this.setState({callFeedback: "error"})
      }
    });
  },
  _generateSaveContent() {
    if (this.state.pageRev !== undefined) {
      return <UU5.Bricks.Button onClick={this._saveContent}>Save Page</UU5.Bricks.Button>;
    }
  },
  _openModal() {
    this._modal.open({ content: <UuDockitSelectPageModal onSelect={this._handlePageChange} /> });
  },
  _onCloseModal() {},
  //@@viewOff:componentSpecificHelpers

  //@@viewOn:render
  render() {
    return (
      <UU5.Bricks.Div {...this.getMainPropsToPass()}>
        <UU5.Bricks.AlertBus ref_={alert => (this._alertBus = alert)} closeTimer={3000} />
        <UU5.Bricks.Modal header="Select Page" ref_={modal => (this._modal = modal)} />
        <UU5.Bricks.Button onClick={this._openModal}>Load Page</UU5.Bricks.Button>
        {this._generateSaveContent()}
        <UuDockitEditor ref_={editor => (this._editor = editor)} />
      </UU5.Bricks.Div>
    );
  }
  //@@viewOff:render
});

export default Home;
