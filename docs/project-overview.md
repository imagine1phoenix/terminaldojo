# CLI Learning Platform Project Overview

## Name Suggestions
- ShellSensei
- CommandCraft
- TerminalDojo

## Mission
An interactive platform where users go from zero to hero in CLI commands with real practice, not just reading.

## Target Users
- Complete beginners who have never opened a terminal
- Junior developers who want to level up
- DevOps and SysAdmin learners
- Developers switching from Windows to Linux or macOS
- Interview prep candidates

## Shell Categories

### Linux/Unix Core Commands
- File System Navigation: `cd`, `ls`, `pwd`, `tree`
- File Operations: `cp`, `mv`, `rm`, `mkdir`, `touch`, `ln`
- File Viewing: `cat`, `less`, `more`, `head`, `tail`, `tac`
- File Permissions: `chmod`, `chown`, `chgrp`, `umask`
- File Search: `find`, `locate`, `which`, `whereis`, `type`
- Text Processing: `grep`, `sed`, `awk`, `cut`, `sort`, `uniq`, `tr`, `wc`
- Compression: `tar`, `gzip`, `bzip2`, `zip`, `unzip`, `xz`
- Disk & Storage: `df`, `du`, `fdisk`, `mount`, `umount`, `lsblk`
- Process Management: `ps`, `top`, `htop`, `kill`, `killall`, `bg`, `fg`, `jobs`, `nohup`
- User Management: `useradd`, `usermod`, `userdel`, `passwd`, `whoami`, `id`, `groups`
- System Info: `uname`, `hostname`, `uptime`, `lsb_release`, `arch`
- Package Managers: `apt`, `yum`, `dnf`, `pacman`, `zypper`, `snap`
- Systemd & Services: `systemctl`, `journalctl`, `service`

### Bash Scripting
- Variables & Data Types
- Conditionals: `if`, `elif`, `else`, `case`
- Loops: `for`, `while`, `until`
- Functions
- Arrays & Associative Arrays
- String Manipulation
- Input/Output: `read`, `echo`, `printf`
- Exit Codes & Error Handling
- Regular Expressions
- Here Documents & Here Strings
- Command Substitution
- Arithmetic Operations
- Signal Handling: `trap`
- Debugging: `set -x`, `set -e`, `shellcheck`
- Best Practices & Style Guide

### Networking Commands
- Connectivity: `ping`, `traceroute`, `mtr`
- DNS: `dig`, `nslookup`, `host`
- HTTP: `curl`, `wget`, `httpie`
- Transfer: `scp`, `rsync`, `sftp`, `ftp`
- Network Config: `ifconfig`, `ip`, `netstat`, `ss`, `nmcli`
- Firewall: `iptables`, `ufw`, `firewalld`
- SSH: `ssh`, `ssh-keygen`, `ssh-agent`, `ssh-copy-id`
- Network Scanning: `nmap`, `netcat`/`nc`
- Bandwidth & Monitoring: `iftop`, `nethogs`, `tcpdump`

### curl Deep Dive
- Basic GET/POST/PUT/DELETE
- Headers & Authentication
- File Upload/Download
- Cookies & Sessions
- SSL/TLS Options
- API Testing Patterns
- curl vs wget comparison
- Advanced options: `--retry`, `--limit-rate`, `-w` format

### Homebrew (macOS/Linux)
- Installation & Setup
- Formulae: `brew install`, `brew uninstall`, `brew upgrade`
- Casks: `brew install --cask`
- Taps: `brew tap`
- Services: `brew services`
- Maintenance: `brew cleanup`, `brew doctor`
- Brewfile & Bundle
- Creating Custom Formulae

### Git CLI
- Setup & Config
- Basic Workflow: `init`, `add`, `commit`, `status`, `log`
- Branching: `branch`, `checkout`, `switch`, `merge`, `rebase`
- Remote: `remote`, `fetch`, `pull`, `push`, `clone`
- Stashing: `stash`, `stash pop`, `stash list`
- History: `log`, `reflog`, `bisect`, `blame`
- Advanced: `cherry-pick`, `revert`, `reset`, `amend`
- Tags: `tag`, `push tags`
- Submodules & Subtrees
- Git Hooks

### Docker CLI
- Images: `build`, `pull`, `push`, `tag`, `rmi`
- Containers: `run`, `start`, `stop`, `rm`, `exec`, `logs`
- Volumes & Networks
- Docker Compose: `up`, `down`, `build`, `logs`, `exec`
- Docker System: `prune`, `df`, `info`
- Dockerfile Instructions

### Kubernetes (kubectl)
- Cluster Info & Config
- Pods, Deployments, Services
- Logs & Debugging
- Apply, Delete, Scale
- Contexts & Namespaces

### Node/NPM/Yarn CLI
- npm: `init`, `install`, `run`, `publish`, `audit`
- yarn: `add`, `remove`, `run`, `workspaces`
- npx
- nvm (node version manager)

### Python CLI Tools
- pip: `install`, `freeze`, `list`
- venv / virtualenv
- conda
- pyenv

### Cloud CLIs
- AWS CLI: `s3`, `ec2`, `lambda`, `iam`
- Google Cloud: `gcloud`
- Azure CLI: `az`
- Terraform CLI
- Heroku CLI

### Power Tools
- `tmux` / `screen` (terminal multiplexers)
- `vim` / `nano` (terminal editors)
- `jq` (JSON processing)
- `yq` (YAML processing)
- `xargs`
- `tee`
- `watch`
- `cron` & `crontab`
- `make` & Makefiles
- Regex with `grep`/`sed`/`awk`

### Security Commands
- `openssl`
- `gpg`
- `fail2ban`
- SELinux commands
- Audit & Logging

### Meta Skills
- Piping & Redirection: `|`, `>`, `>>`, `<`, `2>&1`
- Environment Variables: `export`, `.env`, `PATH`
- Aliases & Functions: `.bashrc`, `.zshrc`
- Shell Configuration
- Wildcards & Globbing
- Job Control
- Man Pages & Help: `man`, `--help`, `info`, `tldr`
- Shell Differences: bash vs zsh vs fish vs sh

## Positioning Summary
This is a full CLI mastery curriculum designed for hands-on learning, progression, and real-world task readiness.

## Learning Engine
See [learning-engine.md](learning-engine.md) for the full Learning Engine specification.

## Architecture
See [architecture-overview.md](architecture-overview.md) for the complete system architecture and technology stack.
