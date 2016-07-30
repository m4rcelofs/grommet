'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.propTypes = exports.baseDimension = undefined;

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

exports.buildPath = buildPath;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Graphics = require('../../utils/Graphics');

var _CSSClassnames = require('../../utils/CSSClassnames');

var _CSSClassnames2 = _interopRequireDefault(_CSSClassnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var CLASS_ROOT = _CSSClassnames2.default.METER; // (C) Copyright 2014-2016 Hewlett Packard Enterprise Development LP

var baseDimension = exports.baseDimension = _Graphics.baseUnit * 8;

var propTypes = exports.propTypes = {
  activeIndex: _react.PropTypes.number,
  a11yDesc: _react.PropTypes.string,
  a11yDescId: _react.PropTypes.string,
  a11yTitle: _react.PropTypes.string,
  a11yTitleId: _react.PropTypes.string,
  max: _react.PropTypes.shape({
    value: _react.PropTypes.number,
    label: _react.PropTypes.string
  }).isRequired,
  min: _react.PropTypes.shape({
    value: _react.PropTypes.number,
    label: _react.PropTypes.string
  }).isRequired,
  onActivate: _react.PropTypes.func.isRequired,
  // size: PropTypes.oneOf(['small', 'medium', 'large']).isRequired,
  series: _react.PropTypes.arrayOf(_react.PropTypes.shape({
    label: _react.PropTypes.string,
    value: _react.PropTypes.number.isRequired,
    colorIndex: _react.PropTypes.string,
    important: _react.PropTypes.bool,
    onClick: _react.PropTypes.func
  })).isRequired,
  total: _react.PropTypes.number,
  units: _react.PropTypes.string
};

function buildPath(itemIndex, commands, classes, onActivate, onClick, a11yDescId, a11yTitle, activeMeterSlice) {
  if (onActivate) {
    var onOver = onActivate.bind(null, itemIndex);
    var onOut = onActivate.bind(null, undefined);

    var a11yRoles = {};
    var titleComponent = void 0;
    var activeSlice = void 0;
    if (a11yTitle && a11yDescId) {
      activeSlice = activeMeterSlice;
      var pathTitleId = 'title_' + a11yDescId;
      a11yRoles['aria-labelledby'] = pathTitleId;
      a11yRoles.id = a11yDescId;
      a11yRoles.role = 'tab';
      titleComponent = _react2.default.createElement(
        'title',
        { id: pathTitleId },
        a11yTitle
      );
    }

    return _react2.default.createElement(
      'g',
      (0, _extends3.default)({ key: itemIndex, ref: a11yDescId }, a11yRoles),
      titleComponent,
      _react2.default.createElement('path', { ref: activeSlice, className: classes.join(' '), d: commands,
        'data-index': itemIndex, onFocus: onOver, onBlur: onOut }),
      _react2.default.createElement('path', { className: CLASS_ROOT + '__hot', d: commands, fill: 'none',
        onMouseOver: onOver, onMouseOut: onOut,
        onClick: onClick })
    );
  } else {
    return _react2.default.createElement('path', { key: itemIndex, className: classes.join(' '), d: commands });
  }
};