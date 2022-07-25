<template>
    <div>
        <button v-if="store.getToken === null" @click="store.login()">
            LOGIN
        </button>
        <button v-else @click="store.logout()">LOGOUT</button>
    </div>
</template>

<script>
import useStore from "@store";

export default {
    name: "TheLogin",
    setup() {
        const store = useStore();

        return { store };
    },
};
</script>

<style scoped>
div {
    width: 100%;
    height: 100px;
    position: relative;
    text-align: center;
    margin-top: 50px;
}

button {
    box-shadow: 3px 3px 3px #eee;
    padding: 1vw;
    border-radius: 20px;
    font-size: 32px;
}
</style>
