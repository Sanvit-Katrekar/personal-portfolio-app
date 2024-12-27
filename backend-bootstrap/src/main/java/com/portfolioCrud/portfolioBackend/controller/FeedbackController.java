package com.portfolioCrud.portfolioBackend.controller;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.portfolioCrud.portfolioBackend.model.Feedback;
import com.portfolioCrud.portfolioBackend.service.FeedbackService;

import java.util.List;


@RestController
@CrossOrigin
@RequestMapping("/api/feedback")
public class FeedbackController {

    @Autowired
    private FeedbackService feedbackService;

    @PostMapping
    public ResponseEntity<Feedback> saveFeedback(@RequestBody Feedback feedback){
        return new ResponseEntity<Feedback>(feedbackService.saveFeedback(feedback), HttpStatus.CREATED);
    }
    //GetAll Rest Api
    @GetMapping
    public List<Feedback> getAllFeedbacks(){
        return feedbackService.getAllFeedbacks();
    }

    //Get by Id Rest Api
    @CrossOrigin
    @GetMapping("{id}")

    public ResponseEntity<Feedback> getFeedbackById(@PathVariable("id") long feedbackId){
        return new ResponseEntity<Feedback>(feedbackService.getFeedbackById(feedbackId),HttpStatus.OK);
    }

    //Update Rest Api
    @CrossOrigin
    @PutMapping("{id}")
    public ResponseEntity<Feedback> updateFeedback(@PathVariable long id,
                                                   @RequestBody Feedback feedback){
        return new ResponseEntity<Feedback>(feedbackService.updateFeedback(feedback,id),HttpStatus.OK);
    }

    //Delete Rest Api
    @CrossOrigin
    @DeleteMapping("{id}")
    public ResponseEntity<String> deleteFeedback(@PathVariable long id){
        feedbackService.deleteFeedback(id);
        return new ResponseEntity<String>("Feedback deleted Successfully.",HttpStatus.OK);
    }

}
