import axios from "axios";
import * as React from "react";
import { useEffect, useState } from "react";
import { Button } from "~/components/ui/button";
import { PlusCircleIcon } from "lucide-react";

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

export function AddSkillComponent(props: any) {
        const { toast } = useToast()

        const technologies = props.technologies;
        const setTechnologies = props.setTechnologies;
        const [skill, setSkill] = useState("");
        const [description, setDescription] = useState("");
        const [open, setOpen] = useState(false);

        const handleSave = async () => {          
                try {
                        const response = await axios.post(`${BACKEND_BASE_URL}/skills`, {
                                skill,
                                description,
                        })
                        toast({
                            title: "Success",
                            description: "Skill added successfully!",
                        });
                        setTechnologies([...technologies, response.data]);
                } catch (error) {
                        console.error("Error adding skill:", error);
                }
                setOpen(false);
        };

        return (
                <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                        <Button> <PlusCircleIcon />Add</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                        <DialogTitle>Add a new skill!</DialogTitle>
                        <DialogDescription>
                             Click save when done. 
                        </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="skill" className="text-right">
                                Skill
                                </Label>
                                <Input id="skill" value={skill} onChange={(e) => setSkill(e.target.value)} className="col-span-3" />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="description" className="text-right">
                                Description
                                </Label>
                                <Input id="description" value={description} onChange={(e) => setDescription(e.target.value)} className="col-span-3" />
                        </div>
                        </div>
                        <DialogFooter>
                        <Button type="submit" onClick={handleSave}>Save changes</Button>
                        </DialogFooter>
                </DialogContent>
                </Dialog>
        );
}
