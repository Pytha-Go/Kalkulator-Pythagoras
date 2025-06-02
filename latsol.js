document.addEventListener('DOMContentLoaded', function() {
    const questions = [
        { id: 'q1', answer: 'a' }, // Jawaban: 10 cm (sqrt(6^2 + 8^2) = sqrt(36+64) = sqrt(100) = 10)
        { id: 'q2', answer: 'c' }, // Jawaban: 12 cm (sqrt(15^2 - 9^2) = sqrt(225 - 81) = sqrt(144) = 12)
        { id: 'q3', answer: 'c' }, // Jawaban: 8 meter (sqrt(10^2 - 6^2) = sqrt(100 - 36) = sqrt(64) = 8)
        { id: 'q4', answer: 'a' }, // Jawaban: 15 km (sqrt(9^2 + 12^2) = sqrt(81 + 144) = sqrt(225) = 15)
        { id: 'q5', answer: 'b' }, // Jawaban: 36 inci (sqrt(60^2 - 48^2) = sqrt(3600 - 2304) = sqrt(1296) = 36)
        { id: 'q6', answer: 'c' }, // Jawaban: 15 cm (sqrt(9^2 + 12^2) = sqrt(81 + 144) = sqrt(225) = 15)
        { id: 'q7', answer: 'b' }, // Jawaban: 50 meter (sqrt(30^2 + 40^2) = sqrt(900 + 1600) = sqrt(2500) = 50)
        { id: 'q8', answer: 'b' }, // Jawaban: 7*sqrt(3) cm (Tinggi segitiga sama sisi: s * sqrt(3) / 2. QB adalah tinggi. 14 * sqrt(3) / 2 = 7*sqrt(3))
        { id: 'q9', answer: 'b' }, // Jawaban: 5 satuan (sqrt((5-1)^2 + (1-4)^2) = sqrt(4^2 + (-3)^2) = sqrt(16 + 9) = sqrt(25) = 5)
        { id: 'q10', answer: 'd' } // Jawaban: 12 satuan (sqrt((7-2)^2 + (13-1)^2) = sqrt(5^2 + (12)^2) = sqrt(25 + 144) = sqrt(169)=13.)
    ];

    const checkAnswersBtn = document.getElementById('checkAnswersBtn');
    const resetQuizBtn = document.getElementById('resetQuizBtn');
    const finalScoreDisplay = document.getElementById('finalScore');

    function checkAnswers() {
        let score = 0;
        let allAnswered = true; // Flag untuk mengecek apakah semua soal sudah dijawab

        questions.forEach(q => {
            const selectedOption = document.querySelector(`input[name="${q.id}"]:checked`);
            const feedbackElement = document.getElementById(`feedback${q.id.substring(1)}`); // feedback1, feedback2, etc.

            // Hapus kelas feedback sebelumnya
            feedbackElement.classList.remove('correct', 'incorrect', 'show');
            feedbackElement.style.height = '0';
            feedbackElement.style.opacity = '0';

            if (selectedOption) {
                if (selectedOption.value === q.answer) {
                    feedbackElement.textContent = 'Jawaban Benar!';
                    feedbackElement.classList.add('correct');
                    score++;
                } else {
                    feedbackElement.textContent = 'Jawaban Salah. Coba lagi!';
                    feedbackElement.classList.add('incorrect');
                }
                // Tampilkan feedback
                feedbackElement.style.height = feedbackElement.scrollHeight + 'px'; // Sesuaikan tinggi
                feedbackElement.style.opacity = '1';
            } else {
                allAnswered = false; // Ada soal yang belum dijawab
                feedbackElement.textContent = 'Mohon pilih jawaban!';
                feedbackElement.classList.add('incorrect'); // Gunakan gaya incorrect untuk peringatan
                feedbackElement.style.height = feedbackElement.scrollHeight + 'px';
                feedbackElement.style.opacity = '1';
            }
        });

        // Tampilkan skor akhir
        finalScoreDisplay.innerHTML = `Skor Anda: ${score} / ${questions.length}`;
        finalScoreDisplay.classList.add('show');
        finalScoreDisplay.style.height = finalScoreDisplay.scrollHeight + 'px';

        // Nonaktifkan tombol cek jawaban setelah diperiksa
        checkAnswersBtn.disabled = true;

        if (!allAnswered) {
             alert('Anda belum menjawab semua soal! Mohon lengkapi semua jawaban.');
             // Optionally, revert the score display if not all are answered
             finalScoreDisplay.classList.remove('show');
             finalScoreDisplay.style.height = '0';
             finalScoreDisplay.style.opacity = '0';
             checkAnswersBtn.disabled = false; // Re-enable if not all answered
        }
    }

    function resetQuiz() {
        // Hapus semua pilihan yang dipilih
        document.querySelectorAll('input[type="radio"]').forEach(radio => {
            radio.checked = false;
        });

        // Sembunyikan semua umpan balik
        document.querySelectorAll('.feedback').forEach(feedback => {
            feedback.classList.remove('correct', 'incorrect', 'show');
            feedback.style.height = '0';
            feedback.style.opacity = '0';
            feedback.textContent = ''; // Kosongkan teks
        });

        // Sembunyikan skor akhir
        finalScoreDisplay.classList.remove('show');
        finalScoreDisplay.style.height = '0';
        finalScoreDisplay.style.opacity = '0';
        finalScoreDisplay.textContent = ''; // Kosongkan teks skor

        // Aktifkan kembali tombol cek jawaban
        checkAnswersBtn.disabled = false;
    }

    checkAnswersBtn.addEventListener('click', checkAnswers);
    resetQuizBtn.addEventListener('click', resetQuiz);
});