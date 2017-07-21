<template>


  <div class="codemirror" id="main">
    <!-- codemirror -->
    <codemirror v-model="code"
                :options="editorOption"
                @cursorActivity="onEditorCursorActivity"
                @ready="onEditorReady"
                @focus="onEditorFocus"
                @blur="onEditorBlur">
    </codemirror>
  </div>

</template>

<script>
  // highlightSelectionMatches
  require('codemirror/addon/scroll/annotatescrollbar.js')
  require('codemirror/addon/search/matchesonscrollbar.js')
  require('codemirror/addon/search/searchcursor.js')
  require('codemirror/addon/search/match-highlighter.js')

  import { CodeMirror } from 'vue-codemirror'

  CodeMirror.defineMode('mymode', () => {
    return {
      token(stream, state) {
        if (stream.match("aaa")) {
          return "keyword"
        } else if (stream.match("111")) {
          return "number"
        } else {
          stream.next()
          return null
        }
      }
    }
  })
  export default {
    data() {
      return {
        code: `aaa bbb ccc 111 eee fff ggg`,
        editorOption: {
          tabSize: 124,
          matchBrackets: true,
          styleActiveLine: true,
          lineNumbers: true,
          line: true,
          mode: 'mymode',
          theme: 'base16-light',
          extraKeys: {
            "Ctrl": "autocomplete" ,
            'F11'(cm) {
              cm.setOption("fullScreen", !cm.getOption("fullScreen"))
            },
            'Esc'(cm) {
              if (cm.getOption("fullScreen")) cm.setOption("fullScreen", false)
            }},
          foldGutter: true,
          gutters: ["CodeMirror-linenumbers", "CodeMirror-foldgutter"],
          // 选中文本自动高亮，及高亮方式
          styleSelectedText: true,
          highlightSelectionMatches: { showToken: /\w/, annotateScrollbar: true },
          // more codemirror config...
          // 如果有hint方面的配置，也应该出现在这里
          mode: {
            name: 'javascript',
          },


        }
      }
    },
    methods: {
      onEditorCursorActivity(codemirror) {
        console.log('onEditorCursorActivity', codemirror)
      },
      onEditorReady(codemirror) {
        console.log('onEditorReady', codemirror)
      },
      onEditorFocus(codemirror) {
        console.log('onEditorFocus', codemirror)
      },
      onEditorBlur(codemirror) {
        console.log('onEditorBlur', codemirror)
      }
    },
    computed: {
      editor() {
        return this.$refs.myEditor.editor
      }
    },
  }
</script>

<style scoped>

</style>







