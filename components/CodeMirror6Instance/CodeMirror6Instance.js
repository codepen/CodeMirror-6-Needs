import { useCodeMirror6Instance } from "./CodeMirror6InstanceHooks";
import PropTypes from "prop-types";
import { INDENT_VALUES } from "../../data/editorSettings";

function CodeMirror6Instance(props) {
  const cm6props = useCodeMirror6Instance(props);
  return <div key="codemirror-6-instance" {...cm6props}></div>;
}

CodeMirror6Instance.propTypes = {
  value: PropTypes.string,
  state: PropTypes.object,
  extensions: PropTypes.arrayOf(
    PropTypes.oneOfType(PropTypes.object, PropTypes.func)
  ),
  onInit: PropTypes.func,
  onChange: PropTypes.func,
  editorSettings: PropTypes.shape({
    theme: PropTypes.string,
    fontSize: PropTypes.number,
    lineHeight: PropTypes.number,
    fontFamily: PropTypes.string,
    indentWidth: PropTypes.number,
    indentUnit: PropTypes.oneOf(Object.values(INDENT_VALUES)),
    lineNumbers: PropTypes.bool,
    lineWrapping: PropTypes.bool,
    codeFolding: PropTypes.bool,
    matchBrackets: PropTypes.bool,
    autocomplete: PropTypes.bool,
    emmet: PropTypes.bool,
  }),
};

export default CodeMirror6Instance;
