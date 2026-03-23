package com.pos.controller;

import com.pos.entity.MasterReferensi;
import com.pos.dto.MasterReferensiDto;
import com.pos.service.MasterReferensiService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/master-referensi")
public class MasterReferensiController {
    @Autowired
    private MasterReferensiService service;

    @GetMapping
    public List<MasterReferensi> getAll() {
        return service.getAll();
    }

    @GetMapping("/{id}")
    public MasterReferensi getById(@PathVariable Integer id) {
        return service.getById(id);
    }

    @PostMapping
    public MasterReferensi create(@RequestBody MasterReferensi entity) {
        return service.create(entity);
    }

    @PutMapping("/{id}")
    public MasterReferensi update(@PathVariable Integer id, @RequestBody MasterReferensi entity) {
        return service.updateFull(id, entity);
    }

    @PatchMapping("/{id}")
    public MasterReferensi partialUpdate(@PathVariable Integer id, @RequestBody MasterReferensi updates) {
        return service.updatePartial(id, updates);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Integer id) {
        service.delete(id);
    }

    @GetMapping("/by-vdesc/{vdesc}")
    public List<MasterReferensiDto> findByVdesc(@PathVariable String vdesc) {
        return service.findByVdesc(vdesc);
    }
}