## next.js
Appディレクトリではなく、
Pages ディレクトリを使う
npx create-next-app client --ts
この選択でApp routerはNoにする
App ディレクトリはnextjs 13以降の機能
apiフォルダを作成しバックエンドとする
今回はv15

起動
npm run dev

<br>

## サーバー側
package.jsonのtestをdevにしてnodemon server.js をメインとする
express jsをつかう
npm i express nodemon

<!-- prismaでデータを取得するためクライアントライブラリ必要 -->
npm i @ prisma/client
importしてインスタンス化して使う
<br>
json web tokenのライブラリ
npm i jsonwebtoken
.envを呼び出すためのライブラリ
npm i dotenv


## supabaseをprismaでjsから操作する

npm install prisma
npx prisma init
マイグレーション書き方
https://www.prisma.io/docs/getting-started/setup-prisma/start-from-scratch/relational-databases/using-prisma-migrate-typescript-postgresql

あとからモデルを追加するのは良くないが
モデルを追加したらマイグレーションをおこおなう
npx prisma migrate dev
nameをきかれるがなんでもいい。追加するものとか。

### 
Supabaseでは通常、クエリ用とマイグレーション用でポートを変える必要はありません。しかし、接続プーリングツールであるPgBouncerを有効にした場合は、特定の制限が生じるため、状況に応じてポートを変えることが推奨される場合があります。


PgBouncer使用時のポートの違い
通常のデータベースポート（5432）: クエリやDDL（データ定義言語）操作（例：テーブル作成など）に使用する標準的なPostgreSQLポートです。通常、Supabaseの接続設定でこのポートがデフォルトで使われています。
### transaction mode ?pgbouncer=true
PgBouncerポート（6543など）: 接続プーリングを介した接続用のポートです。?pgbouncer=trueを指定すると、このプール接続用ポートを使う設定になります。短期間のトランザクションやシンプルなクエリに最適ですが、マイグレーションの実行やスキーマ操作には不向きです。

## prisma
prismaのサイトにログインしてデータを確かめてもいいが、
ターミナルでapi側に入って
npx prisma studio 
とうてば、ブラウザですぐにデータが見れる

### セッションモード
マイグレーション実行時の推奨設定
Prismaでマイグレーションを行う場合は、PgBouncer接続ではなく、通常のポート5432を使うことをおすすめします。これにより、以下のようなエラーを避けられます：

長時間実行されるトランザクションの途中でのタイムアウト
DDL（テーブルの追加や変更）操作の不具合

### identicon
アイコンのライブラ入りを使う

SSRかCSRかはプロジェクトによる

### client側
srcフォルダはなかったので自分で作成

tailwindはインストールする必要がある
ドキュメント参照
axiosでapiへ送信する
npm i axios

### 動的ルーティング
[]でファイル名を作ることで、かこったIDなどがファイルに渡される。
これによりパスパラメータのような役割で、ルーティング先がそれぞれ切り替わる。

### deploy
vercelを使う
api, clientそれぞれgithubにpushする
完璧な状態でないとDeployした時にエラーになる
npm run build流行った状態にする