<template>
    <div class="wrap">
        <div class="title">
            <p>
                Token : <span class="active">{{ store.getToken }}</span>
            </p>
            <div>
                <select
                    name="type"
                    id="type"
                    class="shadow"
                    v-model="type"
                    @change="changeType"
                >
                    <option value="create">CREATE</option>
                    <option value="update">UPDATE</option>
                    <option value="delete">DELETE</option>
                    <option value="read">READ</option>
                </select>
                <input
                    type="text"
                    class="shadow"
                    v-show="showId"
                    v-model="id"
                    placeholder="id"
                />
                <input
                    type="text"
                    class="shadow"
                    v-show="showName"
                    v-model="name"
                    placeholder="name"
                />
                <button class="shadow" @click="action">ACTION</button>
            </div>
        </div>
        <ul class="list shadow">
            <li v-for="(list, index) in store.getList" :key="index">
                <span>ID &nbsp;{{ index }}</span
                >{{ list }}
            </li>
        </ul>
    </div>
</template>

<script>
import { reactive, ref } from "vue";

import useStore from "@store";

export default {
    setup() {
        const store = useStore();

        const id = ref("");
        const name = ref("");

        const type = ref("create");
        const showId = ref(false);
        const showName = ref(true);

        const changeType = () => {
            id.value = "";
            name.value = "";

            const t = type.value;

            if (t == "create" || t == "read") {
                showId.value = false;
            } else {
                showId.value = true;
            }
            if (t == "create" || t == "update") {
                showName.value = true;
            } else {
                showName.value = false;
            }
        };

        const actions = {
            create: store.create,
            update: store.update,
            delete: store.del,
            read: store.read,
        };

        const action = () => {
            const t = type.value;

            store.set(parseInt(id.value), name.value);
            if (actions[t]()) {
                alert("값을 다시 입력해주세요.");
            }
            id.value = "";
            name.value = "";
        };

        return { store, id, name, type, showId, showName, changeType, action };
    },
};
</script>

<style>
.wrap {
    max-width: 60%;
}

.shadow {
    box-shadow: 1px 1px 3px #999;
}

.title {
    padding-bottom: 70px;
    display: flex;
}

.title > p {
    font-size: 34px;
    font-weight: bold;
    flex-basis: 50%;
}

.title > div {
    flex-basis: 50%;
    display: flex;
    justify-content: flex-end;
}

.title > div > * {
    margin: 5px 0;
    height: calc(100% - 10px);
    border-radius: 20px;
    padding: 0px 20px;
    margin-left: 5px;
}

.title > div select {
    margin-right: auto;
}

.title > div input {
    max-width: 100px;
}

.list {
    background-color: #fff;
    border-radius: 10px;
    list-style: none;
    max-width: 500px;
}

.list li {
    padding: 20px 20px;
}

.list li span {
    display: inline-block;
    background-color: #eaf0f5;
    border-radius: 20px;
    padding: 5px;
    color: #9194ab;
    font-weight: bold;
    margin-right: 50px;
}
</style>
