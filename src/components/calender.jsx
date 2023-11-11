import React, { useState, useEffect } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import Select from "react-select";

import "react-big-calendar/lib/css/react-big-calendar.css";
moment.locale("en-GB");
const localizer = momentLocalizer(moment);

function Calender() {
  // state variables
  // list of countries
  const [countries, setCountries] = useState([]);
  // list of select county
  const [selectedCountry, setSelectedCountry] = useState({});
  // list of holidays event
  const [eventlist, setEventList] = useState([]);

  const api_key = "gyVQlnVqhTFlaOfi41PRQlnDuokJ223n"; // use the current api_key from calendarific.com

  // funciton to fetch countries and holidays
  const fetchCountriesAndHolidays = async (selectedOption) => {
    const selectoptionvalue = selectedOption.value;
    console.log(selectoptionvalue, "countryC");
    try {
      // fetch holiday data from country
      const holidaysResponse = await fetch(
        `https://calendarific.com/api/v2/holidays?&api_key=${api_key}&country=${selectoptionvalue}&year=2023`
      );
      const holidayData = await holidaysResponse.json();

      // map the data to holiday data calendar events
      const newEvents = holidayData.response.holidays.map((listdata) => ({
        title: listdata.name,
        start: new Date(
          listdata.date.datetime.year,
          listdata.date.datetime.month - 1,
          listdata.date.datetime.day
        ),
        end: new Date(
          listdata.date.datetime.year,
          listdata.date.datetime.month - 1,
          listdata.date.datetime.day
        ),
      }));

      // the new events is set in the list
      setEventList(newEvents);
      console.log(newEvents, "eventListt");
    } catch (error) {
      console.error(error);
    }
  };

  // fetching the initial data using useEffect hook
  useEffect(() => {
    const fetchData = async () => {
      try {
        // fetch countries data list
        const countriesResponse = await fetch(
          "https://valid.layercode.workers.dev/list/countries?format=select&flags=true&value=code"
        );
        const countriesData = await countriesResponse.json();
        console.log(countriesData, "countiress");

        // countries state list set
        setCountries(countriesData.countries);
        setSelectedCountry(countriesData.userSelectValue);

        // when the specific country selected it will show the holidays data event list
        await fetchCountriesAndHolidays(countriesData.userSelectValue);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1 align="center">CALENDAR</h1>
      {/* select component will show countries list to select the country */}
      <Select
        options={countries}
        value={selectedCountry}
        onChange={(selectedOption) => fetchCountriesAndHolidays(selectedOption)}
      />

      {/* Calendar component display holidays */}
      <Calendar
        views={["day", "month"]}
        selectable
        localizer={localizer}
        defaultDate={new Date()}
        defaultView="month"
        events={eventlist}
        style={{ height: "100vh" }}
      />
    </div>
  );
}

export default Calender;
