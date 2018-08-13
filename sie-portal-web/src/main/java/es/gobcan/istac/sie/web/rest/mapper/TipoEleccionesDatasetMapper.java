package es.gobcan.istac.sie.web.rest.mapper;

import org.mapstruct.Mapper;

import es.gobcan.istac.sie.domain.TipoEleccionesDataset;
import es.gobcan.istac.sie.web.rest.dto.TipoEleccionesDatasetDTO;

@Mapper(componentModel = "spring", uses = {})
public interface TipoEleccionesDatasetMapper extends EntityMapper<TipoEleccionesDatasetDTO, TipoEleccionesDataset> {
}