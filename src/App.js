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
  const [counter, setCounter] = useState(1);
  const [errorMessage, setErrorMessage] = useState(null);
  const [serverResponse, setServerResponse] = useState(null);
  const [nameError, setNameError] = useState(null);
  const [numberError, setNumberError] = useState(null);
  const [mailError, setMailError] = useState(null);
  const [checkboxesError, setCheckBoxesError] = useState(null);

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

  const createForm = (obj) => {
    const formData = new FormData();

    Object.entries(obj).forEach(([key, value]) => {
      formData.append(key, value);
    });

    return formData;
  };

  const handleServerResponse = (e) => {
    console.log(e);
    setErrorMessage(null);
    if (e.data.content) {
      setErrorMessage(null);
      setServerResponse(e?.data?.content);
      return;
    }
    if (e.data.error) {
      setServerResponse(null);
      for (const [key, value] of Object.entries(e.data.error)) {
        setErrorMessage((prevState) =>
          prevState ? prevState + ` ${key} ${value}` : `${key} ${value}`
        );
      }
      return;
    }
  };

  const clearErrors = () => {
    setMailError(null);
    setNumberError(null);
    setNameError(null);
  };

  const handleErrorMessage = (e) => {
    setServerResponse(null);
    setErrorMessage(e?.message);
  };

  const handleTextInputsValidation = (
    name,
    number,
    email,
    validateEmail,
    validateNumber
  ) => {
    !name.length
      ? setNameError("Należy wprowadzić prawidłowe imię i nazwisko")
      : setNameError(null);

    !validateEmail(email)
      ? setMailError("Należy wprowadzić prawidłowy adres email")
      : setMailError(null);

    !validateNumber(number)
      ? setNumberError("Należy wprowadzić prawidłowy numer telefonu")
      : setNumberError(null);
  };

  const handleCheckboxesValidation = (
    number,
    validateNumber,
    smsCheckbox,
    phoneCheckbox,
    mailCheckbox,
    setCheckBoxesError
  ) => {
    if (
      number.length &&
      validateNumber(number) &&
      !smsCheckbox &&
      !phoneCheckbox
    ) {
      setCheckBoxesError("Należy zaznaczyć prawidłowe zgody");
      return;
    }

    if (!mailCheckbox) {
      setCheckBoxesError("Należy zaznaczyć prawidłowe zgody");
      return;
    }

    setCheckBoxesError(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    handleTextInputsValidation(
      name,
      number,
      email,
      validateEmail,
      validateNumber
    );

    handleCheckboxesValidation(
      number,
      validateNumber,
      smsCheckbox,
      phoneCheckbox,
      mailCheckbox,
      setCheckBoxesError
    );

    if (
      name.length &&
      validateEmail(email) &&
      mailCheckbox &&
      validateNumber(number) &&
      !checkboxesError
    ) {
      clearErrors();
      setCounter((prevCounter) => prevCounter + 1);
      const data = {
        name: name,
        email: email,
        phone: number,
        agreement_mail: mailCheckbox,
        agreement_call: phoneCheckbox,
        agreement_sms: smsCheckbox,
        error_test: counter % 10 === 0 ? "" : email,
      };
      axios
        .post(URL, createForm(data))
        .then((response) => handleServerResponse(response))
        .catch((error) => handleErrorMessage(error));
      return;
    }
    setServerResponse(null);
  };

  return (
    <div className="app">
      <div className="uppertext">
        Czy już widzisz tutaj swój nowy dom? Skontaktuj się z nami
      </div>
      <div className="bottomtext">i porozmawiaj o ofercie działki!</div>
      <div className="appwindow">
        <form className="form">
          <div className="userinputs">
            <TextInput
              type="text"
              placeholder="IMIĘ I NAZWISKO"
              value={name}
              onchange={handleTextChange}
              errormessage={nameError}
            />
            <TextInput
              type="tel"
              placeholder="TELEFON"
              value={number}
              onchange={handleNumberChange}
              errormessage={numberError}
            />
            <div
              className="serverresponse"
              dangerouslySetInnerHTML={{ __html: serverResponse }}
            />
            <TextInput
              type="email"
              placeholder="EMAIL"
              value={email}
              onchange={handleEmailChange}
              errormessage={mailError}
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
                  id="mailCheckbox"
                  value={mailCheckbox}
                  onchange={handleMailCheckboxChange}
                  label="w formie elektronicznej (mail) na wskazany adres mailowy"
                />
              </div>
              {phoneCheckboxesVisibility ? (
                <>
                  <CheckBoxInput
                    id="phoneCheckbox"
                    value={phoneCheckbox}
                    onchange={handlePhoneCheckboxChange}
                    label="drogą telefoniczną, na udostępniony numer telefonu"
                  />
                  <div>
                    <CheckBoxInput
                      id="smsCheckbox"
                      value={smsCheckbox}
                      onchange={handleSmsCheckboxChange}
                      label="w formie SMS, na udostępniony numer telefonu"
                    />
                  </div>
                </>
              ) : null}
              <div className="errormessage">{checkboxesError}</div>
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
    </div>
  );
};

export default App;
