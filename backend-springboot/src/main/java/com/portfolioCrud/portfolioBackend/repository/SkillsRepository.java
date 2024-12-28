package com.portfolioCrud.portfolioBackend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.portfolioCrud.portfolioBackend.model.Skills;

public interface SkillsRepository extends JpaRepository<Skills, Long> {
    // CRUD operations
}