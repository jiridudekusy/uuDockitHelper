
export default function registerUu5Mode(ace) {
  ace.define("ace/theme/uu5markdown-lightCode", (require, aceExports, aceModule) => {
    "use strict";

    aceExports.isDark = false;
    aceExports.cssClass = "ace-uu5-l";
    aceExports.cssText = `
.ace-uu5-l .ace_gutter {
  background: #ebebeb;
  color: #333;
  overflow : hidden;
}

.ace-uu5-l .ace_print-margin {
  width: 1px;
  background: #e8e8e8;
}

.ace-uu5-l {
  background-color: #FFFFFF;
  color: black;
}

.ace-uu5-l .ace_cursor {
  color: black;
}

.ace-uu5-l .ace_invisible {
  color: rgb(191, 191, 191);
}

.ace-uu5-l .ace_constant.ace_buildin {
  color: rgb(88, 72, 246);
}

.ace-uu5-l .ace_constant.ace_language {
  color: rgb(88, 92, 246);
}

.ace-uu5-l .ace_constant.ace_library {
  color: rgb(6, 150, 14);
}

.ace-uu5-l .ace_invalid {
  background-color: rgb(153, 0, 0);
  color: white;
}

.ace-uu5-l .ace_fold {
}

.ace-uu5-l .ace_support.ace_function {
  color: rgb(60, 76, 114);
}

.ace-uu5-l .ace_support.ace_constant {
  color: rgb(6, 150, 14);
}

.ace-uu5-l .ace_support.ace_type,
.ace-uu5-l .ace_support.ace_class
.ace-uu5-l .ace_support.ace_other {
  color: rgb(109, 121, 222);
}

.ace-uu5-l .ace_variable.ace_parameter {
  font-style:italic;
  color:#FD971F;
}
.ace-uu5-l .ace_keyword.ace_operator {
  color: rgb(104, 118, 135);
}

.ace-uu5-l .ace_comment {
  color: #236e24;
}

.ace-uu5-l .ace_comment.ace_doc {
  color: #236e24;
}

.ace-uu5-l .ace_comment.ace_doc.ace_tag {
  color: #236e24;
}

.ace-uu5-l .ace_constant.ace_numeric {
  color: rgb(0, 0, 205);
}

.ace-uu5-l .ace_variable {
  color: rgb(49, 132, 149);
}

.ace-uu5-l .ace_xml-pe {
  color: rgb(104, 104, 91);
}

.ace-uu5-l .ace_entity.ace_name.ace_function {
  color: #0000A2;
}


.ace-uu5-l .ace_heading {
  color: rgb(12, 7, 255);
}

.ace-uu5-l .ace_list {
  color:rgb(185, 6, 144);
}

.ace-uu5-l .ace_marker-layer .ace_selection {
  background: rgb(181, 213, 255);
}

.ace-uu5-l .ace_marker-layer .ace_step {
  background: rgb(252, 255, 0);
}

.ace-uu5-l .ace_marker-layer .ace_stack {
  background: rgb(164, 229, 101);
}

.ace-uu5-l .ace_marker-layer .ace_bracket {
  margin: -1px 0 0 -1px;
  border: 1px solid rgb(192, 192, 192);
}

.ace-uu5-l .ace_marker-layer .ace_active-line {
  background: rgba(0, 0, 0, 0.07);
}

.ace-uu5-l .ace_gutter-active-line {
    background-color : #dcdcdc;
}

.ace-uu5-l .ace_marker-layer .ace_selected-word {
  background: rgb(250, 250, 255);
  border: 1px solid rgb(200, 200, 250);
}

.ace-uu5-l .ace_storage,
.ace-uu5-l .ace_keyword,
.ace-uu5-l .ace_meta.ace_tag {
  color: rgb(147, 15, 128);
}

.ace-uu5-l .ace_string.ace_regex {
  color: rgb(255, 0, 0)
}

.ace-uu5-l .ace_string {
  color: #1A1AA6;
}

.ace-uu5-l .ace_entity.ace_other.ace_attribute-name {
  color: #994409;
}

.ace-uu5-l .ace_uu5algorithm-step-common {
  color: #fff;
  border-radius: 3px;
  padding: 1px 1px;
}

.ace-uu5-l .ace_uu5algorithm-sequence {
  background-color: #37474f;
}

.ace-uu5-l .ace_uu5algorithm-warning {
  background-color: #ef6c00;
}

.ace-uu5-l .ace_uu5algorithm-error {
  background-color: #c62828;
}

.ace-uu5-l .ace_uu5algorithm-step {
  background-color: grey;
}

.ace-uu5-l .ace_uu5algorithm-selectionif {
  background-color: #1565c0;
}

.ace-uu5-l .ace_uu5algorithm-iteration {
  background-color: #2e7d32;
}


.ace-uu5-l .ace_uu5algorithm-if {
    background: transparent !important;
    color: #2196F3 !important;
    border: 1px solid #2196F3;
}

.ace-uu5-l .ace_uu5algorithm-elseif {
    background: transparent !important;
    color: #2196F3 !important;
    border: 1px solid #2196F3;
}

.ace-uu5-l .ace_uu5algorithm-else {
    background: transparent !important;
    color: #2196F3 !important;
    border: 1px solid #2196F3;
}

.ace-uu5-l .ace_visualize-whitespace {
    
}
 
.ace-uu5-l .ace_indent-guide {
  background: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAACCAYAAACZgbYnAAAAE0lEQVQImWP4////f4bLly//BwAmVgd1/w11/gAAAABJRU5ErkJggg==") right repeat-y;
}      
      `;
    aceExports.$id = "ace/theme/ace-uu5-l";

    var dom = require("../lib/dom");
    dom.importCssString(aceExports.cssText, aceExports.cssClass);
  });

}
