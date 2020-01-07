FROM vsjcloud/beaver-common:0.1

ENV GOLANG_VERSION 1.13.5

RUN goRelArch='linux-amd64'; \
        goRelSha256='512103d7ad296467814a6e3f635631bd35574cab3369a97a323c9a585ccaa569'; \
        url="https://dl.google.com/go/go${GOLANG_VERSION}.${goRelArch}.tar.gz"; \
        wget -O go.tgz "$url"; \
        echo "${goRelSha256} *go.tgz" | sha256sum -c -; \
        tar -C /usr/local -xzf go.tgz; \
	    rm go.tgz; \
        export PATH="/usr/local/go/bin:$PATH"; \
        go version

ENV GOPATH /go
ENV PATH $GOPATH/bin:/usr/local/go/bin:$PATH

RUN mkdir -p "$GOPATH/src" "$GOPATH/bin" && chmod -R 755 "$GOPATH"
WORKDIR $GOPATH
