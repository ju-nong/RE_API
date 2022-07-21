import { defineStore } from "pinia";

import sign from "@api/sign";
import service from "@api/service";
import axios from "axios";

export const useStore = defineStore("store", {
    state: () => ({
        token: null,
        id: null,
        name: null,
        list: {},
    }),
    actions: {
        login() {
            sign.login()
                .then((res) => {
                    this.token = res.data.response;
                })
                .catch((error) => {
                    console.log(error);
                    this.warning(error.response);
                });
            this.token = sign;
        },
        logout() {
            this.token = null;
        },
        set(id, name) {
            this.id = id;
            this.name = name;
        },
        create() {
            console.log(this.name);
            service
                .create(this.name)
                .then((res) => {
                    console.log(res);
                    alert("생성되었습니다.");
                })
                .catch((error) => {
                    console.log("error", error);
                    if (axios.isCancel(error)) {
                        alert(error.message);
                    } else {
                        this.warning(error.reponse);
                    }
                });
        },
        warning(target) {
            alert(target.data.errorMessage);
        },
    },
    getters: {
        getToken: (state) => state.token,
        getId: (state) => state.id,
        getName: (state) => state.name,
        getList: (state) => state.list,
    },
});

export default useStore;
