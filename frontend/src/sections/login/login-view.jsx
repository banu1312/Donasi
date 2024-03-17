import { useState,  useContext  } from 'react';

import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import LoadingButton from '@mui/lab/LoadingButton';
import { alpha, useTheme } from '@mui/material/styles';
import InputAdornment from '@mui/material/InputAdornment';

import useInput from 'src/hooks/useInput';

import { bgGradient } from 'src/theme/css';
import AuthContext from 'src/api/authContext';

import Iconify from 'src/components/iconify';

// ----------------------------------------------------------------------

export default function LoginView() {
  const theme = useTheme();
  const { login } = useContext(AuthContext);
  const [email,onEmailChange] = useInput("")
  const [password,onPasswordChange] = useInput("")

  const [showPassword, setShowPassword] = useState(false);

  const handleClick = async () => {
    await login({ email, password });
  };

  const renderForm = (
    <>
      <Stack spacing={3}>
        <TextField name="email" label="Email address" onChange={onEmailChange}/>

        <TextField
          name="password"
          label="Password"
          type={showPassword ? 'text' : 'password'}
          onChange={onPasswordChange}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                  <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Stack>

      <Stack direction="row" alignItems="center" justifyContent="flex-end" sx={{ my: 3 }}>
        <Link variant="subtitle2" underline="hover">
          Forgot password?
        </Link>
      </Stack>

      <LoadingButton
        fullWidth
        size="large"
        type="submit"
        variant="contained"
        color="inherit"
        onClick={handleClick}
      >
        Login
      </LoadingButton>
    </>
  );
  return (
    
    <Box
      sx={{
        ...bgGradient({
          color: alpha(theme.palette.background.default, 0.9),
          imgUrl: '/assets/background/overlay_4.jpg',
        }),
        height: 1,
      }}
    >
      <Stack alignItems="center" justifyContent="center" sx={{ height: 1 }}>
        <Card
          sx={{
            p: 5,
            width: 1,
            maxWidth: 420,
          }}
        >
          <Typography variant="h4">Sign in</Typography>

          <Typography variant="body2" sx={{ mt: 2, mb: 5 }}>
            Don’t have an account?
            <Link href="/register" variant="subtitle2" sx={{ ml: 0.5 }}>
              Get started
            </Link>
          </Typography>
          {renderForm}
        </Card>
      </Stack>
    </Box>
  );
}
