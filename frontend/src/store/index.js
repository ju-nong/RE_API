import { defineStore } from "pinia";

import sign from "@api/sign";
import service from "@api/service";
import axios from "axios";

function valChk(value) {
    if (value === null || value === undefined || value.trim() === "") {
        return true;
    }

    return false;
}

export const useStore = defineStore("store", {
    state: () => ({
        token: null,
        id: null,
        name: null,
        list: [],
    }),
    actions: {
        set(id, name) {
            this.id = id;
            this.name = name;
        },
        login() {
            sign.login()
                .then((res) => {
                    this.token = res.data.response;
                })
                .catch((error) => {
                    this.warning(error.response);
                });
            this.token = sign;
        },
        logout() {
            this.token = null;
            this.list = null;
        },
        create() {
            const name = this.name;

            if (valChk(name)) {
                return true;
            }

            service
                .create(name)
                .then((res) => {
                    this._next(res.data);
                })
                .catch((error) => {
                    this._exception(error);
                });
        },
        update() {
            const id = this.id;
            const name = this.name;

            if (isNaN(id) || valChk(name)) {
                return true;
            }

            service
                .update(id, name)
                .then((res) => {
                    this._next(res.data);
                })
                .catch((error) => {
                    this._exception(error);
                });
        },
        del() {
            const id = this.id;

            if (isNaN(id)) {
                return true;
            }

            service
                .delete(id)
                .then((res) => {
                    this._next(res.data);
                })
                .catch((error) => {
                    this._exception(error);
                });
        },
        read() {
            service
                .read()
                .then((res) => {
                    if (res.data.status === 1) {
                        this.warning(res);
                    } else {
                        this.list = res.data.response;
                    }
                })
                .catch((error) => {
                    this._exception(error);
                });
        },
        warning(target) {
            alert(target.data.errorMessage);
        },
        _next({ status, errorMessage }) {
            if (status === 1) {
                alert(errorMessage);
            } else {
                this.read();
            }
        },
        _exception(error) {
            if (axios.isCancel(error)) {
                alert(error.message);
            } else {
                this._warning(error.reponse);
            }
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
