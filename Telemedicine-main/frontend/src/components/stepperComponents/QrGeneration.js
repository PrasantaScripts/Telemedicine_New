import {
  Box,
  Button,
  FormControl,
  Select,
  OutlinedInput,
  Paper,
  MenuItem,
  TextField,
  Typography,
  Grid,
} from "@mui/material";
import React, { useState, useEffect, useRef } from "react";
import QRCode from "qrcode.react";

function QrGeneration({ queue, roomHandler, dequeueHandler }) {
  const [showQRPopup, setShowQRPopup] = useState(false);
  const [qrButtonDisabled, setQRButtonDisabled] = useState(false);
  const qrPopupRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (qrPopupRef.current && !qrPopupRef.current.contains(event.target)) {
        closeQRPopup();
      }
    };

    if (showQRPopup) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showQRPopup]);

  // Function to handle opening the popup
  const openQRPopup = () => {
    setShowQRPopup(true);
    setQRButtonDisabled(true);
  };

  // Function to handle closing the popup
  const closeQRPopup = () => {
    setShowQRPopup(false);
    setQRButtonDisabled(false);
  };

  return (
    <>
      {queue.map((item, idx) => {
        if (item === "Empty") {
          return (
            <Box key={idx}>
              <Typography
                sx={{
                  textAlign: "center",
                  width: "80vw",
                  marginTop: "40px",
                }}>
                {item}
              </Typography>
            </Box>
          );
        }
        return (
          <Box
            key={idx}
            elevation={3}
            sx={{
              backgroundColor: "#FEFFFF",
              width: "5.5vw",
              height: "11vh",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}>
            <Box
              sx={{
                width: "20vw",
                borderRadius: "5px",
                backgroundColor: "#424242",
              }}>
              {/* Render QR code button */}
              {!qrButtonDisabled && (
                <Button onClick={openQRPopup} sx={{ color: "#fafafa" }}>
                  Show QR
                </Button>
              )}

              {showQRPopup && (
                <button
                  ref={qrPopupRef}
                  sx={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    backgroundColor: "#fff",
                    padding: "20px",
                    borderRadius: "8px",
                  }}
                  // Close popup when clicked outside
                  onClick={closeQRPopup}>
                  <QRCode
                    value={item.patientData.registrationP}
                    style={{ border: "5px solid white" }}
                  />
                </button>
              )}
            </Box>
          </Box>
        );
      })}
    </>
  );
}

export default QrGeneration;
