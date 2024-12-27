import axios from "axios";
import * as React from "react";
import { useState } from "react";
import { Button } from "~/components/ui/button";
import { DeleteIcon, TrashIcon } from "lucide-react";

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

export function DeleteTechnology(props: any) {
    const { toast } = useToast();

    const technologies = props.technologies;
    const setTechnologies = props.setTechnologies;
    const [open, setOpen] = useState(false);
    const technologyId = props.technologyId;

    const handleDelete = async () => {
        try {
            await axios.delete(`${BACKEND_BASE_URL}/skills/${technologyId}`);
            toast({
                title: "Success",
                description: "Skill deleted successfully!",
            });
            setTechnologies((prevTechnologies: any) => {
                return prevTechnologies.filter((technology: any) => technology.id !== technologyId);
            });
        } catch (error) {
            console.error("Error deleting skill:", error);
        }
        setOpen(false);
    };

    const originalTechnology = technologies.find((technology: any) => technology.id === technologyId);

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button> <DeleteIcon />Delete</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Delete skill {originalTechnology.skill}</DialogTitle>
                    <DialogDescription>
                        Are you sure you want to delete the skill? This action cannot be undone.
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