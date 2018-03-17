# -*- mode: ruby -*-
# vi: set ft=ruby :

Vagrant.configure("2") do |config|
  config.vm.box = "ubuntu/xenial64"
  config.vm.network "private_network", ip: "192.168.33.10"
  config.vm.provider :virtualbox do |vb|
    vb.memory = "2048"
  end
  config.ssh.forward_agent = true
    # Add deadsnakes repository
    apt-key adv --recv-keys --keyserver keyserver.ubuntu.com 5BB92C09DB82666C
    add-apt-repository -y ppa:fkrull/deadsnakes

    # Add NodeJS repository
    curl -sL https://deb.nodesource.com/setup_8.x | sudo -E bash -

    # Update package list
    export DEBIAN_FRONTEND=noninteractive
    apt-get update --allow-unauthenticated

    # Generic development
    apt-get install -y \
      tree \
      zip \
      unzip \
      build-essential \
      language-pack-ja-base \
      language-pack-ja

    # Japanese locale
    update-locale LANG=ja_JP.UTF-8

    # Set timezone
    timedatectl set-timezone Asia/Tokyo

    # Python development
    apt-get install -y \
      python3.6 \
      python3.6-dev \
      python3.6-venv

    # NodeJS development
    apt-get install -y nodejs

    # Common Packages
    apt-get install -y \
      ca-certificates \
      curl \
      git \
      libcurl4-openssl-dev \
      libffi-dev \
      libjpeg-dev \
      libpng12-dev \
      libpq-dev \
      libsqlite3-dev \
      libssl-dev \
      libxml2-dev \
      libxslt1-dev \
      libz-dev \
      wget \
      zlib1g-dev

    # ngrok
    if [ ! -e /usr/local/bin/ngrok ]; then
      wget -q https://bin.equinox.io/c/4VmDzA7iaHb/ngrok-stable-linux-amd64.zip -O /tmp/ngrok-stable-linux-amd64.zip
      unzip -o /tmp/ngrok-stable-linux-amd64.zip -d /usr/local/bin/
    fi
  EOS
end
