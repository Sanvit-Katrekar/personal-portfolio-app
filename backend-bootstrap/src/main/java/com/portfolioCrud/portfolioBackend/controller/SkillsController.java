package com.portfolioCrud.portfolioBackend.controller;

import com.portfolioCrud.portfolioBackend.model.Skills;
import com.portfolioCrud.portfolioBackend.service.SkillsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/api/skills")
public class SkillsController {

    @Autowired
    private SkillsService skillsService;

    @PostMapping
    public ResponseEntity<Skills> saveSkill(@RequestBody Skills skill) {
        return new ResponseEntity<>(skillsService.saveSkill(skill), HttpStatus.CREATED);
    }

    @GetMapping
    public List<Skills> getAllSkills() {
        return skillsService.getAllSkills();
    }

    @CrossOrigin
    @GetMapping("{id}")
    public ResponseEntity<Skills> getSkillById(@PathVariable long skillId) {
        return new ResponseEntity<>(skillsService.getSkillById(skillId), HttpStatus.OK);
    }

    @CrossOrigin
    @PutMapping("{id}")
    public ResponseEntity<Skills> updateSkill(@PathVariable long id, @RequestBody Skills skill) {
        return new ResponseEntity<>(skillsService.updateSkill(skill, id), HttpStatus.OK);
    }

    @CrossOrigin
    @DeleteMapping("{id}")
    public ResponseEntity<String> deleteSkill(@PathVariable long id) {
        skillsService.deleteSkill(id);
        return new ResponseEntity<>("Skill deleted successfully.", HttpStatus.OK);
    }
}