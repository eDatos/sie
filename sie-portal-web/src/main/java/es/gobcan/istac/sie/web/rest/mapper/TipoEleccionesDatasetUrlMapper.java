package es.gobcan.istac.sie.web.rest.mapper;

import org.mapstruct.Mapper;

import es.gobcan.istac.sie.domain.TipoEleccionesDatasetUrlEntity;
import es.gobcan.istac.sie.web.rest.dto.TipoEleccionesDatasetUrlDTO;

@Mapper(componentModel = "spring", uses = {})
public interface TipoEleccionesDatasetUrlMapper extends EntityMapper<TipoEleccionesDatasetUrlDTO, TipoEleccionesDatasetUrlEntity> {
}