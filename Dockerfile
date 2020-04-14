# https://stackoverflow.com/questions/27767264/how-to-dockerize-maven-project-and-how-many-ways-to-accomplish-it

# Build
FROM maven:3.6.3-jdk-8 AS build
COPY server/src /home/api/src
COPY server/pom.xml /home/api
RUN mvn -f /home/api/pom.xml clean package

# Package
FROM openjdk:8-jre
COPY --from=build /home/api/target/server-1.0-SNAPSHOT-jar-with-dependencies.jar /usr/local/lib/LookBook_API.jar
EXPOSE 8000
ENTRYPOINT [ "java", "-jar", "/usr/local/lib/LookBook_API.jar" ]