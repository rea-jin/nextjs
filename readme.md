## next.js
Appディレクトリではなく、
Pages ディレクトリを使う
npx create-next-app client --ts
この選択でApp routerはNoにする
App ディレクトリはnextjs 13以降の機能
apiフォルダを作成しバックエンドとする
今回はv15

<br>

## サーバー側
package.jsonのtestをdevにしてnodemon server.js をメインとする
express jsをつかう
npm i express nodemon


<br>

## supabaseをprismaでjsから操作する

npm install prisma
npx prisma init
マイグレーション書き方
https://www.prisma.io/docs/getting-started/setup-prisma/start-from-scratch/relational-databases/using-prisma-migrate-typescript-postgresql

### 
Supabaseでは通常、クエリ用とマイグレーション用でポートを変える必要はありません。しかし、接続プーリングツールであるPgBouncerを有効にした場合は、特定の制限が生じるため、状況に応じてポートを変えることが推奨される場合があります。


PgBouncer使用時のポートの違い
通常のデータベースポート（5432）: クエリやDDL（データ定義言語）操作（例：テーブル作成など）に使用する標準的なPostgreSQLポートです。通常、Supabaseの接続設定でこのポートがデフォルトで使われています。
### transaction mode ?pgbouncer=true
PgBouncerポート（6543など）: 接続プーリングを介した接続用のポートです。?pgbouncer=trueを指定すると、このプール接続用ポートを使う設定になります。短期間のトランザクションやシンプルなクエリに最適ですが、マイグレーションの実行やスキーマ操作には不向きです。

### セッションモード
マイグレーション実行時の推奨設定
Prismaでマイグレーションを行う場合は、PgBouncer接続ではなく、通常のポート5432を使うことをおすすめします。これにより、以下のようなエラーを避けられます：

長時間実行されるトランザクションの途中でのタイムアウト
DDL（テーブルの追加や変更）操作の不具合
