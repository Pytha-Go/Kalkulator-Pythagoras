document.addEventListener('DOMContentLoaded', function() {
    const inputA = document.getElementById('inputA');
    const inputB = document.getElementById('inputB');
    const inputC = document.getElementById('inputC');
    const hasilDiv = document.getElementById('hasil');
    const hitungBtn = document.getElementById('hitungBtn');
    const resetBtn = document.getElementById('resetBtn');

    // Fungsi pembantu untuk menyederhanakan akar
    function simplifySquareRoot(n) {
        if (n < 0) {
            return "Imaginer"; // Handle kasus negatif (tidak relevan untuk Pythagoras)
        }
        if (n === 0) {
            return "0";
        }

        // Cek jika n adalah kuadrat sempurna
        const sqrtN = Math.sqrt(n);
        if (Number.isInteger(sqrtN)) {
            return sqrtN.toString();
        }

        let coefficient = 1;
        let radicand = n; // Angka di bawah akar

        // Cari faktor kuadrat terbesar
        for (let i = 2; i * i <= radicand; i++) {
            while (radicand % (i * i) === 0) {
                coefficient *= i;
                radicand /= (i * i);
            }
        }

        if (coefficient === 1) {
            return `√${radicand}`; // Tidak bisa disederhanakan (contoh: √7)
        } else {
            return `${coefficient}√${radicand}`; // Sederhana (contoh: 2√2)
        }
    }


    function hitung() {
        const a = parseFloat(inputA.value);
        const b = parseFloat(inputB.value);
        const c = parseFloat(inputC.value);
        
        // Reset hasil sebelumnya
        hasilDiv.textContent = "";
        hasilDiv.classList.remove('kalkulator-hasil'); // Hapus kelas untuk menyembunyikan

        let calculatedValueSquared; // Nilai kuadrat sebelum diakar
        let sideName;
        let errorMessage = "";

        if (!isNaN(a) && !isNaN(b) && isNaN(c)) {
            calculatedValueSquared = a * a + b * b;
            sideName = "Sisi miring C";
        } else if (!isNaN(c) && !isNaN(a) && isNaN(b)) {
            if (c <= a) {
                errorMessage = "C harus lebih besar dari A.";
            } else {
                calculatedValueSquared = c * c - a * a;
                sideName = "Sisi A";
            }
        } else if (!isNaN(c) && !isNaN(b) && isNaN(a)) {
            if (c <= b) {
                errorMessage = "C harus lebih besar dari B.";
            } else {
                calculatedValueSquared = c * c - b * b;
                sideName = "Sisi B";
            }
        } else {
            errorMessage = "Masukkan tepat dua sisi untuk menghitung sisi ketiga.";
        }

        if (errorMessage) {
            hasilDiv.textContent = errorMessage;
            hasilDiv.classList.add('kalkulator-hasil'); // Tampilkan hasil error
        } else if (calculatedValueSquared < 0) {
            // Ini akan terjadi jika c <= a atau c <= b dan kita hitung a^2 = c^2 - b^2 hasilnya negatif
            // atau b^2 = c^2 - a^2 hasilnya negatif.
            // Walaupun sudah ada validasi c <= a/b, ini sebagai double check untuk kasus floating point error
            hasilDiv.textContent = "Sisi tidak dapat dihitung (hasil akar negatif).";
            hasilDiv.classList.add('kalkulator-hasil');
        }
        else if (!isNaN(calculatedValueSquared)) {
            const finalResult = simplifySquareRoot(calculatedValueSquared);
            hasilDiv.innerHTML = `${sideName} = ${finalResult}`; // Gunakan innerHTML untuk simbol akar
            hasilDiv.classList.add('kalkulator-hasil'); // Tampilkan hasil sukses
        } else {
            hasilDiv.textContent = "Terjadi kesalahan perhitungan.";
            hasilDiv.classList.add('kalkulator-hasil'); // Tampilkan hasil error umum
        }
    }

    function resetKalkulator() {
        inputA.value = '';
        inputB.value = '';
        inputC.value = '';
        hasilDiv.textContent = '';
        hasilDiv.classList.remove('kalkulator-hasil'); // Sembunyikan hasil
    }

    hitungBtn.addEventListener('click', hitung);
    resetBtn.addEventListener('click', resetKalkulator);
});