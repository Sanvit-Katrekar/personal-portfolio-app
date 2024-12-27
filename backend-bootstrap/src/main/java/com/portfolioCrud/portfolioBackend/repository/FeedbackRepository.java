package com.portfolioCrud.portfolioBackend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.portfolioCrud.portfolioBackend.model.Feedback;

public interface FeedbackRepository extends JpaRepository<Feedback,Long> {
    //crud
}
