#!/bin/bash

# Цвета для вывода
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

# Старые номера (все возможные варианты)
OLD_PHONES=(
    '+7 (843) 123-45-67'
    '+7 (843) 123-45-6'
    '+7 (843) 123-45-'
    '+7 (843) 123-45'
    '+7 (843) 123-4'
    '+7 (843) 123-'
    '+7 (843) 123'
    '+7 (843) 12'
    '+7 (843) 1'
    '+7 (843)'
    '8-843-123-45-67'
    '88431234567'
    '+78431234567'
    'tel:+78431234567'
)

# Новые номера
NEW_PHONE_DISPLAY="8-967-464-63-10"
NEW_PHONE_TEL="tel:+79674646310"

echo -e "${GREEN}========================================${NC}"
echo -e "${GREEN}  Замена номера телефона во всех файлах${NC}"
echo -e "${GREEN}========================================${NC}"
echo ""
echo -e "Старый номер: ${YELLOW}+7 (843) 123-45-67${NC}"
echo -e "Новый номер:  ${YELLOW}$NEW_PHONE_DISPLAY${NC}"
echo ""

# Подтверждение
read -p "Продолжить? (y/n): " -n 1 -r
echo ""
if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    echo -e "${RED}Отменено.${NC}"
    exit 1
fi

echo ""
echo -e "${GREEN}Начинаю замену...${NC}"
echo ""

# Счётчик
COUNT=0

# Проход по всем файлам
for file in $(find . -type f \( -name "*.html" -o -name "*.js" -o -name "*.htm" -o -name "*.php" \) 2>/dev/null); do
    MODIFIED=0
    
    # Проверяем, содержит ли файл старый номер
    for old in "${OLD_PHONES[@]}"; do
        if grep -q "$old" "$file" 2>/dev/null; then
            MODIFIED=1
            break
        fi
    done
    
    if [ $MODIFIED -eq 1 ]; then
        echo -e "Обработка: ${YELLOW}$file${NC}"
        
        # Замена во всех вариантах
        for old in "${OLD_PHONES[@]}"; do
            # Замена отображаемого номера
            sed -i '' "s/$old/$NEW_PHONE_DISPLAY/g" "$file" 2>/dev/null
            # Если не сработало (Linux)
            if [ $? -ne 0 ]; then
                sed -i "s/$old/$NEW_PHONE_DISPLAY/g" "$file"
            fi
        done
        
        # Специальная замена для tel: ссылок
        sed -i '' 's/tel:+78431234567/tel:+79674646310/g' "$file" 2>/dev/null
        sed -i 's/tel:+78431234567/tel:+79674646310/g' "$file" 2>/dev/null
        
        COUNT=$((COUNT + 1))
    fi
done

echo ""
echo -e "${GREEN}========================================${NC}"
echo -e "${GREEN}  Готово!${NC}"
echo -e "${GREEN}========================================${NC}"
echo -e "Обработано файлов: ${YELLOW}$COUNT${NC}"
echo ""

# Финальная проверка
echo -e "${YELLOW}Проверка оставшихся старых номеров...${NC}"
REMAINING=$(grep -r "843.*123.*45\|78431234567" . --include="*.html" --include="*.js" 2>/dev/null | grep -v "Binary" | wc -l)

if [ "$REMAINING" -gt 0 ]; then
    echo -e "${RED}Внимание! Найдено $REMAINING оставшихся вхождений:${NC}"
    grep -r "843.*123.*45\|78431234567" . --include="*.html" --include="*.js" 2>/dev/null | grep -v "Binary"
else
    echo -e "${GREEN}✅ Все номера успешно заменены!${NC}"
fi