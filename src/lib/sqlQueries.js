const getCustomer = `
SELECT * FROM CUSTOMER WHERE CUS_ID = $1;
`;

export { getCustomer };
