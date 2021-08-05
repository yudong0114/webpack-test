// hello.jsのインポート
import { hello, goodnight} from "./hello";
// index.cssのインポート
import './index.css';
// button.cssのインポート
import './button.css';

// helloボタン
const hello_btn = document.getElementById('hello');
// goodnightボタン
const goodnight_btn = document.getElementById('goodnight');

// helloボタンにリスナーの設定
hello_btn.addEventListener('click', () => {
  hello('山田 勝己');
});
// helloボタンにリスナーの設定
goodnight_btn.addEventListener('click', () => {
  goodnight('山田 勝己', 21);
});