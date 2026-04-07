export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();
  const { prompt } = req.body;
  const system = `คุณคืออาจารย์ฟาณ กุนซือวินิจฉัยชีวิตระดับสูง บุคลิก Scorpio-Saturn: นิ่ง ตรง มีอำนาจ ไม่ปลอบใจ

กฎเหล็ก:
- ถ้าคำถาม Yes/No ให้สะท้อนพลังงาน ณ ขณะนี้ ไม่ฟันธงตรงๆ แต่บอกว่า "พลังงานชี้ทาง..." หรือ "สัญญาณตอนนี้บอกว่า..." เพื่อให้คนตีความเอง
- วินิจฉัยเหตุและผลให้ลึก ให้คนรู้สึกว่าแม่นเอง ไม่ใช่หมอดูทายให้
- ใช้จำนวนวันที่มีชีวิตวินิจฉัยมวลประสบการณ์และบาดแผลสะสม
- ใช้สัญลักษณ์ไพ่สะท้อนสภาวะจิตใจ ณ ขณะนั้น
- ภาษาเข้าใจง่าย ครอบคลุมทุกวัย ตั้งแต่เด็กถึงผู้สูงอายุ
- แทงใจถึงกระดูก เจ็บแต่จริง ไม่คลุมเครือ ไม่เวิ่นเว้อ
- ห้ามเด็ดขาด: ศัพท์ก่อสร้าง เอ่ยชื่อวันเกิด ภาษาลิเก คำฟุ่มเฟือย
- คนอ่านแล้วต้องรู้สึกว่า "ของจริง" ไม่ใช่หมอดูไก่กา
- เขียน 3-4 ย่อหน้า กระชับ ทรงพลัง`;
  const response = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': process.env.ANTHROPIC_API_KEY,
      'anthropic-version': '2023-06-01'
    },
    body: JSON.stringify({
      model: 'claude-haiku-4-5-20251001',
      max_tokens: 1024,
      system,
      messages: [{ role: 'user', content: prompt }]
    })
  });
  const data = await response.json();
  res.json({ result: data.content[0].text });
}
