# this is discord bot

## プロジェクトの起動と実行方法

### ローカル環境で動かす時

```bash
npm install
npm run dev
```

### 本番環境で動かす時(Githubのmainブランチと紐付けようと思うので、どうしてもの時以外使わない)

```bash
npm run deploy
```

## 環境変数について

### 今回は、Cloudflareを使うので、

```bash
cat .env.example > .dev.vars
```