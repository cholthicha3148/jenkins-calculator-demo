# Jenkins Calculator Demo

โปรเจกต์นี้เป็นเว็บเครื่องคิดเลขบวกเลขแบบง่าย สำหรับสาธิต Jenkins CI/CD Pipeline

## โครงสร้างไฟล์

- `public/index.html` หน้าเว็บหลัก
- `public/app.js` เชื่อมหน้าเว็บกับฟังก์ชันคำนวณ
- `src/calculator.js` ฟังก์ชันบวกเลขที่ใช้ทดสอบ
- `tests/calculator.test.js` เทสต์ด้วย Node.js test runner
- `scripts/build.js` สร้างโฟลเดอร์ `dist`
- `scripts/deploy-gh-pages.js` deploy ไป GitHub Pages branch `gh-pages`
- `Jenkinsfile` pipeline สำหรับ Jenkins

## คำสั่งที่ใช้

```bash
npm run build
npm test
npm run deploy
```

## ทดสอบเว็บในเครื่อง

```bash
npm start
```

แล้วเปิด `http://localhost:3000`

## Demo โค้ดพัง

แก้ไฟล์ `src/calculator.js` จาก:

```js
return Number(a) + Number(b);
```

เป็น:

```js
return Number(a) - Number(b);
```

จากนั้น commit และ push ไป GitHub Jenkins จะรัน Test แล้ว fail ที่ stage `Test` เป็นสีแดง
