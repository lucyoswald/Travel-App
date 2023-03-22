import { useState } from "react";
import axios from "axios";
import home_background_image from "../assets/Pretty archway.jpg";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../consts";

const Home = () => {
  const navigate = useNavigate();

  const [searchName, setSearchName] = useState("");
  const [searchForm, setSearchForm] = useState([]);
  const [showError, setShowError] = useState(false);

  const onChange = (e) => {
    setSearchName(e.target.value);
    console.log(e.target.value);
  };

  function onSubmitForm(e) {
    e.preventDefault();
    const inputVal = e.target.elements.country.value.trim();
    if (inputVal) {
      axios
        .get(`${API_URL}/countries?name=${inputVal}`)
        .then(({ data }) => {
          const countryData = data.data;
          console.log(countryData);
          const cleanedData = countryData.map((country) => {
            return {
              countryName: country.name,
              countryId: country._id,
            };
          });

          setSearchForm(cleanedData);

          if (cleanedData.length > 0) {
            console.log(cleanedData[0].countryId);
            navigate(`/countries/${cleanedData[0].countryId}`);
          } else {
            setShowError(true);
          }
        })
        .catch(() => {
          setShowError(searchName !== "");
        });
    }
  }

  return (
    <div className="home">
      <img
        src={home_background_image}
        alt="Background image"
        className="home_background_image"
      />

      <h4 className="home_header">Where would you like to go?</h4>

      <section>
        <form className="input_form" onSubmit={onSubmitForm}>
          <input
            className="country_search"
            type="text"
            placeholder="Type in your country..."
            onChange={onChange}
            name="country"
          ></input>

          <button type="submit" className="submit_button">
            Submit
          </button>
        </form>
        {showError && (
          <div class="container p-5 error">
            <div
              class="alert alert-danger alert-dismissible fade show errorbox"
              role="alert"
            >
              <strong>
                We apologize, the country you have selected cannot be found
                within our database
              </strong>
              <button
                type="button"
                class="close closebutton"
                data-dismiss="alert"
                aria-label="Close"
                onClick={() => setShowError(false)}
              >
                <span aria-hidden="True">&times;</span>
              </button>
            </div>
          </div>
        )}
        <section className="signup_login_buttons">
          <button
            type="button"
            onClick={() => navigate("/signup")}
            className="SignUp_button"
          >
            Sign Up
          </button>
          <button
            type="button"
            onClick={() => navigate("/login")}
            className="LogIn_button"
          >
            Log In
          </button>
        </section>
      </section>
    </div>
  );
};

export default Home;
