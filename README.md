# 🟢 Opti-Puntos - Web Component para inspección y marcado visual

**Opti-Puntos** es un Web Component creado en JavaScript puro que permite agregar, identificar y conectar puntos interactivos sobre imágenes. Es ideal para aplicaciones como inspección de estructuras, documentación visual de planos, detección de defectos o mapeo de relaciones visuales.

![Captura del componente](https://img.youtube.com/vi/ihLloR8W0uU/maxresdefault.jpg)

🎥 [Ver demo en YouTube](https://youtu.be/ihLloR8W0uU)

---

## 🚀 Características

- 🖱️ Dibujar puntos con doble clic.
- 🛠️ Configurar radio, borde, color, transparencia, letra.
- 🔗 Unir puntos entre sí (ej: relaciones o conexiones físicas).
- 🗑️ Eliminar puntos y uniones.
- 💬 Asignar descripciones a cada punto.
- 💾 Exportar imagen resultante (JPG) + datos (TXT).
- 🔍 Tooltip flotante con información del punto.
- 📦 Totalmente encapsulado en un Web Component (`<opti-punto>`).

---

## ⚙️ Uso básico

1. Incluí el archivo del componente:

```html
<script type="module" src="opti-punto.js"></script>
<opti-punto></opti-punto>

