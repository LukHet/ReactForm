import "../styles/TextInput.css";

const TextInput = (props) => {
  const { type, placeholder, value, onchange } = props;
  return (
    <>
      <input
        className="textinput"
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onchange}
      />
    </>
  );
};

export default TextInput;
