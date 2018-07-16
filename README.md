# kms-hackathon

## Setup

### Pre-requisite:

* Python 3.6+
* Node 8+
* npm 5++
* Prepare the model.bin file (since this file is too large, please contact the contributors of this repo for more infomation)
* Linux machine is recommended

### Setup MongoDB :

Run with Docker:

```bash
docker run --rm -p 27017:27017 bitnami/mongodb
```

Install required Python packages for the back-end server (using virtualenv is recommended)

```bash
cd webapp
pip install -r requirements.txt
```

Install required yarn packages for front-end server:

```bash
cd frontend
yarn install
```

### Start the application:

Run the back-end server:

```bash
cd webapp
python main.py
```

Run the front-end server:

```bash
yarn start
```

## Screenshots

TBD 

## Future works

TBD