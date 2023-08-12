import "../styles/CheckBoxInput.css";

const CheckBoxInput = (props) => {
  const { value, onchange, label, id } = props;
  return (
    <>
      <input
        className="checkboxinput"
        type="checkbox"
        value={value}
        onChange={onchange}
        id={id}
      />
      <label htmlFor={id}>{label}</label>
    </>
  );
};

export default CheckBoxInput;
