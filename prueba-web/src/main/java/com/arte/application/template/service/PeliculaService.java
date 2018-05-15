package com.arte.application.template.service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.arte.application.template.domain.Documento;
import com.arte.application.template.domain.Pelicula;

/**
 * Service Interface for managing Pelicula.
 */
public interface PeliculaService {

    /**
     * Save a pelicula.
     *
     * @param peliculaDTO the entity to save
     * @return the persisted entity
     */
    Pelicula save(Pelicula pelicula);

    /**
     * Get all the peliculas.
     *
     * @param query the query filter
     * @param pageable the pagination information
     * @return the list of entities
     */
    Page<Pelicula> findAll(String query, Pageable pageable);

    /**
     * Get the "id" pelicula.
     *
     * @param id the id of the entity
     * @return the entity
     */
    Pelicula findOne(Long id);

    /**
     * Delete the "id" pelicula.
     *
     * @param id the id of the entity
     */
    void delete(Long id);

    /**
     * Bind a documento to pelicula
     * 
     * @param pelicula the entity to update
     * @param documento the documento to bind
     * @return the persisted entity
     */
    Pelicula bindDocumento(Pelicula pelicula, Documento documento);
}
