import axios from "axios"
import { USERS_API } from "../utilities/apis"
import { useQuery } from "@tanstack/react-query";

const RQUsers = () => {
    const fetchUsers = async () => {
        const response = await axios.get(USERS_API);
        return response.data;
    }
    return useQuery({
        queryKey: ["users"],
        queryFn: fetchUsers,
    })
}

export default RQUsers;