/* eslint react/prop-types: 0 */
import React from "react";
import createReactClass from "create-react-class";
import PropTypes from "prop-types";
import * as UU5 from "uu5g04";

import ns from "ns";

import Select from "react-select";
import "react-select/dist/react-select.css";
import "./react-select.less";

const ReactSelect = createReactClass({
  //@@viewOn:mixins
  mixins: [UU5.Common.BaseMixin, UU5.Common.ElementaryMixin, UU5.Forms.InputMixin],
  //@@viewOff:mixins

  //@@viewOn:statics
  statics: {
    tagName: ns.tag("ReactSelect"),
    classNames: {
      main: ns.css("-react-select")
    }
  },

  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {
    options: PropTypes.array,
    labelKey: PropTypes.string,
    valueKey: PropTypes.string,
    onChange: PropTypes.func,
    autoFocus: PropTypes.bool
  },
  //@@viewOff:propTypes

  //@@viewOn:getDefaultProps
  //@@viewOff:getDefaultProps

  //@@viewOn:standardComponentLifeCycle
  getInitialState() {
    let selectValue = this._findObjectByValue(this.props.value, this.props.options);

    return {
      value: this.props.value || null,
      selectValue: selectValue,
      options: this.props.options || []
    };
  },
  componentWillReceiveProps(nextProps) {
    let value = this.state.value;
    let selectValue = this.state.selectValue;
    let options = this.state.options;
    if (nextProps.value && value !== nextProps.value) {
      value = nextProps.value;
    }
    if (nextProps.options && value !== nextProps.options) {
      options = nextProps.options;
    }
    selectValue = this._findObjectByValue(value, options);

    this.setState({value: value, selectValue: selectValue, options: options});
  },

  //@@viewOff:standardComponentLifeCycle

  //@@viewOn:interface
  setValue_(value, setStateCallback) {
    let selectValue = this._findObjectByValue(value);
    this.setState({value: value === undefined ? null : value, selectValue: selectValue}, setStateCallback);

    return this;
  },
  focus_() {
    console.log(this._select);
    this._select.focus();
  },
  //@@viewOff:interface

  //@@viewOn:overridingMethods
  //@@viewOff:overridingMethods

  //@@viewOn:componentSpecificHelpers
  _findObjectByValue(value, options) {
    const data = options || this.state.options;
    const obj = data.find(obj => obj[this.props.valueKey || "value"] === value);
    return obj;
  },
  _updateValue(newValue) {
    this.setState({
      selectValue: newValue,
      value: newValue[this.props.valueKey || "value"]
    });
    if (this.props.onChange) {
      this.props.onChange(newValue);
    }
  },
  isValid: function () {
    var feedback = this.getFeedback();
    var value = this.getValue();
    var result = true;

    if (this.props.required && (value === "" || value === null)) {
      this.setError(this.props.requiredMessage || this.getLsiValue("requiredMessage"));
      result = false;
    } else if (feedback === "error") {
      result = false;
    } else if (typeof this.isValid_ === "function") {
      result = this.isValid_();
    }

    if (result && this.props.onValidate) {
      var validation = this.props.onValidate({value: value, component: this});
      if (validation && typeof validation === "object") {
        if (validation.feedback === "error") {
          result = false;
        }
      }
    }

    return result;
  },

  _getMainAttrs() {
    let attrs = this._getInputAttrs();
    attrs.id = this.getId();
    switch (this.state.feedback) {
      case "success":
        attrs.className += " color-schema-" + UU5.Environment.getColorSchema("success");
        break;
      case "warning":
        attrs.className += " color-schema-" + UU5.Environment.getColorSchema("warning");
        break;
      case "error":
        attrs.className += " color-schema-" + UU5.Environment.getColorSchema("danger");
        break;
    }
    return attrs;
  },
  //@@viewOff:componentSpecificHelpers

  //@@viewOn:render
  render() {
    let inputId = this.getId() + "-input";
    return (
      (<div {...this._getMainAttrs()}>
          {this.getLabel(inputId)}
          {this.getInputWrapper([<Select
            id={inputId}
            name={this.props.name || inputId}
            options={this.props.options}
            value={this.state.selectValue}
            onChange={this._updateValue}
            searchable={true}
            labelKey={this.props.labelKey}
            valueKey={this.props.valueKey}
            key="select"
            clearable={false}
            placeholder={this.props.placeholder || ""}
            autoFocus={this.props.autoFocus}
            openOnFocus={true}
            ref={select => this._select = select}
          />])}
        </div>
      ));
  } //@@viewOff:render
});

export default ReactSelect;
