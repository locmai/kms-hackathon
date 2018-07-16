# kms-hackathon


## Introduction

For unemployed people with low-level skills, the EASY product is a job search consultant that not only connects employers with those who are qualified for the jobs but also helps the unemployed explore their potentials. Unlike online application tracking systems which require domain-specific knowledge and resume writing skill, our product’s focus is to provide a simple but effective UI that brings a better UX to all users, making the application process fast and convenient.

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

![screenshot1](demo.png?raw=true "Demo")

## Technology stack

### Front-end

* React 16

### Back-end
* Flask
* MongoDB
* Docker 

We used Flask for fast prototyping the RESTful API server so the Front-end application can communicate to and as a connection between the logic handlers with the UI. The logic handlers (powered by various ML models to handle both users' messages and CV sent from the users) were written in Python, so we could leverage that and the integration process was really fast. 

### Machine Learning Techniques

Text Classification: State-of-the-art Text Classification based on sub-word feature, supporting Vietnamese.
Text Clustering: Kmean cluster- unsupervised learning algorithm- is not required any annotations. Thus, the system could be improved significantly by adding more training data. The authors took advantage of the binary decision tree to give pieces of advice for the job seeker

