from flask import Flask, jsonify
from flask_cors import CORS
import requests
import yfinance as yf
import pandas as pd

app = Flask(__name__)
CORS(app)

@app.route("/")
def home():
    return "🚀 Coin & Stock API 서버가 실행 중입니다."

@app.route("/api/crypto")
def get_crypto():
    """CoinGecko에서 암호화폐 시세 가져오기"""
    url = "https://api.coingecko.com/api/v3/simple/price"
    params = {
        "ids": "bitcoin,ethereum,dogecoin",
        "vs_currencies": "usd,krw",
        "include_24hr_change": "true"
    }
    r = requests.get(url, params=params, timeout=10)
    data = r.json()
    return jsonify(data)

@app.route("/api/stocks/<symbol>")
def get_stock(symbol):
    """Yahoo Finance에서 지정한 주식(symbol)의 최근 7일 데이터"""
    ticker = yf.Ticker(symbol.upper())
    hist = ticker.history(period="7d", interval="1d")

    if hist.empty:
        return jsonify({"error": "잘못된 종목 코드입니다."}), 400

    hist.reset_index(inplace=True)
    return jsonify(hist.to_dict(orient="records"))

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)