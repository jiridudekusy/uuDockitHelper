import React from "react";
import createReactClass from "create-react-class";
import UU5 from "uu5g04";
import "uu5g04-bricks";
import ns from "ns";
import CodeKit from "uu5codekitg01";
import bookkitMarkdownSnippet from "./bookkit-markdown.snippets";
import SnippetSelectModal from "./selectSnippetModal";
import {
  bookKitMdToUu5Plugin,
  desighKitMdToUu5Plugin,
  mdToUu5Plugin,
  UU5CodeKitConverters,
  UU5Prettifyer,
  UU5ToMarkdown,
  UuAppDesignKitConverters,
  UuBookKitPlugin
} from "uu5-to-markdown";

let md = `
`;

export default createReactClass({
  //@@viewOn:mixins
  mixins: [UU5.Common.BaseMixin, UU5.Common.ElementaryMixin, UU5.ScreenSizeMixin],
  //@@viewOff:mixins

  //@@viewOn:statics
  statics: {
    tagName: ns.tag("Uu5MdEditor")
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

    this._uu5toMarkdown = new UU5ToMarkdown(
      new UU5CodeKitConverters(),
      new UuBookKitPlugin(),
      new UuAppDesignKitConverters()
    );
    this._uu5pretifier = new UU5Prettifyer();

    return {
      mode: "preview",
      pretty: true
    };
  },
  //@@viewOff:standardComponentLifeCycle

  //@@viewOn:interface
  setMdContent(content) {
    this.mdValue = content;
    this.setState({
      mode: "preview"
    });
  },
  getMdContent() {
    return this._mdValue;
  },
  //@@viewOff:interface

  //@@viewOn:overridingMethods
  //@@viewOff:overridingMethods

  //@@viewOn:componentSpecificHelpers

  _setMode(mode) {
    if (this.state.mode !== mode) {
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
      r = this._mdr.render(this.mdValue);
      if (this.state.pretty) {
        r = r.substring("<uu5string/>".length);
        r = this._uu5pretifier.prettify(r);
        console.log(r);
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
