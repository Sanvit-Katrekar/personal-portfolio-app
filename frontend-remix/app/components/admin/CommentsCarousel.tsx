import { useLoaderData } from "@remix-run/react";
import axios from "axios";
import * as React from "react"
import { useEffect, useState } from "react";

import { Card, CardContent } from "~/components/ui/card"
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "~/components/ui/carousel"
import { API_CALL_REFRESH_DURATION, BACKEND_BASE_URL } from "~/config/constants";
import { Spinner } from "~/components/Spinner";
import { Button } from "~/components/ui/button";
import { DeleteIcon, EditIcon } from "lucide-react";
import { useToast } from "~/hooks/use-toast"

export function CommentsCarousel() {
    const { toast } = useToast()
    const initialComments = [{
        id: 0,
        name: "",
        position: "",
        comment: ""
    }];
    const [comments, setComments] = useState<Array<{ id: number, name: string, position: string, comment: string }>>(initialComments as Array<{ id: number, name: string, position: string, comment: string }>);
    
    useEffect(() => {
        const interval = setInterval(async () => {
            try {
                const fetchedComments: Array<{
                    id: number,
                    name: string,
                    position: string,
                    comment: string
                }> = (await axios.get(`${BACKEND_BASE_URL}/feedback`)).data;

                const hasChanged = Object.keys(fetchedComments).length !== Object.keys(comments).length;

                if (hasChanged) {
                    setComments(fetchedComments);
                }
            } catch (error) {
                console.error('Error refetching skills:', error);
            }
        }, API_CALL_REFRESH_DURATION);

        return () => clearInterval(interval);
    }, [comments]);

    const handleEdit = async (commentId: number) => {
        const originalComment = comments.find(comment => comment.id === commentId);
        const updatedName = originalComment?.name;
        const updatedPosition = originalComment?.position;
        const updatedComment = prompt("Edit comment:", originalComment?.comment);
        if (updatedComment !== null) {
            try {
                await axios.put(`${BACKEND_BASE_URL}/feedback/${commentId}`, {
                    id: commentId,
                    name: updatedName,
                    position: updatedPosition,
                    comment: updatedComment
                });
                toast({
                    title: "Success",
                    description: "Comment edited successfully!",
                });
                setComments(prevComments => {
                    const newComments = [...prevComments];
                    const commentIndex = newComments.findIndex(comment => comment.id === commentId);
                    if (commentIndex !== -1) {
                        newComments[commentIndex].comment = updatedComment;
                    }
                    return newComments;
                });
            } catch (error) {
                console.error('Error updating comment:', error);
            }
        }
    };

    const handleDelete = async (commentId: number) => {
        try {
            await axios.delete(`${BACKEND_BASE_URL}/feedback/${commentId}`);
            toast({
                title: "Success",
                description: "Comment deleted successfully!",
            });
            setComments(prevComments => prevComments.filter(comment => comment.id !== commentId));
        } catch (error) {
            console.error('Error deleting comment:', error);
        }
    };

    return (
        <Carousel className="w-full max-w-md"
            opts={{
                align: "start",
                loop: true
            }}
        >
            <CarouselContent>
            {Object.entries(comments).map(([key, comment], index) => (
                <CarouselItem key={key}>
                <div className="p-1">
                    <Card>
                    <CardContent className="flex aspect-square items-center justify-center p-6">
                        <div>
                            {comment.id ? 
                                <>
                                    <h3 className="text-xl font-semibold">{comment.name}</h3>
                                    <p className="text-sm italic">{comment.position}</p>
                                    <p className="mt-2">{comment.comment}</p>
                                    <div className="flex gap-2 mt-4">
                                        <Button onClick={() => handleEdit(comment.id)}> <EditIcon />Edit</Button>
                                        <Button onClick={() => handleDelete(comment.id)}><DeleteIcon /> Delete</Button>
                                    </div>
                                </> : 
                                <div className="flex flex-col justify-center items-center gap-5">
                                    <h3 className="text-xl font-semibold">Loading comments..</h3>
                                    <Spinner />
                                </div>
                            }
                        </div>
                    </CardContent>
                    </Card>
                </div>
                </CarouselItem>
            ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
        </Carousel>
    )
}
