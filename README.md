# 🚗💨 ขับรถภาษาอะไร — Dash & Dodge

[![Play Game](https://img.shields.io/badge/Play%20Game-Live%20Demo-success?style=for-the-badge&logo=vercel&color=2ecc71)](https://dash-n-dodge.vercel.app)
[![FastAPI](https://img.shields.io/badge/Backend-FastAPI-blue?style=for-the-badge&logo=fastapi&logoColor=white)](https://fastapi.tiangolo.com/)
[![Phaser3](https://img.shields.io/badge/Game_Engine-Phaser%203-orange?style=for-the-badge&logo=phaser&logoColor=white)](https://phaser.io/)

## 🔗 ลิงก์เล่นเกม (Live Deploy Link)

เข้ามาร่วมสนุกและบันทึกคะแนนออนไลน์ได้แล้ววันนี้ที่:
👉 **[https://dash-n-dodge.vercel.app](https://dash-n-dodge.vercel.app)** 🚗💥

---

**"ขับรถภาษาอะไร" (Dash & Dodge)** คือเกม 2D Web Arcade / Endless Crossing ที่จะมาพิสูจน์ความเร็วและทักษะการสู้ชีวิตของคุณบนถนนหนทางที่เต็มไปด้วยยวดยานพาหนะหลากชนิด! หลบหลีกสิ่งกีดขวาง เอาชีวิตรอดให้นานที่สุด และทำคะแนนสูงสุดเพื่อขึ้นแท่นอันดับหนึ่งบนตารางคะแนน (Leaderboard) หรือตั้งห้องชวนเพื่อนมาร่วมสู้ชีวิตไปด้วยกันผ่านระบบ Lobby แบบเรียลไทม์!

---

## ✨ คุณสมบัติเด่น (Features)

*   🎮 **เกมเพลย์แนว Endless Crossing สุดท้าทาย:** หลบหลีกขบวนรถยนต์ รถจักรยานยนต์ และสิ่งกีดขวางที่ทวีความเร็วและความหนาแน่นขึ้นเรื่อย ๆ
*   👥 **ระบบห้องเล่นเกมแบบเรียลไทม์ (Real-time Multiplayer Room):** สร้างห้องหรือเข้าร่วมห้องกับเพื่อนเพื่อเริ่มสู้ชีวิตไปพร้อมกัน ผ่านการเชื่อมต่อ WebSockets
*   🏆 **ตารางจัดอันดับออนไลน์ (Online Leaderboard):** แข่งขันทำคะแนนสูงสุดกับผู้เล่นทั่วประเทศ บันทึกประวัติและแสดงตารางคะแนนแบบแก้ว (Glassmorphism UI)
*   🦊 **ตัวละครและสกินหลากหลาย (Skins Selection):** เลือกตัวละครน่ารัก ๆ มากมาย เช่น ฉลาม, หมึก, เต่า, ปลากระเบน, โลมา, ทีเร็กซ์, สุนัข และช้าง
*   💻 **UI สไตล์ Premium Glassmorphic:** หน้าเมนู บอร์ดจัดอันดับ และฟอร์มกรอกข้อมูล ถูกออกแบบให้อยู่บนหน้าจอเว็บในรูปแบบกระจกโปร่งแสง สวยงาม ทันสมัย และตอบสนองรวดเร็ว

---

## 🛠️ เทคโนโลยีที่ใช้ (Tech Stack)

### Frontend (หน้าบ้าน/ตัวเกม)
*   **Game Engine:** [Phaser 3](https://phaser.io/) (Framework สำหรับสร้างเกม 2D HTML5 ยอดนิยม)
*   **Language:** TypeScript
*   **Build Tool & Dev Server:** Vite
*   **User Interface:** HTML5 + Vanilla CSS (Glassmorphism & CSS Animations)

### Backend (หลังบ้าน/ระบบจัดการ)
*   **Framework:** FastAPI (Python 3) - รวดเร็ว ประสิทธิภาพสูง รองรับ Asynchronous
*   **Real-time Communication:** WebSockets (สำหรับระบบ Lobby/Multiplayer)
*   **Database:** PostgreSQL (ผ่าน SQLAlchemy ORM)
*   **Deployment Platform:** Vercel (Frontend), Supabase / Neon (Database), FastAPI Server

---

## 📂 โครงสร้างโปรเจค (Project Structure)

```text
├── frontend/          # ตัวเกม Phaser 3 Client (Vite + TypeScript)
│   ├── src/
│   │   ├── scenes/    # ฉากต่าง ๆ ของเกม (Menu, Game, Leaderboard, RoomLobby, etc.)
│   │   ├── entities/  # ตัวละคร, ยานพาหนะ, สิ่งกีดขวาง
│   │   └── ui/        # การควบคุมและเรนเดอร์ UI
│   └── public/        # รูปภาพ, เสียงประกอบ และ Assets
│
├── backend/           # ระบบจัดการคะแนนและห้องเล่น (FastAPI Service)
│   ├── app/
│   │   ├── api/       # API Endpoints (Scores, Leaderboard, Rooms)
│   │   ├── db/        # Database Config และ Connection
│   │   └── services/  # Business logic & WebSocket Manager
```

---

## 🚀 ขั้นตอนการติดตั้งและรันในเครื่องตัวเอง (Local Setup)

### 1. ฝั่งหน้าบ้าน (Frontend)
ไปที่โฟลเดอร์ `frontend/` และสั่งงานตามขั้นตอนด้านล่าง:
```bash
cd frontend
npm install
npm run dev
```
จากนั้นเปิดบราวเซอร์ไปที่ `http://localhost:5173` เพื่อเริ่มเล่นเกม

### 2. ฝั่งหลังบ้าน (Backend)
ไปที่โฟลเดอร์ `backend/` และสั่งงานตามขั้นตอนด้านล่าง:
```bash
cd backend

# สร้าง virtual environment
python -m venv venv

# เปิดใช้งาน virtual environment (Windows)
.\venv\Scripts\activate

# เปิดใช้งาน virtual environment (macOS/Linux)
# source venv/bin/activate

# ติดตั้ง dependencies
pip install -r requirements.txt

# รันเซิร์ฟเวอร์
uvicorn app.main:app --reload
```
*   ระบบ API Docs (Swagger) สามารถเข้าใช้งานได้ที่ `http://localhost:8000/docs`
*   รันเซิร์ฟเวอร์หลังบ้านเพื่อเชื่อมต่อระบบบันทึกคะแนนและบริการห้องเล่นเกม

