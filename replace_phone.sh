#!/bin/bash

# Цвета
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

echo -e "${GREEN}========================================${NC}"
echo -e "${GREEN}  Замена номера телефона${NC}"
echo -e "${GREEN}========================================${NC}"
echo ""

# Подтверждение
read -p "Заменить все старые номера на 8-967-464-63-10? (y/n): " -n 1 -r
echo ""
if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    echo -e "${RED}Отменено.${NC}"
    exit 1
fi

echo ""
echo -e "${GREEN}Начинаю замену...${NC}"
echo ""

COUNT=0

# Проход по всем файлам
for file in $(find . -type f \( -name "*.html" -o -name "*.js" -o -name "*.htm" \) 2>/dev/null); do
    
    # Проверяем, есть ли что менять
    if grep -q "843.*123.*45\|78431234567\|89674646310\|+7 (843)" "$file" 2>/dev/null; then
        echo -e "Обработка: ${YELLOW}$file${NC}"
        
        # Замена отображаемого номера
        sed -i '' 's/+7 (843) 123-45-67/8-967-464-63-10/g' "$file" 2>/dev/null
        sed -i 's/+7 (843) 123-45-67/8-967-464-63-10/g' "$file" 2>/dev/null
        
        # Замена tel: ссылок (оба варианта)
        sed -i '' 's/tel:+78431234567/tel:+79674646310/g' "$file" 2>/dev/null
        sed -i 's/tel:+78431234567/tel:+79674646310/g' "$file" 2>/dev/null
        
        sed -i '' 's/tel:89674646310/tel:+79674646310/g' "$file" 2>/dev/null
        sed -i 's/tel:89674646310/tel:+79674646310/g' "$file" 2>/dev/null
        
        # Замена других вариантов
        sed -i '' 's/89674646310/8-967-464-63-10/g' "$file" 2>/dev/null
        sed -i 's/89674646310/8-967-464-63-10/g' "$file" 2>/dev/null
        
        COUNT=$((COUNT + 1))
    fi
done

echo ""
echo -e "${GREEN}========================================${NC}"
echo -e "${GREEN}  Готово!${NC}"
echo -e "${GREEN}========================================${NC}"
echo -e "Обработано файлов: ${YELLOW}$COUNT${NC}"
echo ""

# Проверка
echo -e "${YELLOW}Проверка оставшихся проблем...${NC}"
REMAINING=$(grep -rn "843.*123.*45\|78431234567\|89674646310" . --include="*.html" --include="*.js" 2>/dev/null | grep -v "Binary" | wc -l)

if [ "$REMAINING" -gt 0 ]; then
    echo -e "${RED}Найдено $REMAINING проблем:${NC}"
    grep -rn "843.*123.*45\|78431234567\|89674646310" . --include="*.html" --include="*.js" 2>/dev/null | grep -v "Binary"
else
    echo -e "${GREEN}✅ Все номера успешно заменены!${NC}"
fi