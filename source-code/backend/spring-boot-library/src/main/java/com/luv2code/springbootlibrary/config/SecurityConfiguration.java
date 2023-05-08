package com.luv2code.springbootlibrary.config;

import com.okta.spring.boot.oauth.Okta;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.accept.ContentNegotiationStrategy;
import org.springframework.web.accept.HeaderContentNegotiationStrategy;

@Configuration
public class SecurityConfiguration {

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {

        // Disable Cross Site Request Forgery
        http.csrf().disable();

        // authorizes requests to endpoints matching the specified request matcher pattern "/api/books/secure/**"
        // and requires authentication to access them.
        // Additionally, it configures OAuth2 Resource Server support with JWT (JSON Web Token) bearer token validation.
        // Protect endpoints at /api/<type>/secure
        http.authorizeRequests(configurer ->
                 configurer
                        .antMatchers("/api/books/secure/**",
                                "/api/reviews/secure/**",
                                "/api/messages/secure/**",
                                "/api/admin/secure/**")
                        .authenticated())
                .oauth2ResourceServer()
                .jwt();

        // Add CORS filters
        http.cors();

        //Add content negotiation strategy
        http.setSharedObject(ContentNegotiationStrategy.class,
                new HeaderContentNegotiationStrategy());

        // Force a non-emptu response body for 401's to make the response friendly
        Okta.configureResourceServer401ResponseBody(http);
                
        return http.build();
    }
}
