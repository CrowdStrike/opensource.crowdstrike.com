#!/bin/bash
#
# Usage:
#   ./scripts/png-to-webp.sh file/path.png
#
# Comparison: https://developers.google.com/speed/webp/gallery2
system_name=$(uname -s)
input_file=$1
output_file=$(sed "s/\.png$/\.webp/" <<< $input_file)

echo "Input: $input_file"
echo "Output: $output_file"

# On Ubuntu/De Linux:
#   apt install webp
if [[ "$system_name" == "Linux" ]]; then
  cwebp $input_file -lossless -m 6 -q 100 -o $output_file
elif [[ "$system_name" == "Darwin" ]]; then
  cwebp $input_file -lossless -m 6 -q 100 -o $output_file
else
  echo "Platform is unsupported (currently: $system_name)";
  echo "Make changes for your platform in scripts/png-to-webp.sh"
  exit 1;
fi
