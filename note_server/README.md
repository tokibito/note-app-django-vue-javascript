# APIサーバー

Djangoフレームワーク、Django REST Frameworkを使っています。

## virtualenvの作成、有効化

```
python3.6 -m venv venv
source venv/bin/activate
```

## Pythonモジュールのインストール

virtualenvを有効にした状態で、pipコマンドでインストールします。

```
pip install -r requirements.txt
```

## データベースファイルの作成とマイグレーション

データベースはデフォルトのSQLite3を使います。 `migrate` コマンドでデータベースファイルが作成され、マイグレーションも実行されます。

```
./manage.py migrate
```

## ユーザーの作成

このアプリケーションはDjangoの標準機能を使用したユーザー認証があります。管理者となるユーザーはcreatesuperuserコマンドで作成します。

```
./manage.py createsuperuser
```

## 開発用サーバーの起動

開発用サーバーは `runserver` コマンドで起動します。

```
./manage.py runserver
```
