next.js
Appディレクトリではなく、
Pages ディレクトリを使う
npx create-next-app client --ts
この選択でApp routerはNoにする
App ディレクトリはnextjs 13以降の機能
apiフォルダを作成しバックエンドとする
今回はv15


<br>
サーバー側
package.jsonのtestをdevにしてnodemon server.js をメインとする
express jsをつかう
npm i express nodemon
