const getCustomer = `
SELECT * FROM CUSTOMER as C
JOIN FEEDBACK AS F ON F.CUS_ID = C.CUS_ID
WHERE C.CUS_ID = $1;
`;

const updateActivity = `
UPDATE CUSTOMER
SET ACTIVITY = $2
WHERE CUS_ID = $1
RETURNING *;
`;

const updateRating = `
UPDATE FEEDBACK 
SET RATING = $2
WHERE CUS_ID = $1
RETURNING *;
`;

const updateClick = `
UPDATE FEEDBACK
SET CLICK = $2
WHERE CUS_ID = $1
RETURNING *;
`;

export { getCustomer, updateActivity, updateRating, updateClick };
