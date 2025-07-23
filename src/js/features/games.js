// ========================================
// PARTY GAMES MODULE
// ========================================
// All game functions from your original app

import { getAppState, setStateValue } from '../config/app-state.js';
import { showNotification } from '../ui/notifications.js';
import confetti from 'canvas-confetti';

// Game data
const gameData = {
    neverHaveIEver: [
        "Never have I ever skipped a lecture for a party",
        "Never have I ever kissed someone at a HSG party",
        "Never have I ever failed an exam because of partying",
        "Never have I ever woken up in the library",
        "Never have I ever used ChatGPT for an assignment",
        "Never have I ever been to a professor's office hours drunk",
        "Never have I ever stolen food from a dorm kitchen",
        "Never have I ever dated someone from my study group",
        "Never have I ever fallen asleep during a presentation",
        "Never have I ever pretended to be sick to avoid a group project"
    ],
    truths: [
        "What's your most embarrassing HSG moment?",
        "Who's your secret crush on campus?",
        "What's the worst grade you've ever gotten?",
        "Have you ever cheated on an exam?",
        "What's your biggest fear about graduation?",
        "Which professor do you have a crush on?",
        "What's the craziest thing you've done at HSG?"
    ],
    dares: [
        "Text your crush right now!",
        "Do 20 pushups",
        "Sing the HSG anthem",
        "Call a random contact and say 'I love you'",
        "Post an embarrassing photo on Instagram",
        "Dance without music for 1 minute",
        "Let someone go through your phone for 30 seconds"
    ],
    trivia: [
        {
            question: "When was HSG founded?",
            options: ["1898", "1923", "1945", "1967"],
            correct: 0
        },
        {
            question: "What does HSG stand for?",
            options: ["High School Gymnasium", "Hochschule St. Gallen", "Higher Studies Group", "Helvetic Study Group"],
            correct: 1
        },
        {
            question: "How many students attend HSG?",
            options: ["5,000", "9,000", "12,000", "15,000"],
            correct: 1
        },
        {
            question: "What's the most popular major at HSG?",
            options: ["Law", "Business Administration", "Computer Science", "International Affairs"],
            correct: 1
        }
    ]
};

// Game state
const gameState = {
    flipTimer: null,
    flipTime: 0,
    bestFlipTime: null,
    triviaScore: 0,
    currentTriviaIndex: 0
};

// ========================================
// START GAME
// ========================================
export function startGame(gameType) {
    setStateValue('currentGame', gameType);
    
    const gameOverlay = document.createElement('div');
    gameOverlay.className = 'game-overlay';
    gameOverlay.id = 'gameOverlay';
    
    let gameContent = '';
    
    switch(gameType) {
        case 'never-have-i-ever':
            gameContent = createNeverHaveIEverGame();
            break;
        case 'truth-or-dare':
            gameContent = createTruthOrDareGame();
            break;
        case 'kings-cup':
            gameContent = createKingsCupGame();
            break;
        case 'beer-pong':
            gameContent = createBeerPongGame();
            break;
        case 'flip-cup':
            gameContent = createFlipCupGame();
            break;
        case 'trivia':
            gameContent = createTriviaGame();
            break;
    }
    
    gameOverlay.innerHTML = `
        <div class="game-container">
            <div class="game-header">
                <div class="game-title">${getGameTitle(gameType)}</div>
                <div class="close-game" onclick="closeGame()">×</div>
            </div>
            ${gameContent}
        </div>
    `;
    
    document.body.appendChild(gameOverlay);
    setTimeout(() => gameOverlay.classList.add('show'), 10);
    
    // Initialize game
    initializeGame(gameType);
    
    if (confetti) {
        confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 }
        });
    }
}

// ========================================
// CLOSE GAME
// ========================================
export function closeGame() {
    const overlay = document.getElementById('gameOverlay');
    if (overlay) {
        overlay.classList.remove('show');
        setTimeout(() => overlay.remove(), 500);
    }
    setStateValue('currentGame', null);
}

// ========================================
// GAME CREATORS
// ========================================
function createNeverHaveIEverGame() {
    return `
        <div class="question-card" id="gameQuestion">
            Click "Next Question" to start!
        </div>
        <div style="text-align: center; margin: 30px 0;">
            <button class="btn btn-primary" onclick="nextNeverHaveIEver()">
                <i class="fas fa-arrow-right"></i> Next Question
            </button>
        </div>
        <div style="text-align: center; opacity: 0.7;">
            <p>Drink if you've done it! 🍻</p>
        </div>
    `;
}

function createTruthOrDareGame() {
    return `
        <div style="text-align: center; margin: 30px 0;">
            <button class="btn btn-primary" style="margin: 10px;" onclick="showTruth()">
                <i class="fas fa-comment"></i> Truth
            </button>
            <button class="btn btn-danger" style="margin: 10px;" onclick="showDare()">
                <i class="fas fa-fire"></i> Dare
            </button>
        </div>
        <div class="question-card" id="gameQuestion">
            Choose Truth or Dare!
        </div>
        <div id="playerName" style="text-align: center; font-size: 1.5em; margin-top: 20px;"></div>
    `;
}

function createKingsCupGame() {
    return `
        <div style="text-align: center;">
            <div style="font-size: 6em; margin: 20px 0;" id="currentCard">🎴</div>
            <button class="btn btn-primary" onclick="drawCard()">
                <i class="fas fa-clone"></i> Draw Card
            </button>
        </div>
        <div class="question-card" id="gameQuestion">
            Click "Draw Card" to start!
        </div>
    `;
}

function createBeerPongGame() {
    return `
        <div class="score-display">
            <div class="team-score">
                <div class="team-name">Team 1</div>
                <div class="team-points" id="team1Score">0</div>
                <button class="btn" onclick="addScore('team1')">+1</button>
            </div>
            <div class="team-score">
                <div class="team-name">Team 2</div>
                <div class="team-points" id="team2Score">0</div>
                <button class="btn" onclick="addScore('team2')">+1</button>
            </div>
        </div>
        <div style="text-align: center; margin: 30px 0;">
            <button class="btn btn-primary" onclick="resetBeerPong()">
                <i class="fas fa-redo"></i> New Game
            </button>
        </div>
        <div id="gameStatus" style="text-align: center; font-size: 1.5em; margin-top: 20px;"></div>
    `;
}

function createFlipCupGame() {
    return `
        <div class="timer-display" id="flipTimer">00:00</div>
        <div style="text-align: center; margin: 30px 0;">
            <button class="btn btn-primary" id="timerBtn" onclick="toggleFlipTimer()">
                <i class="fas fa-play"></i> Start Timer
            </button>
            <button class="btn" onclick="resetFlipTimer()">
                <i class="fas fa-redo"></i> Reset
            </button>
        </div>
        <div id="bestTime" style="text-align: center; font-size: 1.2em; margin-top: 20px;">
            Best Time: --:--
        </div>
    `;
}

function createTriviaGame() {
    return `
        <div class="question-card" id="gameQuestion">
            Click "Next Question" to start HSG Trivia!
        </div>
        <div id="triviaOptions" style="margin: 20px 0;"></div>
        <div style="text-align: center; margin: 30px 0;">
            <button class="btn btn-primary" onclick="nextTrivia()">
                <i class="fas fa-arrow-right"></i> Next Question
            </button>
        </div>
        <div class="score-display">
            <div class="team-score">
                <div class="team-name">Score</div>
                <div class="team-points" id="triviaScore">0</div>
            </div>
        </div>
    `;
}

// ========================================
// GAME LOGIC
// ========================================
function initializeGame(gameType) {
    switch(gameType) {
        case 'beer-pong':
            setStateValue('gameScores', { team1: 0, team2: 0 });
            updateBeerPongScore();
            break;
        case 'trivia':
            gameState.triviaScore = 0;
            gameState.currentTriviaIndex = 0;
            document.getElementById('triviaScore').textContent = '0';
            break;
    }
}

// Never Have I Ever
export function nextNeverHaveIEver() {
    const questions = gameData.neverHaveIEver;
    const random = Math.floor(Math.random() * questions.length);
    document.getElementById('gameQuestion').textContent = questions[random];
}

// Truth or Dare
export function showTruth() {
    const truths = gameData.truths;
    const random = Math.floor(Math.random() * truths.length);
    document.getElementById('gameQuestion').textContent = truths[random];
    selectRandomPlayer();
}

export function showDare() {
    const dares = gameData.dares;
    const random = Math.floor(Math.random() * dares.length);
    document.getElementById('gameQuestion').textContent = dares[random];
    selectRandomPlayer();
}

function selectRandomPlayer() {
    const partyData = getAppState().partyData || {};
    const players = Object.values(partyData).map(p => p.name);
    if (players.length === 0) players.push('You');
    const random = Math.floor(Math.random() * players.length);
    const player = players[random];
    document.getElementById('playerName').textContent = `${player}'s turn!`;
}

// King's Cup
export function drawCard() {
    const cards = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
    const suits = ['♠️', '♥️', '♦️', '♣️'];
    const randomCard = cards[Math.floor(Math.random() * cards.length)];
    const randomSuit = suits[Math.floor(Math.random() * suits.length)];
    
    document.getElementById('currentCard').textContent = randomCard + randomSuit;
    
    const rules = {
        'A': '🍉 Waterfall - Everyone drinks!',
        '2': '👉 You - Choose someone to drink',
        '3': '👈 Me - You drink!',
        '4': '👯 Floor - Last to touch floor drinks',
        '5': '🙋 Guys - All guys drink',
        '6': '💃 Chicks - All girls drink',
        '7': '🌈 Heaven - Last to raise hand drinks',
        '8': '🤝 Mate - Choose a drinking buddy',
        '9': '🎵 Rhyme - Say a word, others rhyme',
        '10': '📏 Categories - Name things in category',
        'J': '👑 Make a Rule',
        'Q': '❓ Questions - Ask questions only',
        'K': '🏆 King\'s Cup - Pour into center cup'
    };
    
    document.getElementById('gameQuestion').textContent = rules[randomCard];
}

// Beer Pong
export function addScore(team) {
    let gameScores = getAppState().gameScores || { team1: 0, team2: 0 };
    gameScores[team]++;
    setStateValue('gameScores', gameScores);
    updateBeerPongScore();
    
    if (gameScores[team] >= 10) {
        document.getElementById('gameStatus').textContent = `${team === 'team1' ? 'Team 1' : 'Team 2'} Wins! 🏆`;
        if (confetti) {
            confetti({
                particleCount: 200,
                spread: 70,
                origin: { y: 0.6 }
            });
        }
    }
}

function updateBeerPongScore() {
    const gameScores = getAppState().gameScores || { team1: 0, team2: 0 };
    document.getElementById('team1Score').textContent = gameScores.team1;
    document.getElementById('team2Score').textContent = gameScores.team2;
}

export function resetBeerPong() {
    setStateValue('gameScores', { team1: 0, team2: 0 });
    updateBeerPongScore();
    document.getElementById('gameStatus').textContent = '';
}

// Flip Cup
export function toggleFlipTimer() {
    const btn = document.getElementById('timerBtn');
    
    if (gameState.flipTimer) {
        clearInterval(gameState.flipTimer);
        gameState.flipTimer = null;
        btn.innerHTML = '<i class="fas fa-play"></i> Start Timer';
        
        if (!gameState.bestFlipTime || gameState.flipTime < gameState.bestFlipTime) {
            gameState.bestFlipTime = gameState.flipTime;
            document.getElementById('bestTime').textContent = `Best Time: ${formatTime(gameState.bestFlipTime)}`;
            if (confetti) {
                confetti({
                    particleCount: 100,
                    spread: 70,
                    origin: { y: 0.6 }
                });
            }
        }
    } else {
        gameState.flipTime = 0;
        gameState.flipTimer = setInterval(() => {
            gameState.flipTime++;
            document.getElementById('flipTimer').textContent = formatTime(gameState.flipTime);
        }, 10);
        btn.innerHTML = '<i class="fas fa-pause"></i> Stop Timer';
    }
}

export function resetFlipTimer() {
    if (gameState.flipTimer) {
        clearInterval(gameState.flipTimer);
        gameState.flipTimer = null;
    }
    gameState.flipTime = 0;
    document.getElementById('flipTimer').textContent = '00:00';
    document.getElementById('timerBtn').innerHTML = '<i class="fas fa-play"></i> Start Timer';
}

function formatTime(centiseconds) {
    const minutes = Math.floor(centiseconds / 6000);
    const seconds = Math.floor((centiseconds % 6000) / 100);
    const cs = centiseconds % 100;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}.${cs.toString().padStart(2, '0')}`;
}

// Trivia
export function nextTrivia() {
    const trivia = gameData.trivia;
    const current = trivia[gameState.currentTriviaIndex % trivia.length];
    
    document.getElementById('gameQuestion').textContent = current.question;
    
    const optionsHtml = current.options.map((option, index) => 
        `<button class="btn" style="width: 100%; margin: 10px 0;" onclick="answerTrivia(${index}, ${current.correct})">${option}</button>`
    ).join('');
    
    document.getElementById('triviaOptions').innerHTML = optionsHtml;
    gameState.currentTriviaIndex++;
}

export function answerTrivia(selected, correct) {
    const buttons = document.getElementById('triviaOptions').querySelectorAll('button');
    
    if (selected === correct) {
        gameState.triviaScore++;
        document.getElementById('triviaScore').textContent = gameState.triviaScore;
        buttons[selected].style.background = 'linear-gradient(45deg, #00ff88, #00d4ff)';
        showNotification('✅ Correct! +1 point');
    } else {
        buttons[selected].style.background = 'linear-gradient(45deg, #ff4444, #ff0088)';
        buttons[correct].style.background = 'linear-gradient(45deg, #00ff88, #00d4ff)';
        showNotification('❌ Wrong answer!');
    }
    
    // Disable all buttons
    buttons.forEach(btn => btn.disabled = true);
    
    // Auto next question after 2 seconds
    setTimeout(nextTrivia, 2000);
}

function getGameTitle(gameType) {
    const titles = {
        'never-have-i-ever': '🙊 Never Have I Ever',
        'truth-or-dare': '🎯 Truth or Dare',
        'kings-cup': '👑 King\'s Cup',
        'beer-pong': '🏓 Beer Pong',
        'flip-cup': '🥤 Flip Cup',
        'trivia': '🧠 HSG Trivia'
    };
    return titles[gameType] || 'Party Game';
}