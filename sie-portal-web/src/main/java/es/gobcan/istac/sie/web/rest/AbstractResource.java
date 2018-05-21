package es.gobcan.istac.sie.web.rest;

import org.springframework.transaction.annotation.Transactional;

@Transactional(rollbackFor = Exception.class)
public class AbstractResource {

}
