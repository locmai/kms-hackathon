#! /bin/sh
cd ./webapp \
&& python main.py \
&& cd .. \
&& cd ./frontend \
&& .yarn start
