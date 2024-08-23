"use client";

import React from "react";
import { Box, Typography, Link, Container, Grid, IconButton } from "@mui/material";
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
import EmailIcon from '@mui/icons-material/Email';

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        py: 4,
        backgroundColor: "#000",
        color: "#E5E5E5",
        borderTop: "1px solid #333",
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" sx={{ fontWeight: "bold", color: "#A9A9A9" }}>
             Profitics
            </Typography>
            <Typography variant="body2" sx={{ mt: 2 }}>
              The ultimate chat assistant tool for students, designed to help them succeed.
            </Typography>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" sx={{ fontWeight: "bold", color: "#A9A9A9" }}>
              Links
            </Typography>
            <Box sx={{ mt: 2 }}>
              <Link href="#" underline="hover" sx={{ color: "#A9A9A9", display: "block", mb: 1 }}>
                Home
              </Link>
              <Link href="#" underline="hover" sx={{ color: "#A9A9A9", display: "block", mb: 1 }}>
                About
              </Link>
              <Link href="#" underline="hover" sx={{ color: "#A9A9A9", display: "block" }}>
                Contact
              </Link>
            </Box>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" sx={{ fontWeight: "bold", color: "#A9A9A9" }}>
              Contact Us
            </Typography>
            <Box sx={{ mt: 2 }}>
              <IconButton href="https://www.linkedin.com/in/" target="_blank" sx={{ color: "#E5E5E5" }}>
                <LinkedInIcon />
              </IconButton>
              <IconButton href="https://github.com/" target="_blank" sx={{ color: "#E5E5E5" }}>
                <GitHubIcon />
              </IconButton>
              <IconButton href="mailto:sajidhafsa23@gmail.com" sx={{ color: "#E5E5E5" }}>
                <EmailIcon />
              </IconButton>
            </Box>
            <Typography variant="body2" sx={{ mt: 2 }}>
              Email: support@Profitics.com
            </Typography>
            <Typography variant="body2">
              Address: 123 Learning AI, Knowledge City, XYZ
            </Typography>
          </Grid>
        </Grid>

        <Box sx={{ mt: 4, textAlign: "center", borderTop: "1px solid #333", pt: 3 }}>
          <Typography variant="body2" sx={{ color: "#A9A9A9" }}>
            &copy; {new Date().getFullYear()} Profitics. All rights reserved.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}