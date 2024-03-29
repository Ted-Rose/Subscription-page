import React from "react";

import "./EmailForm.scss";

import AddEmailToDatabase from "./AddEmailToDatabase";

  
const EmailForm = () => {
  const [message, setMessage] = React.useState("");
  const [emailInput, setEmailInput] = React.useState("");
  const [inputHasError, setInputHasError] = React.useState(false);
  const [hideErrorMessage, setHideErrorMessage] = React.useState(true);

  const inputChangeHandler = (event) => {
    setEmailInput(event.target.value);
  };

  const emailValidation = () => {
    const emailRegex =
      /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    return !(!emailInput || emailRegex.test(emailInput) === false);
  };

  const countryValidation = () => {
    const countryRegex = /.co$/;
    return !emailInput || countryRegex.test(emailInput) === false;
  };

  const onSubmit = () => {
    const isEmailValid = emailValidation();
    const countryValid = countryValidation();

    if (Object.keys(emailInput).length === 0) {
      setInputHasError(true);
      setMessage("Email adress is required!");
    } else if (!countryValid) {
      setInputHasError(true);
      setMessage("We are not accepting subscriptions from Colombia emails!");
    } else if (!isEmailValid) {
      setInputHasError(true);
      setMessage("Email Address not valid!");
    } else {
      setInputHasError(false);
        setMessage("Thanks for subscribing!");
        AddEmailToDatabase(emailInput);
      }
      setHideErrorMessage(false);
    };
    

  const preventDefault = (e) => {
    e.preventDefault();
  };

    const messageClass = inputHasError ? "error" : "approved";
    const showMessage = hideErrorMessage ? "hide" : "show";

  return (
    <div className="formBox">
      <form
        className="form"
        onSubmit={preventDefault}
        action="#"
        id="subscriptionForm"
      >
        <div class={`${"vl"} ${messageClass}`}></div>
        <input
          id="emailInput"
          type="text"
          className={`${"emailInput"} ${messageClass}`}
          value={emailInput}
          onChange={inputChangeHandler}
          name="email_input"
          placeholder="Type your email address here…"
        />
        {/*         <input
          id="submitButton"
          type="image"
          className="submitButton"
          alt="Submit"
          src="./Images/ic_arrow.png"
        ></input> */}
        <button className="submitButton" onClick={onSubmit}></button>
      </form>
      <div className={`${"message"} ${messageClass} ${showMessage}`}>{message}</div>
    </div>
  );
};

export default EmailForm;
