# Docker Setup для E-Store Angular 20

## Быстрый старт

### Production сборка
```bash
# Переходим в папку docker
cd docker

# Сборка и запуск production версии
docker-compose up --build

# Или в фоновом режиме
docker-compose up -d --build
```

### Development режим
```bash
# Переходим в папку docker
cd docker

# Запуск development сервера
docker-compose -f docker-compose.dev.yml up --build

# Или в фоновом режиме
docker-compose -f docker-compose.dev.yml up -d --build
```

## Доступ к приложению

- **Production**: http://localhost
- **Development**: http://localhost:4200

## Полезные команды

### Управление контейнерами
```bash
# Переходим в папку docker
cd docker

# Остановка всех контейнеров
docker-compose down

# Просмотр логов
docker-compose logs -f

# Пересборка без кеша
docker-compose build --no-cache
```

### Development команды
```bash
# Переходим в папку docker
cd docker

# Установка новых зависимостей
docker-compose -f docker-compose.dev.yml exec web-app npm install <package>

# Запуск тестов
docker-compose -f docker-compose.dev.yml exec web-app npm test

# Сборка для production
docker-compose -f docker-compose.dev.yml exec web-app npx ng build
```

### Очистка
```bash
# Переходим в папку docker
cd docker

# Удаление всех контейнеров и образов
docker-compose down --rmi all

# Полная очистка Docker
docker system prune -a
```

## Структура Docker файлов

Все Docker файлы находятся в папке `docker/`:

- `docker/Dockerfile` - Production сборка с nginx
- `docker/Dockerfile.dev` - Development сборка с hot reload
- `docker/docker-compose.yml` - Production конфигурация
- `docker/docker-compose.dev.yml` - Development конфигурация
- `docker/nginx.conf` - Nginx конфигурация для production
- `.dockerignore` - Исключения для Docker build (в корне проекта)

## Особенности

- Multi-stage build для оптимизации размера образа
- Nginx для production с gzip сжатием и кешированием
- Health check для мониторинга
- Hot reload для development
- Безопасность через nginx заголовки
