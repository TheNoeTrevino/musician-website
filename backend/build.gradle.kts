plugins {
	java
	id("org.springframework.boot") version "3.5.12"
	id("io.spring.dependency-management") version "1.1.7"
}

group = "com.project"
version = "0.0.1-SNAPSHOT"

tasks.bootJar {
	archiveFileName.set("sebastian-api.jar")
}

java {
	toolchain {
		languageVersion = JavaLanguageVersion.of(21)
	}
}

configurations {
	compileOnly {
		extendsFrom(configurations.annotationProcessor.get())
	}
}

repositories {
	mavenCentral()
}

dependencies {
  implementation("org.springframework.boot:spring-boot-starter-actuator")
  implementation("io.micrometer:micrometer-tracing-bridge-otel")
  implementation("io.opentelemetry:opentelemetry-exporter-otlp")
  implementation("io.micrometer:context-propagation")
  implementation("org.springframework.boot:spring-boot-starter-security")
  implementation("io.jsonwebtoken:jjwt-api:0.12.6")
  runtimeOnly("io.jsonwebtoken:jjwt-impl:0.12.6")
  runtimeOnly("io.jsonwebtoken:jjwt-jackson:0.12.6")
  implementation("com.stripe:stripe-java:28.3.0")
  implementation("org.springframework.boot:spring-boot-starter-mail")
  implementation("jakarta.validation:jakarta.validation-api:3.1.0")
  implementation("org.springframework.boot:spring-boot-starter-data-jpa")
  implementation("org.springframework.boot:spring-boot-starter-web")
  compileOnly("org.projectlombok:lombok:1.18.44")
  annotationProcessor("org.projectlombok:lombok:1.18.44")
  implementation("org.postgresql:postgresql")
  testImplementation("org.springframework.boot:spring-boot-starter-test")
  testRuntimeOnly("org.junit.platform:junit-platform-launcher")
  implementation("org.mapstruct:mapstruct:1.6.1")
  annotationProcessor("org.mapstruct:mapstruct-processor:1.6.1")
  implementation("com.github.javafaker:javafaker:1.0.2") {
      exclude(group = "org.yaml", module = "snakeyaml")
  }
  implementation("com.github.loki4j:loki-logback-appender:1.6.0")
}

tasks.withType<Test> {
	useJUnitPlatform()
}

tasks.bootRun {
	systemProperties["spring.devtools.restart.enabled"] = "false"

	// Load .env file
	val envFile = rootProject.file("../.env")
	val envMap = mutableMapOf<String, String>()
	if (envFile.exists()) {
		envFile.readLines().forEach { line ->
			if (line.isNotBlank() && !line.startsWith("#")) {
				val parts = line.split("=", limit = 2)
				if (parts.size == 2) {
					envMap[parts[0].trim()] = parts[1].trim().removeSurrounding("\"")
				}
			}
		}
	}

	environment(envMap + mapOf(
		"BACKEND_PORT" to "8081"
	))
}
