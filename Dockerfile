# 베이스 이미지 설정
FROM node:14-alpine

# 작업 디렉토리 설정
WORKDIR /app

# 패키지 파일 복사 및 종속성 설치
COPY package*.json ./
RUN npm install

# 소스 코드 복사
COPY . .

# 빌드 실행
RUN npm run build

# 정적 파일을 제공하는 Nginx 설치
FROM nginx:alpine
COPY --from=0 /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
