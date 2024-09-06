document.addEventListener("DOMContentLoaded", function () {
  const urlParams = new URLSearchParams(window.location.search);
  let score = 2; // initial score

  // Ambil nilai dari form
  const ageFirstPregnancy = parseInt(urlParams.get("ageFirstPregnancy"));
  const currentPregnancyOver35 = parseInt(
    urlParams.get("currentPregnancyOver35")
  );
  const yearsSinceFirstPregnancy = parseInt(
    urlParams.get("yearsSinceFirstPregnancy")
  );

  // Perhitungan Skor Berdasarkan Faktor Risiko
  score += ageFirstPregnancy > 35 ? 4 : 0;
  score += currentPregnancyOver35;
  score += yearsSinceFirstPregnancy > 4 ? 4 : 0;

  // Contoh faktor risiko lainnya
  score += parseInt(urlParams.get("yearsSinceLastPregnancy")) > 10 ? 4 : 0;
  score += parseInt(urlParams.get("yearsSinceLastPregnancy")) < 2 ? 4 : 0;
  score += parseInt(urlParams.get("numberOfChildren")) > 4 ? 4 : 0;
  score += parseInt(urlParams.get("ageNow")) > 35 ? 4 : 0;
  score += parseInt(urlParams.get("height")) < 145 ? 4 : 0;
  score += parseInt(urlParams.get("caesarean"));

  // Tentukan hasil berdasarkan skor
  let status = "";
  let explanation = "";

  if (score <= 2) {
    status = "KRR (Kehamilan Risiko Rendah)";
    explanation = `
            <p class="mb-4">Status Kehamilan: <span class="font-bold text-green-600">KRR (Kehamilan Risiko Rendah)</span></p>
            <p>Kehamilan Anda termasuk risiko rendah. Anda dapat melahirkan di Poliklinik Desa (POLINDES) dengan bantuan bidan, tanpa perlu rujukan khusus.</p>
        `;
  } else if (score >= 3 && score <= 11) {
    status = "KRT (Kehamilan Risiko Tinggi)";
    explanation = `
            <p class="mb-4">Status Kehamilan: <span class="font-bold text-yellow-600">KRT (Kehamilan Risiko Tinggi)</span></p>
            <p>Kehamilan Anda tergolong risiko tinggi. Anda perlu dirujuk ke Puskesmas atau Rumah Sakit, dan persalinan akan ditangani oleh bidan serta dokter. Rujukan berdasarkan risiko diperlukan.</p>
        `;
  } else {
    status = "KRST (Kehamilan Risiko Sangat Tinggi)";
    explanation = `
            <p class="mb-4">Status Kehamilan: <span class="font-bold text-red-600">KRST (Kehamilan Risiko Sangat Tinggi)</span></p>
            <p>Kehamilan Anda memiliki risiko sangat tinggi. Anda perlu segera dirujuk ke Rumah Sakit, dan persalinan harus ditangani oleh dokter. Penanganan di Rumah Sakit sangat penting untuk memastikan keselamatan Anda dan bayi Anda.</p>
        `;
  }

  // Tampilkan hasil di halaman
  document.getElementById("score").innerText = score;
  document.getElementById("status").innerText = status;
  document.getElementById("explanation").innerHTML = explanation;
});
