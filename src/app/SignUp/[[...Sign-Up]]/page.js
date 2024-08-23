"use client";
import { SignUp } from "@clerk/nextjs";
import { Box } from "@mui/material";

export default function SignUpPage() {
  return (
    <Box>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        mt={4}
      >
        <Box sx={{ width: "100%", maxWidth: "400px" }}>
          <SignUp />
        </Box>
      </Box>
    </Box>
  );
}
