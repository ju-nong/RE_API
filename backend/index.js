const express = require("express");
const cors = require("cors");

const app = express();
const port = 4020;
app.use(cors());

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
const body = {};

const guest = "로그인 상태가 아닙니다.";
const empty = "존재하지 않는 리스트입니다.";

app.listen(port, () => {
    console.log(`${port} listen`);
});

app.all("/service/*", function (req, res, next) {
    if (tokens.includes(req.headers.token)) {
        next();
    } else {
        next(new Error("일치하지 않는 토큰입니다."));
    }
});

app.use((err, req, res, next) => {
    console.error(err);
    res.send(sendData({ status: 1, msg: err.message }));
});

app.post("/login", function (req, res) {
    let token = rand();
    while (tokens.includes(token)) {
        token = rand();
    }

    tokens.push(token);
    body[token] = [];

    res.send(sendData({ res: token }));
});

app.post("/create", function (req, res, next) {
    console.log(req.body);
    console.log(req.data);
    console.log(req.params);
    res.send(sendData());
});

// app.post("/create", function (req, res) {
//     const { token, name } = req.query;
//     if (chk(token)) {
//         if (body[token].includes(name)) {
//             res.send(sendData(null, 1, "이미 존재하는 리스트 이름입니다."));
//         } else {
//             body[token].push(name);
//             res.send(sendData(body[token]));
//         }
//     } else {
//         res.send(sendData(null, 1, guest));
//     }
// });

// app.post("/update", function (req, res) {
//     const { token, id, name } = req.query;
//     if (chk(token)) {
//         if (isNull(body[token][id])) {
//             res.send(sendData(null, 1, empty));
//         } else {
//             body[token][id] = name;
//             res.send(sendData(body[token]));
//         }
//     } else {
//         res.send(sendData(null, 1, guest));
//     }
// });

// app.post("/delete", function (req, res) {
//     const { token, id } = req.query;
//     if (chk(token)) {
//         if (isNull(body[token][id])) {
//             res.send(sendData(null, 1, empty));
//         } else {
//             body[token].splice(id, 1);
//             res.send(sendData(body[token]));
//         }
//     } else {
//         res.send(sendData(1, guest));
//     }
// });
