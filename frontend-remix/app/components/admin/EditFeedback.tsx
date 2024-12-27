import axios from "axios";
import * as React from "react";
import { useEffect, useState } from "react";
import { Button } from "~/components/ui/button";
import { EditIcon } from "lucide-react";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "~/components/ui/dialog";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { BACKEND_BASE_URL } from "~/config/constants";
import { useToast } from "~/hooks/use-toast";
import { Textarea } from "../ui/textarea";

export function EditFeedback(props: any) {
    const { toast } = useToast();

    const feedbacks = props.feedbacks;
    const setFeedbacks = props.setFeedbacks;
    const [editName, setEditName] = useState<string>("");
    const [editPosition, setEditPosition] = useState<string>("");
    const [editComment, setEditComment] = useState<string>("");
    const [open, setOpen] = useState(false);
    const feedbackId = props.feedbackId;

    const handleEdit = async () => {
        try {
            const response = await axios.put(`${BACKEND_BASE_URL}/feedback/${feedbackId}`, {
                'name': editName,
                'position': editPosition,
                'comment': editComment,
            });
            toast({
                title: "Success",
                description: "Feedback edited successfully!",
            });
            setFeedbacks((prevFeedbacks: any) => {
                const newFeedbacks = [...prevFeedbacks];
                const feedbackIndex = newFeedbacks.findIndex(feedback => feedback.id === feedbackId);
                if (feedbackIndex !== -1) {
                    newFeedbacks[feedbackIndex].name = editName;
                    newFeedbacks[feedbackIndex].position = editPosition;
                    newFeedbacks[feedbackIndex].comment = editComment;
                }
                return newFeedbacks;
            });
        } catch (error) {
            console.error("Error editing feedback:", error);
        }
        setOpen(false);
    };

    useEffect(() => {
        const originalFeedback = feedbacks.find((feedback: any) => feedback.id === feedbackId);
        if (originalFeedback) {
            setEditName(originalFeedback.name);
            setEditPosition(originalFeedback.position);
            setEditComment(originalFeedback.comment);
        }
    }, [feedbackId, feedbacks]);

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button> <EditIcon />Edit</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Edit Feedback</DialogTitle>
                    <DialogDescription>
                        Click save when done.
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="name" className="text-right">
                            Name
                        </Label>
                        <Input id="name" value={editName} onChange={(e) => setEditName(e.target.value)} className="col-span-3" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="position" className="text-right">
                            Position
                        </Label>
                        <Input id="position" value={editPosition} onChange={(e) => setEditPosition(e.target.value)} className="col-span-3" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="comment" className="text-right">
                            Comment
                        </Label>
                        <Textarea id="comment" value={editComment} onChange={(e) => setEditComment(e.target.value)} className="col-span-3" />
                    </div>
                </div>
                <DialogFooter>
                    <Button type="submit" onClick={handleEdit}>Save changes</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}