FROM python:3.11-slim

WORKDIR /app

# Install system dependencies
RUN apt-get update && apt-get install -y \
    libreoffice \
    libreoffice-writer \
    build-essential \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

# Copy requirements first for better caching
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy application code
COPY app/ /app/app/
COPY templates/ /app/templates/
RUN mkdir -p /app/output/auto /app/output/home /app/output/specialty /app/data/lancedb

# Set environment variables
ENV PYTHONPATH=/app
ENV TEMPLATE_DIR=/app/templates
ENV OUTPUT_DIR=/app/output
ENV DB_PATH=/app/data/lancedb

# Run using uvicorn
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8001"] 