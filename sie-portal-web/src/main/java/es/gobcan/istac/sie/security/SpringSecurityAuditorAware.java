package es.gobcan.istac.sie.security;

import org.springframework.data.domain.AuditorAware;
import org.springframework.stereotype.Component;

import es.gobcan.istac.sie.config.Constants;

@Component
public class SpringSecurityAuditorAware implements AuditorAware<String> {

    @Override
    public String getCurrentAuditor() {
        String userName = SecurityUtils.getCurrentUserLogin();
        return userName != null ? userName : Constants.SYSTEM_ACCOUNT;
    }
}
