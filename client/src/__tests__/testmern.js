import { render, screen, cleanup, fireEvent } from '@testing-library/react';
import CustomerTable from "../CustomerTable/CustomerTable";
import CustomerForm from "../CustomerForm/CustomerForm";

afterEach(() => {
    cleanup();
})

//--customer table--------------

test('should render customertable component', () => {
    render(<CustomerTable />);
    const customertableElement = screen.getByTestId('custtable-1');
    expect(customertableElement).toBeInTheDocument();

})

test('should render add new button component', () => {
    render(<CustomerTable />);
    const custtablebtnElement = screen.getByTestId('close-1');
    expect(custtablebtnElement).toBeInTheDocument();

})


//--customer form --------------
test('should render customerform component', () => {
    render(<CustomerForm />);
    const customerformElement = screen.getByTestId('custform-1');
    expect(customerformElement).toBeInTheDocument();

})

test('should render submit button', () => {
    render(<CustomerForm />);
    const custformbtnElement = screen.getByTestId('custformsubmitbtn-1');
    expect(custformbtnElement).toBeInTheDocument();

})


test("first name input should present", () => {
    render(<CustomerForm />);
    const custformbtnElement = screen.getByTestId('firstName-1');
    expect(custformbtnElement).toBeInTheDocument();
});

test("last name input should present", () => {
    render(<CustomerForm />);
    const custformbtnElement = screen.getByTestId('lastName-1');
    expect(custformbtnElement).toBeInTheDocument();
});

test("occupation input should present", () => {
    render(<CustomerForm />);
    const custformbtnElement = screen.getByTestId('occupation-1');
    expect(custformbtnElement).toBeInTheDocument();
});

test("dob input should present", () => {
    render(<CustomerForm />);
    const custformbtnElement = screen.getByTestId('dob-1');
    expect(custformbtnElement).toBeInTheDocument();
});

test("bio input should present", () => {
    render(<CustomerForm />);
    const custformbtnElement = screen.getByTestId('bio-1');
    expect(custformbtnElement).toBeInTheDocument();
});

test("Active status input should present", () => {
    render(<CustomerForm />);
    const custformbtnElement = screen.getByTestId('activestatus-1');
    expect(custformbtnElement).toBeInTheDocument();
});

test("Inactive status input should present", () => { 
    render(<CustomerForm />);
    const custformbtnElement = screen.getByTestId('inactivestatus-1');
    expect(custformbtnElement).toBeInTheDocument();
});

test("input type file should present", () => {
    render(<CustomerForm />);
    const custformbtnElement = screen.getByTestId('inputtype-1');
    expect(custformbtnElement).toBeInTheDocument();
});





