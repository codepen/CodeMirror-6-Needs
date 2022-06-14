import { useCodeMirror6Instance } from "./CodeMirror6InstanceHooks";

function CodeMirror6Instance(props) {
  const cm6props = useCodeMirror6Instance(props);
  return <div {...cm6props}></div>;
}

export default CodeMirror6Instance;
