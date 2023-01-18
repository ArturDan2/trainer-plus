import React, { useState } from "react";
import "./AddMenteeStyles.scss";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../../../Firestore/firestore";
import { dateFormater } from "../../../Utils/dateFormater";
import { getDate } from "../../../Utils/getDate";
import uniqid from "uniqid";
import { useNavigate } from "react-router-dom";

const AddMenteeForm = () => {
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [gender, setGender] = useState("");
  const [email, setEmail] = useState("");
  const [phonenumber, setPhonenumber] = useState("");
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [goal, setGoal] = useState("");
  const [birthday, setBirthday] = useState();
  const [errorMessage, setErrorMessage] = useState();
  const { year, month, day } = getDate();
  const [succes, setSucces] = useState(false);
  const [animateCheckmark, setAnimateCheckmark] = useState(false);

  const navigate = useNavigate();

  const onChangeHandler = (setState) => (e) => {
    setState(e.target.value);
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    const newMentee = {
      fname: fname.toLowerCase(),
      lname: lname.toLowerCase(),
      gender: gender,
      email: email,
      phonenumber: phonenumber,
      weight: {
        [year]: [
          {
            date: `${dateFormater(day)}.${dateFormater(month)}`,
            id: uniqid(),
            weight: weight,
          },
        ],
      },
      height: height,
      goal: goal,
      birthday: birthday,
      timestamp: serverTimestamp(),
      age: Math.floor((new Date() - new Date(birthday).getTime()) / 3.15576e10),
      searchdata: [fname, lname, phonenumber],
      circumferences: {
        biceps: [],
        chest: [],
        calf: [],
        hips: [],
        shoudelrs: [],
        thigh: [],
        waist: [],
      },
    };

    try {
      const docRef = await addDoc(collection(db, "mantees"), newMentee);
      console.log("Document written with ID: ", docRef.id);
      setSucces(true);
      setTimeout(() => setAnimateCheckmark(true), 2000);
      setTimeout(() => navigate(`/${docRef.id}`), 3000);
    } catch (e) {
      setErrorMessage("Wystąpił błąd przy wysyłaniu formularza.");
      console.error("Error adding document: ", e);
    }
    setSucces(true);
  };

  return (
    <div className="add-mentee grid-container">
      <form className="add-mentee form" onSubmit={onSubmitHandler}>
        <section>
          <h2>
            <span>1.</span>Dane osobowe
          </h2>
          <div className="inputs-container">
            <div>
              <label htmlFor="fname">Imię:</label>
              <input
                type="text"
                name="fname"
                maxLength="15"
                value={fname}
                required="required"
                onChange={onChangeHandler(setFname)}
              ></input>
            </div>
            <div>
              <label htmlFor="lname">Nazwisko:</label>
              <input
                type="text"
                name="lname"
                maxLength="20"
                value={lname}
                required="required"
                onChange={onChangeHandler(setLname)}
              ></input>
            </div>
            <div>
              <label htmlFor="age">Data urodzenia:</label>
              <input
                type="date"
                data-date-inline-picker="true"
                required="required"
                onChange={onChangeHandler(setBirthday)}
              />
            </div>
            <div>
              <label htmlFor="gender">Płeć:</label>
              <select
                name="gender"
                value={gender}
                required="required"
                onChange={onChangeHandler(setGender)}
              >
                <option value=""></option>
                <option value="mężczyzna">MĘŻCZYZNA</option>
                <option value="kobieta">KOBIETA</option>
                <option value="inna">INNA</option>
              </select>
            </div>
          </div>
        </section>
        <section>
          <h2>
            <span>2.</span>Dane kontaktowe
          </h2>
          <div className="inputs-container">
            <div>
              <label htmlFor="email">Adres e-mail:</label>
              <input
                type="email"
                name="email"
                value={email}
                required="required"
                onChange={onChangeHandler(setEmail)}
              ></input>
            </div>
            <div>
              <label htmlFor="phonenumber">Numer telefonu:</label>
              <input
                type="tel"
                pattern="[0-9]+"
                name="phonenumber"
                value={phonenumber}
                required="required"
                onChange={onChangeHandler(setPhonenumber)}
              ></input>
            </div>
          </div>
        </section>
        <section>
          <h2>
            <span>3.</span>Podstawowe dane pomiarowe
          </h2>
          <div className="inputs-container">
            <div>
              <label htmlFor="weight">Masa ciała(kg):</label>
              <input
                min="10"
                max="350"
                type="number"
                name="weight"
                value={weight}
                required="required"
                onChange={onChangeHandler(setWeight)}
              ></input>
            </div>
            <div>
              <label htmlFor="height">Wzrost(cm):</label>
              <input
                type="number"
                max="272"
                maxLength="5"
                name="height"
                value={height}
                required="required"
                onChange={onChangeHandler(setHeight)}
              ></input>
            </div>
            <div>
              <label htmlFor="goal">Cel:</label>
              <input
                type="text"
                name="goal"
                value={goal}
                maxLength="10"
                required="required"
                onChange={onChangeHandler(setGoal)}
              ></input>
            </div>
          </div>
        </section>
        <input className="submit-btn" type="submit"></input>
        <h4 className="error-message">{errorMessage}</h4>
        <div className={`form-succeed ${succes ? "succeed" : ""}`}>
          <div
            className={`circle-loader ${
              animateCheckmark ? "load-complete" : ""
            }`}
          >
            <div
              className={`draw ${animateCheckmark ? "checkmark" : ""}`}
            ></div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddMenteeForm;
