import React, { useState } from "react";
import Formulary from "../../components/Formulary";
import MyTextInput from "../../components/MyTextInput";
import Campo from "../../components/Campo";
import Datepicker from "../../components/Datepicker";
import api from "../../services/api";
import { getToken } from "../../utils/auth";

import "./styles.css";

const validate = values => {
  const errors = {};
  if (!values.title) {
    errors.title = 'Required';
  } else if (values.title.length > 15) {
    errors.title = 'Must be 15 characters or less';
  }
  return errors;
};

const RegisterEvent = (props) => {
  var today = new Date();
  var date =
    today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();
  var time =
    today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  var dateTime = date + " " + time;

  const [title, setTitle] = useState("");
  const [startDateEvent, setStartDateEvent] = useState("");
  const [endDateEvent, setEndDateEvent] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [contact, setContact] = useState("");
  const [coordinator, setCoordinator] = useState("");
  const [accountable, setAccountable] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");

  const [startSubscriptionEvent, setStartSubscriptionEvent] = useState("");
  const [endSubscriptionEvent, setEndSubscriptionEvent] = useState("");

  /* vector */
  const [assistentName, setAssistentName] = useState("");
  const [erroMessage, setErrorMessage] = useState("");
  const [errorVisible, setErrorVisible] = useState(false);

  document.title = "Criar Evento"; // title of page

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log(getToken('event-token'))
    const response = await api.post("/event", {
      title,
      start_date: startDateEvent,
      end_date: endDateEvent,
      picture: "",
      address: [{ address, contact, email }],
      start_subscribe: startSubscriptionEvent,
      end_subscribe: endSubscriptionEvent,
      accountable: accountable,
      description: description,
      activities: [],
      price: price,
      assistants: [],
      is_available: true,
      payment_address: [],
      headers: {
        authorization: getToken('event-token')
      }
    })

    console.log(response)

    if (response.status === 201) {
      props.history.push("/");
      alert("Evento criado com sucesso! :)")
    } else {
      setErrorMessage(response.data.error);
      setErrorVisible(true);

      setTimeout(() => {
        setErrorVisible(false);
      }, 5000);
    }
  };

  return (
    <div className="content">
      <Formulary
        initialValues={{
          title: '',
          address: '',
          description: '',
        }}
        validate
        onSubmit={handleSubmit}
        contents={
          <>
            <MyTextInput
              label="Title"
              name="title"
              type="text"
              placeholder="Nome do evento"
            />
            <div className="campo-container">
              <div>
                <label>Descrição</label>
              </div>
              <textarea
                className="input"
                value={description}
                onChange={(e) => {
                  setDescription(e.target.value);
                }}
              />
            </div>
            <MyTextInput
              label="Endereço"
              name="address"
              type="text"
              placeholder="Local do evento"
            />

            <MyTextInput
              label="Descrição"
              name="description"
              type="text"
              placeholder="Descrição"
            />
          </>
        }
      />
      {/* <div className="form-content">
        {errorVisible ? (
          <label className="errorMessage">{erroMessage}</label>
        ) : null}
        <h1>
          <strong>Criação do Evento</strong>
        </h1>

        <form onSubmit={handleSubmit}>
          <Campo
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
            text="*Nome do Evento"
          />

          <div class="row">
            <div class="col">
              <Datepicker
                selected={startDateEvent}
                onChange={date => {
                  setStartDateEvent(date)
                  console.log(startDateEvent)
                }
                }
                text="Início do evento"
              />
            </div>
            <div class="col">
              <Datepicker
                selected={endDateEvent}
                onChange={date => {
                  setEndDateEvent(date)
                  console.log(endDateEvent)
                }
                }
                text="Fim do evento"
              />
            </div>
          </div>

          <Campo
            value={address}
            onChange={(e) => {
              setAddress(e.target.value);
            }}
            text="Localidade"
          />

          <div className="campo-container">
            <div>
              <label>Descrição</label>
            </div>
            <textarea
              className="input"
              value={description}
              onChange={(e) => {
                setDescription(e.target.value);
              }}
            />
          </div>
          <div>
            <button type="submit" className="link">
              Criar Evento
            </button>
          </div>
        </form>
      </div> */}
    </div>
  ); //fim return
}; //fim classe RegisterEvent

export default RegisterEvent;
