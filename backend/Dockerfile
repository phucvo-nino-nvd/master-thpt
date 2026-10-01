FROM python:3.14-slim

WORKDIR /app/backend

COPY --from=ghcr.io/astral-sh/uv:latest /uv /bin/uv

COPY requirements.txt .
RUN uv pip install --system --no-cache -r requirements.txt

COPY . .

CMD ["uvicorn", "api.router:app", "--host", "0.0.0.0", "--port", "8000", "--workers", "1"]
