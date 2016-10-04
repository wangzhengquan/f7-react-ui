import React from 'react'
import {Editor, EditorState, RichUtils, Entity, AtomicBlockUtils, Modifier, convertToRaw, convertFromRaw, CompositeDecorator} from 'draft-js';
import Toolbar from './toolbar'
import {fontColorStyleMap} from './tools/font-color'
import {backColorStyleMap} from './tools/back-color'
import {fontSizeStyleMap} from './tools/font-size'
import {fontFamilyStyleMap} from './tools/font-family'
require('draft-js/dist/Draft.css')
require('../resources/less/editor/draft-editor.less')
require('../resources/less/editor/bottom-toolbar.less')
// console.log('fontSizeStyleMap', fontSizeStyleMap)
class RichEditor extends React.Component {
  constructor(props) {
    super(props);

   const decorator = this.decorator = new CompositeDecorator([
      {
        strategy: findLinkEntities,
        component: Link
      }
    ]);

    this.state = {
      collapsed: true,
      editorState: props.rawContent ? EditorState.createWithContent(convertFromRaw(props.rawContent), decorator) : EditorState.createEmpty(decorator)
    };
    console.log(this.refs.editor)
    this.focus = () => this.refs.editor.focus();
    this.onChange = (editorState) => {
      this.setState({editorState});
      props.onChange && props.onChange(editorState)
    };

    // this.handleKeyCommand = (command) => this._handleKeyCommand(command);
    // this.onTab = (e) => this._onTab(e);
    // this.toggleBlockType = (type) => this._toggleBlockType(type);
    // this.toggleInlineStyle = (style) => this._toggleInlineStyle(style);
    // this.insertAtomicBlock = (urlValue, urlType) => this._insertAtomicBlock(urlValue, urlType);
  }

  getRawContent() {
    return convertToRaw(this.state.editorState.getCurrentContent())        
  }

  setRawContent(rawContent) {
    this.setState({
      editorState: EditorState.createWithContent(convertFromRaw(rawContent), this.decorator)
    })    
     
  }

  handleKeyCommand(command) {
    const {editorState} = this.state;
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      this.onChange(newState);
      return true;
    }
    return false;
  }

  onTab(e) {
    const maxDepth = 4;
    this.onChange(RichUtils.onTab(e, this.state.editorState, maxDepth));
  }

  createLink(urlValue) {
    var {editorState} = this.state;
    const entityKey = Entity.create('LINK', 'MUTABLE', {url: urlValue});
    this.setState({
      editorState: RichUtils.toggleLink(
        editorState,
        editorState.getSelection(),
        entityKey
      )
    }, () => {
      setTimeout(() => this.refs.editor.focus(), 0);
    });
  }

   removeLink() {
      const {editorState} = this.state;
      const selection = editorState.getSelection();
      if (!selection.isCollapsed()) {
        this.setState({
          editorState: RichUtils.toggleLink(editorState, selection, null)
        });
      }
    }

  insertAtomicBlock(urlValue, urlType) {
    const {editorState} = this.state;
    const entityKey = Entity.create(urlType, 'IMMUTABLE', {src: urlValue})

    this.setState({
      editorState: AtomicBlockUtils.insertAtomicBlock(
        editorState,
        entityKey,
        ' '
      )
    }, () => {
      setTimeout(() => this.focus(), 0);
    });
  }

  toggleBlockType(blockType) {
    this.onChange(
      RichUtils.toggleBlockType(
        this.state.editorState,
        blockType
      )
    );
  }

  toggleInlineStyle(inlineStyle) {
    this.onChange(
      RichUtils.toggleInlineStyle(
        this.state.editorState,
        inlineStyle
      )
    );
  }

  toggleColor(toggledStyleName ){
    this.toggleCustomInlineStyle(toggledStyleName, fontColorStyleMap)

  }

  toggleBackColor(toggledStyleName ){
    this.toggleCustomInlineStyle(toggledStyleName, backColorStyleMap)

  }

  toggleFontSize(toggledStyleName){
    this.toggleCustomInlineStyle(toggledStyleName, fontSizeStyleMap)
  }

  toggleFontFamily(toggledStyleName){
    this.toggleCustomInlineStyle(toggledStyleName, fontFamilyStyleMap)
  }

  toggleCustomInlineStyle(toggledStyleName,  styleMap) {
    // debugger
    const {editorState} = this.state;
    const selection = editorState.getSelection();
    // Let's just allow one color at a time. Turn off all active colors.
    const nextContentState = Object.keys(styleMap)
      .reduce((contentState, styleName) => {
        return Modifier.removeInlineStyle(contentState, selection, styleName)
      }, editorState.getCurrentContent());

    let nextEditorState = EditorState.push(
      editorState,
      nextContentState,
      'change-inline-style'
    );

    const currentStyle = editorState.getCurrentInlineStyle();

    // Unset style override for current styleName.
    if (selection.isCollapsed()) {
      nextEditorState = currentStyle.reduce((state, styleName) => {
        return RichUtils.toggleInlineStyle(state, styleName);
      }, nextEditorState);
    }

    // If the styleName is being toggled on, apply it.
    if (!currentStyle.has(toggledStyleName)) {
      nextEditorState = RichUtils.toggleInlineStyle(
        nextEditorState,
        toggledStyleName
      );
    }

    this.onChange(nextEditorState);
  }

  

  handleCollapse(collapsed){
    this.setState({
      collapsed: collapsed
    })
  }

  render() {
    const {editorState} = this.state;

    // If the user changes block type before entering any text, we can
    // either style the placeholder or hide it. Let's just hide it now.
    let className = 'RichEditor-editor';
    var contentState = editorState.getCurrentContent();
    if (!contentState.hasText()) {
      if (contentState.getBlockMap().first().getType() !== 'unstyled') {
        className += ' RichEditor-hidePlaceholder';
      }
    }
    return (
     
      <div style={Object.assign({}, styles.editorWrapper, {paddingBottom: this.state.collapsed ? '44px': '260px'})}>
        <div className={className} onClick={this.focus}>
          <Editor
            customStyleMap={customStyleMap}
            blockRendererFn={mediaBlockRenderer}
            editorState={editorState}
            handleKeyCommand={this.handleKeyCommand}
            onChange={this.onChange}
            onTab={this.onTab}
            placeholder={this.props.placeholder || 'Tell a story...'}
            ref="editor"
            spellCheck={true}
          />
        </div>
        <Toolbar edit={this} uploadFileFn={this.props.uploadFileFn} onCollapse={this.handleCollapse.bind(this)}/>
      </div>
    );
  }
}



function findLinkEntities(contentBlock, callback) {
  contentBlock.findEntityRanges(
    (character) => {
      const entityKey = character.getEntity();
      return (
        entityKey !== null &&
        Entity.get(entityKey).getType() === 'LINK'
      );
    },
    callback
  );
}

const Link = (props) => {
  const {url} = Entity.get(props.entityKey).getData();
  return (
    <a href={url}>
      {props.children}
    </a>
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

const Audio = (props) => {
  return <audio controls src={props.src} style={styles.media} />;
};

const Image = (props) => {
  return <img src={props.src} style={styles.media} />;
};

const Video = (props) => {
  return <video controls src={props.src} style={styles.media} />;
};

const Media = (props) => {
  const entity = Entity.get(props.block.getEntityAt(0));
  const {src} = entity.getData();
  const type = entity.getType();

  let media;
  if (type === 'audio') {
    media = <Audio src={src} />;
  } else if (type === 'image') {
    media = <Image src={src} />;
  } else if (type === 'video') {
    media = <Video src={src} />;
  }

  return media;
};

const customStyleMap = Object.assign({}, fontColorStyleMap, fontSizeStyleMap, fontFamilyStyleMap, backColorStyleMap)

const styles = {
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

export default RichEditor