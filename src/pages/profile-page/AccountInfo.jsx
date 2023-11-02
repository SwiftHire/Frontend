import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import tokenService from "../../services/token.service";
import userIcon from "../../assets/png/user-icon.png";
import { useUserPlanContext } from "../../contexts/UserPlansContext";

import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Button from "@mui/material/Button";
import { FileUploader } from "react-drag-drop-files";
const AccountInfo = () => {
  const user = tokenService.getUser();
  const { updateUserPlans, userPlans } = useUserPlanContext();
  useEffect(() => {
    updateUserPlans();
  }, [userPlans]);

  const fileTypes = ["PDF", "DOC", "DOCX"];
  const [file, setFile] = useState(null);
  const handleChange = (file) => {
    setFile(file);
  };
  return (
    <div className="w-full md:w-[80vw]">
      <div
        className="h-[10rem] w-full bg-gradient-to-r 
            from-indigo-500 via-purple-500 to-primary py-5 rounded-5 shadow-square"
      >
        <h3 className="font-bold text-[2rem] text-body text-center">
          {user.name}
        </h3>
      </div>
      <div className="grid">
        <img
          src={userIcon}
          alt=""
          className="shadow-secondary -translate-y-10 border border-4 rounded-full"
        />

        <Typography variant="h6" gutterBottom>
          Contact Information
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="firstName"
              name="firstName"
              label="First name"
              fullWidth
              autoComplete="given-name"
              variant="standard"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="lastName"
              name="lastName"
              label="Last name"
              fullWidth
              autoComplete="family-name"
              variant="standard"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="phoneNumber"
              name="phoneNumber"
              label="Phone Number"
              type="number"
              fullWidth
              autoComplete="given-name"
              variant="standard"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="email"
              name="email"
              label="Email"
              type="email"
              fullWidth
              autoComplete="given-name"
              variant="standard"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="gender"
              name="gender"
              label="Gender"
              fullWidth
              autoComplete="given-name"
              variant="standard"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="ethnicity"
              name="ethnicity"
              label="Ethnicity"
              fullWidth
              autoComplete="given-name"
              variant="standard"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              id="address1"
              name="address1"
              label="Address line 1"
              fullWidth
              autoComplete="shipping address-line1"
              variant="standard"
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              id="address2"
              name="address2"
              label="Address line 2"
              fullWidth
              autoComplete="shipping address-line2"
              variant="standard"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="city"
              name="city"
              label="City"
              fullWidth
              autoComplete="shipping address-level2"
              variant="standard"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              id="state"
              name="state"
              label="State/Province/Region"
              fullWidth
              variant="standard"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="zip"
              name="zip"
              label="Zip / Postal code"
              fullWidth
              autoComplete="shipping postal-code"
              variant="standard"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="country"
              name="country"
              label="Country"
              fullWidth
              autoComplete="shipping country"
              variant="standard"
            />
          </Grid>
          <Grid item xs={12}>
            <FormControlLabel
              control={
                <Checkbox color="secondary" name="saveAddress" value="yes" />
              }
              label="Use this address for payment details"
            />
          </Grid>
        </Grid>
        <Typography variant="h6" gutterBottom sx={{ mt: 5 }}>
          Work Information
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="languages"
              name="languages"
              label="Languages"
              type="languages"
              fullWidth
              autoComplete="given-name"
              variant="standard"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="skills"
              name="skills"
              label="Skills"
              fullWidth
              autoComplete="given-name"
              variant="standard"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              id="standard-multiline-static"
              label="Work history"
              multiline
              rows={10}
              fullWidth
              variant="standard"
              placeholder={
                "Company name, company location, work period, your role"
              }
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              id="standard-multiline-static"
              label="Education"
              multiline
              rows={10}
              fullWidth
              variant="standard"
              placeholder={
                "Education level, University name, Related courses taken"
              }
            />
          </Grid>
        </Grid>
        <Typography variant="h6" gutterBottom sx={{ mt: 5 }}>
          Resume:
        </Typography>
        <Grid container spacing={3}>
          <div className="uploadFile m-[1em] mt-[2em]">
            <FileUploader
              handleChange={handleChange}
              name="file"
              types={fileTypes}
              dropMessageStyle={{ backgroundColor: "light grey" }}
            />
            <p>{file && `File name: ${file.name}`}</p>
          </div>
          <Grid item xs={12} sm={6}>
            <TextField
              id="links"
              label="Additional links: "
              fullWidth
              variant="standard"
            />
          </Grid>
        </Grid>
        {/* <Button disabled={false} size="large" variant="filledTonal"></Button> */}

        <div
          className="h-[10em]"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Button variant="contained" className="w-[50em] h-[6em] pb-[5em]">
            Update Profile
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AccountInfo;
