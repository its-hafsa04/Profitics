"use client";
import { SignIn } from "@clerk/nextjs";
import { Box } from "@mui/material";

export default function SignInPage() {
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
          <SignIn />
        </Box>
      </Box>
    </Box>
  );
}
