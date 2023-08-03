import "../styles/CheckBoxInput.css";

const CheckBoxInput = (props) => {
  const { value, onchange, label } = props;
  return (
    <>
      <input
        className="checkboxinput"
        type="checkbox"
        value={value}
        onChange={onchange}
      />
      <label>{label}</label>
    </>
  );
};

export default CheckBoxInput;
