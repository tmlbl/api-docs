Vagrant.configure(2) do |config|
  config.vm.box = "ubuntu/trusty64"
  config.vm.network :forwarded_port, guest: 4567, host: 4567

  config.vm.provision "bootstrap",
    type: "shell",
    inline: <<-SHELL
      # Obtain Ruby repository from brightbox ( https://www.brightbox.com/blog/2016/01/06/ruby-2-3-ubuntu-packages/ )
      sudo apt-add-repository --yes ppa:brightbox/ruby-ng
      sudo apt-get update
      sudo apt-get install -yq ruby2.3 ruby2.3-dev build-essential git
      sudo gem install --no-ri --no-rdoc bundler
    SHELL

  # add the local user git config to the vm
  config.vm.provision "file", source: "~/.gitconfig", destination: ".gitconfig"

  config.vm.provision "install",
    type: "shell",
    privileged: false,
    inline: <<-SHELL
      echo "=============================================="
      echo "Installing app dependencies"
      cd /vagrant
      #mkdir ~/app
      #cp /vagrant/Gemfile ~/app/.
      #cp /vagrant/Gemfile.lock ~/app/.
      #cd ~/app
      bundle install
    SHELL

  config.vm.provision "run",
    type: "shell",
    privileged: false,
    run: "always",
    inline: <<-SHELL
      echo "=============================================="
      echo "Starting up middleman at http://localhost:4567"
      echo "If it does not come up, check the ~/middleman.log file for any error messages"
      cd /vagrant
      bundle exec middleman server --watcher-force-polling --watcher_latency=1 &> ~/middleman.log &
    SHELL
end
