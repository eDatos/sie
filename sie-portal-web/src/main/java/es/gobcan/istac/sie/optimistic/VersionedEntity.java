package es.gobcan.istac.sie.optimistic;

import java.io.Serializable;

public interface VersionedEntity {

    Serializable getId();

    Long getOptLock();

    void setOptLock(Long optLock);

}