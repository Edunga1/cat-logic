---
created: 2023-12-07
---
# Google Gemini

구글의 Multimodal AI 모델. `제미나이`로 발음한다.\
멀티모달은 이미지, 음성, 텍스트 등 다양한 타입을 결합하여 처리할 수 있음을 의미한다.

https://deepmind.google/technologies/gemini

시연 영상: https://youtu.be/UIZAiXYceBI?si=oSRGhGQjQITgwZ-d

편집된 영상이라 정확히 확인되지 않지만, 매우 빠른 응답을 제공한다. 사용자와 실시간 대화할 정도.\
실시간으로 사용자와 대화하고, vision 처리한다. 마치 아이언맨 자비스를 보는 느낌.

Ultra, Pro, Nano 3가지 크기가 있다. Nano는 핸드폰과 같은 디바이스에 탑재될 모양.

2023년 12월 13일에 Google Cloud에 공개된다.\
Google Bard에 포함된다고 하는데, 같은 날짜인지는 모르겠다.

어느 정도 편집은 예상했지만, [GN⁺: 구글의 최고 AI "Gemini" 데모는 조작되었다](https://news.hada.io/topic?id=12233)라는 글이 있다.\
실시간 비디오와 오디오가 아닌, 이미지 프레임과 텍스트 프롬프트로 테스트했다는 것.\
내가 기대했던 반응 속도나 추론 능력이 아니라서 아쉽다.\
구글은 [바드 데모](https://news.hada.io/topic?id=8430)에서와 마찬가지로 이번에도 기대에 못 미치는 거 같다.

Gemini의 장점은 유튜브 링크를 전달하면, 자막을 통해 내용을 파악하는 것이 아니라, 영상과 오디오를 분석한다는 점이다.
그래서 특정 시점의 화면에 무엇이 적혀있는지 질문할 수도 있다. NotebookLM이나 다른 AI 서비스에선 아직 불가하다.

[gemini.google.com](https://gemini.google.com/) 보다 [AI Studio](https://aistudio.google.com/)가 더 많은 기능을 제공한다.
영상 길이를 조절한다거나, temperature 조절 등 설정이 있다.

#### Gemini API

구글의 AI 서비스의 브랜딩이 좀 혼란스럽다. Gemini API, Vertex AI, AI Studio 등 용어가 많아서 좀 헷갈린다.
가격 정보도 많은 문서에서 다루고 있어서 찾기 어렵다.
어쨌든 Gemini API 페이지에서 소개하는 AI 모델들은 무료 티어를 제공하고 있다.

https://ai.google.dev/pricing

도메인이 AI Studio를 가르키는 거 같은데, 현재는 Gemini API로 소개하며 Gemini 1.5 Flash, Gemini 1.5 Pro, Gemini 1.0 Pro, Text Embedding 004 4개의 모델을 큐레이션한다.

![Gemini API text-embedding-004 pricing](./res/gemini-text-embedding-004-early-pricing.png)

Gemini 3개 모델은 채팅 모델로 보이고, 무료 제한량이 분당 2~15건, 하루 50~1500건이다.
Text Embedding 004는 이름에서 알 수 있듯이 텍스트 임베딩 모델인데 분당 1,500건 제한만 있다.
토큰 제한량은 모르겠지만, 내가 사용하기에는 충분해서 무료 티어로 다양한 시도를 할 수 있겠다.

유료 플랜은 https://cloud.google.com/vertex-ai/generative-ai/pricing 에서 확인할 수 있다.
텍스트 임베딩 모델은 모델 이름을 적어두고 있지 않아서 공통 적용되는 건지. Open AI와 비교해서 좀 정리가 너무 안되어 보인다.

#### Gemini 2.5 Pro

2025년 3월, Gemini 2.5 Pro가 공개되었다.
추론(Reasoning) 모델이다.
아래 블로그 글에 따르면 OpenAI o3-mini, OpenAI GPT-4.5 등과 비교하여 벤치마크에서 대부분 좋은 성능을 보였다고 한다.

https://blog.google/technology/google-deepmind/gemini-model-thinking-updates-march-2025

[AI 스튜디오](https://aistudio.google.com) 또는 [Gemini 웹](https://gemini.google.com)에서 사용할 수 있다.
스튜디오에서는 유튜브 링크, 영상 등을 업로드하고 temprature 설정, System 프롬프트 등을 설정할 수 있다.

사용 소감은 아주 만족스럽다.
다른 모델처럼 환각 증상은 있지만, 결과물의 품질이 높다.
우선 영상 분석이 빠른 것이 놀라운데, 약 1시간 정도의 영상을 약 3분 만에 분석했다.
토큰 제한으로 인해 1시간 분량만 분석할 수 있어서, 더 긴 영상은 잘라서 업로드해야 했다.
특정 주제에 대한 타임스탬프를 요청하면, 정확한 위치를 찾아내는 것이 놀랍다.
채팅 기반이다보니 추가적인 질문을 통해서 더 많은 정보를 추려낼 수 있어서, 여타 다른 요약 서비스보다 유용하다.

스튜디오에서 유튜브 링크를 첨부하면 직접 파일 업로드하지 않아도 된다.
파일을 직접 업로드하면 구글 드라이브에 저장된다.

내가 시도한 것 중 하나는 [3Blue1Brown의 질량에 따른 충돌 시뮬레이션 영상](https://www.youtube.com/watch?v=HEfHFsfGXjs)의 시뮬레이션을 구현하는 것이었다.
일종의 Vibe 코딩이라고 할 수 있다. 유튜브 링크와 함께 `이걸 그대로 구현해보고 싶어요. html canvas로 구현해 줄래요?`라고 말한 것이 전부였다.

![Gemini 2.5 Pro canvas](./res/gemini-2.5-pro-collision-canvas.png)

결과물은 아주 만족스럽다.
영상의 시뮬레이션 디자인을 그대로 구현하지는 않았지만, 도형 색깔을 흉내내었고,
추가로 질량과 초기 속도 그리고 애니메이션 속도를 조절할 수 있는 설정을 추가했다.
코드는 오류 없이 모든 기능이 올바르게 동작했다.
`data:` 임베디드로 사운드가 포함되어 있었지만 들리지는 않았다.

두 번의 프롬프트로 구현했는데, 첫 번째 결과물은 애니메이션 없이 정적이었다.
하지만 두 번재 요청에 애니메이션이 있으면 좋겠다고만 요청했는데, 조절 기능까지 구현한 것이다.

---

아래는 생성된 시뮬레이션 코드이다.

<details>
<summary>index.html</summary>

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Animated Colliding Blocks Simulation (Pi)</title>
    <style>
        body {
            font-family: sans-serif;
            display: flex;
            flex-direction: column;
            align-items: center;
            background-color: #f4f4f4;
            margin: 0;
            padding-top: 20px;
        }
        canvas {
            border: 1px solid #555;
            background-color: #1e1e1e; /* 어두운 배경 */
            margin-top: 15px;
            margin-bottom: 15px;
            box-shadow: 0 4px 8px rgba(0,0,0,0.1);
        }
        .container {
            background-color: #fff;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 2px 5px rgba(0,0,0,0.1);
            margin-bottom: 15px;
            text-align: center;
        }
        .controls label, .info span {
            margin: 0 5px 0 10px;
        }
        input[type="number"] {
            width: 90px;
            padding: 5px;
            margin-right: 15px;
            border: 1px solid #ccc;
            border-radius: 4px;
        }
        input[type="range"] {
            vertical-align: middle;
            width: 100px;
        }
        button {
            padding: 8px 18px;
            cursor: pointer;
            background-color: #007bff;
            color: white;
            border: none;
            border-radius: 4px;
            font-size: 1em;
            transition: background-color 0.2s ease;
        }
        button:hover {
            background-color: #0056b3;
        }
        button:disabled {
            background-color: #cccccc;
            cursor: not-allowed;
        }
        #collisionCount {
            font-weight: bold;
            font-size: 1.3em;
            color: #28a745; /* Green for collisions */
            min-width: 50px;
            display: inline-block;
        }
         #piApproximation {
            font-weight: bold;
            font-size: 1.1em;
             color: #dc3545; /* Red for Pi */
             margin-left: 20px;
        }
        #status {
             font-style: italic;
             color: #6c757d; /* Gray for status */
        }
    </style>
</head>
<body>
    <h1>움직이는 블록 충돌 시뮬레이션 (π 계산)</h1>

    <div class="container controls">
        <label for="mass1">질량 1 (회색):</label>
        <input type="number" id="mass1" value="1" min="1">

        <label for="mass2">질량 2 (파랑):</label>
        <input type="number" id="mass2" value="100" min="1">

        <label for="vel2">초기 속도 2 (-):</label>
        <input type="number" id="vel2" value="-1" step="0.1">

        <label for="timeScale">속도:</label>
        <input type="range" id="timeScale" min="1" max="500" value="100">

        <button id="startButton">시작 / 리셋</button>
    </div>

    <canvas id="collisionCanvas" width="800" height="150"></canvas>

    <div class="container info">
        충돌 횟수: <span id="collisionCount">0</span>
        <span id="piApproximation"></span>
        <br>
        상태: <span id="status">준비</span>
    </div>

     <script src="simulation.js"></script>
</body>
</html>
```
</details>

<details>
<summary>simulation.js</summary>

```js
const canvas = document.getElementById('collisionCanvas');
const ctx = canvas.getContext('2d');

// --- Controls ---
const mass1Input = document.getElementById('mass1');
const mass2Input = document.getElementById('mass2');
const vel2Input = document.getElementById('vel2');
const startButton = document.getElementById('startButton');
const timeScaleSlider = document.getElementById('timeScale');
const collisionCountSpan = document.getElementById('collisionCount');
const piApproximationSpan = document.getElementById('piApproximation');
const statusSpan = document.getElementById('status');

// --- Simulation Parameters & State ---
let m1, m2;
let x1, x2; // Position of left edge
let v1, v2; // Velocity
let collisionCount = 0;
let blockWidth1 = 50; // Visual width
let blockWidth2 = 50; // Visual width
const wallX = 0;
const initialX1 = 200; // Start block 1 away from wall
const initialSpacing = 50; // Initial space between blocks
const canvasHeight = canvas.height;
const blockY = canvasHeight / 2 - blockWidth1 / 2; // Center blocks vertically
let timeScale = parseInt(timeScaleSlider.value); // How many simulation steps per animation frame
let animationId = null;
let isRunning = false;
const dt = 0.005; // Simulation time step (smaller = more accurate but slower) - Adjust as needed
const CLACK_SOUND_URL = 'data:audio/wav;base64,UklGRlIAAABXQVZFZm10IBAAAAABAAEAIlYAAESsAAACABAAZGF0YQQAAAAAAAD//wIA/f8EAPz/BgAA//8GAAH/BQAD/wUAAf8FAAL/BgAB/wcAAf8HAAD/CAAE/wgAA/8IAAP/BwAB/wYAA/8CAP3/AgD5/wIA+v8CAPv/AQD9/wAAAP8AAPz/AAD5/wAA+P8BAPf/BADr/woA5v8PAPD/FQDv/xYA7P8TAPL/EgDu/xEA7v8NAPn/CwD8/wcA/f8BAPv+AADy/gAA7f4BAOr+AgDm/gMA3P4GANv+BwDV/gkAzv4MANL+DADS/hAAzf4QAMX+EADG/hAAw/4OAL/+DQDC/gwAwP4LALz+CQDD/gcAwv4EAMP+AgC//wAAwf4AAPD9AAD1/QAA8/0AAPT9AADx/QAA8f0AAPP9AAD2/QAA9v0AAPT9AADw/QAA7P0AAOX9AADh/QAA1/0AAM39AADP/QAA1f0AANb9AADW/QAA0v0AAM/9AADO/QAAy/0AAMn9AADG/QAAwv0AAL/9AAC//QAAwf0AAMH9AADF/QAByP0AAMP9AADG/QAAy/0AANH9AADW/QAA3f0AAOb9AADu/QAA8v0AAPT9AAD1/AAA9vwAAPj8AAD0/AAACQUAAR4KAAFGDAABZg4AAXoRAAGNEwABjhQAAY0VAAGLGQABixkAAYsaAAGLGwABjBsAAYwaAAGLFwABihQAAYYTAmGIEwVfiBgIYYgZCGCIFQhhiBkIYIgXCGGIEQhfiBAIX4gRCF+IEAhgiA8IYIgRCF+IDwhfiA4IW4gOCFuIDghbiA0IW4gMCFuIDAhbiA4IYAgLCGCHEAhbgxQGVoUdBloIOAZaCEYJaB4AH4gZABuIGgAbhxwBG4cdARuHEQIZhxECGYcSAhmHEgEbhxIBGYUSARmFEgEZhRICF4UUAhOFFAIThRUCFYUVAgqFFgIKhRYCCoUWAgqFFwICgxcC/4YXBACGGgAEhhoABAceAwSGIAIFhiICBYYjAf2GKAL9higDAIYqAwCGKwMAhisDAIYrAgCGKwIAhisC/4YsAv+GLAL/hhsB/4YdAP+GIAABhyECAYckAgGHLQEBhzMCAYcyAP+HOQAAhz0AAYg/AAWINgIFii0DAYguAwOIHgMDiBkGA4gSBwOGCQgDhw0IA4YNCAGGCAgBhgUIAYYBCAGG/wAAhv8AAIb/AACH/wAAh/8AAYf/AAKKAAACigAA/4sAAP+LAAD/iwAA/4sAAP+MAAD/jQAA/40AAP+OAAD/jgAA/48AAP+QAAD/kgAA/5IAAP+TAAD/kwAA/5UAAP+WAAD/lwAA/5gAAP+ZAAD/mgAA/5sAAP+cAAD/nQAA/54AAP+fAAD/oAAA/6E='; // Simple click sound
let clackSound;
try {
    clackSound = new Audio(CLACK_SOUND_URL);
} catch (e) {
    console.warn("Web Audio API not supported or sound file failed to load.");
    clackSound = null; // Handle gracefully if Audio API fails
}

// --- Physics Functions ---
function collideBlocks() {
    if (m1 === Infinity || m2 === Infinity) return; // Avoid calculations with infinity

    const totalMass = m1 + m2;
    const v1_new = ((m1 - m2) * v1 + 2 * m2 * v2) / totalMass;
    const v2_new = (2 * m1 * v1 + (m2 - m1) * v2) / totalMass;
    v1 = v1_new;
    v2 = v2_new;
    playClack();
    collisionCount++;
}

function collideWall(blockIndex) {
    if (blockIndex === 1) {
        v1 = -v1;
    } else {
        v2 = -v2;
    }
    playClack();
    collisionCount++;
}

function playClack() {
    if (clackSound && clackSound.readyState >= 2) { // Check if sound is ready
         clackSound.currentTime = 0; // Rewind to beginning
         clackSound.play().catch(e => console.log("Audio play failed:", e));
    }
}

// --- Drawing Functions ---
function drawBlock(x, w, mass, color) {
    ctx.fillStyle = color;
    // Ensure block doesn't go past the wall visually
    const drawX = Math.max(x, wallX);
    ctx.fillRect(drawX, blockY, w, blockWidth1); // Use blockWidth1 for height for square

    // Draw mass text (only if block is reasonably sized)
    if (w > 10) {
        ctx.fillStyle = '#fff'; // White text
        ctx.font = '12px sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle'; // Center vertically too
        ctx.fillText(`${mass.toExponential(1)}`, drawX + w / 2, blockY + blockWidth1 / 2);
        // ctx.fillText(`${mass}`, drawX + w / 2, blockY + blockWidth1 / 2); // Use if masses are small
    }
}

function drawWall() {
    ctx.strokeStyle = '#999'; // Lighter gray wall
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(wallX + ctx.lineWidth / 2, 0);
    ctx.lineTo(wallX + ctx.lineWidth / 2, canvasHeight);
    ctx.stroke();
}

function draw() {
    // Clear canvas
    ctx.fillStyle = '#1e1e1e';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw wall
    drawWall();

    // Draw blocks
    // Adjust visual width slightly based on mass (log scale helps for large ratios)
    blockWidth1 = 40 + Math.log10(m1 + 1) * 5; // Add 1 to avoid log(0)
    blockWidth2 = 40 + Math.log10(m2 + 1) * 5;
    blockWidth1 = Math.max(10, blockWidth1); // Minimum visual width
    blockWidth2 = Math.max(10, blockWidth2);

    drawBlock(x1, blockWidth1, m1, '#cccccc'); // Grey
    drawBlock(x2, blockWidth2, m2, '#87CEEB'); // Light Blue

    // Update collision count display
    collisionCountSpan.textContent = collisionCount.toLocaleString(); // Format large numbers

     // Display Pi approximation if relevant
     displayPiApproximation();
}

function displayPiApproximation() {
     piApproximationSpan.textContent = ''; // Clear previous
     if (m1 > 0 && m2 > 0) {
        const ratio = m2 / m1;
        const powerOf100 = Math.log10(ratio) / 2; // log100(ratio) = log10(ratio) / log10(100)
        if (Math.abs(powerOf100 - Math.round(powerOf100)) < 1e-9 && powerOf100 >= 0) {
             const N = Math.round(powerOf100);
             const piDigits = Math.PI.toFixed(N+1).substring(0, N + (N > 0 ? 2 : 1)); // Get N decimal digits + "3."
             piApproximationSpan.textContent = `(π ≈ ${piDigits} ?)`;
        }
     }
}


// --- Simulation Loop ---
function updatePhysics() {
    // Move blocks
    x1 += v1 * dt;
    x2 += v2 * dt;

    // Check for collisions
    let collided = false;

    // Block 1 hits wall
    if (x1 <= wallX) {
        x1 = wallX; // Prevent going through wall
        if (v1 < 0) { // Only collide if moving towards wall
            collideWall(1);
            collided = true;
        }
    }

    // Block 2 hits wall (less likely with initial setup, but possible)
    if (x2 <= wallX) {
        x2 = wallX;
        if (v2 < 0) {
            collideWall(2);
            collided = true;
        }
    }

    // Block 2 hits Block 1
    // Check for overlap: left edge of b2 <= right edge of b1
    if (x2 <= x1 + blockWidth1) {
        // Resolve overlap slightly to prevent sticking (optional but can help)
        const overlap = (x1 + blockWidth1) - x2;
        // Distribute correction based on mass ratio (heuristic)
        const correction1 = -overlap * (m2 / (m1 + m2));
        const correction2 = overlap * (m1 / (m1 + m2));
        x1 += correction1;
        x2 += correction2;
         // x2 = x1 + blockWidth1; // Simpler overlap resolution


        // Only collide if they are moving towards each other or block 2 catches up
        if (v2 < v1) {
            collideBlocks();
            collided = true;
        }
    }
    return collided; // Indicate if a collision happened in this step
}

function animate() {
    if (!isRunning) return;

    let collisionOccurred = false;
    for (let i = 0; i < timeScale; i++) { // Run multiple simulation steps per frame
        if(updatePhysics()) {
            collisionOccurred = true;
        }

        // Check stopping condition: Both moving right (or stationary), block 2 not catching up
        if (v1 >= -1e-9 && v2 >= -1e-9 && v2 >= v1 - 1e-9 && x2 > x1 + blockWidth1) {
            statusSpan.textContent = '완료: 블록들이 멀어짐';
            stopSimulation();
            draw(); // Final draw
            return; // Exit animation loop
        }
         // Add a safety break for extremely high collision counts (might indicate an issue)
         if (collisionCount > 10000000) { // Adjust limit as needed
              statusSpan.textContent = '중지: 충돌 횟수 과다';
              stopSimulation();
              draw();
              return;
         }
    }

    // Draw the current state after simulation steps
    draw();

    // Request next frame
    animationId = requestAnimationFrame(animate);
}

function resetSimulation() {
    m1 = parseFloat(mass1Input.value);
    m2 = parseFloat(mass2Input.value);
    v1 = 0; // Block 1 starts stationary
    v2 = parseFloat(vel2Input.value);

    // Recalculate visual block widths based on potentially new masses
    blockWidth1 = 40 + Math.log10(m1 + 1) * 5;
    blockWidth2 = 40 + Math.log10(m2 + 1) * 5;
    blockWidth1 = Math.max(10, blockWidth1);
    blockWidth2 = Math.max(10, blockWidth2);


    // Initial positions
    x1 = initialX1;
    x2 = x1 + blockWidth1 + initialSpacing;

    collisionCount = 0;
    collisionCountSpan.textContent = collisionCount;
    statusSpan.textContent = "준비";
    displayPiApproximation(); // Check if current masses match Pi condition


    draw(); // Draw initial state
}

function startSimulation() {
    if (isRunning) {
        console.log("Simulation already running.");
        return; // Prevent multiple starts
    }
    if (animationId) {
        cancelAnimationFrame(animationId); // Clear any previous leftover frame requests
    }
    resetSimulation(); // Reset positions, velocities, counts based on inputs

    if (isNaN(m1) || isNaN(m2) || isNaN(v2) || m1 <= 0 || m2 <= 0) {
         statusSpan.textContent = "오류: 유효한 질량/속도 값을 입력하세요.";
         return;
    }
     if (v2 >= 0) {
        statusSpan.textContent = "오류: 블록 2의 초기 속도는 음수여야 합니다.";
        return;
    }

    statusSpan.textContent = "실행 중...";
    isRunning = true;
    startButton.textContent = "리셋"; // Change button text
    disableControls(true);
    animationId = requestAnimationFrame(animate);
}

function stopSimulation() {
    if (animationId) {
        cancelAnimationFrame(animationId);
        animationId = null;
    }
    isRunning = false;
    // Avoid overwriting "Finished" or "Error" status unless it was just "Running"
    if (statusSpan.textContent === "실행 중...") {
         statusSpan.textContent = "정지됨";
    }
    startButton.textContent = "시작";
    disableControls(false);
}

function disableControls(disabled) {
    mass1Input.disabled = disabled;
    mass2Input.disabled = disabled;
    vel2Input.disabled = disabled;
    // Keep speed slider enabled maybe? Or disable it too.
    // timeScaleSlider.disabled = disabled;
}

// --- Event Listeners ---
startButton.addEventListener('click', () => {
    if (isRunning) {
        stopSimulation();
        resetSimulation(); // Reset to initial parameters when stopped manually
    } else {
        startSimulation();
    }
});

timeScaleSlider.addEventListener('input', (e) => {
    timeScale = parseInt(e.target.value);
});

// --- Initial Setup ---
window.addEventListener('load', () => {
    resetSimulation(); // Initialize and draw the starting state when page loads
    disableControls(false);
});
```
</details>

#### Gemini 3.0

2025년 11월 18일. 아직 출시하지는 않았지만, A/B 테스트로 일부 유출된 품질이 매우 우수해서 화제가 되고 있다.

[The Binding of Isaac](https://x.com/Lentils80/status/1978637501410459867)을 구현했다는 트윗.
2번만에 완벽하게 동작하는 코드를 생성했다.

한국 시간으로 11월 19일에 [공개한다는 소문](https://gall.dcinside.com/m/thesingularity/881993)이 있었고,
실제로 [공개되었다](https://blog.google/products/gemini/gemini-3/).

개인 사용자가 상용 모델의 [2026년도 수능 문제 풀이 벤치마크](https://github.com/hehee9/2026-CSAT)를 진행했는데,
GPT-5.1과 함께 높은 점수를 기록했다.
직접 슈퍼마리오 브라더스의 월드 1-1을 구현했는데, 꽤 빠르게 동작하는 [캔버스](https://codepen.io/Edunga1/pen/KwzqGRM)를 생성했다.
다만 여러 세션에서 시도했는데, 모바일 패드 스타일이 비슷하게 나온 경우가 있어서, 기존에 학습된 코드가 사용된 것은 아닌가 의구심이 든다.

#### Gemini CLI

Gemini CLI는 Gemini 모델을 터미널에서 사용할 수 있게 해주는 명령어를 제공한다.

https://cloud.google.com/gemini/docs/codeassist/gemini-cli

`gemini` 명령어를 통해서 별도의 셸로 진입한다.
기본 입력은 모두 프롬프트 처리되고, `!`를 붙여서 셸 명령어와 구분한다.
셸에서 동작하기 때문에, AI가 명령어를 실행할 수 있다.
Gemini Code Assist를 포함하기 때문에, 프롬프트를 통해 파일을 수정하거나 코딩을 도와준다.

MCP 서버를 붙일 수 있다.
셸에서 동작하고, MCP 서버를 붙일 수 있는 것으로, Claude Code와 흡사한 도구.

요금제는 꽤 복잡하다. \
https://cloud.google.com/gemini/docs/quotas \
개인 사용자는 무료로 사용할 수 있고, Gemini API Key를 발급 받아서 크레딧처럼 사용할 수 있다.
할당량은 코드 생성을 하는 Code Assist와 일반적인 채팅 모델에 따라 나뉜다.

MCP 서버 설정은 다음과 같이 한다.

```json
{
  "mcpServers": {
    "godot": {
      "command": "node",
      "args": [
        "/home/myname/workspace/godot-mcp/build/index.js"
      ],
      "env": {
        "DEBUG": "true",
        "GODOT_PATH": "/mnt/c/Users/myname/AppData/Local/Microsoft/WinGet/Links/godot.exe"
      }
    },
    "github": {
      "httpUrl": "https://api.githubcopilot.com/mcp/",
      "headers": {
        "Authorization": "Bearer github_pat_abc123..."
      }
    }
  }
}
```

remote MCP 설정은 정립되지 않았는지, **클라이언트마다 설정 방법이 다르다**(VSCode는 `"type": "http"`와 `"url": "..."` 조합이다).
Gemini CLI는 `httpUrl`로 URL을 지정하고, `headers`로 헤더를 지정한다.
MCP 서버 설정 사양은 [Hands-on with Gemini CLI 문서](https://codelabs.developers.google.com/gemini-cli-hands-on#8)에서 확인할 수 있다.

#### Nano Banana

나노바나나는 [2025년 8월 26일](https://blog.google/intl/ko-kr/company-news/technology/gempix-nano-banana-kr/)에 공개된 Gemini에 도입한 이미지 편집 모델이다.
빠르고 퀄리티 높은 이미지 편집으로 공식 출시 이전부터 화제가 되었다.

다음은 사진을 피규어로 바꾸는 예시. 상당히 인기를 끌었다.

```
Take this drawing and turn it into a figure in reality. Transform the drawing into a figure with the texture of a figure and place it on a desk with a monitor. Behind the figure, there is a box containing the figure you created. Make the character's pose as identical as possible. The texture of the figure must be like that of the finest plastic. The painting of the figure must look as if it were painted by a master.
```

게임 리소스 등 "투명 배경"을 만들지 못한다.
가짜 투명 배경을 흉내만 내고 실제로 투명한 배경을 만들지 못한다.

[Gemini 3.0](#gemini-30)의 출시와 함께 Nano Banana Pro(2로도 불린다)도 [출시되었다](https://blog.google/intl/ko-kr/company-news/technology/nano-banana-pro/).
이미지 생성 모델들의 고질인 글자 인식 및 비정상 생성 문제를 크게 개선했다.

##### awesome-nano-banana-images

나노 바나나의 다양한 사용 사례를 모아둔 저장소.

https://github.com/PicoTrex/Awesome-Nano-Banana-images/blob/main/README_en.md

피규어 예시처럼 유용한 사례가 많다.
와중에 [49번](https://github.com/PicoTrex/Awesome-Nano-Banana-images/blob/main/README_en.md#case-49-extract-subject-and-place-on-transparent-layerby-nglprz)처럼 투명 배경을 흉내내는 사례도 있다.

[무드 보드](https://github.com/PicoTrex/Awesome-Nano-Banana-images/blob/main/README_en.md#case-52-fashion-moodboard-collageby-tetumemo)나
[음식 광고](https://github.com/PicoTrex/Awesome-Nano-Banana-images/blob/main/README_en.md#case-52-fashion-moodboard-collageby-tetumemo),
[구도 재현](https://github.com/PicoTrex/Awesome-Nano-Banana-images/blob/main/README_en.md#case-52-fashion-moodboard-collageby-tetumem)은
실제로 활용도가 높아 보인다.

#### Gemini API File Search

2025년 11월에 공개한, RAG 서비스.
파일을 업로드하면, 임베딩을 생성하고 인덱싱하여 RAG 인프라를 구축해준다.

https://ai.google.dev/gemini-api/docs/file-search

업로드 후 인덱싱 하는데 비용이 들고, 파일 저장 비용은 무료다.
임베딩과 이후 쿼리에 대한 요금제는 각 모델 요금제가 적용된다.
임베딩은 임베딩 모델, 쿼리는 Gemini 모델 요금제를 따른다.

[AI Studio - Api keys](https://aistudio.google.com/app/api-keys)에서 키를 발급받자.
비용이 든다고 적었지만, Free tier로 시작할 수 있었다.
임베딩 모델의 가격은 워낙 저렴하기 때문에 문서가 적다면 무료 범위 내에서 충분하다.

##### 예제

아래는 파일 검색 스토어를 생성하고, 파일을 업로드하는 예제 코드이다.

```python
import os
from google import genai
import time

client = genai.Client(api_key=os.environ['GENAI_API_KEY'])

file_search_store = client.file_search_stores.create(
  config={'display_name': 'your-fileSearchStore-name'},
)

operation = client.file_search_stores.upload_to_file_search_store(
  file='../docs/wiki/vim.md',
  file_search_store_name=file_search_store.name,
  config={
    'display_name' : 'display-file-name',
  }
)

while not operation.done:
  time.sleep(5)
  operation = client.operations.get(operation)
```

쿼리는 다음과 같이 한다.

```python
import os
from google import genai
from google.genai import types

client = genai.Client(api_key=os.environ['GENAI_API_KEY'])

page = client.file_search_stores.list()
store = page[0]

response = client.models.generate_content(
  model="gemini-2.5-flash",
  contents="""vimscript에 대해 알려줘""",
  config=types.GenerateContentConfig(
    tools=[
      types.Tool(
        file_search=types.FileSearch(
          file_search_store_names=[store.name]
        )
      )
    ]
  )
)

print(response.text)
```

쿼리 결과. 문서는 [내 vim 항목](/docs/wiki/vim.md)를 사용했다.

````bash
Vimscript는 텍스트 편집기인 Vim의 자체 스크립트 언어입니다. 학습하기 꽤 어려운 언어로 알려져 있으며, "Vimscript는 정규식과 같아서 배우는 것이 아니라 그냥 사용하는 것"이라는 비유가 있을  정도입니다.

Vim의 창시자인 Bram Moolenaar도 플러그인을 많이 사용하지 않고, 필요한 기능이 있으면 간단한 것은 직접 만들거나 Vim 베이스에 추가하는 편이라고 언급했습니다.

Vimscript를 사용하면 Vim의 동작을 사용자 정의하고 확장할 수 있습니다. 예를 들어, `.vimrc` 파 일은 Vim 설정 파일로, Vimscript를 사용하여 자신만의 환경을 만들 수 있습니다.

Vimscript의 주요 특징 및 사용법은 다음과 같습니다:

*   **변수 (Variables)**: `:let` 명령어로 변수를 할당하고, `:echo` 명령어로 출력할 수 있습니 다. 변수는 `g:` (전역), `s:` (스크립트)와 같은 접두사를 사용하여 스코프를 지정할 수 있습니다. 접두사가 없으면 함수 내에서는 로컬 변수, 그 외에서는 전역 변수가 됩니다.
*   **사용자 함수 (User Function)**: `:help userfunc`에서 사용자 함수에 대한 설명을 찾을 수  있습니다. 예를 들어, 다음과 같이 함수를 정의할 수 있습니다.
    ```vim
    function! MyFunction() abort
      echo "Hello World!"
    endfunction
    ```
    `function!`의 `!`는 함수가 이미 존재하면 덮어쓴다는 의미이며, `abort`는 에러 발생 시 함수를 종료합니다.
    `s:`를 붙여 `function s:MyFunction()`처럼 정의하면 해당 스크립트 내에서만 호출 가능한 로 컬 함수가 됩니다. 이는 이름 충돌을 방지하는 데 유용합니다.
*   **레지스터 (Registers)**: Vim은 다양한 종류의 레지스터를 제공하여 텍스트를 저장하고 재사 용할 수 있습니다. 예를 들어, `"ayy`로 현재 라인을 `a` 레지스터에 저장하고, `"ap`로 붙여넣기할 수 있습니다. `:let @`를 사용하여 레지스터에 직접 값을 할당하는 것도 가능합니다.
    *   `+`: 클립보드 레지스터
    *   `"`: 이름 없는 레지스터. 삭제된 내용이 저장됩니다.
    *   `_`: 블랙홀 레지스터. 삭제된 내용을 저장하지 않을 때 사용합니다 (예: `"_dd`).
*   **텍스트 오브젝트 (Text Objects)**: Vim에서 선택하고 조작할 수 있는 텍스트 단위를 말합니 다. `:h text-objects`에서 자세한 내용을 확인할 수 있습니다. `w`는 단어, `s`는 문장, `p`는 문 단을 의미하며, `viw`, `vis`, `vip`와 같이 명령과 조합하여 사용할 수 있습니다.
*   **다양한 명령어 활용**:
    *   `vimgrep`, `grep`: 패턴을 검색하고 결과를 quickfix 목록으로 만듭니다.
    *   `cdo`, `ldo`: quickfix 또는 location-list의 검색 결과에 명령어를 적용합니다.
    *   `cfdo`, `lfdo`: 검색된 모든 파일에 명령어를 적용합니다.
    *   `bufdo`: 모든 버퍼 파일에 명령어를 적용합니다.

한편, Vim의 포크 버전인 Neovim은 Vimscript 외에 Lua도 지원하여 더 확장된 기능을 제공합니다. Neovim에서는 LSP (Language Server Protocol)를 자체적으로 제공하며, Lua 스크립트로 플러그인을  초기화하는 방식도 주로 사용됩니다. Lua는 Vimscript보다 학습 곡선이 낮다고 평가되기도 합니다. 하지만 Vim과 Neovim 간의 설정 호환성이 높으므로, 기존 Vim 설정을 크게 변경하지 않고도 Neovim 으로 전환할 수 있습니다.
````


