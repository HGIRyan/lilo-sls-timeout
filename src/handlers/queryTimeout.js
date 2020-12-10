import moment from "moment";
import { getCustomer, updateActivity, updateRating, updateClick } from "../lib";
import { query } from "../lib/query";
let { c_id, cor_id, cus_id } = process.env;

const queryTimeout = async (event, context) => {
  const start = new Date();
  let type;
  if (event.pathParameters) {
    type = event.pathParameters.type;
  }

  if (event.body) {
    const body = JSON.parse(event.body);
    cus_id = body.cus_id;
    type = body.type;
  }
  console.log("BEFORE QUERY");
  console.time("customerInfo");
  const customerInfo = await query(getCustomer, [cus_id]);
  console.timeEnd("customerInfo");
  console.log("AFTER QUERY");

  if (customerInfo.length) {
    let { activity } = customerInfo[0];

    if (type === "rating") {
      console.time("rating");
      const rating = Math.floor(Math.random() * (5 - 1 + 1) + 1);
      activity.active.push({ date: moment().format("YYYY-MM-DD"), type: `Updating Rating to ${rating}` });
      await query(updateRating, [cus_id, rating]);
      console.timeEnd("rating");
    } else if (type === "click") {
      console.time("click");
      const randomBool = Math.random() >= 0.5;
      activity.active.push({ date: moment().format("YYYY-MM-DD"), type: `Updating Click to ${randomBool}` });
      await query(updateClick, [cus_id, randomBool]);
      console.timeEnd("click");
    } else if (type === "clear") {
      activity = { active: [{ date: moment().format("YYYY-MM-DD"), type: "Customer Activity Cleared" }] };
    } else if (type === "getTotal") {
    } else {
      activity.active.push({ date: moment().format("YYYY-MM-DD"), type: `Type is NULL` });
    }

    console.time("updateActivity");
    await query(updateActivity, [cus_id, activity]);
    await query(updateActivity, [cus_id, activity]);
    await query(updateActivity, [cus_id, activity]);
    console.timeEnd("updateActivity");

    const imports = {
      query: query,
      type: type,
      totalTime: new Date() - start,
      activityLength: activity.active.length,
      activity: type === "getTotal" ? activity.active : null,
      // result: customerInfo,
    };

    return {
      statusCode: 200,
      body: JSON.stringify({ message: "queryTimeout from Yo moms house", default: { c_id, cor_id, cus_id }, imports }, null, 4),
    };
  } else
    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Customer Not Found" }, null, 4),
    };
  {
  }
};

export const handler = queryTimeout;
