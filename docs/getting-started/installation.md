---
sidebar_position: 1
---

# Установка и настройка СОЛИ

Добро пожаловать в руководство по установке веб-ГИС системы СОЛИ! В этом разделе вы узнаете, как установить и настроить систему для работы в вашей организации.

## Варианты развертывания

СОЛИ предлагает несколько вариантов развертывания в зависимости от ваших потребностей:

### 🌐 Облачная версия (рекомендуется)
Самый простой способ начать работу с СОЛИ — использовать облачную версию.

**Преимущества:**
- Мгновенный доступ без установки
- Автоматические обновления
- Масштабирование по требованию
- Профессиональная техническая поддержка

**Как начать:**
1. Перейдите на [soli-cloud.ru](https://soli-cloud.ru)
2. Зарегистрируйте аккаунт организации
3. Выберите подходящий тарифный план
4. Получите доступ к системе в течение 5 минут

### 🖥️ Локальная установка
Установка СОЛИ на собственных серверах для полного контроля над данными и конфигурацией.

### 🐳 Docker развертывание
Контейнеризованное решение для быстрого развертывания в любой среде.

## Системные требования

### Серверная часть

#### Минимальные требования
- **ОС:** Ubuntu 20.04 LTS, CentOS 8+, Windows Server 2019+
- **CPU:** 4 ядра, 2.4 GHz
- **ОЗУ:** 8 ГБ
- **Дисковое пространство:** 50 ГБ SSD
- **Сеть:** 100 Мбит/с

#### Рекомендуемые требования
- **ОС:** Ubuntu 22.04 LTS
- **CPU:** 8 ядер, 3.0 GHz
- **ОЗУ:** 32 ГБ
- **Дисковое пространство:** 500 ГБ SSD
- **Сеть:** 1 Гбит/с

### База данных
- **PostgreSQL:** 13+ с расширением PostGIS 3.1+
- **Рекомендуемая конфигурация:** 16 ГБ ОЗУ, SSD хранилище

### Клиентская часть
- **Браузеры:** Chrome 90+, Firefox 88+, Safari 14+, Edge 90+
- **Разрешение:** Минимум 1280x720, рекомендуется 1920x1080+
- **Интернет:** 1 Мбит/с (минимум), 10 Мбит/с (рекомендуется)

## Установка с помощью Docker (быстрый старт)

Самый простой способ запустить СОЛИ локально — использовать Docker Compose.

### Предварительные требования

Убедитесь, что у вас установлены:
- [Docker](https://docs.docker.com/get-docker/) версии 20.10+
- [Docker Compose](https://docs.docker.com/compose/install/) версии 2.0+

### Шаг 1: Загрузка конфигурации

```bash
# Клонирование репозитория с конфигурацией
git clone https://github.com/your-organization/soli-docker.git
cd soli-docker

# Или загрузите архив напрямую
wget https://github.com/your-organization/soli-docker/archive/main.zip
unzip main.zip
cd soli-docker-main
```

### Шаг 2: Настройка окружения

Скопируйте файл примера конфигурации и отредактируйте его:

```bash
cp .env.example .env
nano .env
```

Основные параметры в файле `.env`:

```bash
# Основные настройки
SOLI_VERSION=latest
DOMAIN=localhost
HTTP_PORT=80
HTTPS_PORT=443

# База данных
POSTGRES_DB=soli
POSTGRES_USER=soli_user
POSTGRES_PASSWORD=change_this_password
POSTGRES_HOST=database
POSTGRES_PORT=5432

# Настройки безопасности
JWT_SECRET=your_jwt_secret_key_here
ADMIN_EMAIL=admin@your-domain.com
ADMIN_PASSWORD=change_this_password

# Настройки почты (опционально)
SMTP_HOST=smtp.your-domain.com
SMTP_PORT=587
SMTP_USER=noreply@your-domain.com
SMTP_PASSWORD=smtp_password

# Настройки хранилища файлов
STORAGE_TYPE=local
# Для S3: STORAGE_TYPE=s3
# S3_BUCKET=your-bucket
# S3_REGION=us-east-1
# S3_ACCESS_KEY=your-access-key
# S3_SECRET_KEY=your-secret-key
```

### Шаг 3: Запуск системы

```bash
# Запуск в фоновом режиме
docker-compose up -d

# Просмотр логов (опционально)
docker-compose logs -f

# Проверка статуса контейнеров
docker-compose ps
```

### Шаг 4: Первоначальная настройка

После запуска системы выполните инициализацию:

```bash
# Создание администратора
docker-compose exec web python manage.py createsuperuser

# Загрузка демонстрационных данных (опционально)
docker-compose exec web python manage.py loaddata demo_data.json

# Создание индексов для поиска
docker-compose exec web python manage.py rebuild_search_index
```

### Шаг 5: Проверка установки

Откройте браузер и перейдите по адресу:
- **HTTP:** http://localhost
- **HTTPS:** https://localhost (если настроен SSL)

Данные для входа по умолчанию:
- **Логин:** admin@your-domain.com (из .env файла)
- **Пароль:** change_this_password (из .env файла)

## Ручная установка

Для продакшн среды рекомендуется ручная установка с детальной настройкой.

### Шаг 1: Подготовка системы

#### Ubuntu/Debian
```bash
# Обновление системы
sudo apt update && sudo apt upgrade -y

# Установка зависимостей
sudo apt install -y \
    python3.10 \
    python3.10-dev \
    python3-pip \
    postgresql-14 \
    postgresql-14-postgis-3 \
    redis-server \
    nginx \
    git \
    build-essential \
    libpq-dev \
    libgdal-dev \
    libproj-dev \
    libgeos-dev
```

#### CentOS/RHEL
```bash
# Установка EPEL репозитория
sudo dnf install -y epel-release

# Установка зависимостей
sudo dnf install -y \
    python3.10 \
    python3.10-devel \
    python3-pip \
    postgresql14-server \
    postgresql14-contrib \
    postgis33_14 \
    redis \
    nginx \
    git \
    gcc \
    postgresql14-devel \
    gdal-devel \
    proj-devel \
    geos-devel
```

### Шаг 2: Настройка базы данных

```bash
# Инициализация PostgreSQL (для CentOS)
sudo postgresql-setup --initdb

# Запуск сервисов
sudo systemctl enable postgresql redis nginx
sudo systemctl start postgresql redis nginx

# Создание пользователя и базы данных
sudo -u postgres psql << EOF
CREATE USER soli_user WITH PASSWORD 'your_password';
CREATE DATABASE soli OWNER soli_user;
\c soli
CREATE EXTENSION postgis;
CREATE EXTENSION postgis_topology;
GRANT ALL PRIVILEGES ON DATABASE soli TO soli_user;
\q
EOF
```

### Шаг 3: Установка СОЛИ

```bash
# Создание пользователя системы
sudo useradd -m -s /bin/bash soli
sudo mkdir -p /opt/soli
sudo chown soli:soli /opt/soli

# Переключение на пользователя soli
sudo -u soli -i

# Загрузка исходного кода
cd /opt/soli
git clone https://github.com/your-organization/soli.git .

# Создание виртуального окружения
python3.10 -m venv venv
source venv/bin/activate

# Установка зависимостей
pip install --upgrade pip
pip install -r requirements/production.txt
```

### Шаг 4: Конфигурация СОЛИ

```bash
# Создание файла настроек
cp soli/settings/local.py.example soli/settings/local.py
nano soli/settings/local.py
```

Основные настройки в `local.py`:

```python
import os
from .base import *

# Настройки безопасности
SECRET_KEY = 'your-secret-key-here'
DEBUG = False
ALLOWED_HOSTS = ['your-domain.com', 'www.your-domain.com']

# База данных
DATABASES = {
    'default': {
        'ENGINE': 'django.contrib.gis.db.backends.postgis',
        'NAME': 'soli',
        'USER': 'soli_user',
        'PASSWORD': 'your_password',
        'HOST': 'localhost',
        'PORT': '5432',
    }
}

# Redis для кэширования и очередей
CACHES = {
    'default': {
        'BACKEND': 'django_redis.cache.RedisCache',
        'LOCATION': 'redis://127.0.0.1:6379/1',
        'OPTIONS': {
            'CLIENT_CLASS': 'django_redis.client.DefaultClient',
        }
    }
}

# Настройки медиа файлов
MEDIA_ROOT = '/opt/soli/media'
STATIC_ROOT = '/opt/soli/static'

# Настройки почты
EMAIL_BACKEND = 'django.core.mail.backends.smtp.EmailBackend'
EMAIL_HOST = 'smtp.your-domain.com'
EMAIL_PORT = 587
EMAIL_USE_TLS = True
EMAIL_HOST_USER = 'noreply@your-domain.com'
EMAIL_HOST_PASSWORD = 'smtp_password'
```

### Шаг 5: Инициализация приложения

```bash
# Создание директорий
mkdir -p /opt/soli/{logs,media,static}

# Миграция базы данных
python manage.py migrate

# Создание статических файлов
python manage.py collectstatic --noinput

# Создание суперпользователя
python manage.py createsuperuser

# Загрузка начальных данных
python manage.py loaddata initial_data.json
```

## Проверка установки

После завершения установки выполните следующие проверки:

### 1. Проверка доступности
Откройте браузер и перейдите по адресу вашего домена. Вы должны увидеть страницу входа в систему.

### 2. Проверка компонентов
```bash
# Проверка статуса сервисов
sudo systemctl status postgresql nginx redis soli

# Проверка логов
sudo journalctl -u soli -f

# Проверка подключения к базе данных
sudo -u soli /opt/soli/venv/bin/python /opt/soli/manage.py dbshell
```

### 3. Функциональная проверка
- Войдите в систему под учетной записью администратора
- Создайте тестовый проект
- Загрузите тестовые данные
- Создайте простую карту

## Обслуживание и обновления

### Резервное копирование

Создайте скрипт для автоматического резервного копирования:

```bash
#!/bin/bash
# /opt/soli/scripts/backup.sh

BACKUP_DIR="/opt/backups/soli"
DATE=$(date +%Y%m%d_%H%M%S)

# Создание директории
mkdir -p $BACKUP_DIR

# Бэкап базы данных
sudo -u postgres pg_dump soli | gzip > $BACKUP_DIR/db_$DATE.sql.gz

# Бэкап файлов
tar -czf $BACKUP_DIR/media_$DATE.tar.gz -C /opt/soli media/

# Удаление старых бэкапов (старше 30 дней)
find $BACKUP_DIR -type f -mtime +30 -delete
```

### Обновление системы

```bash
# Остановка сервиса
sudo systemctl stop soli

# Переключение на пользователя soli
sudo -u soli -i

# Резервное копирование
cd /opt/soli
git stash
git pull origin main

# Обновление зависимостей
source venv/bin/activate
pip install -r requirements/production.txt

# Миграция базы данных
python manage.py migrate

# Обновление статических файлов
python manage.py collectstatic --noinput

# Перезапуск сервиса
exit
sudo systemctl start soli
```

## Устранение неполадок

### Типичные проблемы

#### 1. Ошибка подключения к базе данных
```bash
# Проверка статуса PostgreSQL
sudo systemctl status postgresql

# Проверка настроек подключения
sudo -u postgres psql -c "\l"
```

#### 2. Проблемы с правами доступа
```bash
# Исправление прав на файлы
sudo chown -R soli:soli /opt/soli
sudo chmod -R 755 /opt/soli
```

### Логи для диагностики
- **Приложение:** `/opt/soli/logs/soli.log`
- **Nginx:** `/var/log/nginx/access.log`, `/var/log/nginx/error.log`
- **PostgreSQL:** `/var/log/postgresql/postgresql-14-main.log`
- **Systemd:** `journalctl -u soli`

---

Поздравляем! СОЛИ успешно установлена и настроена. Переходите к разделу [**Первый вход в систему**](/getting-started/first-login) для начала работы.