import React from "react";
import { createStore } from "redux";

const initialState = {
  temp: 0,
  weather: "Default",
  location: "Mumbai",
  visibility: "3200",
  icon: "",
  pressure: "",
  wind: "",
  sunrise: "",
  sunset: "",
  id: "300"
};

const reducer = (state = initialState, action) => {    
  switch (action.type) {     
    case "GET_WEATHER":
      return {
        ...state,
        temp: Math.round(action.res.temp),
        weather: action.res.weather,
        location: action.res.location,
        visibility: action.res.visibility,
        icon: action.res.icon,
        pressure: action.res.pressure,
        wind: action.res.wind,
        sunrise: action.res.sunrise,
        sunset: action.res.sunset,
        id: action.res.id
      };
  }
  return state;
};

export const store = createStore(reducer);
