package com.portfolioCrud.portfolioBackend.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.portfolioCrud.portfolioBackend.model.Feedback;
import com.portfolioCrud.portfolioBackend.repository.FeedbackRepository;
import com.portfolioCrud.portfolioBackend.service.FeedbackService;

import java.util.List;
import java.util.Optional;

@Service
public class FeedbackServiceImpl implements FeedbackService {

    @Autowired
    private FeedbackRepository feedbackRepository;

    @Override
    public Feedback saveFeedback(Feedback feedback){
        return feedbackRepository.save(feedback);
    }

    @Override
    public List<Feedback> getAllFeedbacks() {
        return feedbackRepository.findAll();
    }

    @Override
    public Feedback getFeedbackById(long id) {
        Optional<Feedback> feedback =  feedbackRepository.findById(id);
        if(feedback.isPresent()){
            return feedback.get();
        }else {
            throw new RuntimeException();
        }
    }

    @Override
    public Feedback updateFeedback(Feedback feedback, long id) {
        Feedback existingFeedback = feedbackRepository.findById(id).orElseThrow(
                ()-> new RuntimeException()
        );
        existingFeedback.setName(feedback.getName());
        existingFeedback.setPosition(feedback.getPosition());
        existingFeedback.setComment(feedback.getComment());
        // save
        feedbackRepository.save(existingFeedback);
        return existingFeedback;
    }

    @Override
    public void deleteFeedback(long id) {
        feedbackRepository.findById(id).orElseThrow(()-> new RuntimeException());
        feedbackRepository.deleteById(id);
    }
}
