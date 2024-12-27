import axios from "axios";
import * as React from "react";
import { useEffect, useState } from "react";
import { Button } from "~/components/ui/button";
import { EditIcon, PlusCircleIcon } from "lucide-react";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "~/components/ui/dialog"
import { Input } from "~/components/ui/input"
import { Label } from "~/components/ui/label"
import { BACKEND_BASE_URL } from "~/config/constants";
import { useToast } from "~/hooks/use-toast"
import { Textarea } from "../ui/textarea";

export function EditTechnology(props: any) {
        const { toast } = useToast()

        const technologies = props.technologies;
        const setTechnologies = props.setTechnologies;
        const [editskill, editsetSkill] = useState<string>("");
        const [editdescription, editsetDescription] = useState<string>("");
        const [open, setOpen] = useState(false);
        const technologyId = props.technologyId; 

        const handleEdit = async () => {         
                try {
                        const response = await axios.put(`${BACKEND_BASE_URL}/skills/${technologyId}`, {
                                'skill': editskill,
                                'description': editdescription,
                        })
                        toast({
                            title: "Success",
                            description: "Skill edited successfully!",
                        });
                        setTechnologies((prevTechnologies: any) => {
                            const newTechnologies = [...prevTechnologies];
                            const technologyIndex = newTechnologies.findIndex(technology => technology.id === technologyId);
                            if (technologyIndex !== -1) {
                                newTechnologies[technologyIndex].description = editdescription;
                            }
                            return newTechnologies;
                        });
                } catch (error) {
                        console.error("Error adding skill:", error);
                }
                setOpen(false);
        };
        useEffect(() => {
            const originalTechnology = technologies.find((technology: any) => technology.id === technologyId);
            if (originalTechnology) {
                editsetSkill(originalTechnology.skill);
                editsetDescription(originalTechnology.description);
            }
        }, [technologyId, technologies]);
        /*
        setSkill(originalTechnology.skill);
        setDescription(originalTechnology.description);
        */
        /*
        const originalTechnology = {
            skill: "writing",
            description: "writing abcd"
        }
        */
        return (
                <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                        <Button> <EditIcon />Edit</Button>
                </DialogTrigger>
                <DialogContent>
                        <DialogHeader>
                        <DialogTitle>Edit skill</DialogTitle>
                        <DialogDescription>
                            Click save when done. 
                        </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="skill" className="text-right">
                                Skill
                                </Label>
                                <Input id="skill" value={editskill} onChange={(e) => editsetSkill(e.target.value)} className="col-span-3" />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="description" className="text-right">
                                Description
                                </Label>
                                <Textarea id="description" value={editdescription} onChange={(e) => editsetDescription(e.target.value)} className="col-span-3" />
                        </div>
                        </div>
                        <DialogFooter>
                        <Button type="submit" onClick={handleEdit}>Save changes</Button>
                        </DialogFooter>
                </DialogContent>
                </Dialog>
        );
}
