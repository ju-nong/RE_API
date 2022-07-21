const express = require("express");
const cors = require("cors");

const app = express();
const port = 4010;
app.use(cors());
app.use(express.json());

function rand() {
    return `t${Math.random().toString(36).substr(2, 11)}`;
}

function chk(token) {
    return tokens.includes(token);
}

function isNull(node) {
    return node === null || node == undefined;
}

function sendData({ status = 0, msg = "", res = null }) {
    return {
        status: status,
        errorMessage: msg,
        response: res,
    };
}

const tokens = [];
const list = {};

const empty = "존재하지 않는 리스트입니다.";
const over = "이미 존재하는 리스트입니다.";

app.listen(port, () => {
    console.log(`${port} listen`);
});

app.all("/service/*", (req, res, next) => {
    if (tokens.includes(req.headers.token)) {
        next();
    } else {
        next(new Error("일치하지 않는 토큰입니다."));
    }
});

app.post("/login", (req, res) => {
    let token = rand();
    while (tokens.includes(token)) {
        token = rand();
    }

    tokens.push(token);
    list[token] = [];
    res.send(sendData({ res: token }));
});

app.post("/service/create", (req, res, next) => {
    const name = req.body.name;
    const target = list[req.headers.token];

    if (target.includes(name)) {
        res.send(sendData({ status: 1, msg: over }));
    } else {
        target.push(name);
        res.send(sendData({}));
    }
});

app.post("/service/update", (req, res, next) => {
    console.log(req.body);

    const { id, name } = req.body;

    const target = list[req.headers.token];
    const child = target[id];

    if (child === null || child === undefined) {
        // 동작을 잘 되는데 서버에서 에러남
        next(new Error(empty));
    }

    if (target.includes(name)) {
        next(new Error(over));
    } else {
        target[id] = name;
        res.send(sendData({}));
    }
});

app.post("/service/delete", (req, res, next) => {
    const id = req.body.id;

    const target = list[req.headers.token];
    const child = target[id];

    if (child === null || child === undefined) {
        // 동작을 잘 되는데 서버에서 에러남
        next(new Error(empty));
    }

    target.splice(id, 1);

    res.send(sendData({}));
});

app.get("/service/read", (req, res, next) => {
    const random = Math.floor(Math.random() * 10) + 1;
    const token = req.headers.token;

    res.send(
        sendData({
            status: random == 1 ? 1 : 0,
            msg: "예기치 못한 에러가 발생했습니다",
            res: list[token],
        }),
    );
});

app.use((err, req, res, next) => {
    res.send(sendData({ status: 1, msg: err.message }));
});
