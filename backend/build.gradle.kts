plugins {
	java
	id("org.springframework.boot") version "3.4.0"
	id("io.spring.dependency-management") version "1.1.6"
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
  implementation("org.springframework.boot:spring-boot-starter-security:3.4.2")
  implementation("io.jsonwebtoken:jjwt-api:0.12.6")
  runtimeOnly("io.jsonwebtoken:jjwt-impl:0.12.6")
  runtimeOnly("io.jsonwebtoken:jjwt-jackson:0.12.6")
  implementation("com.stripe:stripe-java:28.3.0")
  implementation("org.springframework.boot:spring-boot-starter-mail")
  implementation("jakarta.validation:jakarta.validation-api:3.1.0")
  implementation("org.springframework.boot:spring-boot-starter-data-jpa")
  implementation("org.springframework.boot:spring-boot-starter-web")
  compileOnly("org.projectlombok:lombok")
  annotationProcessor("org.projectlombok:lombok")
  developmentOnly("org.springframework.boot:spring-boot-devtools")
  implementation("org.postgresql:postgresql:42.5.0")
  testImplementation("org.springframework.boot:spring-boot-starter-test")
  testRuntimeOnly("org.junit.platform:junit-platform-launcher")
  implementation("org.mapstruct:mapstruct:1.6.1")
  annotationProcessor("org.mapstruct:mapstruct-processor:1.6.1")
  implementation("com.github.javafaker:javafaker:1.0.2") {
      exclude(group = "org.yaml", module = "snakeyaml")
  }
  implementation("com.github.loki4j:loki-logback-appender:1.5.2")
}

tasks.withType<Test> {
	useJUnitPlatform()
}

tasks.register("downloadOtelAgent") {
	val agentFile = layout.projectDirectory.file("agents/opentelemetry-javaagent.jar")
	outputs.file(agentFile)
	doLast {
		agentFile.asFile.parentFile.mkdirs()
		if (!agentFile.asFile.exists()) {
			val version = "2.14.0"
			val url = "https://github.com/open-telemetry/opentelemetry-java-instrumentation/releases/download/v$version/opentelemetry-javaagent.jar"
			uri(url).toURL().openStream().use { input ->
				agentFile.asFile.outputStream().use { output -> input.copyTo(output) }
			}
		}
	}
}

tasks.bootRun {
	dependsOn("downloadOtelAgent")
	jvmArgs("-javaagent:${projectDir}/agents/opentelemetry-javaagent.jar")
	environment(
		"OTEL_SERVICE_NAME" to "sebastian-backend",
		"OTEL_EXPORTER_OTLP_ENDPOINT" to "http://localhost:4317",
		"OTEL_EXPORTER_OTLP_PROTOCOL" to "grpc",
		"OTEL_LOGS_EXPORTER" to "none",
		"BACKEND_PORT" to "9069"
	)
}
