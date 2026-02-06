# YouTube Live Chat Hider for Overlay Extensions

## 概要
YouTubeのライブチャットをニコニコ動画風に表示する拡張機能（**YouTube LiveChat Flusher**や**Danmage**など）を使用する際、「コメントを取得するためにチャット欄は開いておく必要があるが、画面上では邪魔なので隠したい」と思ったので作成したスクリプトです。

## 主な機能
1. **チャットの隠蔽:** チャット欄を目に見えない状態にしますが、DOM上には存在し続けるため、連携する拡張機能は正常に動作します。
2. **チャットの強制展開:** 動画移動時などに勝手に閉じてしまうチャット欄を、自動的に開き直します。

## 使い方
* インストール後、YouTubeのヘッダー（検索バーの右側）に**「Show/Hide Chat Frame」**ボタンが追加されます。
* ボタンを押すことで、チャットの表示・非表示を切り替えられます。

## 注意
* このスクリプトはYouTubeの**シアターモード**の仕様を前提としています。シアターモード以外ではレイアウトが崩れる可能性があります。
## インストール
* [スクリプトをインストールする](https://raw.githubusercontent.com//Eluentyw/YoutubeLiveChatHider/main/YoutubeLiveChatHider.user.js)

---

## Overview
This script is designed for users who use chat overlay extensions (such as **YouTube LiveChat Flusher**, **Danmage**, or **Niconico-style comment viewers**).
It solves the problem: "I need to keep the chat window open to receive comments for the overlay, but I want to hide the actual chat box because it takes up screen space."

## Key Features
1. **Visually Hide Chat:** Hides the chat interface from view, but keeps it active in the DOM. This ensures that your overlay extensions continue to work perfectly.
2. **Force Expand Chat:** Automatically re-opens the chat window if it gets closed (e.g., when switching videos), ensuring continuous comment retrieval.

## How to Use
* After installation, a **"Show/Hide Chat Frame"** button will appear in the YouTube header (to the right of the search bar).
* Click the button to toggle the visibility of the chat window.

## Notes
* This script is optimized for YouTube's **Theater Mode**. The layout might look incorrect in other viewing modes.
## Install
* [Install script](https://raw.githubusercontent.com//Eluentyw/YoutubeLiveChatHider/main/YoutubeLiveChatHider.user.js)
