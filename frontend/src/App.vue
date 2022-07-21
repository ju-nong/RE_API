<template>
    <Login />
    <Main />
</template>

<script>
import Login from "@components/Login";
import Main from "@components/Main";
import useStore from "@store";

export default {
    name: "App",
    components: { Login, Main },
    setup() {
        const store = useStore();
        return { store };
    },
};
</script>

<style>
* {
    margin: 0 auto;
    padding: 0;
    border: 0;
    box-sizing: border-box;
}
body {
    background-color: #f2f6fe;
}
button {
    transition: all 0.3s;
    background-color: #fff;
    border-radius: 10px;
    color: #765fc8;
    font-weight: bold;
    cursor: pointer;
}
button:hover {
    background-color: #765fc8;
    color: #fff;
}
.active {
    color: #765fc8;
}
</style>
