#!/usr/bin/env bash
# Exit on first error, unset variable, or pipefail
set -euo pipefail

# Define our usage prompt
usage() {
  echo "Usage: $0 <ssh_server>" 1>&2
}

# Resolve our SSH server
ssh_server="${1:-}"
if test "${ssh_server}" == ""; then
  echo "Missing \`ssh_server\` parameter" 1>&2
  usage
  exit 1
fi

# Compile our assets
npm run build

# Deploy our assets to our server
# https://github.com/twolfson/twolfson.com-scripts/blob/2.38.0/bin/deploy-twolfson.com.sh#L64-L68
# DEV: We could do atomic deployment but these are static hashed files, we're fine
target_dir="/var/www/mentor.twolfson.com"
rsync --human-readable --archive --verbose --compress "dist/" "${ssh_server}:${target_dir}/"
