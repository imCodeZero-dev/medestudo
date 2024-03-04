// import apiRequest from "../../../config/utils/axios";
import apiRequest from "../../../../config/axios";

export const adminLoginApi = async (data) => {
  // console.log("userLoginApi", data);
  const response = await apiRequest({
    method: "Post",
    url: "/admin/loginAdmin",
    data,
  });
  return response;
};
