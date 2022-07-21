<template>
    <div class="wrap">
        <div class="title">
            <p>
                Token : <span class="active">{{ store.getToken }}</span>
            </p>
        </div>
        <main>
            <div class="shadow">
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
                <div>
                    <input
                        type="text"
                        v-show="showId"
                        v-model="id"
                        class="shadow"
                        placeholder="id"
                    />
                    <input
                        type="text"
                        v-show="showName"
                        v-model="name"
                        class="shadow"
                        placeholder="name"
                    />
                </div>
                <button class="shadow" @click="action">ACTION</button>
            </div>
            <ul class="list shadow">
                <li v-for="(list, index) in store.getList" :key="index">
                    <span>ID &nbsp;{{ index }}</span
                    >{{ list }}
                </li>
            </ul>
        </main>
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

<style lang="scss">
.wrap {
    max-width: 60%;
    padding-bottom: 100px;
}

.shadow {
    box-shadow: 1px 1px 3px #999;
}

.title {
    padding-bottom: 70px;
    display: flex;
    > p {
        font-size: 34px;
        font-weight: bold;
        flex-basis: 50%;
    }
}

main {
    display: flex;
    align-items: flex-start;
    > div {
        flex-basis: 30%;
        display: flex;
        border-radius: 10px;
        flex-direction: column;
        background-color: #fff;
        padding: 20px;
        > * {
            width: 100%;
            margin: 5px 0px;
        }
        select {
            font-size: 20px;
            margin-right: auto;
        }
        div {
            display: flex;
            flex-direction: column;
            input {
                width: 100%;
                padding: 10px;
                border: 0;
            }
        }
        button {
            padding: 10px;
        }
    }
    .list {
        flex-basis: 70%;
        background-color: #fff;
        border-radius: 10px;
        list-style: none;
        max-width: 500px;
        min-height: 358px;

        li {
            padding: 20px;
            span {
                display: inline-block;
                background-color: #eaf0f5;
                border-radius: 20px;
                padding: 5px;
                color: #9194ab;
                font-weight: bold;
                margin-right: 50px;
            }
        }
    }
}
</style>
