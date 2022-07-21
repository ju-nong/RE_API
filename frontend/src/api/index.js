import axios from "axios";
import useStore from "@store";

const instance = axios.create({
    baseURL: "http://localhost:4010/",
});

instance.interceptors.request.use(
    function (req) {
        if (req.url != "/login") {
            const store = useStore();

            if (store.getToken === null) {
                throw new axios.Cancel("토큰이 존재하지 않습니다.");
            } else {
                req.headers.token = store.getToken;
            }
        }

        return req;
    },
    function (error) {
        return Promise.reject(error);
    },
);

instance.interceptors.response.use(
    function (res) {
        return res;
    },

    function (error) {
        return Promise.reject(error);
    },
);

export default instance;
