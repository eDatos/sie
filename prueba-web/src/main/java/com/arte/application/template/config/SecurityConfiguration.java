package com.arte.application.template.config;

import javax.annotation.PostConstruct;

import org.apache.commons.lang3.StringUtils;
import org.ehcache.Cache;
import org.ehcache.CacheManager;
import org.ehcache.config.builders.CacheConfigurationBuilder;
import org.ehcache.config.builders.CacheManagerBuilder;
import org.ehcache.config.builders.ResourcePoolsBuilder;
import org.ehcache.core.Ehcache;
import org.jasig.cas.client.session.SingleSignOutFilter;
import org.jasig.cas.client.validation.Cas20ServiceTicketValidator;
import org.springframework.beans.factory.BeanInitializationException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.access.PermissionEvaluator;
import org.springframework.security.access.expression.method.DefaultMethodSecurityExpressionHandler;
import org.springframework.security.access.expression.method.MethodSecurityExpressionHandler;
import org.springframework.security.cas.ServiceProperties;
import org.springframework.security.cas.authentication.CasAssertionAuthenticationToken;
import org.springframework.security.cas.authentication.CasAuthenticationProvider;
import org.springframework.security.cas.authentication.CasAuthenticationToken;
import org.springframework.security.cas.web.CasAuthenticationEntryPoint;
import org.springframework.security.cas.web.CasAuthenticationFilter;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.method.configuration.GlobalMethodSecurityConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.AuthenticationUserDetailsService;
import org.springframework.security.core.userdetails.UserDetailsByNameServiceWrapper;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.data.repository.query.SecurityEvaluationContextExtension;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.security.web.authentication.logout.LogoutFilter;
import org.springframework.security.web.authentication.logout.SecurityContextLogoutHandler;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;
import org.springframework.web.filter.CorsFilter;

import com.arte.application.template.security.jwt.CasEhCacheBasedTicketCache;
import com.arte.application.template.security.jwt.JWTAuthenticationSuccessHandler;
import com.arte.application.template.security.jwt.JWTFilter;
import com.arte.application.template.security.jwt.TokenProvider;

import io.github.jhipster.config.JHipsterProperties;
import io.github.jhipster.security.Http401UnauthorizedEntryPoint;

@Configuration
@EnableWebSecurity
@EnableGlobalMethodSecurity(prePostEnabled = true, securedEnabled = true)
public class SecurityConfiguration extends WebSecurityConfigurerAdapter {

    private final UserDetailsService userDetailsService;

    private final TokenProvider tokenProvider;

    private final CorsFilter corsFilter;

    private final AuthenticationManagerBuilder authenticationManagerBuilder;

    private JHipsterProperties jHipsterProperties;

    private ApplicationProperties applicationProperties;

    public SecurityConfiguration(AuthenticationManagerBuilder authenticationManagerBuilder, UserDetailsService userDetailsService, TokenProvider tokenProvider, CorsFilter corsFilter,
            JHipsterProperties jHipsterProperties, ApplicationProperties applicationProperties) {

        this.authenticationManagerBuilder = authenticationManagerBuilder;
        this.userDetailsService = userDetailsService;
        this.tokenProvider = tokenProvider;
        this.corsFilter = corsFilter;
        this.jHipsterProperties = jHipsterProperties;
        this.applicationProperties = applicationProperties;
    }

    @Configuration
    @EnableGlobalMethodSecurity(prePostEnabled = true)
    static class MethodSecurityConfiguration extends GlobalMethodSecurityConfiguration {

        @Autowired
        private PermissionEvaluator permissionEvaluator;

        @Override
        protected MethodSecurityExpressionHandler createExpressionHandler() {
            DefaultMethodSecurityExpressionHandler handler = new DefaultMethodSecurityExpressionHandler();
            handler.setPermissionEvaluator(permissionEvaluator);
            return handler;
        }
    }

    @PostConstruct
    public void init() {
        try {
            authenticationManagerBuilder.authenticationProvider(casAuthenticationProvider());
        } catch (Exception e) {
            throw new BeanInitializationException("Configuración de seguridad fallida", e);
        }
    }

    // ******************* CAS **********

    @Bean
    public ServiceProperties serviceProperties() {
        ServiceProperties serviceProperties = new ServiceProperties();
        serviceProperties.setService(StringUtils.removeEnd(applicationProperties.getCas().getApplicationHome(), "/") + "/login/cas");
        serviceProperties.setSendRenew(false);
        return serviceProperties;
    }

    // @Bean
    public CasEhCacheBasedTicketCache statelessTicketCache() {
        CasEhCacheBasedTicketCache statelessTicketCache = new CasEhCacheBasedTicketCache();
        CacheManager cacheManager = CacheManagerBuilder.newCacheManagerBuilder()
                .withCache("casTickets", CacheConfigurationBuilder.newCacheConfigurationBuilder(String.class, CasAuthenticationToken.class, ResourcePoolsBuilder.heap(10))).build();
        cacheManager.init();

        Cache<String, CasAuthenticationToken> cache = cacheManager.getCache("casTickets", String.class, CasAuthenticationToken.class);
        statelessTicketCache.setCache((Ehcache<String, CasAuthenticationToken>) cache);

        return statelessTicketCache;
    }

    // FIXME: Eliminar referencias a la plantilla (com.arte.application.template, arte-application-template, etc...)
    @Bean
    public CasAuthenticationProvider casAuthenticationProvider() {
        CasAuthenticationProvider casAuthenticationProvider = new CasAuthenticationProvider();
        casAuthenticationProvider.setAuthenticationUserDetailsService(authenticationUserDetailsService());
        casAuthenticationProvider.setServiceProperties(serviceProperties());
        casAuthenticationProvider.setTicketValidator(cas20ServiceTicketValidator());
        casAuthenticationProvider.setKey("ARTE_APPLICATION_TEMPLATE_CAS");
        return casAuthenticationProvider;
    }

    @Bean
    public AuthenticationUserDetailsService<CasAssertionAuthenticationToken> authenticationUserDetailsService() {
        return new UserDetailsByNameServiceWrapper<>(userDetailsService);
    }

    @Bean
    public Cas20ServiceTicketValidator cas20ServiceTicketValidator() {
        return new Cas20ServiceTicketValidator(applicationProperties.getCas().getValidate());
    }

    @Bean
    public AuthenticationSuccessHandler authenticationSuccessHandler() {
        return new JWTAuthenticationSuccessHandler(tokenProvider, jHipsterProperties);
    }

    @Bean
    public CasAuthenticationFilter casAuthenticationFilter() throws Exception {
        CasAuthenticationFilter casAuthenticationFilter = new CasAuthenticationFilter();
        casAuthenticationFilter.setAuthenticationManager(authenticationManager());
        casAuthenticationFilter.setAuthenticationSuccessHandler(authenticationSuccessHandler());
        return casAuthenticationFilter;
    }

    @Bean
    public CasAuthenticationEntryPoint casAuthenticationEntryPoint() {
        CasAuthenticationEntryPoint casAuthenticationEntryPoint = new CasAuthenticationEntryPoint();
        casAuthenticationEntryPoint.setLoginUrl(applicationProperties.getCas().getLogin());
        casAuthenticationEntryPoint.setServiceProperties(serviceProperties());
        return casAuthenticationEntryPoint;
    }

    public SingleSignOutFilter singleSignOutFilter() {
        SingleSignOutFilter singleSignOutFilter = new SingleSignOutFilter();
        singleSignOutFilter.setCasServerUrlPrefix(applicationProperties.getCas().getEndpoint());
        return singleSignOutFilter;
    }

    @Bean
    public SecurityContextLogoutHandler casLogoutHandler() {
        SecurityContextLogoutHandler logoutHandler = new SecurityContextLogoutHandler();
        logoutHandler.setClearAuthentication(true);
        logoutHandler.setInvalidateHttpSession(true);
        return logoutHandler;
    }

    @Bean
    public LogoutFilter requestCasGlobalLogoutFilter() {
        LogoutFilter logoutFilter = new LogoutFilter(StringUtils.removeEnd(applicationProperties.getCas().getLogout(), "/"), casLogoutHandler());
        logoutFilter.setLogoutRequestMatcher(new AntPathRequestMatcher("/logout", "GET"));
        return logoutFilter;
    }

    @Bean
    public Http401UnauthorizedEntryPoint http401UnauthorizedEntryPoint() {
        return new Http401UnauthorizedEntryPoint();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Override
    public void configure(WebSecurity web) throws Exception {
        //@formatter:off
        web.ignoring()
            .antMatchers(HttpMethod.OPTIONS, "/**")
            .antMatchers("/app/**/*.{js,html}")
            .antMatchers("/bower_components/**")
            .antMatchers("/i18n/**")
            .antMatchers("/content/**")
            .antMatchers("/swagger-ui/index.html")
            .antMatchers("/visualizer-static/**")
            .antMatchers("/test/**");
        //@formatter:on
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        JWTFilter customFilter = new JWTFilter(tokenProvider);
        //@formatter:off
        http
        	.addFilter(casAuthenticationFilter())
            .addFilterBefore(corsFilter, CasAuthenticationFilter.class)
            .addFilterBefore(customFilter, CasAuthenticationFilter.class)
            .addFilterBefore(singleSignOutFilter(), CasAuthenticationFilter.class)
	    	.addFilterBefore(requestCasGlobalLogoutFilter(), LogoutFilter.class)
            .exceptionHandling()
        	.authenticationEntryPoint(casAuthenticationEntryPoint())
        .and() 
            .csrf().disable()
            .headers()
            .frameOptions().disable()
        .and()
            .sessionManagement()
            .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
        .and()
            .authorizeRequests()
            .antMatchers("/api/activate").permitAll()
            .antMatchers("/api/authenticate").permitAll()
            .antMatchers("/api/profile-info").permitAll()
            .antMatchers("/management/metrics").access("hasAuthority('LEER_METRICA')")
            .antMatchers("/management/health").access("hasAuthority('LEER_SALUD')")
            .antMatchers("/management/configprops").access("hasAuthority('LEER_CONFIG')")
            .antMatchers("/management/audits").access("hasAuthority('LEER_AUDITORIA')")
            .antMatchers("/management/logs").access("hasAuthority('LEER_LOGS')")
            .antMatchers("/management/**").permitAll()
            .antMatchers("/v2/api-docs/**").permitAll()
            .antMatchers("/swagger-resources/configuration/ui").permitAll()
            .antMatchers("/swagger-ui/index.html").access("hasAuthority('LEER_API')")
            .antMatchers("/**").authenticated();
        //@formatter:on
    }

    @Bean
    public SecurityEvaluationContextExtension securityEvaluationContextExtension() {
        return new SecurityEvaluationContextExtension();
    }

}
