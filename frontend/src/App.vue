<template>
    <TheLogin />
    <TheMain />
</template>

<script>
import TheLogin from "@components/TheLogin";
import TheMain from "@components/TheMain";

export default {
    name: "App",
    components: { TheLogin, TheMain },
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
