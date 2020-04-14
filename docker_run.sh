#!/bin/bash
sudo docker rm $(sudo docker ps -a -q)
sudo docker image rm $(sudo docker images -a -q)
sudo docker-compose up 
