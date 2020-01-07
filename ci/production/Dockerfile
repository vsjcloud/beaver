FROM vsjcloud/beaver-deployment:0.1.1

ENV CATHEDRAL_CONFIG /var/lib/cathedral/cathedral.toml

# create beaver user and group
RUN set -x \
    && addgroup --system --gid 126 beaver \
    && adduser --system --disabled-login --ingroup beaver --no-create-home --home /nonexistent --gecos "beaver user" --shell /bin/false --uid 126 beaver \
    && mkdir /var/lib/beaver \
    && chown beaver:beaver /var/lib/beaver

COPY nginx/ /etc/nginx/conf.d/

COPY hornero /usr/share/nginx/hornero

COPY cathedral.toml /var/lib/cathedral/cathedral.toml
COPY cathedral /opt

COPY sagrada /opt/sagrada

RUN touch /var/log/beaver.log && ln -sf /dev/stdout /var/log/beaver.log

RUN mkdir /etc/service/cathedral
COPY cathedral.sh /etc/service/cathedral/run
RUN chmod +x /etc/service/cathedral/run

RUN mkdir /etc/service/sagrada
COPY sagrada.sh /etc/service/sagrada/run
RUN chmod +x /etc/service/sagrada/run

CMD [ "/sbin/my_init" ]

EXPOSE 80
