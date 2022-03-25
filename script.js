//canvas変数に、HTMLの＜canvas＞要素であるcanvasを代入
const canvas = document.getElementById('canvas1');
//canvasの大きさをウィンドウいっぱいに設定
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
//このcanvasは２Dで描画していく宣言
const ctx = canvas.getContext('2d');


// audioContext変数に、AudioContextインスタンスを生成
let audioContext = new AudioContext();
// （一次アンビソニック）レゾナンスオーディオシーンを作成し、それを渡します
let resonanceAudioScene = new ResonanceAudio(audioContext);
// resonanceAudioSceneを最終的な出力先につなげる。つまりスピーカー.        
resonanceAudioScene.output.connect(audioContext.destination);

let elementX = 0.00;
let elementY = 0.00;
let elementZ = 0.00;
let x = 0;
let y = 0;
let z = 0;

// 部屋の大きさ(0m x 0m x 0m).       
let roomDimensions = {
    width: 6.0,
    height: 6.0,
    depth: 6.0,
};

// 部屋の素材. 
let roomMaterials = {
    // 壁の素材        
    left: 'curtain-heavy',
    right: 'curtain-heavy',
    front: 'curtain-heavy',
    back: 'curtain-heavy',
    // 床の素材              
    down: 'uniform',
    // 天井の素材           
    up: 'uniform',
};

// Add the room definition to the scene.       
resonanceAudioScene.setRoomProperties(roomDimensions, roomMaterials);

//AudioElementを作成.       
//音源データを64進数に変換（ブラウザのセキュリティ上）
let audioElement = document.createElement('audio');
audioElement.src = "hototogisu.wav";
audioElement.loop = true;


// AudioElementからMediaElementSourceを生成  
let audioElementSource = audioContext.createMediaElementSource(audioElement);

// MediaElementSourceをオーディオ入力ソースとしてシーンに追加
let source = resonanceAudioScene.createSource();
audioElementSource.connect(source.input);
source.setMaxDistance(6);

//オーディオを再生
button.addEventListener("click", function() {
    audioElement.play();
});

//聴者の位置
resonanceAudioScene.setListenerPosition(x, y, z);

//部屋の中心を基準にしたソース位置を設定（ソースのデフォルト位置）
window.addEventListener("keyup", function(event) {
    // Move laugh audio source around when arrow keys pressed         
    if (event.which == 37)
    // left arrow key                 
    {
        source.setPosition(elementX -= 1.0, elementY, elementZ);
    }
    if (event.which == 39)
    // right arrow key          
    {
        source.setPosition(elementX += 1.0, elementY, elementZ);
    }
    if (event.which == 38) // up arrow key            
    {
        source.setPosition(elementX, elementY += 1.0, elementZ);
    }
    if (event.which == 40)
    // down arrow key               
    {
        source.setPosition(elementX, elementY -= 1.0, elementZ);
    }
    if (event.which == 33)
    // page up arrow key           
    {
        source.setPosition(elementX, elementY, elementZ += 1.0);
    }
    if (event.which == 34)
    // page down arrow key           
    {
        source.setPosition(elementX, elementY, elementZ -= 1.0);
    }
    if (event.which == 32)
    // space key           
    {
        elementX = 0;
        elementY = 0;
        elementZ = 0;
        source.setPosition(elementX, elementY, elementZ);
    }
    // Move the listener left or right on A/D keys    
    if (event.which == 65) {
        //A             
        resonanceAudioScene.setListenerPosition(x -= 0.1, y, z);
    }
    if (event.which == 68) {
        //D              
        resonanceAudioScene.setListenerPosition(x += 0.1, y, z);
    }
}, this);


let r = 200; //半径
let xpos, ypos; //オブジェクトの座標
let degree = 0; //角度
let radian; //ラジアン
function draw() {
    source.setPosition(elementX, elementY, elementZ);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.font = "20px serif";
    ctx.fillText('elementX : ' + elementX, 10, 50);
    ctx.fillText('elementY : ' + elementY, 10, 100);
    ctx.fillText('elementZ : ' + elementZ, 10, 150);

    degree += 1;
    radian = degree * Math.PI / 180; //度をラジアンに変換

    elementX = Math.cos(radian);
    elementZ = Math.sin(radian);
    elementZ = elementZ * -1 * 3;
    elementX = elementX * 3;

    ctx.beginPath();
    ctx.fillStyle = 'green';
    ctx.arc(canvas.width / 2, canvas.height / 2, 10, 0, Math.PI * 2);
    ctx.fill();
    ctx.closePath();

    ctx.beginPath();
    ctx.fillStyle = 'red';
    ctx.arc(elementX / 3 * r + canvas.width / 2, elementZ * -1 / 3 * r + canvas.height / 2, 10, 0, Math.PI * 2);
    ctx.fill();
    ctx.closePath();


    window.requestAnimationFrame(draw);
}
draw();