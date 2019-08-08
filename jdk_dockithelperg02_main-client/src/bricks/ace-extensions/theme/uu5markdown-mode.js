
export default function registerUu5Mode(ace) {
  ace.define("ace/mode/uu5Markdown-highligh-rules", (require, aceExports, aceModule) => {
    let MarkdownHighlightRules = require("./markdown_highlight_rules").MarkdownHighlightRules;
    let oop = require("ace/lib/oop");
    let UU5MarkdownHighlightRules = function () {
      MarkdownHighlightRules.call(this);
      let codeBlockStartRule = {
        token: "support.function",
        regex: /^\s*(```+[^`]*|~~~+[^~]*)$/,
        onMatch: function (value, state, stack, line) {
          var m = value.match(/^(\s*)([`~]+)(.*)/);
          var language = /[\w-]+|$/.exec(m[3])[0];
          // TODO lazy-load modes
          if (!modes[language]) {
            language = "";
          }
          stack.unshift("githubblock", [], [m[1], m[2], language], state);
          return this.token;
        },
        next: "githubblock"
      };

      this.$rules["start"].unshift({
        token: "uu5markup.algorithm-start",
        regex: /^\{algorithm\}/,
        next: "algorithm-start"
      });
      var lang = require("../lib/lang");
      var escaped = function (ch) {
        return "(?:[^" + lang.escapeRegExp(ch) + "\\\\]|\\\\.)*";
      };
      this.addRules({
        "algorithm-start": [
          {
            token: "uu5markup.algorithm-end",
            regex: /^\{\/algorithm\}/,
            next: "start"
          },
          { // list
            token: "markup.list",
            regex: "^\\s{0,3}(?:[*+-]|\\d+\\.)\\s+",
            next: "algorithm-listblock-start"
          }
        ],
        "algorithm-listblock-start": [
          {
            token: "support.variable",
            regex: /(?:\[[ x]\])?/,
            next: "algorithm-listblock"
          }
        ],
        "algorithm-listblock": [
          { // Lists only escape on completely blank lines.
            token: "empty_line",
            regex: "^$",
            next: "algorithm-start"
          },
          { // list
            token: "markup.list",
            regex: "^\\s{0,20}(?:[*+-]|((\\d+)|[A-Z])\\.)\\s+",
            next: "algorithm-listblock-start"
          },
          {
            token: "uu5algorithm-step-common.uu5algorithm-sequence",
            regex: "Sequence:"
          },
          {
            token: "uu5algorithm-step-common.uu5algorithm-step",
            regex: "Step:"
          },
          {
            token: "uu5algorithm-step-common.uu5algorithm-warning",
            regex: "Warning:"
          },
          {
            token: "uu5algorithm-step-common.uu5algorithm-error",
            regex: "Error:"
          },
          {
            token: "uu5algorithm-errorCode",
            regex: "Code:"
          },
          {
            token: "uu5algorithm-errorMessage",
            regex: "Message:"
          },
          {
            token: "uu5algorithm-errorParams",
            regex: "Params:"
          },
          {
            token: "uu5algorithm-step-common.uu5algorithm-iteration",
            regex: "Iteration:"
          },
          {
            token: "uu5algorithm-step-common.uu5algorithm-selectionif",
            regex: "SelectionIf:"
          },
          {
            token: "uu5algorithm-step-common.uu5algorithm-if",
            regex: "If:"
          },
          {
            token: "uu5algorithm-step-common.uu5algorithm-elseif",
            regex: "ElseIf:"
          },
          {
            token: "uu5algorithm-step-common.uu5algorithm-else",
            regex: "Else:"
          },
          {
            token: "keyword.uu5algorithm-name",
            regex: "Name:"
          },
          {
            token: "keyword.uu5algorithm-description",
            regex: "Description:"
          },
          {
            token: "keyword.uu5algorithm-errorPrefix",
            regex: "Error Prefix:"
          },
          {
            token: "comment",
            regex: /\s(\/\/.*$)/
          },
          {
            include: "basic", noEscape: true
          },
          codeBlockStartRule,
          // {
          //   defaultToken : "list" //do not use markup.list to allow stling leading `*` differntly
          // }
        ]
      });
      this.normalizeRules();
    };
    oop.inherits(UU5MarkdownHighlightRules, MarkdownHighlightRules);
    aceExports.UU5MarkdownHighlightRules = UU5MarkdownHighlightRules;
  });

  ace.define("ace/mode/uu5Markdown", (require, aceExports, aceModule) => {
    let UU5MarkdownHighlightRules = require("./uu5Markdown-highligh-rules").UU5MarkdownHighlightRules;
    let oop = require("ace/lib/oop");
    let MDMode = require("./markdown").Mode;
    console.log(MDMode);

    var Mode = function () {
      MDMode.call(this);
      this.HighlightRules = UU5MarkdownHighlightRules;
    };

    oop.inherits(Mode, MDMode);

    (function () {
      this.type = "text";
      this.blockComment = {start: "<!--", end: "-->"};
      this.$quotes = {'"': '"', "`": "`"};

      this.getNextLineIndent = function (state, line, tab) {
        if (state == "listblock") {
          var match = /^(\s*)(?:([-+*])|(\d+)\.)(\s+)/.exec(line);
          if (!match) {
            return "";
          }
          var marker = match[2];
          if (!marker) {
            marker = parseInt(match[3], 10) + 1 + ".";
          }
          return match[1] + marker + match[4];
        } else {
          return this.$getIndent(line);
        }
      };
      this.$id = "ace/mode/uu5Markdown";
    }).call(Mode.prototype);

    aceExports.Mode = Mode;
  });

}
