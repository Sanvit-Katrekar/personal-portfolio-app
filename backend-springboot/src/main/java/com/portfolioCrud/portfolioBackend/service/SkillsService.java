package com.portfolioCrud.portfolioBackend.service;

import java.util.List;

import com.portfolioCrud.portfolioBackend.model.Skills;

public interface SkillsService {
    Skills saveSkill(Skills skill);
    List<Skills> getAllSkills();
    Skills getSkillById(long id);
    Skills updateSkill(Skills skill, long id);
    void deleteSkill(long id);
}