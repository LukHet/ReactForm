import "../styles/TextInput.css";

const TextInput = (props) => {
  const { type, placeholder, value, onchange, errormessage } = props;
  return (
    <>
      <input
        className="textinput"
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onchange}
      />
      <div className="errormessage">{errormessage}</div>
    </>
  );
};

export default TextInput;
