import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import {getByRole, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import ContactForm from './ContactForm';

test('renders without errors', ()=>{
    render(<ContactForm/>)
}); 

test('renders the contact     form header', ()=> {
    render(<ContactForm/>);
    const headerElement = screen.queryByText(/Contact Form/i);
    expect(headerElement).toBeInTheDocument();
    expect(headerElement).toBeTruthy();
    expect(headerElement).toHaveTextContent(/contact form/i);
});

test('renders ONE error message if user enters less then 5 characters into firstname.', async () => {
    render(<ContactForm/>);
    const firstNameField =screen.getByLabelText(/First Name*/i)
    userEvent.type(firstNameField,'ABC');
    const errorMessages = await  screen.findAllByTestId('error')
    expect(errorMessages).toHaveLength(1);

});

test('renders THREE error messages if user enters no values into any fields.', async () => {
    render(<ContactForm/>);
    const SubmitButton = screen.getByRole('button');
    userEvent.click(SubmitButton);
});

test('renders ONE error message if user enters a valid first name and last name but no email.', async () => {
    render(<ContactForm/>);
    const firstNameField = screen.getByLabelText(/first name*/i);
    userEvent.type(firstNameField, 'Bradley');
    const LastNameField = screen.getByLabelText(/last name*/i);
    userEvent.type(LastNameField,'Michaels');
    const button = screen.getByRole('button');
    userEvent.click(button);

    const errorMessages = await screen.getByTestId('error');
    expect(errorMessages).toHaveLength(1);
});

test('renders "email must be a valid email address" if an invalid email is entered', async () => {
    render(<ContactForm/>);
    const EmailField = screen.getByLabelText(/email*/i)
    userEvent.type( EmailField, 'bemail@gmail')

    const errorMessage = await screen.findByText(/email must be a valid email address*/i)
    expect(errorMessage).toBeInTheDocument();
});
 
test('renders "lastName is a required field" if an last name is not entered and the submit button is clicked', async () => {
    render(<ContactForm/>);
    const SubmitButton = screen.getByRole("button")
    userEvent.click(SubmitButton)
    const errorMessage = await screen.findByText(/lastName is a required field*/i);
    expect(errorMessage).toBeInTheDocument();
});

test('renders all firstName, lastName and email text when submitted. Does NOT render message if message is not submitted.', async () => {
    render(<ContactForm/>);

    const firstNameField = screen.getByLabelText(/first name*/i)
    userEvent.type(firstNameField,'bradley')
    const lastNameField = screen.getByLabelText(/last name*/i)
    userEvent.type(lastNameField,"michaels");
    const emailField = screen.getByLabelText(/email*/i)
    userEvent.type(emailField,'email@gmail.com');
    const MSGField = screen.getByLabelText(/message/i);
    userEvent.type(MSGField,"brads message")
    const button = screen.getByRole('button')
    userEvent.click(button);
    await waitFor(() => {
        const firstNameDisplay = screen.queryByText('Bradley')
        const LastNameDisplay = screen.queryByText("Michaels")
        const EmailDisplay = screen.queryByText('email@gmail.com')
        const MSGDisplay = screen.queryByText('Message Text')
        expect(firstNameDisplay).toBeInTheDocument();
        expect(LastNameDisplay).toBeInTheDocument();
        expect(EmailDisplay).toBeInTheDocument();
        expect(MSGDisplay).toBeInTheDocument();
    })
});

test('renders all fields text when all fields are submitted.', async () => {

});