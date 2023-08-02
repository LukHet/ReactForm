import { useState } from "react";
import axios from "axios";
import "./App.css";

const App = () => {
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const [email, setEmail] = useState("");
  const [mailCheckbox, setMailCheckbox] = useState(false);
  const [phoneCheckbox, setPhoneCheckbox] = useState(false);
  const [smsCheckbox, setSmsCheckbox] = useState(false);
  const [phoneCheckboxesVisibility, setPhoneCheckboxesVisibility] =
    useState(false);
  const [response, setResponse] = useState("");

  const URL = "";

  const handleTextChange = (e) => {
    setName(e.target.value);
  };

  const handleNumberChange = (e) => {
    setNumber(e.target.value);
    if (validateNumber(e.target.value)) {
      setPhoneCheckboxesVisibility(true);
      return;
    }
    setPhoneCheckboxesVisibility(false);
    setPhoneCheckbox(false);
    setSmsCheckbox(false);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleMailCheckboxChange = (e) => {
    setMailCheckbox(e.target.checked);
  };

  const handlePhoneCheckboxChange = (e) => {
    setPhoneCheckbox(e.target.checked);
  };

  const handleSmsCheckboxChange = (e) => {
    setSmsCheckbox(e.target.checked);
  };

  const validateEmail = (e) => {
    return e.match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
  };

  const validateNumber = (e) => {
    return e.match(/\d{9}/);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      name.length &&
      validateEmail(email) &&
      validateNumber(number) &&
      number.length
    ) {
      axios
        .post(URL, {
          params: {
            name: name,
            email: email,
            phone: number,
            agreement_mail: mailCheckbox,
            agreement_call: phoneCheckbox,
            agreement_sms: smsCheckbox,
            error_test: "",
          },
        })
        .then((res) => console.log(res.data));
      console.log("GITARA");
    }
  };

  return (
    <div className="App">
      <form className="form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="IMIĘ I NAZWISKO"
          value={name}
          onChange={handleTextChange}
        />
        <input
          type="tel"
          placeholder="TELEFON"
          value={number}
          onChange={handleNumberChange}
        />
        <input
          type="email"
          placeholder="EMAIL"
          value={email}
          onChange={handleEmailChange}
        />
        Wyrażam zgodę na otrzymywanie od Duda Development Sp. z.o.o. SKA z
        siedzibą w Poznaniu ul. Macieja Palacza 144, 60-278 Poznań, informacji
        handlowej.
        <input
          type="checkbox"
          value={mailCheckbox}
          onChange={handleMailCheckboxChange}
        />
        <label>w formie elektronicznej (mail) na wzkasany adres mailowy</label>
        {phoneCheckboxesVisibility ? (
          <>
            <input
              type="checkbox"
              value={phoneCheckbox}
              onChange={handlePhoneCheckboxChange}
            />
            <label>drogą telefoniczną, na udostępniony numer telefonu</label>
            <input
              type="checkbox"
              value={smsCheckbox}
              onChange={handleSmsCheckboxChange}
            />
            <label>w formie SMS, na udostępniony numer telefonu</label>{" "}
          </>
        ) : null}
        <button>WYŚLIJ</button>
        <button href="#">
          Kto będzie administratorem Twoich danych osobowych?
        </button>
      </form>
    </div>
  );
};

export default App;
