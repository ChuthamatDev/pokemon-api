FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

# เปิดพอร์ต 5173 ซึ่งเป็นพอร์ตมาตรฐานของ Vite
EXPOSE 5173

# สั่งรัน Vite โดยใส่ --host เพื่อให้เข้าถึงจากภายนอก Container ได้
CMD ["npm", "run", "dev", "--", "--host"]