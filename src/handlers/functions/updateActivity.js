import moment from "moment";

import { query, customerInfo, updateActivity } from "./index";

export const updateActivityFunc = async ({ cus_id, device, activityType, site, rating }) => {
  const custInfo = await query(customerInfo, [cus_id]);

  let { activity, last_sms, last_email } = custInfo[0];

  let type;
  if (activityType === "Feedback") {
    type = `Left Feedback | ${device === "email" ? last_email : last_sms}`;
  } else if (activityType === "Click") {
    type = `Redirected to leave review on ${site} | ${device === "email" ? last_email : last_sms}`;
  } else if (activityType === "Rating") {
    type = `Left Rating of ${rating} | ${device === "email" ? last_email : last_sms}`;
  }

  let recentActivity = activity;

  recentActivity.active.push({ date: moment().format("YYYY-MM-DD"), type });

  const response = await query(updateActivity, [cus_id, recentActivity]);

  return response;
};
