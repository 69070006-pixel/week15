# FOODPICKER ITF — เว็บไซต์สุ่มอาหาร

เว็บไซต์สำหรับสุ่มเมนูอาหาร ช่วยตัดสินใจว่า "วันนี้จะกินอะไรดี"
กดปุ่มสุ่มแล้วระบบจะแสดง **รูปภาพเมนู ชื่อเมนู คำอธิบาย และราคา** ของเมนูที่สุ่มได้

## วิธีเปิดเว็บไซต์

เปิดไฟล์ `index.html` ด้วยเบราว์เซอร์ได้เลย (ดับเบิลคลิก)

หรือรันผ่าน local server (แนะนำ หากต้องการให้ฟอนต์/รูปโหลดครบทุกครั้ง)

```bash
python -m http.server 8000
```

แล้วเปิด http://localhost:8000

## ฟีเจอร์

- **Navbar** ด้านบนสุด แสดงรหัสนักศึกษา 69070006 · FOODPICKER ITF · Week 15 (แก้ไขรหัสได้ใน `index.html`)
- สุ่มอาหารจากรายการทั้งหมด **6 เมนู** (มากกว่า 5 รายการตามโจทย์)
- แสดงผลการสุ่มพร้อมรูปภาพ ชื่อเมนู คำอธิบาย และราคา
- แอนิเมชันสลับเมนูตอนกำลังสุ่ม และไม่สุ่มซ้ำเมนูเดิมติดกัน
- แสดงรายการอาหารทั้งหมดเป็นการ์ด กดการ์ดเพื่อเลือกเมนูนั้นได้
- กด `Space` เพื่อสุ่มซ้ำได้
- รองรับมือถือ แท็บเล็ต และเดสก์ท็อป (responsive)
- มี `aria-live` สำหรับโปรแกรมอ่านหน้าจอ และรองรับ `prefers-reduced-motion`

## ตรวจตามข้อกำหนด Part 3

| ข้อกำหนด | สถานะ | รายละเอียด |
| --- | --- | --- |
| 1. Navbar อยู่ด้านบนสุด | ✅ | แถบสีน้ำเงิน sticky แสดง 69070006 · FOODPICKER ITF · Week 15 |
| 2. แสดงรูปภาพ ชื่อ คำอธิบาย ราคา | ✅ | การ์ดผลลัพธ์แสดงครบทั้ง 4 ส่วน |
| 3. ปุ่มสุ่มเปลี่ยนข้อมูลตามเมนู | ✅ | ปุ่ม "สุ่มอาหารเลย" เปลี่ยนรูป/ชื่อ/คำอธิบาย/ราคา และมี 6 เมนู |
| 4. ตกแต่งสวยงามด้วย Google Fonts / CSS | ✅ | ฟอนต์ Kanit + Noto Sans Thai, ปุ่ม gradient, responsive |
| ใช้รูปประกอบจากแหล่งอื่น | ✅ | รูปจาก Wikimedia Commons (เครดิตด้านล่าง) |

## โครงสร้างไฟล์

```
index.html        โครงหน้าเว็บ
styles.css        ตกแต่งหน้าเว็บ (responsive + animation)
app.js            ข้อมูลเมนู 6 รายการ และตรรกะการสุ่ม
images/           รูปภาพอาหาร 6 รูป
```

## รายการเมนู

| เมนู | หมวด | ราคา |
| --- | --- | --- |
| ผัดไทยกุ้งสด | อาหารจานเดียว | ฿65 |
| ข้าวมันไก่ | อาหารจานเดียว | ฿55 |
| ส้มตำไทย | ยำและสลัด | ฿45 |
| ต้มยำกุ้ง | ต้มและแกง | ฿120 |
| ข้าวผัดกะเพราหมูสับไข่ดาว | อาหารจานเดียว | ฿60 |
| ข้าวเหนียวมะม่วง | ของหวาน | ฿80 |

## เครดิตภาพ

รูปภาพทั้งหมดมาจาก Wikimedia Commons และใช้ตามสัญญาอนุญาตของแต่ละไฟล์

| ไฟล์ในโปรเจกต์ | ต้นฉบับ | ผู้ถ่าย | สัญญาอนุญาต |
| --- | --- | --- | --- |
| `images/padthai.jpg` | [Phat Thai kung Chang Khien street stall](https://commons.wikimedia.org/wiki/File:Phat_Thai_kung_Chang_Khien_street_stall.jpg) | Takeaway | CC BY-SA 3.0 |
| `images/khaomankai.jpg` | [Hainanese chicken rice at Thai Ten](https://commons.wikimedia.org/wiki/File:Hainanese_chicken_rice_at_Thai_Ten.jpg) | Peachyeung316 | CC BY-SA 4.0 |
| `images/sontam.jpg` | [Som Tam or Thai Green Papaya Salad](https://commons.wikimedia.org/wiki/File:Som_Tam_or_Thai_Green_Papaya_Salad.jpg) | Sumit Surai | CC BY-SA 4.0 |
| `images/tomyum.jpg` | [Tom Yum Goong Noodle Soup - Nok Nok Kitchen](https://commons.wikimedia.org/wiki/File:Tom_Yum_Goong_Noodle_Soup_-_Nok_Nok_Kitchen_at_The_Cow_2024-03-28.jpg) | Andy Li | CC0 |
| `images/krapao.jpg` | [Siam Garden Phat kaphrao](https://commons.wikimedia.org/wiki/File:Siam_Garden_Phat_kaphrao_ac.jpg) | Asturio Cantabrio | CC BY-SA 4.0 |
| `images/mango.jpg` | [Mango sticky rice](https://commons.wikimedia.org/wiki/File:Mango_sticy_rice_(3859549574).jpg) | Dennis Wong | CC BY 2.0 |

> หมายเหตุ: ภาพที่ใช้สัญญาอนุญาต CC BY / CC BY-SA ต้องคงเครดิตผู้ถ่ายไว้เมื่อนำไปเผยแพร่
