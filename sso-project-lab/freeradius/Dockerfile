FROM freeradius/freeradius-server:latest
COPY clients.conf /etc/raddb/clients.conf
COPY authorize /etc/raddb/mods-config/files/authorize
RUN chown -R root:freerad /etc/raddb/clients.conf /etc/raddb/mods-config/files/authorize && \
    chmod 640 /etc/raddb/clients.conf /etc/raddb/mods-config/files/authorize
