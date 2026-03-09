// Vercel 서버리스 함수 — 공공데이터포털 API 프록시
const API_URL = "https://apis.data.go.kr/1613000/RTMSDataSvcAptTradeDev/getRTMSDataSvcAptTradeDev"
const SERVICE_KEY = "cafff4c1610e96374a0e17f6187b3a7a5085a2cd0058f66bbbb429af5a016409"

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*")

  const { lawd_cd, deal_ymd } = req.query
  if (!lawd_cd || !deal_ymd) {
    return res.status(400).json({ error: "lawd_cd, deal_ymd 파라미터가 필요합니다" })
  }

  const url = `${API_URL}?serviceKey=${SERVICE_KEY}&LAWD_CD=${lawd_cd}&DEAL_YMD=${deal_ymd}&pageNo=1&numOfRows=9999`

  try {
    const response = await fetch(url, {
      headers: { "User-Agent": "Mozilla/5.0", "Accept": "application/xml" },
    })
    const xml = await response.text()
    res.setHeader("Content-Type", "application/xml; charset=utf-8")
    res.send(xml)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}
