FROM phusion/baseimage:0.11

# install essential tools
RUN apt-get update && apt-get install -o Dpkg::Options::="--force-confnew" -yq \
		ca-certificates \
		curl \
		wget \
        git \
		gcc \
        g++ \
		ssh-client \
		--no-install-recommends

# clean up APT when done
RUN apt-get clean && rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*
