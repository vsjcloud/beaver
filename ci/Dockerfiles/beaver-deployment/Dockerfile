FROM vsjcloud/beaver-nginx:0.1

# install libvips
RUN apt-get update && apt-get install -o Dpkg::Options::="--force-confnew" -yq \
		libvips \
		libvips-dev

# install nodejs
RUN curl -sL https://deb.nodesource.com/setup_12.x | bash -
RUN apt-get update && apt-get install -y nodejs

# clean up APT when done
RUN apt-get clean && rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*
