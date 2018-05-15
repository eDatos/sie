package com.arte.application.template.service.impl;

import java.io.IOException;
import java.sql.Blob;
import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.validation.ValidationException;

import org.hibernate.Hibernate;
import org.hibernate.Session;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.arte.application.template.domain.Documento;
import com.arte.application.template.repository.DocumentoRepository;
import com.arte.application.template.service.DocumentoService;

@Service
public class DocumentoServiceImpl implements DocumentoService {

    private Logger log = LoggerFactory.getLogger(DocumentoServiceImpl.class);

    @PersistenceContext
    private EntityManager entityManager;

    private final DocumentoRepository documentoRepository;

    public DocumentoServiceImpl(DocumentoRepository documentoRepository) {
        this.documentoRepository = documentoRepository;
    }

    @Override
    public Documento save(Documento documento) {
        log.debug("Request to save Documento : {}", documento);
        return documentoRepository.save(documento);
    }

    @Override
    public List<Documento> findAll() {
        log.debug("Request to get all Documentos");
        return documentoRepository.findAll();
    }

    @Override
    public Documento findOne(Long id) {
        log.debug("Request to get Documento : {}", id);
        return documentoRepository.findOne(id);
    }

    @Override
    public void delete(Long id) {
        log.debug("Request to delete Documento : {}", id);
        documentoRepository.delete(id);
    }

    @Override
    public Documento create(MultipartFile file) {
        log.debug("Request to save File : {}", file.getOriginalFilename());

        Blob data;

        try {
            data = Hibernate.getLobCreator((Session) entityManager.getDelegate()).createBlob(file.getInputStream(), file.getSize());
        } catch (IOException e) {
            throw new ValidationException(e);
        }

        Documento documento = new Documento();
        documento.setName(file.getOriginalFilename());
        documento.setData(data);
        documento.setLength(file.getSize());
        documento.setDataContentType(file.getContentType());
        return documentoRepository.save(documento);
    }

}
