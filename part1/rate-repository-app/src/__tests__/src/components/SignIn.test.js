import { render, fireEvent, screen, act, waitFor } from '@testing-library/react-native';
import { SignInForm } from '../../../components/SignIn';
import React from 'react';

describe('SignIn Form', () => {
  it('calls function provided by onSubmit prop after pressing the submit button', async () => {
    const onSubmit = jest.fn();

    render(<SignInForm onSubmit={onSubmit} />);

    await act(async () => {
      fireEvent.changeText(screen.getByPlaceholderText('Username'), 'kalle');
      fireEvent.changeText(screen.getByPlaceholderText('Password'), 'password');
    });

    expect(screen.getByPlaceholderText('Username').props.value).toBe('kalle');
    expect(screen.getByPlaceholderText('Password').props.value).toBe('password');

    await act(async () => {
      fireEvent.press(screen.getByText('Sign in'));
    });

    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalledTimes(1);
    });

    expect(onSubmit.mock.calls[0][0]).toEqual({
      username: 'kalle',
      password: 'password',
    });
  });
});
