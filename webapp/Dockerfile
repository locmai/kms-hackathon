FROM python:3.6-slim

COPY . ./app

WORKDIR ./app

RUN apt-get update

RUN apt-get install -y build-essential libpoppler-cpp-dev pkg-config python-dev

RUN pip install -r requirements.txt

EXPOSE 7070
EXPOSE 27017

ENTRYPOINT ["python"]
CMD ["main.py"]