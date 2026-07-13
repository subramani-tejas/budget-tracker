# ==========================================
# STAGE 1: Build the application
# ==========================================
# We use the JDK (Java Development Kit) here because it contains the compiler
FROM eclipse-temurin:17-jdk-alpine AS builder

WORKDIR /build

# Copy your entire project into the container
COPY . .

# Ensure the Maven wrapper has permission to execute
RUN chmod +x mvnw

# Run the Maven build inside the container
RUN ./mvnw clean package -DskipTests

# ==========================================
# STAGE 2: Run the application
# ==========================================
# We switch to the JRE (Java Runtime Environment) because it is much smaller and lighter
FROM eclipse-temurin:17-jre-alpine

WORKDIR /app

# Copy ONLY the compiled .jar file from the builder stage above
COPY --from=builder /build/target/*.jar app.jar

# Define the health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=10s --retries=3 \
  CMD wget --quiet --tries=1 --spider http://localhost:8080/actuator/health || exit 1

# Start the application
ENTRYPOINT ["java", "-jar", "app.jar"]
