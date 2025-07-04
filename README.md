# lostiteminfoApp

## アプリケーション概要

**おとしものインフォメーションは、習い事や塾での子どもの忘れ物管理を効率化するためのアプリケーションです。**


📝 Issue や Pull Request のやり取りは旧リポジトリにあります。  

🔧 現在はデプロイ担当者が本リポジトリを保守しています。  

🔗 以下のリンクよりご覧いただけます：

- [📌 Issues](https://github.com/wryyy6124/lostiteminfoApp/issues)  
- [📌 Pull Requests](https://github.com/wryyy6124/lostiteminfoApp/pulls)


### 主な機能

- 管理者による忘れ物情報の投稿・管理
- 写真付きでの忘れ物情報の共有
- 発見日時・場所の記録
- 解決済み/未解決のステータス管理

### デモ動画

アプリケーションの動作デモは以下の動画でご覧いただけます：

<table>
  <tr>
    <td>
      <a href="https://youtu.be/YLICiiwxSp4">
        <img src="https://img.youtube.com/vi/YLICiiwxSp4/0.jpg" alt="デモ動画①" width="240" />
      </a>
    </td>
    <td width="24"></td> <!-- スペーサー -->
    <td>
      <a href="https://youtu.be/b4VKCa3lDO4">
        <img src="https://img.youtube.com/vi/b4VKCa3lDO4/0.jpg" alt="デモ動画②" width="240" />
      </a>
    </td>
  </tr>
</table>

### documents

- [ERD図](https://github.com/Yucco-K/lostiteminfoApp/blob/main/documents/ERD.md)
- [要件定義](https://github.com/Yucco-K/lostiteminfoApp/blob/main/documents/REQUIREMENT_DEFINITION.md)
- [仕様書](https://github.com/Yucco-K/lostiteminfoApp/blob/main/documents/SPECIFICATION.md)

--- 

## 開発 Tips

### Issue

- Issue にてタスクや問題を書いてください。
- `IssueTemplate` を使ってください。（該当のテンプレートがない場合は作成してください）
- 重複があると煩雑になるので、関連 Issue を探して#〇〇と参照を入れてください。
- assign、tag をつけてください。
- バグや表示崩れについては、Issue テンプレート`Bug report`で作成してください。
  - 機能実装やテストで見つけ次第、どんどん作成してください。
  - 必要であれば、MTG 内で修正対応について議論してください。
- 作成した Issue を必ず MTG で、いつ対応するのかをチームで決めましょう。

### PullRequest

**1. プルリクエスト前の作業**

プルリクエストを上げる前に必ず、自分が作業を行なっているブランチで `git pull origin main` を行うこと。<br/>
もし、コンフリクトが発生したら、ローカル上で解決する、解決の仕方がわからない場合は、メンバーに相談すること。

**2. `git pull origin main` を行なった後の作業**

remote に変更があった場合は、 `git pull origin main` のコマンドを実行し、remote の変更を取り込む。<br/>
package に更新がないか、確認するため、 `npm install` コマンドを実行する。<br/>
`found 0 vulnerabilities` と表示されれば OK。

**3. プルリクエスト作成時**

- `PullRequestTemplate`を使ってください。（テンプレートがない場合は作成、テンプレートの内容を変更したい場合は編集してください）
- 作ったブランチから main ブランチへマージするプルリクを作ってください。
- プルリクに issue 番号を紐付けてください。
- レビュアーに assign つけてください。（複数つけても OK）
- レビュー依頼の際は、PR 内にメンションコメント＆念の為 Slack にてレビュアーに声掛けお願いします。

**4. マージ**

- マージはスカッシュコミット（プルリク内のコミットを 1 つににまとめてコミット）でお願いします。
  - マージの際に`Marge Pull Request`ではなく`Squash and merge`を選んでマージしてください。

### Branch

### ブランチ命名規則（**プレフィックス**をつける）

- feature: 機能追加
- fix: コード修正
- bug: バグ修正

※ 該当項目がない場合は適宜追加

**＜例＞**

```
git checkout -b 'feature/todotop_layout'
git checkout -b 'fix/todotop_layout'
git checkout -b 'bug/todotop_layout'
```

### Commit

### コミットメッセージ

- 日本語もしくは英語で端的に

**＜例＞**

```
git commit -m 'Top画面 作成'
git commit -m 'create top layout'
```

## 推奨 VScode 拡張機能

- [Git Graph](https://marketplace.visualstudio.com/items?itemName=mhutchie.git-graph&ssr=false#qna) コミットの一覧 → 詳細を閲覧できる
- [Git History](https://marketplace.visualstudio.com/items?itemName=donjayamanne.githistory) ファイルの履歴などを確認できる
- [GitLens](https://marketplace.visualstudio.com/items?itemName=eamodio.gitlens) 視覚的にリポジトリ、ブランチ、ファイル、コミットの状態を確認や操作することができる
