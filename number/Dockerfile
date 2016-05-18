FROM newsweaver/smartstack-nodejs

ADD smartstack/nerve.conf.json /etc/
ADD package.json /app/
ADD server.js /app/

WORKDIR /app/
RUN npm install

ADD start.sh /app/

RUN chmod +x /app/start.sh

ENTRYPOINT ["/app/start.sh"]
