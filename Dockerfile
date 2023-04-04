
FROM node:16-alpine as build-step

WORKDIR /app

RUN mkdir ./frontend

COPY ./frontend ./frontend

WORKDIR /app/frontend

RUN npm install

RUN npm run build


FROM python:3.10.10-slim-bullseye

WORKDIR /app

COPY --from=build-step /app/frontend/dist ./dist

RUN mkdir ./backend

COPY ./backend ./backend

RUN pip install -r ./backend/requirements.txt

EXPOSE 5000

WORKDIR /app/backend

CMD ["gunicorn", "-k", "geventwebsocket.gunicorn.workers.GeventWebSocketWorker",  "-w", "1",  "server:app", "-b", ":5000"]
