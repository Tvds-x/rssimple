import { CredentialResponse } from "@react-oauth/google";
import api from "../api.ts";

export const login = async (
  credentialResponse: CredentialResponse
): Promise<string> => {
  const response = await api.post<string>("/user/auth/google", {
    token: credentialResponse.credential,
  });

  if (response.data) {
    localStorage.setItem("token", response.data);
  }
  return response.data;
};
