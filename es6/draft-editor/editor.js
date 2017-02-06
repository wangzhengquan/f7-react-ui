'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _draftJs = require('draft-js');

var _toolbar = require('./toolbar');

var _toolbar2 = _interopRequireDefault(_toolbar);

var _fontColor = require('./tools/font-color');

var _backColor = require('./tools/back-color');

var _fontSize = require('./tools/font-size');

var _fontFamily = require('./tools/font-family');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

require('draft-js/dist/Draft.css');
require('../resources/less/editor/draft-editor.less');
require('../resources/less/editor/bottom-toolbar.less');
// console.log('fontSizeStyleMap', fontSizeStyleMap)

var RichEditor = function (_React$Component) {
  _inherits(RichEditor, _React$Component);

  function RichEditor(props) {
    _classCallCheck(this, RichEditor);

    var _this = _possibleConstructorReturn(this, (RichEditor.__proto__ || Object.getPrototypeOf(RichEditor)).call(this, props));

    var decorator = _this.decorator = new _draftJs.CompositeDecorator([{
      strategy: findLinkEntities,
      component: Link
    }]);

    _this.state = {
      collapsed: true,
      editorState: props.rawContent ? _draftJs.EditorState.createWithContent((0, _draftJs.convertFromRaw)(props.rawContent), decorator) : _draftJs.EditorState.createEmpty(decorator)
    };
    console.log(_this.refs.editor);
    _this.focus = function () {
      return _this.refs.editor.focus();
    };
    _this.onChange = function (editorState) {
      _this.setState({ editorState: editorState });
      props.onChange && props.onChange(editorState);
    };

    // this.handleKeyCommand = (command) => this._handleKeyCommand(command);
    // this.onTab = (e) => this._onTab(e);
    // this.toggleBlockType = (type) => this._toggleBlockType(type);
    // this.toggleInlineStyle = (style) => this._toggleInlineStyle(style);
    // this.insertAtomicBlock = (urlValue, urlType) => this._insertAtomicBlock(urlValue, urlType);
    return _this;
  }

  _createClass(RichEditor, [{
    key: 'getRawContent',
    value: function getRawContent() {
      return (0, _draftJs.convertToRaw)(this.state.editorState.getCurrentContent());
    }
  }, {
    key: 'setRawContent',
    value: function setRawContent(rawContent) {
      this.setState({
        editorState: _draftJs.EditorState.createWithContent((0, _draftJs.convertFromRaw)(rawContent), this.decorator)
      });
    }
  }, {
    key: 'handleKeyCommand',
    value: function handleKeyCommand(command) {
      var editorState = this.state.editorState;

      var newState = _draftJs.RichUtils.handleKeyCommand(editorState, command);
      if (newState) {
        this.onChange(newState);
        return true;
      }
      return false;
    }
  }, {
    key: 'onTab',
    value: function onTab(e) {
      var maxDepth = 4;
      this.onChange(_draftJs.RichUtils.onTab(e, this.state.editorState, maxDepth));
    }
  }, {
    key: 'createLink',
    value: function createLink(urlValue) {
      var _this2 = this;

      var editorState = this.state.editorState;

      var entityKey = _draftJs.Entity.create('LINK', 'MUTABLE', { url: urlValue });
      this.setState({
        editorState: _draftJs.RichUtils.toggleLink(editorState, editorState.getSelection(), entityKey)
      }, function () {
        setTimeout(function () {
          return _this2.refs.editor.focus();
        }, 0);
      });
    }
  }, {
    key: 'removeLink',
    value: function removeLink() {
      var editorState = this.state.editorState;

      var selection = editorState.getSelection();
      if (!selection.isCollapsed()) {
        this.setState({
          editorState: _draftJs.RichUtils.toggleLink(editorState, selection, null)
        });
      }
    }
  }, {
    key: 'insertAtomicBlock',
    value: function insertAtomicBlock(urlValue, urlType) {
      var _this3 = this;

      var editorState = this.state.editorState;

      var entityKey = _draftJs.Entity.create(urlType, 'IMMUTABLE', { src: urlValue });

      this.setState({
        editorState: _draftJs.AtomicBlockUtils.insertAtomicBlock(editorState, entityKey, ' ')
      }, function () {
        setTimeout(function () {
          return _this3.focus();
        }, 0);
      });
    }
  }, {
    key: 'toggleBlockType',
    value: function toggleBlockType(blockType) {
      this.onChange(_draftJs.RichUtils.toggleBlockType(this.state.editorState, blockType));
    }
  }, {
    key: 'toggleInlineStyle',
    value: function toggleInlineStyle(inlineStyle) {
      this.onChange(_draftJs.RichUtils.toggleInlineStyle(this.state.editorState, inlineStyle));
    }
  }, {
    key: 'toggleColor',
    value: function toggleColor(toggledStyleName) {
      this.toggleCustomInlineStyle(toggledStyleName, _fontColor.fontColorStyleMap);
    }
  }, {
    key: 'toggleBackColor',
    value: function toggleBackColor(toggledStyleName) {
      this.toggleCustomInlineStyle(toggledStyleName, _backColor.backColorStyleMap);
    }
  }, {
    key: 'toggleFontSize',
    value: function toggleFontSize(toggledStyleName) {
      this.toggleCustomInlineStyle(toggledStyleName, _fontSize.fontSizeStyleMap);
    }
  }, {
    key: 'toggleFontFamily',
    value: function toggleFontFamily(toggledStyleName) {
      this.toggleCustomInlineStyle(toggledStyleName, _fontFamily.fontFamilyStyleMap);
    }
  }, {
    key: 'toggleCustomInlineStyle',
    value: function toggleCustomInlineStyle(toggledStyleName, styleMap) {
      // debugger
      var editorState = this.state.editorState;

      var selection = editorState.getSelection();
      // Let's just allow one color at a time. Turn off all active colors.
      var nextContentState = Object.keys(styleMap).reduce(function (contentState, styleName) {
        return _draftJs.Modifier.removeInlineStyle(contentState, selection, styleName);
      }, editorState.getCurrentContent());

      var nextEditorState = _draftJs.EditorState.push(editorState, nextContentState, 'change-inline-style');

      var currentStyle = editorState.getCurrentInlineStyle();

      // Unset style override for current styleName.
      if (selection.isCollapsed()) {
        nextEditorState = currentStyle.reduce(function (state, styleName) {
          return _draftJs.RichUtils.toggleInlineStyle(state, styleName);
        }, nextEditorState);
      }

      // If the styleName is being toggled on, apply it.
      if (!currentStyle.has(toggledStyleName)) {
        nextEditorState = _draftJs.RichUtils.toggleInlineStyle(nextEditorState, toggledStyleName);
      }

      this.onChange(nextEditorState);
    }
  }, {
    key: 'handleCollapse',
    value: function handleCollapse(collapsed) {
      this.setState({
        collapsed: collapsed
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var editorState = this.state.editorState;

      // If the user changes block type before entering any text, we can
      // either style the placeholder or hide it. Let's just hide it now.

      var className = 'RichEditor-editor';
      var contentState = editorState.getCurrentContent();
      if (!contentState.hasText()) {
        if (contentState.getBlockMap().first().getType() !== 'unstyled') {
          className += ' RichEditor-hidePlaceholder';
        }
      }
      return _react2.default.createElement(
        'div',
        { style: Object.assign({}, styles.editorWrapper, { paddingBottom: this.state.collapsed ? '44px' : '260px' }) },
        _react2.default.createElement(
          'div',
          { className: className, onClick: this.focus },
          _react2.default.createElement(_draftJs.Editor, {
            customStyleMap: customStyleMap,
            blockRendererFn: mediaBlockRenderer,
            editorState: editorState,
            handleKeyCommand: this.handleKeyCommand,
            onChange: this.onChange,
            onTab: this.onTab,
            placeholder: this.props.placeholder || 'Tell a story...',
            ref: 'editor',
            spellCheck: true
          })
        ),
        _react2.default.createElement(_toolbar2.default, { edit: this, uploadFileFn: this.props.uploadFileFn, onCollapse: this.handleCollapse.bind(this) })
      );
    }
  }]);

  return RichEditor;
}(_react2.default.Component);

function findLinkEntities(contentBlock, callback) {
  contentBlock.findEntityRanges(function (character) {
    var entityKey = character.getEntity();
    return entityKey !== null && _draftJs.Entity.get(entityKey).getType() === 'LINK';
  }, callback);
}

var Link = function Link(props) {
  var _Entity$get$getData = _draftJs.Entity.get(props.entityKey).getData(),
      url = _Entity$get$getData.url;

  return _react2.default.createElement(
    'a',
    { href: url },
    props.children
  );
};

function mediaBlockRenderer(block) {
  if (block.getType() === 'atomic') {
    return {
      component: Media,
      editable: false
    };
  }

  return null;
}

var Audio = function Audio(props) {
  return _react2.default.createElement('audio', { controls: true, src: props.src, style: styles.media });
};

var Image = function Image(props) {
  return _react2.default.createElement('img', { src: props.src, style: styles.media });
};

var Video = function Video(props) {
  return _react2.default.createElement('video', { controls: true, src: props.src, style: styles.media });
};

var Media = function Media(props) {
  var entity = _draftJs.Entity.get(props.block.getEntityAt(0));

  var _entity$getData = entity.getData(),
      src = _entity$getData.src;

  var type = entity.getType();

  var media = void 0;
  if (type === 'audio') {
    media = _react2.default.createElement(Audio, { src: src });
  } else if (type === 'image') {
    media = _react2.default.createElement(Image, { src: src });
  } else if (type === 'video') {
    media = _react2.default.createElement(Video, { src: src });
  }

  return media;
};

var customStyleMap = Object.assign({}, _fontColor.fontColorStyleMap, _fontSize.fontSizeStyleMap, _fontFamily.fontFamilyStyleMap, _backColor.backColorStyleMap);

var styles = {
  editorWrapper: {
    position: 'relative',
    width: '100%',
    height: '100%',
    overflow: 'hidden'

  },
  media: {
    width: '100%'
  }
};

exports.default = RichEditor;