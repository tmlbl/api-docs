#!/bin/bash
set -e
set -x

BUILD_DIR="build"
SAVE_DIR="save"
STATIC_DIR="docs"
SAVE_FILENAME="SmartsheetAPI"
FILES_NAME="${SAVE_FILENAME}_Files"
FILES_DIR="$STATIC_DIR/$FILES_NAME"

echo Build in $BUILD_DIR
echo "Expects middleman build output in '"$BUILD_DIR"', save as Web Page, Complete from FireFox in '"$SAVE_DIR"' with filename '"$SAVE_FILENAME"', and will create (overwrite) '"$STATIC_DIR"'"
read -p "press enter to continue"
if [ -d "$STATIC_DIR" ]; then rm -Rf "$STATIC_DIR"; fi

cp -R "$SAVE_DIR" "$STATIC_DIR"

cp "$BUILD_DIR/fonts/"* "$FILES_DIR"
cp "$BUILD_DIR/images/logo"*".png" "$FILES_DIR"

FONT_PATTERN="s-/fonts/-/$FILES_NAME/-g"
IMAGES_PATTERN="s-/images/-/$FILES_NAME/-g"

for f in "$FILES_DIR/"*".css"
do
    sed -e "$FONT_PATTERN" $f > $f.tmp && mv $f.tmp $f
    sed -e "$IMAGES_PATTERN" $f > $f.tmp && mv $f.tmp $f
done

JS_FILE="$FILES_DIR/all_nosearch.js"
sed -e "s-n._generateToc(),--" "$JS_FILE" > "$JS_FILE.tmp" && mv "$JS_FILE.tmp" "$JS_FILE" 

mv "$STATIC_DIR/${SAVE_FILENAME}.html" "$STATIC_DIR/index.html"