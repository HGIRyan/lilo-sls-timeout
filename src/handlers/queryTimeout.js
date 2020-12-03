import { query, getCustomer } from "../lib";

const queryTimeout = async (event, context) => {
  const c_id = 1;
  const cor_id = 1;
  const cus_id = 2939956;

  const customerInfo = await query(getCustomer, [cus_id]);

  return {
    statusCode: 200,
    body: JSON.stringify({ message: "queryTimeout from Yo moms house", default: { c_id, cor_id, cus_id }, result: JSON.stringify(customerInfo[0], null, 4) }),
  };
};

export const handler = queryTimeout;
