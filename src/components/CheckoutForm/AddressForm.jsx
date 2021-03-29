import React, { useState, useEffect } from "react";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import CircularProgress from "@material-ui/core/CircularProgress";
import { Link } from "react-router-dom";
import { useForm, FormProvider } from "react-hook-form";

import { commerce } from "../../lib/commerce";

import FormInput from "./CustomTextField";

const AddressForm = ({ checkoutToken, next }) => {
  const [shippingCountries, setShippingCountries] = useState([]);
  const [shippingCountry, setShippingCountry] = useState("");
  const [shippingSubdivisions, setShippingSubdivisions] = useState([]);
  const [shippingSubdivision, setShippingSubdivision] = useState("");
  const [shippingOptions, setShippingOptions] = useState([]);
  const [shippingOption, setShippingOption] = useState("");
  const [loading, setLoading] = useState(true);

  const countries = Object.entries(shippingCountries).map(([code, name]) => ({
    id: code,
    label: name,
  }));

  const subdivisions = Object.entries(shippingSubdivisions).map(
    ([code, name]) => ({
      id: code,
      label: name,
    })
  );

  const options = shippingOptions.map((option) => ({
    id: option.id,
    label: `${option.description} - ${option.price.formatted_with_symbol}`,
  }));

  const methods = useForm();

  const fetchShippingCountries = async (checkoutTokenId) => {
    return await commerce.services.localeListShippingCountries(checkoutTokenId);
  };

  const fetchShippingSubdivisions = async (countryCode) => {
    return await commerce.services.localeListSubdivisions(countryCode);
  };

  const fetchShippingOptions = async (
    checkoutTokenId,
    country,
    stateProvince = null
  ) => {
    return await commerce.checkout.getShippingOptions(checkoutTokenId, {
      country: country,
      region: stateProvince,
    });
  };

  useEffect(() => {
    let isMounted = true;
    fetchShippingCountries(checkoutToken.id)
      .then((countries) => {
        if (isMounted) {
          setShippingCountries(countries.countries);
          setShippingCountry(Object.keys(countries.countries)[0]);
        }
      })
      .catch((error) => {
        console.log(
          "There was an error fetching a list of shipping countries",
          error
        );
      });
    return () => {
      isMounted = false;
    };
  }, [checkoutToken]);

  useEffect(() => {
    if (shippingCountry) {
      let isMounted = true;
      fetchShippingSubdivisions(shippingCountry)
        .then((subdivisions) => {
          if (isMounted) {
            setShippingSubdivisions(subdivisions.subdivisions);
            setShippingSubdivision(Object.keys(subdivisions.subdivisions)[0]);
          }
        })
        .catch((error) => {
          console.log("There was an error fetching the subdivisions", error);
        });
      return () => {
        isMounted = false;
      };
    }
  }, [shippingCountry]);

  useEffect(() => {
    if (shippingCountry) {
      let isMounted = true;
      fetchShippingOptions(checkoutToken.id, shippingCountry)
        .then((options) => {
          if (isMounted) {
            setShippingOptions(options);
            setShippingOption(options[0] ? options[0].id : null);
          }
        })
        .catch((error) => {
          console.log(
            "There was an error fetching the shipping options",
            error
          );
        })
        .finally(() => setLoading(false));
      return () => {
        isMounted = false;
      };
    }
  }, [checkoutToken, shippingCountry]);

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Shipping Address
      </Typography>
      <FormProvider {...methods}>
        <form
          onSubmit={methods.handleSubmit((data) =>
            next({
              ...data,
              shippingCountry,
              shippingSubdivision,
              shippingOption,
            })
          )}
        >
          <Grid container spacing={3}>
            <FormInput name="firstName" label="First name" />
            <FormInput name="lastName" label="Last name" />
            <FormInput name="address" label="Address" />
            <FormInput name="email" label="Email" />
            <FormInput name="city" label="City" />
            <FormInput name="zip" label="ZIP / Postal code" />
            {loading ? (
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  margin: "auto"
                }}
              >
                <CircularProgress />
              </div>
            ) : (
              <React.Fragment>
                <Grid item xs={12} sm={6}>
                  <InputLabel>Shipping Country</InputLabel>
                  <Select
                    value={shippingCountry}
                    fullWidth
                    onChange={(e) => {
                      setLoading(true);
                      setShippingCountry(e.target.value);
                    }}
                  >
                    {countries.map((country) => (
                      <MenuItem key={country.id} value={country.id}>
                        {country.label}
                      </MenuItem>
                    ))}
                  </Select>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <InputLabel>Shipping Subdivision</InputLabel>
                  <Select
                    value={shippingSubdivision}
                    fullWidth
                    onChange={(e) => setShippingSubdivision(e.target.value)}
                  >
                    {subdivisions.map((subdivision) => (
                      <MenuItem key={subdivision.id} value={subdivision.id}>
                        {subdivision.label}
                      </MenuItem>
                    ))}
                  </Select>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <InputLabel>Shipping Options</InputLabel>
                  <Select
                    value={shippingOption}
                    fullWidth
                    onChange={(e) => setShippingOption(e.target.value)}
                  >
                    {options.map((option) => (
                      <MenuItem key={option.id} value={option.id}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </Select>
                </Grid>
              </React.Fragment>
            )}
          </Grid>
          <br />
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <Button component={Link} to="/cart" variant="contained" color="secondary">
              Back to Cart
            </Button>
            <Button type="submit" color="primary" variant="contained">
              Next
            </Button>
          </div>
        </form>
      </FormProvider>
    </React.Fragment>
  );
};

export default AddressForm;
