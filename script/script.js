function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function loadQuestions() {
    const shuffledQuestions = QUESTIONS.sort(() => 0.5 - Math.random()).slice(0, 10);
    const container = document.getElementById('questions-container');
    container.innerHTML = '';

    shuffledQuestions.forEach((question, index) => {
        const shuffledAnswers = [...question.answers];
        shuffleArray(shuffledAnswers); // Перемешиваем ответы

        const questionElement = document.createElement('div');
        questionElement.className = 'question-block';
        questionElement.innerHTML = `
            <h5>${index + 1}. ${question.question}</h5>
            ${shuffledAnswers.map((answer, i) => `
                <label class="answer-label">
                    <input name="question${index}" type="radio" value="${answer}" />
                    <p>${answer}</p>
                </label>
            `).join('')}
        `;
        container.appendChild(questionElement);
    });
}



function disableInputs() {
    const inputs = document.querySelectorAll('input[type="radio"]');
    inputs.forEach(input => {
        input.disabled = true;
    });
}



function checkResults() {
    const questions = document.querySelectorAll('.question-block');
    let correctCount = 0;

    questions.forEach((question, index) => {
        const selectedAnswer = question.querySelector('input[type="radio"]:checked');
        const correctAnswer = QUESTIONS[index].answers[0]; // Предполагается, что правильный ответ первый в массиве

        if (selectedAnswer) {
            const selectedLabel = selectedAnswer.closest('.answer-label');
            
            if (selectedAnswer.value === correctAnswer) {
                selectedLabel.classList.add('correct');
                correctCount++;
            } else {
                selectedLabel.classList.add('incorrect');
                // Отметить правильный ответ
                question.querySelectorAll('.answer-label').forEach(label => {
                    if (label.querySelector('input[type="radio"]').value === correctAnswer) {
                        label.classList.add('correct');
                    }
                });
            }
        } else {
            // Если пользователь не выбрал ответ, отметим правильный
            question.querySelectorAll('.answer-label').forEach(label => {
                if (label.querySelector('input[type="radio"]').value === correctAnswer) {
                    label.classList.add('correct');
                }
            });
        }
    });

    const resultMessage = correctCount >= 8 
    ? `Շնորհավորում ենք! Դուք անցաք թեստը՝ ${correctCount} ճիշտ պատասխանով 10-ից։`
    : `Ցավոք, դուք չանցաք։ Դուք ստացաք ${correctCount} ճիշտ պատասխան 10-ից։ Փորձեք կրկին։`;

    disableInputs();

    document.querySelector('.result-message').innerHTML = resultMessage;
}

// Запуск функции при загрузке страницы
window.onload = loadQuestions;
