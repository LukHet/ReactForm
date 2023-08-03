import { useState } from "react";
import axios from "axios";
import TextInput from "./components/TextInput";
import CheckBoxInput from "./components/CheckBoxInput";
import "./styles/App.css";

const App = () => {
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const [email, setEmail] = useState("");
  const [mailCheckbox, setMailCheckbox] = useState(false);
  const [phoneCheckbox, setPhoneCheckbox] = useState(false);
  const [smsCheckbox, setSmsCheckbox] = useState(false);
  const [phoneCheckboxesVisibility, setPhoneCheckboxesVisibility] =
    useState(false);
  const [counter, setCounter] = useState(0);
  const [errorMessage, setErrorMessage] = useState(null);
  const [serverResponse, setServerResponse] = useState(null);

  const URL = "";

  console.log(!smsCheckbox || !phoneCheckbox);

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

  const handleInfoButton = (e) => {
    e.preventDefault();
  };

  const validateEmail = (e) => {
    return e.match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
  };

  const validateNumber = (e) => {
    return e.match(/^\d{9}$/);
  };

  const clearInputs = () => {
    setNumber("");
    setEmail("");
    setName("");
    setMailCheckbox(false);
    setPhoneCheckbox(false);
    setSmsCheckbox(false);
    setPhoneCheckboxesVisibility(false);
  };

  const handleServerResponse = (e) => {
    setErrorMessage(null);
    setServerResponse(e?.content);
    clearInputs();
  };

  const handleErrorMessage = (e) => {
    setServerResponse(null);
    setErrorMessage(e?.message);
    clearInputs();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      number.length &&
      validateNumber(number) &&
      !smsCheckbox &&
      !phoneCheckbox
    ) {
      return;
    }
    if (number.length && !validateNumber(number)) {
      return;
    }
    if (name.length && validateEmail(email) && mailCheckbox) {
      setCounter((prevCounter) => prevCounter + 1);
      axios
        .post(URL, {
          name: name,
          email: email,
          phone: number,
          agreement_mail: mailCheckbox,
          agreement_call: phoneCheckbox,
          agreement_sms: smsCheckbox,
          error_test: counter % 10 === 0 ? "" : email,
        })
        .then((response) => handleServerResponse(response))
        .catch((error) => handleErrorMessage(error));
    }
  };

  return (
    <>
      <div className="uppertext">
        Czy już widzisz tutaj swój nowy dom? Skontaktuj się z nami
      </div>
      <div className="bottomtext">i porozmawiaj o ofercie działki!</div>
      <div className="App">
        <form className="form">
          <div className="userinputs">
            <TextInput
              type="text"
              placeholder="IMIĘ I NAZWISKO"
              value={name}
              onchange={handleTextChange}
            />
            <TextInput
              type="tel"
              placeholder="TELEFON"
              value={number}
              onchange={handleNumberChange}
            />
            <div className="serverresponse">{serverResponse}</div>
            <TextInput
              type="email"
              placeholder="EMAIL"
              value={email}
              onchange={handleEmailChange}
            />
            <div className="errormessage">{errorMessage}</div>
            <div className="infotext">
              Wyrażam zgodę na otrzymywanie od Duda Development Sp. z.o.o. SKA z
              siedzibą w Poznaniu ul. Macieja Palacza 144, 60-278 Poznań,
              informacji handlowej.
            </div>
            <div className="checkboxes">
              <div>
                <CheckBoxInput
                  value={mailCheckbox}
                  onchange={handleMailCheckboxChange}
                  label="w formie elektronicznej (mail) na wskazany adres mailowy"
                />
              </div>
              {phoneCheckboxesVisibility ? (
                <>
                  <CheckBoxInput
                    value={phoneCheckbox}
                    onchange={handlePhoneCheckboxChange}
                    label="drogą telefoniczną, na udostępniony numer telefonu"
                  />
                  <div>
                    <CheckBoxInput
                      value={smsCheckbox}
                      onchange={handleSmsCheckboxChange}
                      label="w formie SMS, na udostępniony numer telefonu"
                    />
                  </div>
                </>
              ) : null}
            </div>
          </div>
          <button onClick={handleSubmit} className="sendbutton">
            WYŚLIJ
          </button>
          <button href="#" className="infobutton" onClick={handleInfoButton}>
            Kto będzie administratorem Twoich danych osobowych?
          </button>
        </form>
      </div>
    </>
  );
};

export default App;
