import axios from "axios";
import "./App.css";
import { useState, useEffect } from "react";
import { Grid, TextField, Button, Box } from "@mui/material";

function App() {
  const [cityName, setCity] = useState({
    city: "",
    country: "",
  });
  const [details, setDetails] = useState({
    temp: "TEMPRATURE",
    humidity: "HUMIDITY",
    cloud: "CLOUD",
    wind_speed: "WIND SPEED",
    wind_dir: "WIND DIRECTION",
    condition: "CONDITION",
    img: "",
  });

  useEffect(() => {
    console.log("City is now: ", cityName);
  }, [cityName]);

  function handleAPI(event) {
    event.preventDefault();
    const city = event.target.city_name.value;
    setCity(city);

    axios
      .get(
        "http://api.weatherapi.com/v1/current.json?key=4f2aa6c0f2bf4bc186151423232205&q=" +
          city +
          "&aqi=no"
      )
      .then((res) => {
        console.log('ajay api response',res.data);
        return (
          setDetails({
            temp: res.data.current.temp_c,
            humidity: res.data.current.humidity,
            cloud: res.data.current.cloud,
            wind_dir: res.data.current.wind_dir,
            condition: res.data.current.condition.text,
            wind_speed: res.data.current.wind_kph,
            img: res.data.current.condition.icon,
          }),
          setCity({
            city: res.data.location.name,
            country: res.data.location.country,
          })
        );
      })
      .catch((err) => console.log(err.message));
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>Wheather App using ReactJS & Wheather API</h1>
        <form onSubmit={handleAPI}>
          <TextField
            id="outlined-basic"
            color="warning"
            name="city_name"
            label="City/State/Country"
            style={{ background: "white", width: "580px" }}
            variant="filled"
          />

          <Button
            type="submit"
            style={{
              paddingTop: "15px",
              paddingBottom: "15px",
              marginLeft: "10px",
            }}
            color="warning"
            variant="contained"
          >
            Check
          </Button>
        </form>

        <Grid container>
          <Grid item sm={6}>
            <Box>
              <br />
              <span className="my_span" style={{ color: "#ED6C02" }}>
                City:{" "}
              </span>
              {cityName.city}
            </Box>
            <Box>
              <br />
              <span className="my_span" style={{ color: "#ED6C02" }}>
                Country:{" "}
              </span>
              {cityName.country}
            </Box>
            <Box>
              <p>{details.condition}</p>
              <img src={details.img} width={"150px"} alt="" />
            </Box>
          </Grid>

          <Grid item sm={6}>
            <br />
            <Box>
              <span className="my_span">Temperature: </span>
              {details.temp} C
            </Box>
            <br />
            <Box>
              <span className="my_span">Humidity: </span>
              {details.humidity}
            </Box>
            <br />
            <Box>
              <span className="my_span">Wind Speed: </span>
              {details.wind_speed} KPH
            </Box>
            <br />
            <Box>
              <span className="my_span">Wind Direction: </span>
              {details.wind_dir}
            </Box>
            <br />
          </Grid>
        </Grid>
      </header>
    </div>
  );
}

export default App;
