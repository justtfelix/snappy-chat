import { useState } from 'react';
import { toast } from 'react-toastify';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { IRegisterFormFields } from '../interfaces';
import { removeWhiteSpaces, registerRoute } from '../utils';
import { 
  usernameValidation, emailValidation, passwordValidation, confirmPassValidation,
  usernameValidate, emailValidate, passwordValidate, confirmPassValidate
} from "../validations";
import { AuthContainer, AuthForm, AuthInput, AuthButton, Loader } from '../components';
import { Brand, ToastNote } from '../layouts';

function Register() {
  const { register, handleSubmit, getValues, formState: { errors } } = useForm<IRegisterFormFields>();
  const [buttonText, setButtonText] = useState<string>('register');
  const [disabled, setDisabled] = useState<boolean>(false);

  const onSubmit = handleSubmit((data) => {
    const { username, email, password } = data;
    console.log(data);
    const clearedUsername = removeWhiteSpaces(username);
    toast.success(`Congratulations ${clearedUsername}! Your registration has been successful`);
    setButtonText('creating user...');
    setDisabled(true);

    const response = axios.post(registerRoute, {
      username: clearedUsername,
      email,
      password,
    });
  });

  const handleValidation = () => {
    const { username, email, password, confirmPassword } = errors;

    confirmPassValidate(confirmPassword);
    passwordValidate(password);
    emailValidate(email);
    usernameValidate(username);
  }

  return (
    <AuthContainer>
      <Brand />
      <AuthForm onSubmit={onSubmit}>
        <AuthInput
          type='text'
          {...register('username', usernameValidation)}
          id='username'
          placeholder='Username'
        />
        <AuthInput
          type='email'
          {...register('email', emailValidation)}
          id='email'
          placeholder='E-mail'
        />
        <AuthInput
          type='password'
          {...register('password', passwordValidation)}
          id='password'
          placeholder='Password'
        />
        <AuthInput
          type='password'
          {...register('confirmPassword', {
            ...confirmPassValidation,
            validate: (value) => value === getValues('password'),
          })}
          id='confirmPassword'
          placeholder='Confirm Password'
        />
        <AuthButton 
          disabled={disabled}
          onClick={handleValidation}
        >
          {buttonText} {disabled && <Loader />}
        </AuthButton>
      </AuthForm>
      <ToastNote />
    </AuthContainer>
  )
}

export default Register;