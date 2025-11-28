#!/bin/bash

# Maysternya Theme ZIP Builder Script
# Creates a distributable ZIP file of the WordPress theme

set -e

# Configuration
THEME_NAME="maysternya-theme"
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
THEME_DIR="$SCRIPT_DIR/wordpress-theme/$THEME_NAME"
OUTPUT_DIR="$SCRIPT_DIR/dist"
TIMESTAMP=$(date +"%Y%m%d_%H%M%S")
ZIP_NAME="${THEME_NAME}_${TIMESTAMP}.zip"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${GREEN}========================================${NC}"
echo -e "${GREEN}  Maysternya Theme ZIP Builder${NC}"
echo -e "${GREEN}========================================${NC}"
echo ""

# Check if theme directory exists
if [ ! -d "$THEME_DIR" ]; then
    echo -e "${RED}Error: Theme directory not found at $THEME_DIR${NC}"
    exit 1
fi

# Create output directory
mkdir -p "$OUTPUT_DIR"

# Check if blocks need to be built
BLOCKS_DIR="$THEME_DIR/blocks"
BUILD_DIR="$BLOCKS_DIR/build"

if [ -d "$BLOCKS_DIR" ]; then
    if [ ! -d "$BUILD_DIR" ] || [ ! -f "$BUILD_DIR/index.js" ]; then
        echo -e "${YELLOW}Building Gutenberg blocks...${NC}"
        
        if [ -f "$BLOCKS_DIR/package.json" ]; then
            cd "$BLOCKS_DIR"
            
            # Install dependencies if node_modules doesn't exist
            if [ ! -d "node_modules" ]; then
                echo "Installing dependencies..."
                npm install
            fi
            
            # Build blocks
            echo "Running build..."
            npm run build
            
            cd "$SCRIPT_DIR"
            echo -e "${GREEN}Blocks built successfully!${NC}"
        else
            echo -e "${YELLOW}Warning: package.json not found in blocks directory${NC}"
        fi
    else
        echo -e "${GREEN}Block build already exists${NC}"
    fi
fi

# Create temporary directory for clean copy
TEMP_DIR=$(mktemp -d)
TEMP_THEME_DIR="$TEMP_DIR/$THEME_NAME"

echo ""
echo "Creating clean theme copy..."

# Copy theme to temp directory
cp -R "$THEME_DIR" "$TEMP_THEME_DIR"

# Remove development files
echo "Removing development files..."

# Remove node_modules
rm -rf "$TEMP_THEME_DIR/blocks/node_modules"

# Remove source files (keep only build)
rm -rf "$TEMP_THEME_DIR/blocks/src"
rm -f "$TEMP_THEME_DIR/blocks/package-lock.json"

# Remove any .git directories
find "$TEMP_THEME_DIR" -name ".git" -type d -exec rm -rf {} + 2>/dev/null || true

# Remove .DS_Store files (macOS)
find "$TEMP_THEME_DIR" -name ".DS_Store" -type f -delete 2>/dev/null || true

# Remove any backup files
find "$TEMP_THEME_DIR" -name "*.bak" -type f -delete 2>/dev/null || true
find "$TEMP_THEME_DIR" -name "*~" -type f -delete 2>/dev/null || true

# Remove development-only files if they exist
rm -f "$TEMP_THEME_DIR/.eslintrc*" 2>/dev/null || true
rm -f "$TEMP_THEME_DIR/.prettierrc*" 2>/dev/null || true
rm -f "$TEMP_THEME_DIR/.editorconfig" 2>/dev/null || true
rm -f "$TEMP_THEME_DIR/phpcs.xml*" 2>/dev/null || true
rm -f "$TEMP_THEME_DIR/composer.json" 2>/dev/null || true
rm -f "$TEMP_THEME_DIR/composer.lock" 2>/dev/null || true

# Create ZIP file
echo ""
echo "Creating ZIP archive..."

cd "$TEMP_DIR"
zip -r "$OUTPUT_DIR/$ZIP_NAME" "$THEME_NAME" -x "*.DS_Store" -x "*__MACOSX*"

# Cleanup
rm -rf "$TEMP_DIR"

# Calculate file size
ZIP_SIZE=$(ls -lh "$OUTPUT_DIR/$ZIP_NAME" | awk '{print $5}')

echo ""
echo -e "${GREEN}========================================${NC}"
echo -e "${GREEN}  Build Complete!${NC}"
echo -e "${GREEN}========================================${NC}"
echo ""
echo -e "Output: ${GREEN}$OUTPUT_DIR/$ZIP_NAME${NC}"
echo -e "Size: ${GREEN}$ZIP_SIZE${NC}"
echo ""
echo "You can now upload this ZIP file to WordPress:"
echo "  1. Go to WordPress Admin → Appearance → Themes"
echo "  2. Click 'Add New' → 'Upload Theme'"
echo "  3. Select the ZIP file and install"
echo ""

# Also create a "latest" symlink/copy
LATEST_ZIP="$OUTPUT_DIR/${THEME_NAME}_latest.zip"
cp "$OUTPUT_DIR/$ZIP_NAME" "$LATEST_ZIP"
echo -e "Latest version also available at: ${GREEN}$LATEST_ZIP${NC}"
echo ""
