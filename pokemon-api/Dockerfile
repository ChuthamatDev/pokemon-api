# 1. เลือก Base Image เป็น Node.js (ใช้ Alpine เพราะขนาดเล็กและเบามาก)
FROM node:20-alpine

# 2. กำหนดโฟลเดอร์ทำงานภายใน Container
WORKDIR /app

# 3. ก๊อปปี้ไฟล์ package.json เพื่อมาติดตั้ง dependencies ก่อน (ช่วยเรื่อง Caching ให้ Build ไวขึ้น)
COPY package*.json ./
RUN npm install

# 4. ก๊อปปี้ Source Code ทั้งหมดเข้าไป
COPY . .

# 5. สั่ง Build NestJS (แปลง TypeScript เป็น JavaScript)
RUN npm run build

# 6. เปิดพอร์ต 3000 ให้ภายนอกเชื่อมต่อได้
EXPOSE 3000

# 7. คำสั่งที่จะรันเมื่อ Container สตาร์ท
CMD ["npm", "run", "start:prod"]