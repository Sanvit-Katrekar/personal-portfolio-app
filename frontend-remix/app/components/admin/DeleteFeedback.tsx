import axios from "axios";
import * as React from "react";
import { useState } from "react";
import { Button } from "~/components/ui/button";
import { DeleteIcon } from "lucide-react";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "~/components/ui/dialog";
import { BACKEND_BASE_URL } from "~/config/constants";
import { useToast } from "~/hooks/use-toast";

export function DeleteFeedback(props: any) {
    const { toast } = useToast();

    const feedbacks = props.feedbacks;
    const setFeedbacks = props.setFeedbacks;
    const [open, setOpen] = useState(false);
    const feedbackId = props.feedbackId;

    const handleDelete = async () => {
        try {
            await axios.delete(`${BACKEND_BASE_URL}/feedback/${feedbackId}`);
            toast({
                title: "Success",
                description: "Feedback deleted successfully!",
            });
            setFeedbacks((prevFeedbacks: any) => {
                return prevFeedbacks.filter((feedback: any) => feedback.id !== feedbackId);
            });
        } catch (error) {
            console.error("Error deleting feedback:", error);
        }
        setOpen(false);
    };

    const originalFeedback = feedbacks.find((feedback: any) => feedback.id === feedbackId);

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button><DeleteIcon />Delete</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Delete feedback from {originalFeedback.name}</DialogTitle>
                    <DialogDescription>
                        Are you sure you want to delete this feedback? This action cannot be undone.
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <Button variant="destructive" onClick={handleDelete}>Delete</Button>
                    <Button variant="secondary" onClick={() => setOpen(false)}>Cancel</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}