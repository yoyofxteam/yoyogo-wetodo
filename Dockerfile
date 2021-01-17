FROM ccr.ccs.tencentyun.com/easypass-chehou/chehou-nginxbase:v1.0.0

COPY build/ /usr/share/nginx/html/
COPY ./default.conf /etc/nginx/conf.d/default.conf