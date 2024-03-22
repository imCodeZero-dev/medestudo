import apiRequest from "../../../config/axios";

export const professorLoginApi = async (data: any) => {
  // console.log("professorLoginApi", data);
  const response = await apiRequest({
    method: "Post",
    url: `/professor/loginProfessor`,
    data,
  });
  return response;
};
