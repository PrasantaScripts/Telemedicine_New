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
import { calcLength } from "framer-motion";

function QrGeneration({
  item,
  showQRPopup,
  openQRPopup,
  closeQRPopup,
  qrButtonDisabled,
  qrPopupRef,
}) {
  return (
    <>
      {item === "Empty" ? (
        <Box>
          <Typography
            sx={{
              textAlign: "center",
              width: "80vw",
              marginTop: "40px",
            }}>
            {item}
          </Typography>
        </Box>
      ) : (
        <Box
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
            {!qrButtonDisabled && (
              <Button onClick={openQRPopup} sx={{ color: "#fafafa" }}>
                Show QR
              </Button>
            )}
            {showQRPopup && (
              <Box
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
                onClick={closeQRPopup}>
                <QRCode
                  value={item.patientData.registrationP}
                  style={{ border: "5px solid white" }}
                />
              </Box>
            )}
          </Box>
        </Box>
      )}
    </>
  );
}

export default QrGeneration;
