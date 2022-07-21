import Send from "./";

export default {
    name: "service",
    create(name) {
        return Send({
            url: `/service/create`,
            method: "post",
            data: {
                name: name,
            },
        });
    },
    update(id, name) {
        return Send({
            url: `/service/update`,
            method: "post",
            data: {
                id: id,
                name: name,
            },
        });
    },
    delete(id) {
        return Send({
            url: `/service/delete`,
            method: "post",
            data: {
                id: id,
            },
        });
    },
    read() {
        return Send({
            url: `/service/read`,
            method: "get",
        });
    },
};
