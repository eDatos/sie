package es.gobcan.istac.sie.optimistic;

@FunctionalInterface
public interface RootLink<T extends VersionedEntity> {

    T root();
}