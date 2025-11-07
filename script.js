const API_BASE = "https://coin-stock-api.onrender.com";

async function loadCrypto() {
  try {
    const res = await fetch(`${API_BASE}/api/crypto`);
    if (!res.ok) throw new Error("Crypto fetch failed");
    const data = await res.json();
    console.log("💰 Crypto data:", data);  // 디버깅 로그

    const container = document.getElementById("crypto-data");
    container.innerHTML = Object.entries(data)
      .map(([name, val]) => `
        <div class="mb-2">
          <strong>${name.toUpperCase()}</strong><br>
          💵 USD: $${val.usd.toLocaleString()} (${val.usd_24h_change.toFixed(2)}%)<br>
          🇰🇷 KRW: ₩${val.krw.toLocaleString()} (${val.krw_24h_change.toFixed(2)}%)
        </div>
      `)
      .join("");
  } catch (err) {
    console.error(err);
    document.getElementById("crypto-data").innerText = "데이터 로드 실패 ⚠️";
  }
}

async function loadStock() {
  try {
    const res = await fetch(`${API_BASE}/api/stocks/AAPL`);
    if (!res.ok) throw new Error("Stock fetch failed");
    const data = await res.json();
    console.log("📈 Stock data:", data);  // 디버깅 로그

    const container = document.getElementById("stock-data");
    container.innerHTML = data
      .map(item => `
        <div class="mb-2">
          ${new Date(item.Date).toLocaleDateString()} : $${item.Close.toFixed(2)}
        </div>
      `)
      .join("");
  } catch (err) {
    console.error(err);
    document.getElementById("stock-data").innerText = "데이터 로드 실패 ⚠️";
  }
}

window.addEventListener("DOMContentLoaded", () => {
  loadCrypto();
  loadStock();
});