import "../styles/TextInput.css";

const TextInput = (props) => {
  return (
    <>
      <input
        className="textinput"
        type={props.type}
        placeholder={props.placeholder}
        value={props.value}
        onChange={props.onchange}
      />
    </>
  );
};

export default TextInput;
