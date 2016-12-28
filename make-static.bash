#!/bin/bash
set -e
set -x

BUILD_DIR="build"
SAVE_DIR="save"
OUTPUT_DIR="static"
SAVE_FILENAME="SmartsheetAPI"
FILES_NAME="${SAVE_FILENAME}_Files"
FILES_DIR="$OUTPUT_DIR/$FILES_NAME"

echo Build in $BUILD_DIR
echo "Expects middleman build output in '"$BUILD_DIR"', save as HTML from FireFox in '"$SAVE_DIR"' with filename '"$SAVE_FILENAME"', and will create (overwrite) '"$OUTPUT_DIR"'"
read -p "press enter to continue"
if [ -d "$OUTPUT_DIR" ]; then rm -Rf "$OUTPUT_DIR"; fi

cp -R "$SAVE_DIR" "$OUTPUT_DIR"

cp "$BUILD_DIR/fonts/"* "$FILES_DIR"
cp "$BUILD_DIR/images/logo"*".png" "$FILES_DIR"

FONT_PATTERN="s-/fonts/-/$FILES_NAME/-g"
IMAGES_PATTERN="s-/images/-/$FILES_NAME/-g"

for f in "$FILES_DIR/"*".css"
do
    sed -e "$FONT_PATTERN" $f > $f.tmp && mv $f.tmp $f
    sed -e "$IMAGES_PATTERN" $f > $f.tmp && mv $f.tmp $f
done

sed -e "s-_generateTOC();--" "$OUTPUT_DIR/${SAVE_FILENAME}.html" > "$OUTPUT_DIR/index.html" && rm "$OUTPUT_DIR/${SAVE_FILENAME}.html" 