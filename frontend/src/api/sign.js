import Send from "./";

export default {
    name: "sign",
    login() {
        return Send({
            url: "/login",
            method: "post",
        });
    },
};
