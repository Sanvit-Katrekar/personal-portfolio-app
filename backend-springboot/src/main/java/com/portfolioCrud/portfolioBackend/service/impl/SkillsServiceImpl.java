package com.portfolioCrud.portfolioBackend.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.portfolioCrud.portfolioBackend.model.Skills;
import com.portfolioCrud.portfolioBackend.repository.SkillsRepository;
import com.portfolioCrud.portfolioBackend.service.SkillsService;

import java.util.List;
import java.util.Optional;

@Service
public class SkillsServiceImpl implements SkillsService {

    @Autowired
    private SkillsRepository skillsRepository;

    @Override
    public Skills saveSkill(Skills skill) {
        return skillsRepository.save(skill);
    }

    @Override
    public List<Skills> getAllSkills() {
        return skillsRepository.findAll();
    }

    @Override
    public Skills getSkillById(long id) {
        Optional<Skills> skill = skillsRepository.findById(id);
        if (skill.isPresent()) {
            return skill.get();
        } else {
            throw new RuntimeException();
        }
    }

    @Override
    public Skills updateSkill(Skills skill, long id) {
        Skills existingSkill = skillsRepository.findById(id).orElseThrow(
                () -> new RuntimeException()
        );
        existingSkill.setSkill(skill.getSkill());
        existingSkill.setDescription(skill.getDescription());
        skillsRepository.save(existingSkill);
        return existingSkill;
    }

    @Override
    public void deleteSkill(long id) {
        skillsRepository.findById(id).orElseThrow(() -> new RuntimeException());
        skillsRepository.deleteById(id);
    }
}