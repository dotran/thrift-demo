FROM newsweaver/smartstack-nodejs

ADD smartstack/nerve.conf.json /etc/
ADD smartstack/synapse.conf.json /etc/

ADD . /app/
RUN rm -rf /app/node_modules

WORKDIR /app
RUN npm install

ADD start.sh /app/

ENV NODE_ENV production

RUN touch /var/log/nerve.txt

RUN chmod +x /app/start.sh

ENTRYPOINT ["/app/start.sh"]
