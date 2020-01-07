FROM vsjcloud/beaver-golang:0.1

# install libvips
RUN apt-get update && apt-get install -o Dpkg::Options::="--force-confnew" -yq \
		libvips \
		libvips-dev

# clean up APT when done
RUN apt-get clean && rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*
