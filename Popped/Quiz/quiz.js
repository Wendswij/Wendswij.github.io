// Burger Button --------------------------------------------------------
function toggleMenu() {
    let menu = document.getElementById("sideMenu");
    let main = document.getElementById("main");

    if (menu.style.width === "250px") {
        menu.style.width = "0";
        main.style.marginLeft = "0";
    } else {
        menu.style.width = "250px";
        main.style.marginLeft = "250px";
    }
}

window.onclick = function(event) {
    let menu = document.getElementById("sideMenu");
    if (event.target !== menu && !menu.contains(event.target) && event.target.className !== "hamburger") {
        menu.style.width = "0";
        document.getElementById("main").style.marginLeft = "0";
    }
};
// End of Burger Button --------------------------------------------------------

// Quiz questions
const questions = [
    {
        question: "What best describes your approach to life?",
        options: [
            { answer: "A quiet observer, finding beauty in small moments", character: "Nyota, HIRONO, Smiski" },
            { answer: "A bold explorer, always seeking new adventures", character: "Azura, LuLu the Piggy" },
            { answer: "A daydreamer lost in a world of imagination", character: "DIMOO, Pucky, Smiski" },
            { answer: "A rebel who challenges expectations", character: "Peach Riot, SKULLPANDA" },
            { answer: "A playful spirit who finds joy in the simplest things", character: "Sweet Bean, Azukisan, Smiski" },
        ],
    },

    {
        question: "How do you deal with emotions?",
        options: [
            { answer: "I embrace them fully, even the sad ones", character: "CRYBABY, Azura" },
            { answer: "I turn them into something creative or expressive", character: "MOLLY, Peach Riot" },
            { answer: "I keep them to myself, but they shape who I am", character: "HIRONO, SKULLPANDA, Smiski" },
            { answer: "I don’t think too much—I just enjoy the moment", character: "Sweet Bean, LuLu the Piggy" },
            { answer: "I reflect on them quietly, letting time guide me", character: "Nyota, DIMOO, Smiski" },
        ],
    },

    {
        question: "Which of these feels like home to you?",
        options: [
            { answer: "A cozy corner filled with books, soft lights, and warm tea", character: "Nyota, HIRONO" },
            { answer: "A dreamy landscape where anything is possible", character: "DIMOO, PUCKY" },
            { answer: "A buzzing city full of energy and excitement", character: "MOLLY, KUBO" },
            { answer: "A neon-lit underground club where the music never stops", character: "Peach Riot, SKULLPANDA" },
            { answer: "A whimsical candy land where every day feels like a celebration", character: "PINO JELLY, LuLu the Piggy" },
        ],
    },

    {
        question: "Which aesthetic best represents you?",
        options: [
            { answer: "Dark, mysterious, and slightly edgy", character: "SKULLPANDA, HIRONO" },
            { answer: "Soft pastels and dreamy vibes", character: "DIMOO, PUCKY, CRYBABY" },
            { answer: "Colorful and playful, like a pop of candy", character: "Sweet Bean, LuLu the Piggy, PINO JELLY" },
            { answer: "Minimalist, clean, and peaceful", character: "Nyota, Chaka" },
            { answer: "Retro, grunge, or punk-inspired", character: "Peach Riot, KUBO" },
        ],
    },

    {
        question: "Which of these hobbies resonates with you the most?",
        options: [
            { answer: "Listening to music and getting lost in the sound", character: "Peach Riot, PINO JELLY" },
            { answer: "Sketching or writing to express your thoughts", character: "HIRONO, MOLLY" },
            { answer: "Exploring nature and finding hidden gems", character: "Azura, PUCKY" },
            { answer: "Trying new fashion styles and changing up your look", character: "SKULLPANDA, KUBO" },
            { answer: "Caring for pets or enjoying quiet moments with animals", character: "Azukisan, Nyota, Wuhuang & Bazahey" },
        ],
    },

    {
        question: "How do you react to challenges?",
        options: [
            { answer: "I face them head-on with confidence", character: "MOLLY, KUBO" },
            { answer: "I take my time and find a creative solution", character: "DIMOO, PUCKY" },
            { answer: "I reflect deeply before making a move", character: "HIRONO, Nyota" },
            { answer: "I push through with rebellious energy", character: "Peach Riot, SKULLPANDA" },
            { answer: "I adapt and go with the flow", character: "Chaka, PINO JELLY" },
        ],
    },

    {
        question: "How do you express yourself the most?",
        options: [
            { answer: "Through deep emotions, even the ones I hide", character: "CRYBABY, Azura, HIRONO" },
            { answer: "By creating something new and imaginative", character: "DIMOO, PUCKY, MOLLY" },
            { answer: "Through my unique sense of fashion and style", character: "SKULLPANDA, KUBO, Peach Riot" },
            { answer: "Through humour and spontaneous adventures", character: "LuLu the Piggy, Sweet Bean, Azukisan" },
            { answer: "By staying mysterious and letting actions speak", character: "Chaka, Nyota, Wuhuang & Bazahey" },
        ],
    },

    {
        question: "How do you want people to remember you?",
        options: [
            { answer: "As someone who was never afraid to feel deeply", character: "CRYBABY, Azura, HIRONO" },
            { answer: "As the dreamer who never stopped imagining", character: "DIMOO, PUCKY" },
            { answer: "As someone who stood out from the crowd with confidence", character: "MOLLY, SKULLPANDA, KUBO" },
            { answer: "As the one who always made life fun and exciting", character: "LuLu the Piggy, Peach Riot, Sweet Bean" },
            { answer: "As a mysterious enigma, forever intriguing", character: "Chaka, Wuhuang & Bazahey" },
        ],
    },
    
    {
        question: "If you had to choose a signature accessory, what would it be?",
        options: [
            { answer: "A soft, flowy piece that reflects my emotions", character: "CRYBABY, Azura, Nyota" },
            { answer: "A pair of bold statement sunglasses", character: "MOLLY, KUBO" },
            { answer: "A collection of rings and edgy jewelry", character: "SKULLPANDA, Peach Riot" },
            { answer: "A cute, quirky bag filled with unexpected surprises", character: "PUCKY, Sweet Bean, LuLu the Piggy" },
            { answer: "Something subtle that glows under the right light", character: "Chaka, DIMOO, PINO JELLY" },
        ],
    },

    {
        question: "What kind of energy do you bring to a group?",
        options: [
            { answer: "The gentle, introspective one who listens more than they talk", character: "Nyota, HIRONO" },
            { answer: "The fun, chaotic one who keeps everyone entertained", character: "LuLu the Piggy, Peach Riot, Sweet Bean" },
            { answer: "The stylish one who always knows the latest trends", character: "MOLLY, SKULLPANDA, KUBO" },
            { answer: "The deep thinker who sees beauty in everything", character: "CRYBABY, Azura, DIMOO" },
            { answer: "The mysterious one who’s always full of surprises", character: "Chaka, Wuhuang & Bazahey" },
        ],
    },
];
// End of Quiz question


let currentQuestion = 0;
let answers = {};
const quizContainer = document.getElementById("quiz-container");

function showQuestion() {
    if (currentQuestion >= questions.length) {
        showResult();
        return;
    }
    const questionData = questions[currentQuestion];

    // Create question
    let questionHTML = `<h2>${questionData.question}</h2>`;

    // Loop through options & add buttons
    questionData.options.forEach(option => {
        // Pass the characters as an array instead of JSON.stringify
        questionHTML += `<button onclick='handleAnswer(${JSON.stringify(option.character.split(", "))})'>${option.answer}</button>`;
    });

    // Insert into container
    quizContainer.innerHTML = questionHTML;
}

function handleAnswer(characterList) {
    // Ensure `characterList` is an array and count each character separately
    characterList.forEach(character => {
        answers[character] = (answers[character] || 0) + 1;
    });

    // Move to the next question
    currentQuestion++;
    showQuestion();
}

// Character-to-image mapping
const characterImages = {
    "PUCKY": "Figure/figure-pucky.png",
    "Nyota": "Figure/figure-nyota.png",
    "HIRONO": "Figure/figure-hirono.png",
    "CRYBABY": "Figure/figure-crybaby.png",
    "PINO JELLY": "Figure/figure-pinojelly.png",
    "SKULLPANDA": "Figure/figure-skullpanda.png",
    "Peach Riot": "Figure/figure-peachriot.png",
    "Sweet Bean": "Figure/figure-sweetbean.png",
    "Chaka": "Figure/figure-chaka.png",
    "DIMOO": "Figure/figure-dimoo.png",
    "KUBO": "Figure/figure-kubo.png",
    "MOLLY": "Figure/figure-molly.png",
    "Labubu": "Figure/figure-labubu.png",
    "Azura": "Figure/figure-azura.png",
    "LuLu the Piggy": "Figure/figure-lulu.png",
    "Azukisan": "Figure/figure-azukisan.png",
    "Wuhuang & Bazahey": "Figure/figure-wb.png",
    "Smiski": "Figure/figure-smiski.png",
};

function showResult() {
    // Find the highest score(s)
    let maxCount = Math.max(...Object.values(answers));
    let topCharacters = Object.keys(answers).filter(character => answers[character] === maxCount);

    // Pick one randomly in case of a tie
    let resultCharacter = topCharacters[Math.floor(Math.random() * topCharacters.length)];

    // Get the corresponding image or use a default
    const characterImage = characterImages[resultCharacter] || "images/default.png";

    // Display the result with image
    quizContainer.innerHTML = `
        <h2>Looks like you are... ${resultCharacter}!!!</h2>
        <img src="${characterImage}" alt="${resultCharacter}" style="max-width: 100%; height: auto; border-radius: 10px; margin-top: 10px;">
    `;
}

// Start the quiz
showQuestion();
