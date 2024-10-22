import { UserInfo } from "@/context/UserInfo";
import { useContext } from "react";

export const UserState = () => {
    return useContext(UserInfo);
};