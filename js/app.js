// --- 曜日×家族構成×気力別のメニューデータ ---
const menuData = {
    // 月曜・金曜
    mon_fri: {
        'single': {
            high: ['2日分仕込む！具だくさん特製カレー', '小分け冷凍もできる！肉豆腐'],
            mid: ['多めに作って明日も食べる筑前煮', '味玉も一緒に仕込むチャーシュー'],
            low: ['冷凍うどん', '納豆ごはん','UberEats']
        },
        'couple': {
            high: ['次の日はカレードリアに！たっぷりカレー', '煮込みハンバーグ'],
            mid: ['翌日味が染みる！おでん風煮込み', '具沢山豚汁'],
            low: ['スーパーのお惣菜', '冷凍餃子','UberEats']
        },
        'family-older': {
            high: ['次の日はリメイク！大鍋カレーライス', '明日のお弁当の主役！山盛り唐揚げ'],
            mid: ['具だくさん肉じゃが', '焼きそば'],
            low: ['冷凍たこ焼き＆うどんパーティー', 'レトルトカレー&パックご飯','UberEats']
        },
        'family-younger': {
            high: ['ドリアやオムライスに使える！ミートソース', '具沢山ミネストローネ'],
            mid: ['具沢山豚汁', '三色丼'],
            low: ['おかゆ・雑炊', 'レトルトカレー&パックご飯','UberEats']
        }
    },
    // 火曜〜木曜
    tue_thu: {
        'single': {
            high: ['ガッツリ豚生姜焼き定食', 'シャキシャキ野菜炒め'],
            mid: ['漬け丼', '冷凍餃子と中華スープ'],
            low: ['レンジで完結！ぶっかけうどん', 'コンビニ飯']
        },
        'couple': {
            high: ['彩り回鍋肉（ホイコーロー）', 'さっぱり黒酢酢豚'],
            mid: ['和風オムレツと味噌汁', '野菜たっぷり肉野菜炒め'],
            low: ['スーパーのお惣菜', 'レトルトの中華丼']
        },
        'family-older': {
            high: ['スタミナ焼肉丼', 'チキンカツ＆マカロニサラダ'],
            mid: ['チャーハンとスープ', '鮭とキノコのホイル焼き'],
            low: ['パックご飯とお惣菜', 'カップ麺と冷凍おにぎり']
        },
        'family-younger': {
            high: ['オムライス', 'マイルド麻婆豆腐','中華粥'],
            mid: ['サラダうどん', '鮭フレーク混ぜご飯'],
            low: ['冷凍食品', 'レトルト食品パーティー']
        }
    },
    // 土曜・日曜
    weekend: {
        'single': {
            high: ['出汁から作るラーメン', 'ステーキ肉を焼く！'],
            mid: ['おうち居酒屋風おつまみ盛り', 'デリバリーピザ'],
            low: ['カップ麺＋ちょっといいアイス', '近くの定食屋で外食']
        },
        'couple': {
            high: ['皮から作る餃子', 'ローストビーフ'],
            mid: ['お刺身盛り合わせと日本酒', 'おうちアヒージョ＆バゲット'],
            low: ['たまには近くのファミレスへ', '回転寿司でテイクアウト']
        },
        'family-older': {
            high: ['ホットプレートでお好み焼き', 'たこ焼きパーティー'],
            mid: ['手巻き寿司パーティー', 'みんなで煮込みハンバーグ'],
            low: ['近所のラーメン屋さん', 'ピザのテイクアウト']
        },
        'family-younger': {
            high: ['ホットプレートでミニパンケーキ', '型抜きカレー'],
            mid: ['幼児も食べられるマイルドシチュー', '細かく刻んだチキンライス'],
            low: ['ファミリーレストランの外食', 'うどん屋さんで外食']
        }
    }
};

// --- アプリの初期化処理 ---
window.onload = function() {
    console.log("--- アプリ起動 ---");
    const savedFamily = localStorage.getItem('familyStructure');
    console.log("取得した家族構成データ:", savedFamily);
    
    if (savedFamily) {
        console.log("データあり：家族構成をスキップして気力選択を表示します。");
        document.getElementById('step-energy').classList.remove('hidden');
    } else {
        console.log("データなし：初回起動のため家族構成選択を表示します。");
        document.getElementById('step-family').classList.remove('hidden');
    }
};

// --- 家族構成を記憶する関数 ---
function saveFamily(type) {
    console.log("--- 家族構成の保存 ---");
    console.log("選択された家族構成:", type);
    
    localStorage.setItem('familyStructure', type);
    
    document.getElementById('step-family').classList.add('hidden');
    document.getElementById('step-energy').classList.remove('hidden');
    console.log("localStorageに保存完了。画面を気力選択に切り替えました。");
}

// --- メニューを決定する関数 ---
function decideMenu(energy) {
    console.log("--- メニュー選定開始 ---");
    const family = localStorage.getItem('familyStructure');
    
    // 現在の曜日を取得 (0=日, 1=月, 2=火, 3=水, 4=木, 5=金, 6=土)
    let currentDay = new Date().getDay();
    //曜日を強制的に変更(プレゼン用)
    //currentDay = 5;
    let dayType = '';
    
    if (currentDay === 1 || currentDay === 5) {
        dayType = 'mon_fri'; // 月・金
    } else if (currentDay >= 2 && currentDay <= 4) {
        dayType = 'tue_thu'; // 火〜木
    } else {
        dayType = 'weekend'; // 土日
    }
    console.log("適応する曜日グループ:", dayType);
    
    // メニュー配列を取得してランダム選出
    const options = menuData[dayType][family][energy];
    const randomIndex = Math.floor(Math.random() * options.length);
    const chosenMenu = options[randomIndex];
    console.log(`選ばれたメニュー: ${chosenMenu}`);
    
    // 月金用のアドバイス
    if (energy !== 'low') {
        if (currentDay === 1) {
            hintText = '<div class="sub-text">週の初め多めに作って明日以降の自分を楽にしてあげましょう！</div>';
            console.log("月曜用のアドバイスメッセージを追加しました。");
            
        } else if (currentDay === 5) {
            hintText = '<div class="sub-text">今週もお疲れ様です！多めに作って土日を満喫しましょう</div>';
            console.log("金曜用のアドバイスメッセージを追加しました。");
        }
    }
    
   // 結果エリアを取得して、スタイル付きクラスを当てて表示
   const resultArea = document.getElementById('result');
   resultArea.className = "result-box"; 
   resultArea.innerHTML = `
       <p>今日のおすすめは...</p>
       <div>✨ <strong>${chosenMenu}</strong> ✨</div>
       
   `;
   console.log("画面へのメニュー表示が完了しました。");
}

// --- ハンバーガーメニューの開閉処理 ---
function toggleMenu() {
    console.log("--- ハンバーガーメニューの切り替え ---");
    const menu = document.getElementById('side-menu');
    
    // 「open」というクラス名のつけ外しで右側からスライドインさせる
    menu.classList.toggle('open');
}

// --- リセット関数 ---
function resetFamily() {
    console.log("--- 設定リセット実行 ---");
    localStorage.removeItem('familyStructure');
    console.log("localStorageの家族構成データを削除しました。");
    
    // メニューを閉じる
    document.getElementById('side-menu').classList.remove('open');
    
    document.getElementById('step-energy').classList.add('hidden');
    document.getElementById('step-family').classList.remove('hidden');
    
    // 結果表示エリアを完全にリセット
    const resultArea = document.getElementById('result');
    resultArea.innerText = '';
    resultArea.className = ''; 
    console.log("画面を初回状態に戻し、サイドメニューを閉じました。");
}