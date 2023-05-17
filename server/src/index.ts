import * as http from "http";

const port = 8080; // ポート番号

// httpサーバーを設定する
const server = http.createServer(
  (request, response) => {
    // サーバーにリクエストがあった時に実行される関数
    response.end("Hello! Node.js with test");
  }
);
// サーバーを起動してリクエストを待ち受け状態にする
server.listen(port);
// ログを出力する
console.log(`http://localhost:${port} へアクセスください!!!`);
