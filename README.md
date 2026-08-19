## CI/CD

### Integración continua

Este proyecto utiliza GitHub Actions para validar automáticamente los cambios enviados a través de solicitudes de incorporación de cambios (pull requests) dirigidas a la rama `main`.

El proceso de CI lleva a cabo los siguientes pasos:

1. Descargar el repositorio
2. Configurar pnpm
3. Configurar Node.js
4. Instalar las dependencias
5. Ejecutar la comprobación de tipos de TypeScript
6. Ejecutar pruebas unitarias con Jest

La solicitud de incorporación de cambios solo se considerará lista para fusionarse cuando se hayan superado todas las comprobaciones de CI.
