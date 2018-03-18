# ノートアプリケーション

[![Build Status](https://travis-ci.org/tokibito/note-app-django-vue-javascript.svg?branch=master)](https://travis-ci.org/tokibito/note-app-django-vue-javascript)

![ノート](note-app.png "ノート")

## これは何ですか?

テキストを編集、保存できるシンプルなウェブアプリケーションです。

バックエンドとなるAPIサーバーにはDjangoフレームワーク(Python)、フロントエンドにはVue.js(JavaScript)を使っています。

DjangoフレームワークとJavaScriptでアプリケーションを作るサンプルコードとして作成しました。

以下の要素を含んでいます:

* バックエンド
   * Python3
   * venv
      * プロジェクトで使うPython環境を作成します
   * Djangoフレームワーク
      * Django REST Framework
         * REST APIを作るのに便利な機能がたくさん含まれるモジュール
      * django-debug-toolbar
         * 各種デバッグ情報をサイドバーで表示します
* フロントエンド
   * Babel
      * 最新の言語仕様の構文で書いたコードは、そのままだと古いブラウザなどで動かないので、Babelを使ってトランスパイルして動かせるようにします
   * webpack
      * JavaScriptコードやCSSなど、アプリケーションを構成するファイル群を配備用にまとめます
      * webpack.config.jsでビルドルールを設定します
         * loaderの仕組みによりいろいろな処理ができます(babelで変換したりとか)
   * Vue.js
      * データバインディングとコンポーネントの仕組みを提供するJavaScriptフレームワークです
   * Bootstrap
      * HTMLのUI部品(ナビゲーションやボタンなどいろいろ)を提供するUIフレームワークです
      * CSSと動きのある部分に必要なJavaScriptコードが提供されます
      * jQuery部分をVue.jsに置き換えたBootstrapVueと組み合わせて使っています
   * Font Awesome
      * Webフォント、CSSが提供されるので、HTMLでクラスを指定すれば使えます
   * axios
      * REST APIクライアントです
   * ユニットテスト
      * mocha
         * ユニットテストのフレームワークです(describe, itで記述)
      * power-assert
         * アサーション関数
      * Sinon.JS
         * モック
      * moxios
         * axiosに対応したモック(スタブ)

## 構成

* `note_server`
   * バックエンド(Pythonで動作するAPIサーバー)
* `note_client`
   * フロントエンド(webpackでビルドし、Djangoフレームワークのstaticfilesモジュールから配信される)
   * CSS(Sass)も含む

## 動かしてみる

1. `note_client` をビルドする
2. `note_server` を起動してブラウザでアクセスする

## 設計について

アーキテクチャとモジュール構成に関して考えた点など:

* シングルページアプリケーション(SPA)にはせず、DjangoのサーバーサイドレンダリングとVue.jsを組み合わせて使う
   * ビルドしたファイルの配信は、Djangoフレームワークのstaticfilesに任せる
* jQueryは使わない
   * 表示制御のために、アプリケーションで大量のJavaScriptでコードを書くのを避けるため
      * Vue.jsのデータバインディングを使えば表示制御のコードはかなり減らせます
   * BootstrapではBootstrapVueを使います
* Vuexはなるべく使わない
   * 依存をなるべく減らす気持ち
   * Vuexは学習コストもメンテコストも高いので、使わないで済むうちは使わない
      * 複雑になったら使ったほうが楽できるとは思います
* vue-cliを使っていない
   * ごちゃっと余計なものが入るのを避ける
   * 使うツールスタックを合わせられるなら使ってもよいかな
* Vueへの依存をなるべく広げない
   * Vueに依存しないほうがテストコードを書きやすいから
   * Vueインスタンスをエントリポイント(index.js)外のJavaScriptコードに渡さない
      * エントリポイントではVueに依存しないコントローラクラスのインスタンスを生成し、データはコントローラに持たせる
   * コンポーネントから外へVueインスタンスを渡さない
   * Bootstrapのモーダルダイアログを表示する場合は、コントローラから呼び出すのではなく、コントローラからの戻り値をコンポーネント側で使って表示制御する
* django-webpack-loaderを使っていない
   * なるべく依存を増やさない
   * 必要になったら入れよう
* DjangoのCSRF対策をフロントエンドからも利用する
   * Cookieに書き込まれたCSRFトークンをAPI呼び出し時に利用しています
* Vueコンポーネントのテストはがんばらない
   * 表示部分は変更されやすいのであんまり頑張らない
   * Vueコンポーネントにアプリケーションロジックを書かないなら、テストもがんばらなくて済む
   * Vueの単一ファイルコンポーネントをテストする仕組みの用意がそもそも大変
      * 楽になったらやろう

## Vagrant

開発にはVagrantを使用しています。VirtualBoxとVagrantをインストールしていれば、同様の環境を用意できます。

```
vagrant up
vagrant ssh
```
