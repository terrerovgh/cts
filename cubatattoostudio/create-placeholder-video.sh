#!/bin/bash

# Script para crear un video placeholder para el hero
# Este video será reemplazado por el video real del cliente

echo "Creando video placeholder para hero..."

# Crear directorio de assets si no existe
mkdir -p /workspaces/cts/cubatattoostudio/public/assets

# Crear un video simple usando ffmpeg (si está disponible)
if command -v ffmpeg >/dev/null 2>&1; then
    echo "FFmpeg encontrado. Creando video placeholder..."
    
    # Crear un video de 10 segundos con fondo negro y texto
    ffmpeg -f lavfi -i color=black:size=1920x1080:duration=10:rate=30 \
           -vf "drawtext=text='CUBA TATTOO STUDIO':fontcolor=white:fontsize=60:x=(w-text_w)/2:y=(h-text_h)/2,drawtext=text='Arte en la piel':fontcolor=gray:fontsize=30:x=(w-text_w)/2:y=(h-text_h)/2+100" \
           -c:v libx264 -pix_fmt yuv420p -g 30 \
           /workspaces/cts/cubatattoostudio/public/assets/hero.mp4 \
           -y 2>/dev/null
    
    if [ $? -eq 0 ]; then
        echo "✅ Video placeholder creado: /public/assets/hero.mp4"
    else
        echo "❌ Error creando video con ffmpeg"
    fi
else
    echo "⚠️ FFmpeg no disponible. El video deberá ser añadido manualmente."
    echo "Por favor, coloca un video MP4 en: /workspaces/cts/cubatattoostudio/public/assets/hero.mp4"
fi

echo "Script completado."
