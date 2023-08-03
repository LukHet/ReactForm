import "../styles/CheckBoxInput.css";

const CheckBoxInput = (props) => {
  return (
    <>
      <input
        className="checkboxinput"
        type="checkbox"
        value={props.value}
        onChange={props.onchange}
      />
      <label>{props.label}</label>
    </>
  );
};

export default CheckBoxInput;
