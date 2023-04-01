import { Avatar, Grid, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";
import { Button, Container, ThemeProvider } from "react-bootstrap";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import { Link } from "react-router-dom";
import { Copyright } from "@mui/icons-material";
import httpApi from "../../api/domain/httpApi";
const ResetPassWord = () => {
  const [nhapPassMoi, setPassMoi] = useState();
  const [XNPassMoi, setXNPassMoi] = useState();
  const [username, setUserName] = useState();
  const a = window.location.href;
  var str = a;
  var new_str = str.replace(
    "http://localhost:3000/Account/ResetPassword?code=",
    ""
  );
  const encodedURL = encodeURI(new_str);
  const Submit = () => {
    if (!username || !nhapPassMoi || !XNPassMoi) {
      alert("Vui Lòng Không được để trống");
      return;
    }
    if (nhapPassMoi != XNPassMoi) {
      alert("Mật Khẩu Mới Phải Trùng Nhau");
      return;
    }
    httpApi
      .post(`Account/NewPass`, {
        code: encodedURL,
        email: username,
        passNew: nhapPassMoi,
      })
      .then((response) => {
        console.log(response);
        if (response.data.message == false) {
          alert(response.data.data);
        } else if (response.data.message == true) {
          alert(response.data.data);
        }
      })
      .catch((err) => console.log(err));
  };
  return (
    <div>
      <div
        style={{
          backgroundColor: "white",
          marginLeft: 30,
          marginRight: 30,
          marginTop: "-60px",
        }}
      >
        <ThemeProvider>
          <Container component="main" maxWidth="xs">
            <Box
              sx={{
                marginTop: 8,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                <LockOpenIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Quên Mật Khẩu
              </Typography>
              <Box component="form" noValidate sx={{ mt: 1 }}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Nhập tài khoản"
                  name="email"
                  autoComplete="email"
                  autoFocus
                  onChange={(e) => {
                    setUserName(e.target.value);
                  }}
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  onChange={(e) => {
                    setPassMoi(e.target.value);
                  }}
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Nhập Lại Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  onChange={(e) => {
                    setXNPassMoi(e.target.value);
                  }}
                />
                <Button sx={{ mt: 3, mb: 2 }} onClick={Submit}>
                  Đổi Mật Khẩu
                </Button>
                <Grid container>
                  <Grid item>
                    <Link href="#" variant="body2">
                      {"Don't have an account? Sign Up"}
                    </Link>
                  </Grid>
                </Grid>
              </Box>
            </Box>
            <Copyright sx={{ mt: 8, mb: 4 }} />
          </Container>
        </ThemeProvider>
      </div>
    </div>
  );
};

export default ResetPassWord;
