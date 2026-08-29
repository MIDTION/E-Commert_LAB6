FROM freeradius/freeradius-server:latest

COPY clients.conf /etc/raddb/clients.conf
COPY authorize /etc/raddb/mods-config/files/authorize

RUN chmod 644 /etc/raddb/clients.conf /etc/raddb/mods-config/files/authorize
