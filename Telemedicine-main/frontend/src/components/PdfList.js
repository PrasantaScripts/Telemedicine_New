import React, { useState, useEffect, useLayoutEffect } from "react";
import { Box, Button, Paper, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import axios from "axios";

const PdfList = ({ setShow }) => {
  // Sample data for demonstration
  const [pdfList, setPdfList] = useState([]);

  const fetchAllPdfs = async () => {
    const id = localStorage.getItem("room");
    console.log(id);
    if (!id) {
      return;
    }
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      const response = await axios.post(
        "/api/pdfStore/fetchAllPdf",
        { id },
        config
      );
      console.log(response.data.pdfLinks);
      setPdfList(response.data.pdfLinks);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchAllPdfs();
  }, []);

  return (
    <div className="popup">
      <Button
        onClick={() => setShow(0)}
        sx={{
          position: "absolute",
          top: "10px",
          right: "2vw",
          backgroundColor: "#CF823A",
          color: "#FEFFFF",
          padding: "1rem",
          borderRadius: "50px",
          "&:hover": { backgroundColor: "#CF9D6E" },
        }}>
        <CloseIcon sx={{ fontSize: "2rem" }} />
      </Button>

      <Box
        display="flex"
        alignItems="center"
        sx={{
          width: "50vw",
          marginLeft: "15vw",
          borderRadius: "15px",
          paddingTop: "60px",
          flexFlow: "column",
        }}>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          sx={{
            backgroundColor: "#D1D1D1",
            width: "80vw",
            height: "5vh",
            borderRadius: "8px",
            marginBottom: "15px",
          }}>
          <Typography
            variant="h7"
            component="div"
            sx={{
              fontFamily: "Sans Serif",
              display: "flex",
              alignItems: "center",
              width: "5vw",
              height: "9vh",
              paddingLeft: "30px",

              color: "black",
            }}>
            Sl No
          </Typography>
          <Typography
            variant="h7"
            component="div"
            sx={{
              justifyContent: "center",
              fontFamily: "Sans Serif",
              display: "flex",
              alignItems: "center",
              width: "5vw",
              height: "5vh",
              paddingLeft: "30px",
              paddingRight: "150px",
              color: "black",
            }}>
            PDF Links
          </Typography>
          {/* Add more headings if needed */}
        </Box>
        {pdfList && pdfList.length > 0 ? (
          pdfList.reverse().map((item, idx) => (
            <Paper
              key={item.id}
              elevation={3}
              sx={{
                backgroundColor: "#FEFFFF",
                width: "80vw",
                height: "9vh",
                borderRadius: "8px",
                marginBottom: "15px",
              }}>
              <Box
                display="center"
                justifyContent="space-between"
                alignItems="center"
                sx={{ width: "80vw" }}>
                <Typography
                  variant="h5"
                  component="div"
                  sx={{
                    fontFamily: "Roboto Condensed",
                    display: "flex",
                    alignItems: "center",
                    width: "10vw",
                    height: "9vh",
                    paddingLeft: "30px",
                  }}>
                  {idx + 1}
                </Typography>
                <Typography
                  variant="h6"
                  component="div"
                  sx={{
                    justifyContent: "center",
                    fontFamily: "Roboto Condensed",
                    display: "flex",
                    alignItems: "center",
                    width: "20vw",
                    height: "9vh",
                    marginRight: "100px",
                    overflow: "hidden",
                    whiteSpace: "nowrap",
                    textOverflow: "ellipsis",
                  }}>
                  <a
                    href={item} // Assuming `item` is an array with only one PDF link
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      textDecoration: "underline",
                      color: "blue",
                      maxWidth: "100%",
                      display: "inline-block",
                      verticalAlign: "middle",
                    }}>
                    {item}
                  </a>
                </Typography>

                {/* Add more data if needed */}
              </Box>
            </Paper>
          ))
        ) : (
          <Typography
            variant="h6"
            component="div"
            sx={{
              fontFamily: "Roboto Condensed",
              marginTop: "20px",
            }}>
            No medical details found.
          </Typography>
        )}
      </Box>
    </div>
  );
};

export default PdfList;
