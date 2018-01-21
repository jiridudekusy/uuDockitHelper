import React from "react";
import createReactClass from "create-react-class";
import UU5 from "uu5g04";
import "uu5g04-bricks";
import "uu_plus4u5g01-bricks";
import ns from "ns";
import UuDockitSetBook from '../bricks/uuDockit-setBook';
import UuDockitPageSelect from '../bricks/uuDockit-selectPage';
import UuDockitEditor from '../bricks/uuDockit-editor';
import Calls from '../calls'

const Home = createReactClass({
  //@@viewOn:mixins
  mixins: [UU5.Common.BaseMixin, UU5.Common.ElementaryMixin, UU5.Common.RouteMixin, UU5.Common.CallsMixin, UU5.Common.CcrReaderMixin],
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
      loadPage: 'loadUuDockitPage',
      updatePage: 'updateUuDockitPage'
    }
  },
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {},
  //@@viewOff:propTypes

  //@@viewOn:getDefaultProps
  //@@viewOff:getDefaultProps

  //@@viewOn:standardComponentLifeCycle
  componentWillMount() {
    // Calls could be set by prop calls by parent component or by interface inside of component like here.
    this.setCalls(Calls);
  },
  getInitialState() {
    return {counter: 1}
  },
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
  _handlePageChange(pageCode) {
    console.log(`changing page to ${pageCode}`);
    this.setState({page: pageCode});
    let call = this.getCall("loadPage");
    call({
      data: {
        code: pageCode,
        tid: this.state.book.tid,
        awid: this.state.book.awid
      },
      done: (dtoOut) => {
        console.log(dtoOut);
        this.setState({pageRev: dtoOut.sys.rev});
        // this.setState({callFeedback: "ready", joke: dtoOut.data})
        this._editor.setContent(dtoOut);
      },
      fail: (dtoOut) => {
        this.showError("loadError", null, {context: {dtoOut: dtoOut}});
        // this.setState({callFeedback: "error"})
      }
    });
  },
  _getSelectPageComponent() {
    if (this.state.book) {
      return (<UuDockitPageSelect onSelect={this._handlePageChange} book={this.state.book}/>)
    }
  },
  _saveContent() {
    console.log("Save content");
    let dtoIn = this._editor.getContent();

    dtoIn.tid = this.state.book.tid;
    dtoIn.awid = this.state.book.awid;
    dtoIn.sys = {rev: this.state.pageRev};

    let call = this.getCall("updatePage");
    call({
      data: dtoIn,
      done: (dtoOut) => {
        console.log(dtoOut);
        this.setState({pageRev: dtoOut.sys.rev});
        // this.setState({callFeedback: "ready", joke: dtoOut.data})
      },
      fail: (dtoOut) => {
        this.showError("loadError", null, {context: {dtoOut: dtoOut}});
        // this.setState({callFeedback: "error"})
      }
    });
  },
  _generateSaveContent() {
    if (this.state.pageRev) {
      return (<UU5.Bricks.Button onClick={this._saveContent}>Save Page</UU5.Bricks.Button>);
    }
  },
  _openModal() {
    this.setState({modalShown: true});
  },
  _onCloseModal() {
    this.setState({modalShown: false});
  },
  //@@viewOff:componentSpecificHelpers

  //@@viewOn:render
  render() {
    return (
        <UU5.Bricks.Div {...this.getMainPropsToPass()}>
          <UU5.Bricks.Modal
              shown={this.state.modalShown}
              ref_={(modal) => this._modal = modal}
              onClose={this._onCloseModal}
          >
            <UU5.Bricks.Div>
              <UU5.Bricks.P> </UU5.Bricks.P>
              <UU5.Bricks.P> </UU5.Bricks.P>
              <UU5.Bricks.P> </UU5.Bricks.P>
              <UuDockitSetBook onBookSet={this._handleBookChange}/>
              {this._getSelectPageComponent()}
              <UU5.Bricks.P> </UU5.Bricks.P>
              <UU5.Bricks.P> </UU5.Bricks.P>
              <UU5.Bricks.P> </UU5.Bricks.P>
              <UU5.Bricks.P> </UU5.Bricks.P>
              <UU5.Bricks.P> </UU5.Bricks.P>
            </UU5.Bricks.Div>
          </UU5.Bricks.Modal>
          <UU5.Bricks.Button onClick={this._openModal}>Load Page</UU5.Bricks.Button>
          {this._generateSaveContent()}
          <UuDockitEditor ref_={(editor) => this._editor = editor}/>
        </UU5.Bricks.Div>
    );
  }
  //@@viewOff:render
});

export default Home;
