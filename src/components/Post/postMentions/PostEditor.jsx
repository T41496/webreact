import React , {useState , useRef} from 'react';
import {EditorState , convertToRaw } from 'draft-js'
import Editor from 'draft-js-plugins-editor'
import createMentionPlugin, { defaultSuggestionsFilter } from 'draft-js-mention-plugin'
import "draft-js/dist/Draft.css"
import 'draft-js-mention-plugin/lib/plugin.css'
import { connect } from 'react-redux';
import {searchUserStart} from '../../../store/actions/HomeAction'
import { withNamespaces } from "react-i18next";
import { stateToHTML } from "draft-js-export-html";


const mentionPlugin = createMentionPlugin()
const { MentionSuggestions } = mentionPlugin
const plugins = [mentionPlugin]

export const PostEditor = (props) => {

    const { t } = props;

    const [suggestions, setSuggestions] = useState([])

    const [mentions , setMentions] = useState([])

    const [focusStyle , setFocusStyle] = useState(false)


    // Draft-JS editor configuration
    const [editorState, setEditorState] = useState(
        () => EditorState.createEmpty(),
    )

    const content = convertToRaw(editorState.getCurrentContent()).blocks;

    props.getEditorRawContent(content.map(block => (!block.text.trim() && '\n' || block.text)).join('\n'))

    const editor = useRef(null)


    const tohtml = () => {

        const contentState = editorState.getCurrentContent();
        const raw = convertToRaw(contentState);

        var host = window.location.origin


        let options = {
            entityStyleFn: (entity) => {
              const entityType = entity.get('type').toLowerCase();
              if (entityType === "mention") {
                const data = entity.getData();
                return {
                  element: 'a',
                  attributes: {
                    href: `${host}/${data.mention.link}`,
                  },
                  style: {
                    paddingRight:"5px"
                  },
                };
              }
            },
          };

        return stateToHTML(contentState , options);
    }

    props.getEditorHtmlContent(tohtml())
    

    // Check editor text for mentions
    const onSearchChange = ({ value }) => {

        props.dispatch( searchUserStart({ key: value }) )
        console.log(value)

        let fetchedData = props.searchUser.data.users;

        var newData = [];

        fetchedData && fetchedData.map((user) => newData.push({id : user.user_id , name : `@${user.name}` , link :  user.user_unique_id , avatar : user.picture}) ) 

        // console.log(newData)

        props.searchUser.data.users && setMentions(newData)
    
        setSuggestions(defaultSuggestionsFilter(value, mentions))

        

    }

    const onAddMention = () => {


    }

    // Focus on editor window
    const focusEditor = () => {
        editor.current.focus()
        setFocusStyle(true)
    }

    //blur handler
    const blurEditor = () => {
        setFocusStyle(false);
    }


    return (
        <div onFocus={() => focusEditor()} onBlur={() => blurEditor()} className={focusStyle ? "hasFocus active" : "hasFocus"} >
                <Editor
                    ref={editor}
                    editorState={editorState}
                    plugins={plugins}
                    onChange={editorState => setEditorState(editorState)}
                    placeholder={t("new_post_placeholder")}
                />
                <MentionSuggestions
                    onSearchChange={onSearchChange}
                    suggestions={mentions}
                    onAddMention={onAddMention}
                />
        </div>
    )
}

const mapStateToPros = (state) => ({
    searchUser: state.home.searchUser,
  });
const mapDispatchToProps = (dispatch) => {
    return({dispatch})
}

export default connect(
    mapStateToPros,
    mapDispatchToProps,
)(withNamespaces()(PostEditor))
