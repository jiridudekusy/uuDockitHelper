import React from "react";
import createReactClass from "create-react-class";
import UU5 from "uu5g04";
import "uu5g04-bricks";
import ns from "ns";
import CodeKit from "uu5codekitg01";
import UuDockitUtils from "../utils/uuDockitUtils";
import bookkitMarkdownSnippet from "./bookkit-markdown.snippets";
import SnippetSelectModal from "./selectSnippetModal";
import {
  bookKitMdToUu5Plugin,
  desighKitMdToUu5Plugin,
  MarkdownToUuBookKit,
  mdToUu5Plugin,
  UU5CodeKitConverters,
  UU5ToMarkdown,
  UuAppDesignKitConverters,
  UuBookKitPlugin,
  UuBookKitToMarkdown
} from "uu5-to-markdown";

let md = `Ace (Ajax.org Cloud9 Editor)
============================

_Note_: The new site at http://ace.c9.io contains all the info below along with an embedding guide and all the other resources you need to get started with Ace.

Ace is a standalone code editor written in JavaScript. Our goal is to create a browser based editor that matches and extends the features, usability and performance of existing native editors such as TextMate, Vim or Eclipse. It can be easily embedded in any web page or JavaScript application. Ace is developed as the primary editor for [Cloud9 IDE](https://c9.io/) and the successor of the Mozilla Skywriter (Bespin) Project.

Features
--------

* Syntax highlighting for over 120 languages (TextMate/Sublime/_.tmlanguage_ files can be imported)
* Over 20 themes (TextMate/Sublime/_.tmtheme_ files can be imported)
* Automatic indent and outdent
* An optional command line
* Handles huge documents (at last check, 4,000,000 lines is the upper limit)
* Fully customizable key bindings including vim and Emacs modes
* Search and replace with regular expressions
* Highlight matching parentheses
* Toggle between soft tabs and real tabs
* Displays hidden characters
* Drag and drop text using the mouse
* Line wrapping
* Code folding
* Multiple cursors and selections
* Live syntax checker (currently JavaScript/CoffeeScript/CSS/XQuery)
* Cut, copy, and paste functionality

Take Ace for a spin!
--------------------

Check out the Ace live [demo](http://ace.c9.io/build/kitchen-sink.html) or get a [Cloud9 IDE account](https://c9.io/) to experience Ace while editing one of your own GitHub projects.

If you want, you can use Ace as a textarea replacement thanks to the [Ace Bookmarklet](http://ajaxorg.github.io/ace/build/demo/bookmarklet/index.html).
`;

export default createReactClass({
  //@@viewOn:mixins
  mixins: [UU5.Common.BaseMixin, UU5.Common.ElementaryMixin, UU5.ScreenSizeMixin],
  //@@viewOff:mixins

  //@@viewOn:statics
  statics: {
    tagName: ns.tag("UuDockitEditor")
    // classNames: {
    //   main: ns.css("uudockit-editor"),
    //   text: ns.css("uudockit-editor-text")
    // }
  },
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {
    // icon: PropTypes.string,
    // textPadding: PropTypes.string
  },
  //@@viewOff:propTypes

  //@@viewOn:getDefaultProps
  //@@viewOff:getDefaultProps

  //@@viewOn:standardComponentLifeCycle
  getInitialState() {
    this._mdr = new CodeKit.MarkdownRenderer("full", {
      html: true,
      xhtmlOut: true,
      typographer: true,
      highlight: true,
      headerLevel: 2
    });
    this._mdr.use(mdToUu5Plugin);
    this._mdr.use(desighKitMdToUu5Plugin, { markdownToUu5: this._mdr });
    this._mdr.use(bookKitMdToUu5Plugin);

    this._markdownToUuDocKit = new MarkdownToUuBookKit(this._mdr);

    this._uu5toMarkdown = new UU5ToMarkdown(
      new UU5CodeKitConverters(),
      new UuBookKitPlugin(),
      new UuAppDesignKitConverters()
    );

    this._uuDocKitToMarkdown = new UuBookKitToMarkdown(this._uu5toMarkdown);

    if (localStorage["lastMDDocKit"]) {
      console.log("loading last MD version from local storage");
      this.loadedFormStorage = true;
      this.mdValue = localStorage["lastMDDocKit"];
    } else {
      this.loadedFormStorage = false;
      this.mdValue = md;
    }

    return {
      mode: "md",
      pretty: true
    };
  },
  //@@viewOff:standardComponentLifeCycle

  //@@viewOn:interface
  setContent(content) {
    this.mdValue = this._uuDocKitToMarkdown.toMarkdown(JSON.stringify(content));
    this.setState({
      mode: "md"
    });
  },
  getContent() {
    let res = this._markdownToUuDocKit.toUuDocKit(this.mdValue, this.state.pretty);
    return JSON.parse(res);
  },
  //@@viewOff:interface

  //@@viewOn:overridingMethods
  //@@viewOff:overridingMethods

  //@@viewOn:componentSpecificHelpers
  onChangeMD(text) {
    console.log("onChangeMD - saving as last version to local storage");
    localStorage["lastMDDocKit"] = text.value;
    this.mdValue = text.value;
  },

  onChangeUuDocKit(text) {
    console.log("onChangeUudocKit");
    this.uuDocKitValue = text.value;
  },

  _setMode(mode) {
    if (this.state.mode !== mode) {
      if (mode === "md" && this.uuDocKitValue) {
        this.mdValue = this._uuDocKitToMarkdown.toMarkdown(this.uuDocKitValue);
        this.uuDocKitValue = null;
      }
      this.setState({
        mode: mode
      });
    }
  },

  _isMode(mode) {
    return this.state.mode === mode;
  },

  _getEditorSize() {
    let size;

    if (window.visualViewport) {
      size = window.visualViewport.height - 280;
    } else {
      //falback for browsers taht does not have visualVieport.
      // TOTO integrate polyfill
      size = 700;
    }

    if (size < 500) {
      size = 500;
    }

    return size;
  },
  _resetLocalStorage() {
    localStorage.clear();
    this.loadedFormStorage = false;
    this.mdValue = md;
    //trigger rerender
    this.setState({ mode: "md" });
  },
  _insertSnippet(name) {
    let snippets = this._snippetManager.snippetNameMap["markdown"];
    let snippet = snippets[name];
    if (snippet) {
      this._mdAceEditor.focus();
      this._mdAceEditor.insertSnippet(snippet.content);
    }
  },
  _insertComponent(input) {
    this._modal.close();
    this._insertSnippet(input.value);
  },
  _onBeforeLoadMd(ace) {
    if (this._snippetManager != undefined) {
      return;
    }
    this._snippetManager = ace.require("ace/snippets").snippetManager;
    let parsedSnippets = this._snippetManager.parseSnippetFile(bookkitMarkdownSnippet);
    parsedSnippets.map(snippet => {
      let res = Object.assign(snippet, {
        _content: snippet.content
      });
      Object.defineProperty(res, "content", {
        get: function() {
          let content = this._content;
          content = content.replace("__HEX32__", UU5.Common.Tools.generateUUID(32));
          content = content.replace("__HEX64__", UU5.Common.Tools.generateUUID(64));
          return content;
        }
      });
      return res;
    });
    // this._snippetManager.unregister(Object.values(this._snippetManager.snippetNameMap["markdown"]), "markdown");
    this._snippetManager.register(parsedSnippets, "markdown");
  },
  _onEditorLoad(editor) {
    this._mdAceEditor = editor;
    let editorComponent = this;
    editor.commands.addCommand({
      name: "insertComponent",
      bindKey: { win: "Alt-I", mac: "Command-J" },
      exec: function() {
        editorComponent._openModal();
      }
    });
  },
  _openModal() {
    this._modal.open(
      {
        content: (
          <SnippetSelectModal
            onSelect={this._insertComponent}
            snippets={Object.keys(this._snippetManager.snippetNameMap["markdown"])}
            ref_={snippetModal => (this._snippetModal = snippetModal)}
          />
        )
      },
      this._onSnippetModalOpen
    );
  },
  _onSnippetModalOpen() {
    //FIXME :  When set focus on modal window ?
    setTimeout(
      function() {
        this._snippetModal.focus();
      }.bind(this),
      100
    );
  },
  //@@viewOff:componentSpecificHelpers

  //@@viewOn:render
  render() {
    let r = "";
    if (this.state.mode === "preview" || this.state.mode === "uu5src") {
      if (this.uuDocKitValue) {
        r = UuDockitUtils.toUu5(this.uuDocKitValue);
      } else {
        r = this._markdownToUuDocKit.toUu5(this.mdValue, this.state.pretty);
      }
    } else if (this.state.mode === "uu5") {
      if (this.uuDocKitValue) {
        r = this.uuDocKitValue;
      } else {
        r = this._markdownToUuDocKit.toUuDocKit(this.mdValue, this.state.pretty);
      }
    }
    return (
      <UU5.Bricks.Div>
        <UU5.Bricks.Row>
          <UU5.Bricks.ButtonSwitch
            ref_={item => (this._mdSwitch = item)}
            switchedOn={this._isMode("md")}
            props={{
              onClick: () => {
                this._setMode("md");
              }
            }}
            onProps={{
              colorSchema: "success"
            }}
          >
            Markdown
          </UU5.Bricks.ButtonSwitch>
          <UU5.Bricks.ButtonSwitch
            ref_={item => (this._previewSwitch = item)}
            switchedOn={this._isMode("preview")}
            props={{
              onClick: () => {
                this._setMode("preview");
              }
            }}
            onProps={{
              colorSchema: "success"
            }}
          >
            Preview
          </UU5.Bricks.ButtonSwitch>
          <UU5.Bricks.ButtonSwitch
            ref_={item => (this._uu5Switch = item)}
            switchedOn={this._isMode("uu5")}
            props={{
              onClick: () => {
                this._setMode("uu5");
              }
            }}
            onProps={{
              colorSchema: "success"
            }}
          >
            uuBookKit
          </UU5.Bricks.ButtonSwitch>
          <UU5.Bricks.ButtonSwitch
            ref_={item => (this._uu5Switch = item)}
            switchedOn={this._isMode("uu5src")}
            props={{
              onClick: () => {
                this._setMode("uu5src");
              }
            }}
            onProps={{
              colorSchema: "success"
            }}
          >
            UU5 source
          </UU5.Bricks.ButtonSwitch>
        </UU5.Bricks.Row>
        <UU5.Bricks.Row hidden={!this._isMode("md")}>
          <UU5.Bricks.Modal header="Select Page" ref_={modal => (this._modal = modal)} />
          <UU5.Bricks.Button onClick={this._openModal}>Insert Component</UU5.Bricks.Button>
          {/*<UU5.Forms.Checkbox label="Pretty UU5(experimental)" ref_={input => this._prettyPrintSettings = input} type={2}/>*/}
          <UU5.Bricks.ButtonSwitch
            switchedOn={this.state.pretty}
            offProps={{
              onClick: () => {
                this.setState({ pretty: true });
              },
              content: "Pretty Off"
            }}
            onProps={{
              colorSchema: "success",
              onClick: () => {
                this.setState({ pretty: false });
              },
              content: "(Experimental) Pretty On"
            }}
          />
        </UU5.Bricks.Row>
        <UU5.Bricks.Row>
          <UU5.Bricks.Div hidden={!this._isMode("md")}>
            <UU5.Bricks.P>
              <UU5.Bricks.Link href="https://github.com/ajaxorg/ace/wiki/Default-Keyboard-Shortcuts" target="_blank">
                Keyboard Shortcuts
              </UU5.Bricks.Link>
            </UU5.Bricks.P>
            <UU5.Bricks.P hidden={!this.loadedFormStorage}>
              Last version has been loaded from local storage.
              <UU5.Bricks.Link onClick={this._resetLocalStorage}>Reset local storage</UU5.Bricks.Link>
            </UU5.Bricks.P>
            <CodeKit.MarkdownEditor
              value={this.mdValue}
              focus
              height={this._getEditorSize()}
              rows={0}
              onChange={this.onChangeMD}
              wrapEnabled={true}
              ref_={editor => (this._mdEditor = editor)}
              enableBasicAutocompletion={true}
              enableSnippets={true}
              onBeforeLoad={this._onBeforeLoadMd}
              onLoad={this._onEditorLoad}
            />
          </UU5.Bricks.Div>
          <UU5.Bricks.Div hidden={!this._isMode("uu5")}>
            <UU5.Bricks.P>
              <UU5.Bricks.Link href="https://github.com/ajaxorg/ace/wiki/Default-Keyboard-Shortcuts" target="_blank">
                Keyboard Shortcuts
              </UU5.Bricks.Link>
            </UU5.Bricks.P>

            <CodeKit.JsonEditor
              value={r}
              format="pretty"
              focus
              height={this._getEditorSize()}
              rows={0}
              onChange={this.onChangeUuDocKit}
              wrapEnabled={true}
            />
          </UU5.Bricks.Div>
          <UU5.Bricks.Div hidden={!this._isMode("preview")}>
            <UU5.Bricks.Div content={r} />
          </UU5.Bricks.Div>
          <UU5.Bricks.Div hidden={!this._isMode("uu5src")}>
            <CodeKit.Uu5StringEditor value={r} focus height={this._getEditorSize()} rows={0} />
          </UU5.Bricks.Div>
        </UU5.Bricks.Row>
      </UU5.Bricks.Div>
    );
  }
  //@@viewOff:render
});
