// ========================================
// PARTY GAMES MODULE
// ========================================
// All game functions from your original app

import { getAppState, setStateValue } from '../config/app-state.js';
import { showNotification } from '../ui/notifications.js';
// Canvas confetti is loaded globally via CDN in index.html
const confetti = window.confetti;

// Game state
let gamePlayers = [];
let currentPlayerIndex = 0;
let gameHistory = [];

// Game data - expanded with industrial-grade content
const gameData = {
    beerPongRules: {
        standard: {
            title: "📜 Standard Beer Pong Rules",
            description: "The official way to play Beer Pong",
            rules: [
                { name: "🔄 Balls Back", desc: "Both partners make cups = shoot again! No re-racks during bonus shots." },
                { name: "🔙 Behind-the-Back", desc: "Miss and grab the ball while it's on the table? Shoot behind your back for a bonus cup!" },
                { name: "⚡ Bouncing", desc: "Bounce shots count as 2 cups! But opponents can swat bounced shots away." },
                { name: "💪 Elbows", desc: "Keep those elbows behind the table edge when shooting. Breaking the plane = reshoot!" },
                { name: "👀 Eye-to-Eye", desc: "To decide who goes first, one player from each team shoots while making eye contact. First to make it wins!" },
                { name: "🔥 Fire", desc: "Make 2 in a row? Call 'heating up'. Make the 3rd? Call 'fire' and keep shooting until you miss!" },
                { name: "🏝️ Island", desc: "Once per game, call 'island' on an isolated cup. Make it = remove 2 cups!" },
                { name: "⏰ Overtime", desc: "Tied game? Each team sets up 3 cups in a triangle. No re-racks allowed!" },
                { name: "🙏 Redemption", desc: "Lost all cups? Keep shooting until you miss! Make them all = overtime!" },
                { name: "♻️ Re-racks", desc: "2 re-racks per game. Diamond, line, triangle - get creative!" },
                { name: "🧹 Tidying-up", desc: "Tighten those cups anytime! Keep the formation clean." }
            ]
        },
        creator: {
            title: "🎯 Creator's Beer Pong Rules",
            description: "The way Beer Pong was meant to be played! 🍺",
            rules: [
                { name: "👀 Eye-to-Eye", desc: "Same as standard - stare into their soul while shooting to go first!" },
                { name: "♻️ Re-racks", desc: "2 per game - get creative with those formations!" },
                { name: "🎩 Gentleman", desc: "Call 'Gentleman' to tidy cups OR force opponent to line up their last 2 cups!" },
                { name: "🔄 Balls Back", desc: "Both make it = balls back baby! Keep that momentum going!" },
                { name: "⚡ Bouncing", desc: "Bounce = 2 cups removed! High risk, high reward!" },
                { name: "💪 Elbows", desc: "Watch those elbows - we're not playing reach pong!" },
                { name: "🏝️ Island", desc: "Isolated cup = 2 cups removed when made. Call it out!" },
                { name: "🎪 Trickshot", desc: "Ball on table after miss? Any creative shot = 2 cups! Behind back is for beginners!" },
                { name: "💥 Double Trouble", desc: "Same cup hit twice? That cup + ALL touching cups are gone! Legendary move!" },
                { name: "🎮 Redemption 2.0", desc: "Lost all cups? Make one to stay alive - but nothing gets removed! It's sudden death mode!" }
            ]
        }
    },
    neverHaveIEver: [
        // Social & Party
        "Never have I ever kissed someone I just met",
        "Never have I ever been kicked out of a bar or club",
        "Never have I ever lied about my age to get into a club",
        "Never have I ever danced on a table or bar",
        "Never have I ever done a body shot",
        "Never have I ever crashed a wedding or private party",
        "Never have I ever been in a hot tub with strangers",
        "Never have I ever karaoke'd while drunk",
        "Never have I ever lost my phone on a night out",
        "Never have I ever woken up wearing someone else's clothes",
        
        // Relationships
        "Never have I ever ghosted someone",
        "Never have I ever dated two people at once",
        "Never have I ever had a one night stand",
        "Never have I ever sent a risky text to the wrong person",
        "Never have I ever stalked an ex on social media",
        "Never have I ever been in love with my best friend",
        "Never have I ever kissed someone to make someone else jealous",
        "Never have I ever broken up with someone over text",
        
        // Embarrassing
        "Never have I ever peed myself as an adult",
        "Never have I ever thrown up in public",
        "Never have I ever walked into a glass door",
        "Never have I ever accidentally sent a screenshot to the person I was talking about",
        "Never have I ever farted loudly in a quiet room",
        "Never have I ever tripped and fallen in front of a crowd",
        
        // Wild & Crazy
        "Never have I ever skinny dipped",
        "Never have I ever been arrested",
        "Never have I ever gotten a tattoo I regret",
        "Never have I ever gone 3+ days without showering",
        "Never have I ever eaten food off the floor",
        "Never have I ever lied on my resume",
        
        // University/Work
        "Never have I ever cheated on a test",
        "Never have I ever slept with a coworker",
        "Never have I ever called in sick when I wasn't",
        "Never have I ever fallen asleep at work/in class",
        "Never have I ever hooked up with a professor/boss"
    ],
    truths: [
        // Relationships & Romance
        "What's your biggest turn on?",
        "Who was your worst kiss and why?",
        "What's the most embarrassing thing you've done for love?",
        "Have you ever been in love with two people at once?",
        "What's your most embarrassing dating app story?",
        "Who in this room would you most want to make out with?",
        "What's the wildest place you've hooked up?",
        "Have you ever cheated or been cheated on?",
        
        // Embarrassing Secrets
        "What's the most embarrassing thing on your phone right now?",
        "What's your most embarrassing drunk story?",
        "What's the biggest lie you've ever told?",
        "What's your worst habit that no one knows about?",
        "What's the weirdest thing you do when you're alone?",
        "What's your most embarrassing Google search?",
        
        // Wild Stories
        "What's the most illegal thing you've done?",
        "What's the craziest thing you've done for money?",
        "What's your wildest fantasy?",
        "Have you ever been caught doing something you shouldn't?",
        "What's the most trouble you've gotten into?",
        
        // This Room
        "Who in this room do you think is the best looking?",
        "Who here would you want to switch lives with?",
        "Who in this room has the best style?",
        "If you had to date someone here, who would it be?",
        "Who here do you think has the biggest secret?"
    ],
    dares: [
        // Physical Challenges
        "Do 10 pushups while someone sits on your back",
        "Plank for 1 minute",
        "Do your best twerk for 30 seconds",
        "Give someone a lap dance for 10 seconds",
        "Do the worm",
        "Attempt a handstand",
        
        // Social Media
        "Post 'I'm pregnant' on your story for 1 minute",
        "Like your crush's oldest Instagram photo",
        "Send the last photo in your gallery to your ex",
        "Change your relationship status for 1 hour",
        "Post an ugly selfie",
        
        // Embarrassing Actions
        "Let someone draw on your face with marker",
        "Speak in an accent for the next 3 rounds",
        "Act like a chicken for 1 minute",
        "Sing everything you say for the next 2 turns",
        "Let someone style your hair however they want",
        "Eat a spoonful of hot sauce",
        
        // Interactive
        "Kiss the person to your left on the cheek",
        "Give someone a 30 second massage",
        "Let someone text anyone from your phone",
        "Switch an item of clothing with someone",
        "Let the group choose someone for you to call and sing to",
        "Whisper something dirty to the person on your right",
        
        // Drinking
        "Take a shot without using your hands",
        "Make a gross drink combination and take a sip",
        "Finish your drink",
        "Waterfall for 5 seconds"
    ],
    wouldYouRather: [
        // Funny & Light
        "Would you rather have to sing everything you say or dance everywhere you walk?",
        "Would you rather have fingers as long as legs or legs as short as fingers?",
        "Would you rather always smell like garlic or always smell like wet dog?",
        "Would you rather have a rewind button or a pause button for your life?",
        "Would you rather be able to fly but only 1 foot off the ground or be invisible but only when no one is looking?",
        
        // Party & Social
        "Would you rather go to a party where you know everyone or where you know no one?",
        "Would you rather be the funniest person in the room or the smartest?",
        "Would you rather never be able to drink alcohol again or never be able to eat chocolate again?",
        "Would you rather drunk text your ex or your boss?",
        "Would you rather throw up in front of your crush or pee yourself at a party?",
        
        // Relationships
        "Would you rather date someone who's extremely hot but boring or average looking but hilarious?",
        "Would you rather have your partner be best friends with their ex or hate their ex?",
        "Would you rather catch your parents having sex or have them catch you?",
        "Would you rather be in a relationship with someone who's too clingy or too distant?",
        "Would you rather know when you're going to die or how you're going to die?",
        
        // Wild & Crazy
        "Would you rather eat a live spider or a dead worm?",
        "Would you rather swim in a pool of beer or a pool of wine?",
        "Would you rather have sex with the lights on always or off always?",
        "Would you rather be naked in public or have everyone read your texts?",
        "Would you rather give up sex or give up food?"
    ],
    mostLikelyTo: [
        // Party Related
        "Who's most likely to get kicked out of a club?",
        "Who's most likely to throw up tonight?",
        "Who's most likely to drunk text their ex?",
        "Who's most likely to lose their phone tonight?",
        "Who's most likely to end up sleeping on the bathroom floor?",
        
        // Relationships
        "Who's most likely to get married first?",
        "Who's most likely to have a secret crush on someone here?",
        "Who's most likely to cheat on their partner?",
        "Who's most likely to fall in love with their best friend?",
        "Who's most likely to have a one night stand?",
        
        // Life & Future
        "Who's most likely to become famous?",
        "Who's most likely to go to jail?",
        "Who's most likely to become a millionaire?",
        "Who's most likely to die first in a zombie apocalypse?",
        "Who's most likely to have 10 kids?",
        
        // Funny
        "Who's most likely to laugh at their own jokes?",
        "Who's most likely to forget their own birthday?",
        "Who's most likely to get lost in their own city?",
        "Who's most likely to cry during a Disney movie?",
        "Who's most likely to eat food off the floor?"
    ],
    spinBottleTasks: [
        // Mild
        "Give a compliment",
        "Share your most embarrassing moment",
        "Do your best impression of someone here",
        "Sing a song for 30 seconds",
        "Let them post something on your social media",
        
        // Medium
        "Give a 30 second massage",
        "Whisper something in their ear",
        "Do a trust fall",
        "Sit on their lap for the next round",
        "Switch an item of clothing",
        
        // Spicy
        "Kiss on the cheek",
        "Give a lap dance for 10 seconds",
        "Lick their ear",
        "Take a body shot",
        "Play with their hair for 1 minute"
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
    currentTriviaIndex: 0,
    // Tournament state
    tournament: {
        teams: [],
        bracket: [],
        currentRound: 0,
        totalTeams: 0,
        rounds: []
    }
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
        case 'would-you-rather':
            gameContent = createWouldYouRatherGame();
            break;
        case 'most-likely-to':
            gameContent = createMostLikelyToGame();
            break;
        case 'spin-the-bottle':
            gameContent = createSpinBottleGame();
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
        <div id="playerSetup" style="display: block;">
            <h3 style="text-align: center; margin-bottom: 20px;">Add Players</h3>
            <div style="display: flex; gap: 10px; margin-bottom: 20px;">
                <input type="text" id="playerNameInput" placeholder="Enter player name" 
                    style="flex: 1; padding: 10px; background: rgba(255,255,255,0.1); 
                    border: 1px solid rgba(255,255,255,0.2); border-radius: 10px; color: white;"
                    onkeypress="if(event.key==='Enter') addPlayer()">
                <button class="btn btn-primary" onclick="addPlayer()">
                    <i class="fas fa-plus"></i> Add
                </button>
            </div>
            <div id="playersList" style="margin-bottom: 20px;"></div>
            <button class="btn btn-primary" onclick="startNeverHaveIEver()" 
                style="width: 100%; display: none;" id="startGameBtn">
                <i class="fas fa-play"></i> Start Game
            </button>
        </div>
        
        <div id="gamePlay" style="display: none;">
            <div class="question-card" id="gameQuestion">
                Ready to start!
            </div>
            <div id="drinkingPlayers" style="margin: 20px 0; text-align: center; min-height: 60px;"></div>
            <div style="text-align: center; margin: 30px 0;">
                <button class="btn btn-primary" onclick="nextNeverHaveIEver()">
                    <i class="fas fa-arrow-right"></i> Next Question
                </button>
                <button class="btn" onclick="resetToPlayerSetup()">
                    <i class="fas fa-users"></i> Change Players
                </button>
        </div>
        <div style="text-align: center; opacity: 0.7;">
            <p>Drink if you've done it! 🍻</p>
        </div>
    `;
}

function createTruthOrDareGame() {
    return `
        <div id="playerSetup" style="display: block;">
            <h3 style="text-align: center; margin-bottom: 20px;">Add Players</h3>
            <div style="display: flex; gap: 10px; margin-bottom: 20px;">
                <input type="text" id="playerNameInput" placeholder="Enter player name" 
                    style="flex: 1; padding: 10px; background: rgba(255,255,255,0.1); 
                    border: 1px solid rgba(255,255,255,0.2); border-radius: 10px; color: white;"
                    onkeypress="if(event.key==='Enter') addPlayer()">
                <button class="btn btn-primary" onclick="addPlayer()">
                    <i class="fas fa-plus"></i> Add
                </button>
            </div>
            <div id="playersList" style="margin-bottom: 20px;"></div>
            <button class="btn btn-primary" onclick="startTruthOrDare()" 
                style="width: 100%; display: none;" id="startGameBtn">
                <i class="fas fa-play"></i> Start Game
            </button>
        </div>
        
        <div id="gamePlay" style="display: none;">
            <div id="currentPlayer" style="text-align: center; font-size: 2em; margin: 20px 0; color: #00ff88;"></div>
            <div style="text-align: center; margin: 30px 0;">
                <button class="btn btn-primary" style="margin: 10px; width: 120px;" onclick="showTruth()">
                    <i class="fas fa-comment"></i> Truth
                </button>
                <button class="btn btn-danger" style="margin: 10px; width: 120px;" onclick="showDare()">
                    <i class="fas fa-fire"></i> Dare
                </button>
            </div>
            <div class="question-card" id="gameQuestion">
                Choose Truth or Dare!
            </div>
            <div style="text-align: center; margin-top: 30px;">
                <button class="btn" onclick="nextTurnTruthOrDare()" style="display: none;" id="nextTurnBtn">
                    <i class="fas fa-arrow-right"></i> Next Player
                </button>
                <button class="btn" onclick="resetToPlayerSetup()">
                    <i class="fas fa-users"></i> Change Players
                </button>
            </div>
        </div>
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
        <div style="text-align: center; margin-bottom: 20px;">
            <div style="display: inline-flex; background: rgba(255,255,255,0.1); border-radius: 30px; padding: 5px;">
                <button class="btn" id="standardRulesBtn" onclick="showBeerPongRules('standard')" 
                    style="padding: 10px 20px; border-radius: 25px; margin: 0;">
                    📜 Standard Rules
                </button>
                <button class="btn" id="creatorRulesBtn" onclick="showBeerPongRules('creator')" 
                    style="padding: 10px 20px; border-radius: 25px; margin: 0;">
                    🎯 Creator's Rules
                </button>
                <button class="btn btn-primary" id="playGameBtn" onclick="showBeerPongGame()" 
                    style="padding: 10px 20px; border-radius: 25px; margin: 0;">
                    🏓 Play Game
                </button>
                <button class="btn" id="tournamentBtn" onclick="showBeerPongTournament()" 
                    style="padding: 10px 20px; border-radius: 25px; margin: 0;">
                    🏆 Tournament
                </button>
            </div>
        </div>
        
        <div id="beerPongRules" style="display: none; max-height: 400px; overflow-y: auto; padding: 20px; 
            background: rgba(0,0,0,0.3); border-radius: 15px; margin-bottom: 20px;">
        </div>
        
        <div id="beerPongGame" style="display: block;">
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
        </div>
        
        <div id="beerPongTournament" style="display: none;">
            <div id="tournamentSetup" style="display: block;">
                <h3 style="text-align: center; margin-bottom: 20px;">🏆 Tournament Setup</h3>
                <div style="text-align: center; margin-bottom: 30px;">
                    <p style="margin-bottom: 15px;">Select number of teams:</p>
                    <div style="display: flex; justify-content: center; gap: 20px;">
                        <button class="btn btn-primary" onclick="setupTournament(4)" style="padding: 15px 30px;">
                            4 Teams
                        </button>
                        <button class="btn btn-primary" onclick="setupTournament(8)" style="padding: 15px 30px;">
                            8 Teams
                        </button>
                        <button class="btn btn-primary" onclick="setupTournament(16)" style="padding: 15px 30px;">
                            16 Teams
                        </button>
                    </div>
                </div>
            </div>
            
            <div id="teamNaming" style="display: none;">
                <h3 style="text-align: center; margin-bottom: 20px;">Name Your Teams</h3>
                <div id="teamInputs" style="max-height: 400px; overflow-y: auto; padding: 20px;">
                </div>
                <div style="text-align: center; margin-top: 20px;">
                    <button class="btn btn-primary" onclick="startTournament()" style="padding: 10px 30px;">
                        <i class="fas fa-trophy"></i> Start Tournament
                    </button>
                </div>
            </div>
            
            <div id="tournamentBracket" style="display: none;">
                <h3 style="text-align: center; margin-bottom: 20px;">
                    <span id="tournamentRoundTitle">Tournament Bracket</span>
                </h3>
                <div id="bracketDisplay" style="overflow-x: auto; padding: 20px;">
                </div>
                <div style="text-align: center; margin-top: 20px;">
                    <button class="btn" onclick="resetTournament()" style="padding: 10px 20px;">
                        <i class="fas fa-redo"></i> New Tournament
                    </button>
                </div>
            </div>
        </div>
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

function createWouldYouRatherGame() {
    return `
        <div id="playerSetup" style="display: block;">
            <h3 style="text-align: center; margin-bottom: 20px;">Add Players</h3>
            <div style="display: flex; gap: 10px; margin-bottom: 20px;">
                <input type="text" id="playerNameInput" placeholder="Enter player name" 
                    style="flex: 1; padding: 10px; background: rgba(255,255,255,0.1); 
                    border: 1px solid rgba(255,255,255,0.2); border-radius: 10px; color: white;"
                    onkeypress="if(event.key==='Enter') addPlayer()">
                <button class="btn btn-primary" onclick="addPlayer()">
                    <i class="fas fa-plus"></i> Add
                </button>
            </div>
            <div id="playersList" style="margin-bottom: 20px;"></div>
            <button class="btn btn-primary" onclick="startWouldYouRather()" 
                style="width: 100%; display: none;" id="startGameBtn">
                <i class="fas fa-play"></i> Start Game
            </button>
        </div>
        
        <div id="gamePlay" style="display: none;">
            <div class="question-card" id="gameQuestion">
                Ready to start!
            </div>
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin: 30px 0;">
                <button class="btn btn-primary" id="option1Btn" onclick="voteWouldYouRather(0)" style="padding: 20px;">
                    Option 1
                </button>
                <button class="btn btn-danger" id="option2Btn" onclick="voteWouldYouRather(1)" style="padding: 20px;">
                    Option 2
                </button>
            </div>
            <div id="voteResults" style="display: none; margin: 20px 0;"></div>
            <button class="btn" onclick="nextWouldYouRather()" style="display: none;" id="nextQuestionBtn">
                <i class="fas fa-arrow-right"></i> Next Question
            </button>
        </div>
    `;
}

function createMostLikelyToGame() {
    return `
        <div id="playerSetup" style="display: block;">
            <h3 style="text-align: center; margin-bottom: 20px;">Add Players</h3>
            <div style="display: flex; gap: 10px; margin-bottom: 20px;">
                <input type="text" id="playerNameInput" placeholder="Enter player name" 
                    style="flex: 1; padding: 10px; background: rgba(255,255,255,0.1); 
                    border: 1px solid rgba(255,255,255,0.2); border-radius: 10px; color: white;"
                    onkeypress="if(event.key==='Enter') addPlayer()">
                <button class="btn btn-primary" onclick="addPlayer()">
                    <i class="fas fa-plus"></i> Add
                </button>
            </div>
            <div id="playersList" style="margin-bottom: 20px;"></div>
            <button class="btn btn-primary" onclick="startMostLikelyTo()" 
                style="width: 100%; display: none;" id="startGameBtn">
                <i class="fas fa-play"></i> Start Game
            </button>
        </div>
        
        <div id="gamePlay" style="display: none;">
            <div class="question-card" id="gameQuestion">
                Ready to start!
            </div>
            <div style="text-align: center; margin: 30px 0;">
                <h3>Count to 3, then everyone point!</h3>
                <button class="btn btn-primary" onclick="showVotes()">
                    <i class="fas fa-eye"></i> Show Who Got Most Votes
                </button>
                <button class="btn" onclick="nextMostLikelyTo()">
                    <i class="fas fa-arrow-right"></i> Next Question
                </button>
            </div>
            <div id="votingPlayers" style="margin: 20px 0;"></div>
        </div>
    `;
}

function createSpinBottleGame() {
    return `
        <div id="playerSetup" style="display: block;">
            <h3 style="text-align: center; margin-bottom: 20px;">Add Players</h3>
            <div style="display: flex; gap: 10px; margin-bottom: 20px;">
                <input type="text" id="playerNameInput" placeholder="Enter player name" 
                    style="flex: 1; padding: 10px; background: rgba(255,255,255,0.1); 
                    border: 1px solid rgba(255,255,255,0.2); border-radius: 10px; color: white;"
                    onkeypress="if(event.key==='Enter') addPlayer()">
                <button class="btn btn-primary" onclick="addPlayer()">
                    <i class="fas fa-plus"></i> Add
                </button>
            </div>
            <div id="playersList" style="margin-bottom: 20px;"></div>
            <button class="btn btn-primary" onclick="startSpinBottle()" 
                style="width: 100%; display: none;" id="startGameBtn">
                <i class="fas fa-play"></i> Start Game
            </button>
        </div>
        
        <div id="gamePlay" style="display: none;">
            <div style="text-align: center;">
                <div id="bottleContainer" style="font-size: 6em; margin: 20px 0; position: relative;">
                    🍾
                </div>
                <button class="btn btn-primary" onclick="spinBottle()">
                    <i class="fas fa-sync"></i> Spin the Bottle
                </button>
            </div>
            <div id="spinResult" style="margin: 30px 0; text-align: center;"></div>
            <div class="question-card" id="gameTask" style="display: none;">
                Task will appear here
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

// Truth or Dare functions are defined later with player management

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
        'trivia': '🧠 HSG Trivia',
        'would-you-rather': '🤔 Would You Rather',
        'most-likely-to': '👉 Most Likely To',
        'spin-the-bottle': '🍾 Spin the Bottle'
    };
    return titles[gameType] || 'Party Game';
}

// ========================================
// PLAYER MANAGEMENT
// ========================================
export function addPlayer() {
    const input = document.getElementById('playerNameInput');
    const name = input.value.trim();
    
    if (!name) {
        showNotification('Please enter a player name', 'error');
        return;
    }
    
    if (gamePlayers.find(p => p.name.toLowerCase() === name.toLowerCase())) {
        showNotification('Player already added', 'error');
        return;
    }
    
    gamePlayers.push({
        name: name,
        drinks: 0,
        score: 0
    });
    
    input.value = '';
    updatePlayersList();
    
    if (gamePlayers.length >= 2) {
        document.getElementById('startGameBtn').style.display = 'block';
    }
}

export function removePlayer(index) {
    gamePlayers.splice(index, 1);
    updatePlayersList();
    
    if (gamePlayers.length < 2) {
        document.getElementById('startGameBtn').style.display = 'none';
    }
}

function updatePlayersList() {
    const list = document.getElementById('playersList');
    if (!list) return;
    
    list.innerHTML = gamePlayers.map((player, index) => `
        <div style="display: flex; align-items: center; justify-content: space-between; 
            padding: 10px; margin: 5px 0; background: rgba(255,255,255,0.1); 
            border-radius: 10px;">
            <span>${player.name}</span>
            <button class="btn btn-danger" onclick="removePlayer(${index})" 
                style="padding: 5px 10px; font-size: 0.9em;">
                <i class="fas fa-times"></i>
            </button>
        </div>
    `).join('');
}

export function resetToPlayerSetup() {
    document.getElementById('playerSetup').style.display = 'block';
    document.getElementById('gamePlay').style.display = 'none';
    currentPlayerIndex = 0;
}

// Never Have I Ever functions
export function startNeverHaveIEver() {
    if (gamePlayers.length < 2) {
        showNotification('Add at least 2 players', 'error');
        return;
    }
    
    document.getElementById('playerSetup').style.display = 'none';
    document.getElementById('gamePlay').style.display = 'block';
    gameHistory = [];
}

// Truth or Dare functions
export function startTruthOrDare() {
    if (gamePlayers.length < 2) {
        showNotification('Add at least 2 players', 'error');
        return;
    }
    
    document.getElementById('playerSetup').style.display = 'none';
    document.getElementById('gamePlay').style.display = 'block';
    currentPlayerIndex = 0;
    updateCurrentPlayer();
}

function updateCurrentPlayer() {
    const currentPlayer = gamePlayers[currentPlayerIndex];
    document.getElementById('currentPlayer').textContent = `${currentPlayer.name}'s Turn`;
}

export function nextTurnTruthOrDare() {
    currentPlayerIndex = (currentPlayerIndex + 1) % gamePlayers.length;
    updateCurrentPlayer();
    document.getElementById('gameQuestion').textContent = 'Choose Truth or Dare!';
    document.getElementById('nextTurnBtn').style.display = 'none';
}

// Update existing functions to show next turn button
export function showTruth() {
    const truths = gameData.truths;
    const truth = truths[Math.floor(Math.random() * truths.length)];
    document.getElementById('gameQuestion').textContent = truth;
    document.getElementById('nextTurnBtn').style.display = 'inline-block';
}

export function showDare() {
    const dares = gameData.dares;
    const dare = dares[Math.floor(Math.random() * dares.length)];
    document.getElementById('gameQuestion').textContent = dare;
    document.getElementById('nextTurnBtn').style.display = 'inline-block';
}

// Would You Rather functions
export function startWouldYouRather() {
    if (gamePlayers.length < 2) {
        showNotification('Add at least 2 players', 'error');
        return;
    }
    
    document.getElementById('playerSetup').style.display = 'none';
    document.getElementById('gamePlay').style.display = 'block';
    gameHistory = [];
    nextWouldYouRather();
}

let currentWouldYouRatherVotes = { 0: [], 1: [] };

export function nextWouldYouRather() {
    const questions = gameData.wouldYouRather;
    const question = questions[Math.floor(Math.random() * questions.length)];
    
    // Split the question
    const parts = question.split(' or ');
    const option1 = parts[0].replace('Would you rather ', '');
    const option2 = parts[1] || parts[0];
    
    document.getElementById('gameQuestion').textContent = question;
    document.getElementById('option1Btn').textContent = option1;
    document.getElementById('option2Btn').textContent = option2;
    
    // Reset votes
    currentWouldYouRatherVotes = { 0: [], 1: [] };
    document.getElementById('voteResults').style.display = 'none';
    document.getElementById('nextQuestionBtn').style.display = 'none';
    
    // Enable voting buttons
    document.getElementById('option1Btn').disabled = false;
    document.getElementById('option2Btn').disabled = false;
}

export function voteWouldYouRather(option) {
    // In a real multiplayer game, each player would vote
    // For now, show results after one vote
    document.getElementById('option1Btn').disabled = true;
    document.getElementById('option2Btn').disabled = true;
    
    // Show results
    const resultsDiv = document.getElementById('voteResults');
    resultsDiv.innerHTML = `
        <h3>Minority drinks! 🍺</h3>
        <p>In a real game, everyone votes and the minority drinks!</p>
    `;
    resultsDiv.style.display = 'block';
    document.getElementById('nextQuestionBtn').style.display = 'inline-block';
}

// Most Likely To functions
export function startMostLikelyTo() {
    if (gamePlayers.length < 3) {
        showNotification('Add at least 3 players', 'error');
        return;
    }
    
    document.getElementById('playerSetup').style.display = 'none';
    document.getElementById('gamePlay').style.display = 'block';
    nextMostLikelyTo();
}

export function nextMostLikelyTo() {
    const questions = gameData.mostLikelyTo;
    const question = questions[Math.floor(Math.random() * questions.length)];
    
    document.getElementById('gameQuestion').textContent = question;
    
    // Show all players as voting options
    const votingDiv = document.getElementById('votingPlayers');
    votingDiv.innerHTML = `
        <h4>Players in the game:</h4>
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 10px;">
            ${gamePlayers.map(p => `
                <div style="padding: 10px; background: rgba(255,255,255,0.1); 
                    border-radius: 10px; text-align: center;">
                    ${p.name}
                </div>
            `).join('')}
        </div>
    `;
}

export function showVotes() {
    showNotification('Person with most votes drinks! 🍻', 'info');
}

// Spin the Bottle functions
export function startSpinBottle() {
    if (gamePlayers.length < 3) {
        showNotification('Add at least 3 players', 'error');
        return;
    }
    
    document.getElementById('playerSetup').style.display = 'none';
    document.getElementById('gamePlay').style.display = 'block';
    currentPlayerIndex = 0;
}

export function spinBottle() {
    const bottle = document.getElementById('bottleContainer');
    const spinner = gamePlayers[currentPlayerIndex];
    const otherPlayers = gamePlayers.filter((_, i) => i !== currentPlayerIndex);
    const target = otherPlayers[Math.floor(Math.random() * otherPlayers.length)];
    
    // Animate bottle spin
    bottle.style.transition = 'transform 2s ease-out';
    bottle.style.transform = `rotate(${720 + Math.random() * 360}deg)`;
    
    setTimeout(() => {
        // Show result
        document.getElementById('spinResult').innerHTML = `
            <h3>${spinner.name} → ${target.name}</h3>
        `;
        
        // Show random task
        const tasks = gameData.spinBottleTasks;
        const task = tasks[Math.floor(Math.random() * tasks.length)];
        
        document.getElementById('gameTask').textContent = task;
        document.getElementById('gameTask').style.display = 'block';
        
        // Next player's turn
        currentPlayerIndex = (currentPlayerIndex + 1) % gamePlayers.length;
        
        // Reset bottle
        setTimeout(() => {
            bottle.style.transition = 'none';
            bottle.style.transform = 'rotate(0deg)';
        }, 100);
    }, 2000);
}

// ========================================
// BEER PONG RULES FUNCTIONS
// ========================================
export function showBeerPongRules(type) {
    const rulesDiv = document.getElementById('beerPongRules');
    const gameDiv = document.getElementById('beerPongGame');
    const tournamentDiv = document.getElementById('beerPongTournament');
    const rules = gameData.beerPongRules[type];
    
    // Update button styles
    document.getElementById('standardRulesBtn').classList.remove('btn-primary');
    document.getElementById('creatorRulesBtn').classList.remove('btn-primary');
    document.getElementById('playGameBtn').classList.remove('btn-primary');
    document.getElementById('tournamentBtn').classList.remove('btn-primary');
    
    document.getElementById(`${type}RulesBtn`).classList.add('btn-primary');
    
    // Hide others, show rules
    gameDiv.style.display = 'none';
    tournamentDiv.style.display = 'none';
    rulesDiv.style.display = 'block';
    
    // Display rules with fun animations
    rulesDiv.innerHTML = `
        <h2 style="text-align: center; margin-bottom: 10px;">${rules.title}</h2>
        <p style="text-align: center; opacity: 0.8; margin-bottom: 20px;">${rules.description}</p>
        <div style="display: grid; gap: 15px;">
            ${rules.rules.map((rule, index) => `
                <div class="rule-item" style="background: rgba(255,255,255,0.05); padding: 15px; 
                    border-radius: 10px; border-left: 3px solid ${type === 'creator' ? '#00ff88' : '#00d4ff'};
                    animation: slideIn 0.3s ease-out ${index * 0.05}s both;">
                    <div style="font-weight: bold; font-size: 1.1em; margin-bottom: 5px;">
                        ${rule.name}
                    </div>
                    <div style="opacity: 0.9; line-height: 1.4;">
                        ${rule.desc}
                    </div>
                </div>
            `).join('')}
        </div>
        <style>
            @keyframes slideIn {
                from {
                    opacity: 0;
                    transform: translateX(-20px);
                }
                to {
                    opacity: 1;
                    transform: translateX(0);
                }
            }
        </style>
    `;
    
    if (confetti && type === 'creator') {
        confetti({
            particleCount: 50,
            spread: 60,
            origin: { y: 0.2 },
            colors: ['#00ff88', '#00d4ff', '#ff0088']
        });
    }
}

export function showBeerPongGame() {
    const rulesDiv = document.getElementById('beerPongRules');
    const gameDiv = document.getElementById('beerPongGame');
    const tournamentDiv = document.getElementById('beerPongTournament');
    
    // Update button styles
    document.getElementById('standardRulesBtn').classList.remove('btn-primary');
    document.getElementById('creatorRulesBtn').classList.remove('btn-primary');
    document.getElementById('playGameBtn').classList.add('btn-primary');
    document.getElementById('tournamentBtn').classList.remove('btn-primary');
    
    // Hide others, show game
    rulesDiv.style.display = 'none';
    tournamentDiv.style.display = 'none';
    gameDiv.style.display = 'block';
}

// ========================================
// BEER PONG TOURNAMENT FUNCTIONS
// ========================================
export function showBeerPongTournament() {
    const rulesDiv = document.getElementById('beerPongRules');
    const gameDiv = document.getElementById('beerPongGame');
    const tournamentDiv = document.getElementById('beerPongTournament');
    
    // Update button styles
    document.getElementById('standardRulesBtn').classList.remove('btn-primary');
    document.getElementById('creatorRulesBtn').classList.remove('btn-primary');
    document.getElementById('playGameBtn').classList.remove('btn-primary');
    document.getElementById('tournamentBtn').classList.add('btn-primary');
    
    // Hide others, show tournament
    rulesDiv.style.display = 'none';
    gameDiv.style.display = 'none';
    tournamentDiv.style.display = 'block';
    
    // Reset to setup screen
    document.getElementById('tournamentSetup').style.display = 'block';
    document.getElementById('teamNaming').style.display = 'none';
    document.getElementById('tournamentBracket').style.display = 'none';
}

export function setupTournament(numTeams) {
    gameState.tournament.totalTeams = numTeams;
    gameState.tournament.teams = [];
    gameState.tournament.bracket = [];
    gameState.tournament.currentRound = 0;
    
    // Show team naming screen
    document.getElementById('tournamentSetup').style.display = 'none';
    document.getElementById('teamNaming').style.display = 'block';
    
    // Create team input fields
    const teamInputsDiv = document.getElementById('teamInputs');
    teamInputsDiv.innerHTML = '';
    
    for (let i = 1; i <= numTeams; i++) {
        teamInputsDiv.innerHTML += `
            <div style="margin-bottom: 15px;">
                <label style="display: inline-block; width: 100px;">Team ${i}:</label>
                <input type="text" id="team${i}Name" placeholder="Enter team name" 
                    style="padding: 10px; background: rgba(255,255,255,0.1); 
                    border: 1px solid rgba(255,255,255,0.2); border-radius: 10px; 
                    color: white; width: 250px;" value="Team ${i}">
            </div>
        `;
    }
    
    if (confetti) {
        confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 },
            colors: ['#FFD700', '#FFA500', '#FF6347']
        });
    }
}

export function startTournament() {
    const numTeams = gameState.tournament.totalTeams;
    gameState.tournament.teams = [];
    
    // Collect team names
    for (let i = 1; i <= numTeams; i++) {
        const teamName = document.getElementById(`team${i}Name`).value.trim() || `Team ${i}`;
        gameState.tournament.teams.push({
            id: i,
            name: teamName,
            eliminated: false
        });
    }
    
    // Create initial bracket
    createTournamentBracket();
    
    // Show bracket screen
    document.getElementById('teamNaming').style.display = 'none';
    document.getElementById('tournamentBracket').style.display = 'block';
    
    // Display the bracket
    displayTournamentBracket();
}

function createTournamentBracket() {
    const teams = [...gameState.tournament.teams];
    const rounds = [];
    let currentRoundMatches = [];
    
    // Create first round matches
    for (let i = 0; i < teams.length; i += 2) {
        currentRoundMatches.push({
            team1: teams[i],
            team2: teams[i + 1],
            winner: null,
            matchId: `R1M${Math.floor(i/2) + 1}`
        });
    }
    rounds.push(currentRoundMatches);
    
    // Calculate subsequent rounds
    let roundNumber = 2;
    while (currentRoundMatches.length > 1) {
        const nextRoundMatches = [];
        for (let i = 0; i < currentRoundMatches.length; i += 2) {
            nextRoundMatches.push({
                team1: null, // Will be filled by winner
                team2: null, // Will be filled by winner
                winner: null,
                matchId: `R${roundNumber}M${Math.floor(i/2) + 1}`,
                previousMatch1: currentRoundMatches[i].matchId,
                previousMatch2: currentRoundMatches[i + 1] ? currentRoundMatches[i + 1].matchId : null
            });
        }
        rounds.push(nextRoundMatches);
        currentRoundMatches = nextRoundMatches;
        roundNumber++;
    }
    
    gameState.tournament.rounds = rounds;
}

function displayTournamentBracket() {
    const bracketDiv = document.getElementById('bracketDisplay');
    const rounds = gameState.tournament.rounds;
    
    // Create responsive bracket display
    let bracketHTML = '<div style="display: flex; gap: 50px; align-items: center; min-width: max-content;">';
    
    rounds.forEach((round, roundIndex) => {
        const roundName = getRoundName(roundIndex, rounds.length);
        bracketHTML += `
            <div style="flex-shrink: 0;">
                <h4 style="text-align: center; margin-bottom: 20px; color: #00ff88;">${roundName}</h4>
                <div style="display: flex; flex-direction: column; gap: ${30 * (roundIndex + 1)}px;">
        `;
        
        round.forEach(match => {
            const team1Name = match.team1 ? match.team1.name : 'TBD';
            const team2Name = match.team2 ? match.team2.name : 'TBD';
            const canSelectWinner = match.team1 && match.team2 && !match.winner;
            
            bracketHTML += `
                <div style="background: rgba(255,255,255,0.1); padding: 15px; border-radius: 10px;
                    border: 2px solid ${match.winner ? '#00ff88' : 'rgba(255,255,255,0.2)'};">
                    <div style="margin-bottom: 10px;">
                        <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 5px;">
                            <span style="${match.winner === match.team1 ? 'color: #00ff88; font-weight: bold;' : ''}">${team1Name}</span>
                            ${canSelectWinner ? `<button class="btn btn-sm" onclick="selectWinner('${match.matchId}', 1)" style="padding: 5px 10px;">Win</button>` : ''}
                        </div>
                        <div style="display: flex; align-items: center; justify-content: space-between;">
                            <span style="${match.winner === match.team2 ? 'color: #00ff88; font-weight: bold;' : ''}">${team2Name}</span>
                            ${canSelectWinner ? `<button class="btn btn-sm" onclick="selectWinner('${match.matchId}', 2)" style="padding: 5px 10px;">Win</button>` : ''}
                        </div>
                    </div>
                    ${match.winner ? `<div style="text-align: center; font-size: 0.9em; color: #00ff88;">Winner: ${match.winner.name}</div>` : ''}
                </div>
            `;
        });
        
        bracketHTML += '</div></div>';
    });
    
    bracketHTML += '</div>';
    bracketDiv.innerHTML = bracketHTML;
    
    // Update round title
    updateRoundTitle();
}

function getRoundName(roundIndex, totalRounds) {
    if (roundIndex === totalRounds - 1) return '🏆 FINAL';
    if (roundIndex === totalRounds - 2) return '🥈 Semi-Finals';
    if (roundIndex === totalRounds - 3) return '🥉 Quarter-Finals';
    return `Round ${roundIndex + 1}`;
}

export function selectWinner(matchId, teamNumber) {
    const rounds = gameState.tournament.rounds;
    
    // Find the match
    for (let roundIndex = 0; roundIndex < rounds.length; roundIndex++) {
        const match = rounds[roundIndex].find(m => m.matchId === matchId);
        if (match) {
            // Set winner
            match.winner = teamNumber === 1 ? match.team1 : match.team2;
            
            // Advance winner to next round
            if (roundIndex < rounds.length - 1) {
                const nextRound = rounds[roundIndex + 1];
                const nextMatch = nextRound.find(m => 
                    m.previousMatch1 === matchId || m.previousMatch2 === matchId
                );
                
                if (nextMatch) {
                    if (nextMatch.previousMatch1 === matchId) {
                        nextMatch.team1 = match.winner;
                    } else {
                        nextMatch.team2 = match.winner;
                    }
                }
            }
            
            // Check if tournament is complete
            if (roundIndex === rounds.length - 1) {
                // Final match completed!
                showTournamentWinner(match.winner);
            }
            
            break;
        }
    }
    
    // Redisplay bracket
    displayTournamentBracket();
}

function showTournamentWinner(winner) {
    const bracketDiv = document.getElementById('bracketDisplay');
    
    // Epic winner announcement
    bracketDiv.innerHTML = `
        <div style="text-align: center; padding: 50px;">
            <div style="font-size: 6em; margin-bottom: 20px;">🏆</div>
            <h1 style="font-size: 3em; color: #FFD700; margin-bottom: 20px;">CHAMPIONS!</h1>
            <h2 style="font-size: 2em; color: #00ff88;">${winner.name}</h2>
            <p style="font-size: 1.2em; margin-top: 30px; opacity: 0.8;">
                Congratulations on winning the Beer Pong Tournament!
            </p>
        </div>
    `;
    
    // Epic confetti
    if (confetti) {
        // Multiple bursts for epic effect
        const colors = ['#FFD700', '#FFA500', '#FF6347', '#00ff88', '#00d4ff'];
        
        for (let i = 0; i < 5; i++) {
            setTimeout(() => {
                confetti({
                    particleCount: 150,
                    spread: 100,
                    origin: { x: Math.random(), y: Math.random() * 0.5 },
                    colors: colors
                });
            }, i * 200);
        }
    }
}

function updateRoundTitle() {
    const rounds = gameState.tournament.rounds;
    let currentRoundIndex = 0;
    
    // Find current round (first round with incomplete matches)
    for (let i = 0; i < rounds.length; i++) {
        if (rounds[i].some(match => match.team1 && match.team2 && !match.winner)) {
            currentRoundIndex = i;
            break;
        }
    }
    
    const roundName = getRoundName(currentRoundIndex, rounds.length);
    document.getElementById('tournamentRoundTitle').textContent = `${roundName} - Beer Pong Tournament`;
}

export function resetTournament() {
    gameState.tournament = {
        teams: [],
        bracket: [],
        currentRound: 0,
        totalTeams: 0,
        rounds: []
    };
    
    showBeerPongTournament();
}