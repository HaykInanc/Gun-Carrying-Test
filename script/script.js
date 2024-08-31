function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function loadQuestion() {
    const randomIndex = Math.floor(Math.random() * QUESTIONS.length);
    const question = QUESTIONS[randomIndex];

    document.getElementById('question').textContent = question.question;
    const answersContainer = document.getElementById('answers');
    answersContainer.innerHTML = '';

    // Save the index of the correct answer
    const correctAnswer = question.answers[0];
    const shuffledAnswers = [...question.answers];
    shuffleArray(shuffledAnswers);

    // Map each shuffled answer to its original index
    const answerMap = new Map(shuffledAnswers.map((answer, index) => [answer, index]));

    // Display the shuffled answers
    shuffledAnswers.forEach((answer, index) => {
        const button = document.createElement('button');
        button.textContent = answer;
        button.className = 'btn btn-outline-primary answer-button';
        button.onclick = () => checkAnswer(index, button, answerMap, correctAnswer);
        answersContainer.appendChild(button);
    });

    document.getElementById('result').classList.add('d-none');
}

function checkAnswer(selectedIndex, selectedButton, answerMap, correctAnswer) {
    const question = QUESTIONS.find(q => q.question === document.getElementById('question').textContent);

    const correctAnswerIndex = answerMap.get(correctAnswer);

    const answerButtons = document.querySelectorAll('.answer-button');
    answerButtons.forEach(button => button.classList.remove('selected'));
    selectedButton.classList.add('selected');

    answerButtons[correctAnswerIndex].classList.add('correct');

    if (selectedIndex === correctAnswerIndex) {
        document.getElementById('result-message').textContent = 'Ճիշտ պատասխան!';
    } else {
        document.getElementById('result-message').textContent = 'Սխալ պատասխան! Ճիշտ պատասխան՝: ' + correctAnswer;
    }
    document.getElementById('result').classList.remove('d-none');
}

window.onload = loadQuestion;
