# クライアントアプリケーション

## Node.JSのパッケージをインストールする

```
npm i
```

## アプリケーションのビルド

```
npm run webpack
```

## ファイルの変更を検知してビルド

```
npm run webpack -- -w
```

## ビルドされたファイル群の削除

```
npm run clean
```

## テストコードの実行

```
npm t
```

## ファイルとディレクトリの説明

```
.
├── README.md
├── build  # webpackでビルドしたファイルが出力されるディレクトリ
│   ├── babel_polyfill.js  # ブラウザの機能の差異を吸収するためのpolyfillモジュール
│   ├── common.js  # 共通モジュール
│   ├── fonts  # Font Awesomeのフォント
│   │   ├── fontawesome-webfont.eot
│   │   ├── fontawesome-webfont.svg
│   │   ├── fontawesome-webfont.ttf
│   │   ├── fontawesome-webfont.woff
│   │   └── fontawesome-webfont.woff2
│   └── index.js  # index.htmlから使われるノートアプリケーションのエントリポイント
├── package-lock.json  # package.jsonに書かれたモジュールとその依存モジュールすべてのバージョンが書かれているファイル
├── package.json  # このアプリケーションのパッケージ情報(依存パッケージの情報などが書かれている)
├── src  # アプリケーションのソースコード
│   ├── common.js
│   ├── components  # Vueコンポーネント
│   │   ├── Editor.vue
│   │   ├── Index.vue
│   │   └── Note.vue
│   ├── controller  # コントローラ
│   │   └── note.js
│   ├── index.js  # エントリポイント
│   ├── model  # モデル
│   │   └── page.js
│   ├── resource  # URL定義やメッセージカタログなどの設定ファイル以外の固定値
│   │   └── urls.js
│   ├── style  # アプリケーションで使うCSS
│   │   ├── Note.scss
│   │   ├── font-awesome-config.scss
│   │   └── navigation.scss
│   └── util  # ユーティリティクラス
│       ├── csrf-token.js
│       ├── rest-api.js
│       └── url-builder.js
├── test  # テストコード
│   ├── controller
│   │   └── note.js
│   ├── mocha.opts  # テストランナーの設定
│   ├── model
│   │   └── page.js
│   └── util
│       ├── csrf-token.js
│       ├── rest-api.js
│       └── url-builder.js
└── webpack.config.js
```
