package in.vittalkumar.billingsoftware.config;

import org.springframework.context.annotation.Configuration;

// CORS is fully handled by SecurityConfig (CorsFilter bean + corsConfigurationSource).
// This class is intentionally left empty to avoid conflicting CORS configuration.
// The old WebMvcConfigurer CORS had allowCredentials(false) which blocked Authorization headers.
@Configuration
public class WebConfig {
}
