import axios from "axios";
import "./App.css";
import { useState, useEffect } from "react";
import { Grid, TextField, Button, Box } from "@mui/material";

function App() {
  const [cityName, setCity] = useState({
    city: "",
    country: "",
  });
  const [clickedButton, setClicked] = useState("");
  const [body1, setBody1] = useState({
    provisioned_data_profile: {
      uuid: "0f81e3e2-f3a9-409d-8166-c56a1ac8cf46",
    },
    policy_data_profile: {
      uuid: "ff39172d-b564-4672-aca9-791d0d251fe7",
    },
  });

  useEffect(() => {
    console.log("imsi is now: ", cityName);
    console.log("body: ", body1);
  }, [cityName, body1]);

  function handleAPI(event) {
    event.preventDefault();
    const city = event.target.city_name.value;
    setCity(city);

    console.log("buttonclick", clickedButton);
    if (clickedButton === "firstButton") {
      let body1 = {
        provisioned_data_profile: {
          uuid: "0f81e3e2-f3a9-409d-8166-c56a1ac8cf46",
        },
        policy_data_profile: {
          uuid: "ff39172d-b564-4672-aca9-791d0d251fe7",
        },
      };
      setBody1(body1);
    } else if (clickedButton === "secondButton") {
      let body2 = {
        provisioned_data_profile: {
          uuid: "0f81e3e2-f3a9-409d-8166-c56a1ac8cf46",
        },
        policy_data_profile: {
          uuid: "ff39172d-b564-4672-aca9-791d0d251fe7",
        },
      };
      setBody1(body2);
    } else {
    }

    var session_url = "https://172.22.70.28/core/pls/api/1/auth/login";
    axios
      .post(session_url, {
        username: "admin",
        password: "Super4dmin!",
      })
      .then(function (response) {
        console.log("Authenticated", response);
        console.log("Token", response.data.access_token);

        const headers = {
          Authorization: `Bearer ${response.data.access_token}`,
        };
        axios
          .patch(
            `https://172.22.70.28/core/udr/api/1/provisioning/supis/imsi-${city}`,
            body1,
            { headers }
          )
          .then((response1) => {
            console.log("res--", response1);
            return setCity({
              city: response1.data.supi,
              country: response1.data.status,
            });
          })
          .catch((error) => {
            console.error("There was an error!", error);
          });
      })
      .catch(function (error) {
        console.log("Error on Authentication");
      });
    //----------------------------------
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>Boingo Priority 5G PASS</h1>
        <form onSubmit={handleAPI}>
          <TextField
            id="outlined-basic"
            color="warning"
            name="city_name"
            label="IMSI"
            style={{ background: "white", width: "580px" }}
            variant="filled"
          />

          <Button
            onClick={() => {
              setClicked("firstButton");
            }}
            id="submit1"
            type="submit"
            style={{
              paddingTop: "15px",
              paddingBottom: "15px",
              marginLeft: "10px",
            }}
            color="warning"
            variant="contained"
          >
            Profile - A
          </Button>
          <Button
            onClick={() => {
              setClicked("secondButton");
            }}
            id="submit2"
            type="submit"
            style={{
              paddingTop: "15px",
              paddingBottom: "15px",
              marginLeft: "10px",
            }}
            color="warning"
            variant="contained"
          >
            Profile -B
          </Button>
        </form>

        <Grid container>
          <Grid item sm={6}>
            <Box>
              <br />
              <span className="my_span" style={{ color: "#ED6C02" }}>
                IMSI:{" "}
              </span>
              {cityName.city}
            </Box>
          </Grid>

          <Grid item sm={6}>
            <br />
            <Box>
              <span className="my_span">STATUS: </span>
              {cityName.country}
            </Box>
            <br />
          </Grid>
        </Grid>
      </header>
    </div>
  );
}

export default App;
