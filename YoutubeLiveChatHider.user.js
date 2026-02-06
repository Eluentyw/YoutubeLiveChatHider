// ==UserScript==
// @name         YouTube Live Chat Hider for Overlay Extensions
// @name:ja      ニコニコ動画風コメント流しYouTube拡張機能用チャット欄隠し
// @namespace    https://github.com/Eluentyw
// @version      1.2
// @updateURL    https://raw.githubusercontent.com/Eluentyw/YoutubeLiveChatHider/main/YoutubeLiveChatHider.user.js
// @downloadURL  https://raw.githubusercontent.com/Eluentyw/YoutubeLiveChatHider/main/YoutubeLiveChatHider.user.js
// @description  Visually hides the chat sidebar to save screen space while keeping the chat connection active. This allows Niconico-style comment overlay extensions (such as YouTube LiveChat Flusher and Danmage) to function properly without the chat bar taking up the screen.
// @description:ja チャット欄を見かけ上非表示にしつつ、裏では接続を維持します。これにより、チャット欄が邪魔になることなく、チャットをニコニコ動画風に流す拡張機能(YouTube LiveChat FlusherやDanmageなど)を正常に動作させます。
// @match        https://www.youtube.com/*
// @grant        GM_addStyle
// @grant        GM_setValue
// @grant        GM_getValue
// @license      MIT
// ==/UserScript==

(function() {
    'use strict';

    // Configuration Constants
    const KEY_CHAT_VISIBLE = 'danmage_chat_visible';
    const BTN_ID = 'danmage-toggle-btn';
    const STYLE_ID = 'danmage-style';

    // Main Logic
    let isChatVisible = localStorage.getItem(KEY_CHAT_VISIBLE) === 'true';

    const css = `
        /* Hide Chat Container */
        html body ytd-watch-flexy:not(.chat-visible-mode) #chat-container,
        html body ytd-watch-flexy:not(.chat-visible-mode) ytd-live-chat-frame {
            position: fixed !important;
            bottom: 0 !important;
            right: 0 !important;
            width: 0px !important;
            height: 0px !important;
            opacity: 0 !important;
            z-index: -9999 !important;
            pointer-events: none !important;
            visibility: visible !important;
        }

        html body ytd-watch-flexy:not(.chat-visible-mode) {
            --ytd-watch-flexy-chat-container-width: 0px !important;
            --ytd-watch-flexy-sidebar-width: 0px !important;
        }

        /* Header Button Style */
        #${BTN_ID} {
            background-color: transparent;
            color: var(--yt-spec-text-primary);
            border: 1px solid var(--yt-spec-text-secondary);
            border-radius: 18px;
            padding: 0 16px;
            height: 36px;
            font-size: 14px;
            font-weight: 500;
            cursor: pointer;
            margin-right: 8px;
            display: flex;
            align-items: center;
            justify-content: center;
            white-space: nowrap;
            font-family: "Roboto","Arial",sans-serif;
            z-index: 2000;
        }

        /* Button style when chat is visible */
        ytd-watch-flexy.chat-visible-mode #${BTN_ID} {
            background-color: var(--yt-spec-call-to-action, #3ea6ff);
            color: white;
            border: none;
        }

        #${BTN_ID}:hover { background-color: rgba(0,0,0,0.05); }
        ytd-watch-flexy.chat-visible-mode #${BTN_ID}:hover { opacity: 0.9; }
    `;

    // Functions
    const applyStyles = () => {
        if (!document.getElementById(STYLE_ID)) {
            const style = document.createElement('style');
            style.id = STYLE_ID;
            style.textContent = css;
            document.head.appendChild(style);
        }
    };

    const forceOpenChat = () => {
        try {
            const chatElement = document.querySelector("#chat");
            if (chatElement && chatElement.hasAttribute("collapsed")) {
                const button = chatElement.querySelector('button') ||
                               document.querySelector('button[aria-label*="チャット"]') ||
                               document.querySelector('button[aria-label*="Show chat"]');
                if (button) button.click();
            }
        } catch (e) {}
    };

    const updateMode = () => {
        const app = document.querySelector('ytd-watch-flexy');
        const btn = document.getElementById(BTN_ID);
        if (!app) return;

        if (isChatVisible) {

            app.classList.add('chat-visible-mode');
            if (btn) btn.textContent = "Hide Chat Frame";
        } else {

            app.classList.remove('chat-visible-mode');
            if (btn) btn.textContent = "Show Chat Frame";
        }
        localStorage.setItem(KEY_CHAT_VISIBLE, isChatVisible);

        window.dispatchEvent(new Event('resize'));
        forceOpenChat();
    };

    const createButton = () => {
        const existingBtn = document.getElementById(BTN_ID);
        if (existingBtn) {
            existingBtn.textContent = isChatVisible ? 'Hide Chat Frame' : 'Show Chat Frame';
            updateMode();
            return;
        }

        const targetContainer = document.querySelector('#masthead #end');
        if (!targetContainer) return;

        const btn = document.createElement('button');
        btn.id = BTN_ID;
        btn.textContent = isChatVisible ? 'Hide Chat Frame' : 'Show Chat Frame';
        btn.onclick = () => {
            isChatVisible = !isChatVisible;
            updateMode();
        };
        targetContainer.prepend(btn);
        updateMode();
    };

    // Init
    const init = () => {
        applyStyles();
        createButton();

        const observer = new MutationObserver(() => {
            if (!document.getElementById(BTN_ID)) createButton();
        });
        const masthead = document.querySelector('ytd-masthead');
        if (masthead) observer.observe(masthead, { childList: true, subtree: true });

        document.addEventListener('yt-navigate-finish', () => {
             setTimeout(() => {
                 applyStyles();
                 createButton();
                 forceOpenChat();
             }, 500);
        });

        setInterval(() => {
            if (window.location.href.includes('/watch')) {
                applyStyles();
                forceOpenChat();
                if (!document.getElementById(BTN_ID)) createButton();
            }
        }, 1000);
    };

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();
