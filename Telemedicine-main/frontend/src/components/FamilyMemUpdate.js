import React, { useState, useEffect } from "react";

import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  InputLabel,
  OutlinedInput,
  Paper,
  MenuItem,
  Select,
  RadioGroup,
  TextField,
  Typography,
} from "@mui/material";
import Logo from "../images/Logo.png";
import { motion } from "framer-motion";
import axios from "axios";
import { useHistory } from "react-router-dom";

const FamilyMemUpdate = () => {
  const [search, setSearch] = useState(true);
  const [searchType, setSearchType] = useState("1");
  const [input, setInput] = useState();
  const [familyData, setFamilyData] = useState({});
  const [patients, setPatients] = useState([]);
  const [newPatientName, setNewPatientName] = useState("");
  const [newPatientRelationship, setNewPatientRelationship] = useState("");

  const history = useHistory();

  const goBack = () => {
    // Navigate back to the previous page in the history stack
    history.goBack();
  };

  const SubmitHandler = async () => {
    if (!input) {
      setSearch(false);
      return;
    }
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      const response = await axios.post(`/api/family/fetch`, { input }, config);
      setFamilyData(response.data);
      setPatients(response.data.members);
      setSearch(false);
    } catch (error) {
      console.error("Error fetching family data:", error);
    }
  };

  const addNewPatient = async () => {
    try {
      if (!newPatientName) {
        console.log("Failed to generate a unique Registration Number");
        return;
      }
      // Prepare data for the new patient
      const newPatient = {
        familyId: familyData.id,
        name: newPatientName,
        relationship: newPatientRelationship,
      };

      // Update the backend with the new patient data
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      console.log(newPatient);
      const data = await axios.post(
        "/api/family/addmember",
        { newPatient },
        config
      );
      if (data) {
        console.log(data);
      }

      SubmitHandler();
      // Clear input fields
      setNewPatientName("");
      setNewPatientRelationship("");
    } catch (error) {
      console.error("Error adding new patient:", error);
    }
  };

  return (
    <>
      {search === true ? (
        <Box
          sx={{
            width: "98vw",
            height: "34vh",
            position: "absolute",
            right: "0px",
            top: "12vh",
          }}
          display="flex"
          justifyContent="center">
          <motion.div layoutId="main">
            <Paper
              elevation={3}
              sx={{
                backgroundColor: "#C7C7C7",
                marginTop: "15vh",
                borderRadius: "25px",
                width: "30vw",
                height: "45vh",
                minWidth: "500px",
              }}>
              <motion.div
                animate={{ opacity: 1 }}
                initial={{ opacity: 0 }}
                transition={{ delay: 0.4 }}>
                <Box
                  display="flex"
                  alignItems="center"
                  sx={{ flexFlow: "column" }}>
                  <img
                    src={Logo}
                    alt="not found"
                    style={{
                      borderRadius: "50%",
                      position: "absolute",
                      top: "5vh",
                    }}></img>
                  <Typography
                    variant="h4"
                    component="div"
                    sx={{
                      fontFamily: "Roboto Slab",
                      color: "#17252A",
                      marginTop: "14vh",
                    }}>
                    Search Family member
                  </Typography>
                  <Box
                    sx={{
                      marginTop: "5vh",
                      alignSelf: "start",
                      marginLeft: "3vw",
                    }}
                    display="flex"
                    justifyContent="center">
                    <Box
                      display="flex"
                      justifyContent="center"
                      alignItems="center"
                      sx={{
                        backgroundColor: "#2B7A78",
                        width: "56px",
                        height: "56px",
                        color: "#17252A",
                        borderRadius: "5px 0px 0px 5px",
                      }}>
                      <i
                        class="material-icons"
                        style={{ color: "#FEFFFF", fontSize: "2.5rem" }}>
                        create
                      </i>
                    </Box>
                    <FormControl sx={{ width: "20vw", minWidth: "350px" }}>
                      <InputLabel htmlFor="ID">
                        {searchType === "1"
                          ? "Registration ID"
                          : "Mobile Number"}
                      </InputLabel>
                      <OutlinedInput
                        id="ID"
                        label={
                          searchType === "1"
                            ? "Registration ID"
                            : "Mobile Number"
                        }
                        sx={{
                          borderRadius: "0px 5px 5px 0px",
                          backgroundColor: "#FEFFFF",
                        }}
                        onChange={(e) => {
                          setInput(e.target.value);
                        }}
                      />
                    </FormControl>
                  </Box>
                  <Button
                    onClick={SubmitHandler}
                    sx={{
                      backgroundColor: "#CF823A",
                      color: "#FEFFFF",
                      width: "8vw",
                      height: "5vh",
                      borderRadius: "25px",
                      marginTop: "5vh",
                      "&:hover": { backgroundColor: "#CF9D6E" },
                    }}>
                    Search
                  </Button>
                </Box>
              </motion.div>
            </Paper>
          </motion.div>
        </Box>
      ) : (
        <Box display="flex" justifyContent="center" alignItems="center">
          <Button
            onClick={goBack}
            sx={{
              position: "absolute",
              top: "8vh",
              left: "6vw",
              backgroundColor: "#17252A",
              color: "#FEFFFF",
              padding: "1rem",
              borderRadius: "50px",
              "&:hover": { backgroundColor: "#333333" },
            }}>
            <i className="material-icons" sx={{ fontSize: "1rem" }}>
              keyboard_backspace
            </i>
          </Button>
          <Box
            display="flex"
            alignItems="center"
            sx={{
              width: "65vw",
              minWidth: "500px",
              border: "1px solid black",
              borderRadius: "25px",
              flexFlow: "column",
              backgroundColor: "#FEFFFF",
            }}>
            <Typography varient="h6" component="div">
              <Paper
                sx={{
                  borderRadius: "25px",
                  minWidth: "60vw",
                  backgroundColor: "#eeeeee",
                  marginTop: "15vh",
                }}
                elevation={3}>
                <Box
                  p={2}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}>
                  <Typography variant="h6">Name</Typography>
                  <Typography variant="h6">Relationship</Typography>
                  <Typography variant="h6">Registration No</Typography>
                </Box>
                <Box p={2}>
                  {patients.map((patient, index) => (
                    <Box
                      key={index}
                      p={2}
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        borderBottom: "1px solid #000",
                        backgroundColor: "#FFFFFF",
                        boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
                        // Optional: Add border between rows
                      }}>
                      <Typography variant="body1">{patient.name}</Typography>
                      <Typography variant="body1">
                        {patient.relationship}
                      </Typography>
                      <Typography variant="body1">{patient.id}</Typography>
                    </Box>
                  ))}
                </Box>
              </Paper>
            </Typography>
            {/* Form to add new patient */}
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              sx={{ marginTop: "2vh", marginBottom: "2vh" }}>
              <FormControl sx={{ width: "19vw", marginRight: "3vw" }}>
                <InputLabel htmlFor="Name">Name</InputLabel>
                <OutlinedInput
                  id="Name"
                  label="मुख्य वेतन अर्जक/ Chief Wage Earner (Name)"
                  value={newPatientName}
                  sx={{ borderRadius: "5px", backgroundColor: "#FEFFFF" }}
                  onChange={(e) => {
                    setNewPatientName(e.target.value);
                  }}
                />
              </FormControl>
              <FormControl sx={{ width: "19vw" }}>
                <InputLabel id="demo-simple-select-label">
                  Realtionship (रिश्ता)
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  label="Location Code"
                  value={newPatientRelationship}
                  sx={{ backgroundColor: "#FEFFFF" }}
                  defaultValue=""
                  onChange={(e) => {
                    setNewPatientRelationship(e.target.value);
                  }}>
                  <MenuItem value="पति या पत्नी">पति या पत्नी</MenuItem>
                  <MenuItem value="बेटा">बेटा</MenuItem>
                  <MenuItem value="बेटी">बेटी</MenuItem>
                  <MenuItem value="पिता">पिता</MenuItem>
                  <MenuItem value="माता">माता</MenuItem>
                  <MenuItem value="भइया">भइया</MenuItem>
                  <MenuItem value="बहन">बहन</MenuItem>
                  <MenuItem value="दादा">दादा</MenuItem>
                  <MenuItem value="दादी मा">दादी मा</MenuItem>
                  <MenuItem value="पोता">पोता</MenuItem>
                  <MenuItem value="पोती">पोती</MenuItem>
                  <MenuItem value="अन्यo">अन्य</MenuItem>
                </Select>
              </FormControl>
              <FormControl sx={{ width: "18vw" }}>
                <Button
                  onClick={addNewPatient}
                  sx={{
                    marginLeft: "4vw",
                    width: "2min",
                    height: "6vmin",
                    backgroundColor: "#CF823A",
                    color: "#FEFFFF",
                    "&:hover": { backgroundColor: "#CF9D6E" },
                  }}>
                  Add Patient
                </Button>
              </FormControl>
            </Box>
          </Box>
        </Box>
      )}
    </>
  );
};

export default FamilyMemUpdate;
