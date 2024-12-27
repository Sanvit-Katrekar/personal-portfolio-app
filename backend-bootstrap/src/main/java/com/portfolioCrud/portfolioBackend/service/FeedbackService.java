package com.portfolioCrud.portfolioBackend.service;
import java.util.List;

import com.portfolioCrud.portfolioBackend.model.Feedback;

public interface FeedbackService {
    Feedback saveFeedback(Feedback feedback);
    List<Feedback> getAllFeedbacks();
    Feedback getFeedbackById(long id);
    Feedback updateFeedback(Feedback feedback,long id);
    void deleteFeedback(long id);
}
