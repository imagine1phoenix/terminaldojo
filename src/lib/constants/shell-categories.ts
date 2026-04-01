export interface ShellCategorySection {
  name: string
  items: string[]
}

export interface ShellCategory {
  slug: string
  name: string
  iconKey: string
  sections: ShellCategorySection[]
}

export const shellCategories: ShellCategory[] = [
  {
    slug: 'linux-unix-core-commands',
    name: 'Linux/Unix Core Commands',
    iconKey: 'linux',
    sections: [
      { name: 'File System Navigation', items: ['cd', 'ls', 'pwd', 'tree'] },
      { name: 'File Operations', items: ['cp', 'mv', 'rm', 'mkdir', 'touch', 'ln'] },
      { name: 'File Viewing', items: ['cat', 'less', 'more', 'head', 'tail', 'tac'] },
      { name: 'File Permissions', items: ['chmod', 'chown', 'chgrp', 'umask'] },
      { name: 'File Search', items: ['find', 'locate', 'which', 'whereis', 'type'] },
      { name: 'Text Processing', items: ['grep', 'sed', 'awk', 'cut', 'sort', 'uniq', 'tr', 'wc'] },
      { name: 'Compression', items: ['tar', 'gzip', 'bzip2', 'zip', 'unzip', 'xz'] },
      { name: 'Disk & Storage', items: ['df', 'du', 'fdisk', 'mount', 'umount', 'lsblk'] },
      { name: 'Process Management', items: ['ps', 'top', 'htop', 'kill', 'killall', 'bg', 'fg', 'jobs', 'nohup'] },
      { name: 'User Management', items: ['useradd', 'usermod', 'userdel', 'passwd', 'whoami', 'id', 'groups'] },
      { name: 'System Info', items: ['uname', 'hostname', 'uptime', 'lsb_release', 'arch'] },
      { name: 'Package Managers', items: ['apt', 'yum', 'dnf', 'pacman', 'zypper', 'snap'] },
      { name: 'Systemd & Services', items: ['systemctl', 'journalctl', 'service'] },
    ],
  },
  {
    slug: 'bash-scripting',
    name: 'Bash Scripting',
    iconKey: 'bash',
    sections: [
      { name: 'Variables & Data Types', items: [] },
      { name: 'Conditionals', items: ['if', 'elif', 'else', 'case'] },
      { name: 'Loops', items: ['for', 'while', 'until'] },
      { name: 'Functions', items: [] },
      { name: 'Arrays & Associative Arrays', items: [] },
      { name: 'String Manipulation', items: [] },
      { name: 'Input/Output', items: ['read', 'echo', 'printf'] },
      { name: 'Exit Codes & Error Handling', items: [] },
      { name: 'Regular Expressions', items: [] },
      { name: 'Here Documents & Here Strings', items: [] },
      { name: 'Command Substitution', items: [] },
      { name: 'Arithmetic Operations', items: [] },
      { name: 'Signal Handling', items: ['trap'] },
      { name: 'Debugging', items: ['set -x', 'set -e', 'shellcheck'] },
      { name: 'Best Practices & Style Guide', items: [] },
    ],
  },
  {
    slug: 'networking-commands',
    name: 'Networking Commands',
    iconKey: 'network',
    sections: [
      { name: 'Connectivity', items: ['ping', 'traceroute', 'mtr'] },
      { name: 'DNS', items: ['dig', 'nslookup', 'host'] },
      { name: 'HTTP', items: ['curl', 'wget', 'httpie'] },
      { name: 'Transfer', items: ['scp', 'rsync', 'sftp', 'ftp'] },
      { name: 'Network Config', items: ['ifconfig', 'ip', 'netstat', 'ss', 'nmcli'] },
      { name: 'Firewall', items: ['iptables', 'ufw', 'firewalld'] },
      { name: 'SSH', items: ['ssh', 'ssh-keygen', 'ssh-agent', 'ssh-copy-id'] },
      { name: 'Network Scanning', items: ['nmap', 'netcat', 'nc'] },
      { name: 'Bandwidth & Monitoring', items: ['iftop', 'nethogs', 'tcpdump'] },
    ],
  },
  {
    slug: 'curl-deep-dive',
    name: 'curl Deep Dive',
    iconKey: 'curl',
    sections: [
      { name: 'Basic GET/POST/PUT/DELETE', items: [] },
      { name: 'Headers & Authentication', items: [] },
      { name: 'File Upload/Download', items: [] },
      { name: 'Cookies & Sessions', items: [] },
      { name: 'SSL/TLS Options', items: [] },
      { name: 'API Testing Patterns', items: [] },
      { name: 'curl vs wget comparison', items: [] },
      { name: 'Advanced', items: ['--retry', '--limit-rate', '-w format'] },
    ],
  },
  {
    slug: 'homebrew-macos-linux',
    name: 'Homebrew (macOS/Linux)',
    iconKey: 'homebrew',
    sections: [
      { name: 'Installation & Setup', items: [] },
      { name: 'Formulae', items: ['brew install', 'brew uninstall', 'brew upgrade'] },
      { name: 'Casks', items: ['brew install --cask'] },
      { name: 'Taps', items: ['brew tap'] },
      { name: 'Services', items: ['brew services'] },
      { name: 'Maintenance', items: ['brew cleanup', 'brew doctor'] },
      { name: 'Brewfile & Bundle', items: [] },
      { name: 'Creating Custom Formulae', items: [] },
    ],
  },
  {
    slug: 'git-cli',
    name: 'Git CLI',
    iconKey: 'git',
    sections: [
      { name: 'Setup & Config', items: [] },
      { name: 'Basic Workflow', items: ['init', 'add', 'commit', 'status', 'log'] },
      { name: 'Branching', items: ['branch', 'checkout', 'switch', 'merge', 'rebase'] },
      { name: 'Remote', items: ['remote', 'fetch', 'pull', 'push', 'clone'] },
      { name: 'Stashing', items: ['stash', 'stash pop', 'stash list'] },
      { name: 'History', items: ['log', 'reflog', 'bisect', 'blame'] },
      { name: 'Advanced', items: ['cherry-pick', 'revert', 'reset', 'amend'] },
      { name: 'Tags', items: ['tag', 'push tags'] },
      { name: 'Submodules & Subtrees', items: [] },
      { name: 'Git Hooks', items: [] },
    ],
  },
  {
    slug: 'docker-cli',
    name: 'Docker CLI',
    iconKey: 'docker',
    sections: [
      { name: 'Images', items: ['build', 'pull', 'push', 'tag', 'rmi'] },
      { name: 'Containers', items: ['run', 'start', 'stop', 'rm', 'exec', 'logs'] },
      { name: 'Volumes & Networks', items: [] },
      { name: 'Docker Compose', items: ['up', 'down', 'build', 'logs', 'exec'] },
      { name: 'Docker System', items: ['prune', 'df', 'info'] },
      { name: 'Dockerfile Instructions', items: [] },
    ],
  },
  {
    slug: 'kubernetes-kubectl',
    name: 'Kubernetes (kubectl)',
    iconKey: 'kubernetes',
    sections: [
      { name: 'Cluster Info & Config', items: [] },
      { name: 'Pods, Deployments, Services', items: [] },
      { name: 'Logs & Debugging', items: [] },
      { name: 'Apply, Delete, Scale', items: [] },
      { name: 'Contexts & Namespaces', items: [] },
    ],
  },
  {
    slug: 'node-npm-yarn-cli',
    name: 'Node/NPM/Yarn CLI',
    iconKey: 'node',
    sections: [
      { name: 'npm', items: ['init', 'install', 'run', 'publish', 'audit'] },
      { name: 'yarn', items: ['add', 'remove', 'run', 'workspaces'] },
      { name: 'npx', items: [] },
      { name: 'nvm (node version manager)', items: [] },
    ],
  },
  {
    slug: 'python-cli-tools',
    name: 'Python CLI Tools',
    iconKey: 'python',
    sections: [
      { name: 'pip', items: ['install', 'freeze', 'list'] },
      { name: 'venv / virtualenv', items: [] },
      { name: 'conda', items: [] },
      { name: 'pyenv', items: [] },
    ],
  },
  {
    slug: 'cloud-clis',
    name: 'Cloud CLIs',
    iconKey: 'cloud',
    sections: [
      { name: 'AWS CLI', items: ['s3', 'ec2', 'lambda', 'iam'] },
      { name: 'Google Cloud', items: ['gcloud'] },
      { name: 'Azure CLI', items: ['az'] },
      { name: 'Terraform CLI', items: [] },
      { name: 'Heroku CLI', items: [] },
    ],
  },
  {
    slug: 'power-tools',
    name: 'Power Tools',
    iconKey: 'power-tools',
    sections: [
      { name: 'tmux / screen (terminal multiplexers)', items: [] },
      { name: 'vim / nano (terminal editors)', items: [] },
      { name: 'jq (JSON processing)', items: [] },
      { name: 'yq (YAML processing)', items: [] },
      { name: 'xargs', items: [] },
      { name: 'tee', items: [] },
      { name: 'watch', items: [] },
      { name: 'cron & crontab', items: [] },
      { name: 'make & Makefiles', items: [] },
      { name: 'regex with grep/sed/awk', items: [] },
    ],
  },
  {
    slug: 'security-commands',
    name: 'Security Commands',
    iconKey: 'security',
    sections: [
      { name: 'openssl', items: [] },
      { name: 'gpg', items: [] },
      { name: 'fail2ban', items: [] },
      { name: 'SELinux commands', items: [] },
      { name: 'Audit & Logging', items: [] },
    ],
  },
  {
    slug: 'meta-skills',
    name: 'Meta Skills',
    iconKey: 'meta',
    sections: [
      { name: 'Piping & Redirection', items: ['|', '>', '>>', '<', '2>&1'] },
      { name: 'Environment Variables', items: ['export', '.env', 'PATH'] },
      { name: 'Aliases & Functions', items: ['.bashrc', '.zshrc'] },
      { name: 'Shell Configuration', items: [] },
      { name: 'Wildcards & Globbing', items: [] },
      { name: 'Job Control', items: [] },
      { name: 'Man Pages & Help', items: ['man', '--help', 'info', 'tldr'] },
      { name: 'Shell Differences', items: ['bash', 'zsh', 'fish', 'sh'] },
    ],
  },
]

export const shellCategorySlugs = shellCategories.map((category) => category.slug)