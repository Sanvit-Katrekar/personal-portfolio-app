import axios from "axios";
import * as React from "react";
import { useEffect, useState } from "react";

import { Card, CardContent } from "~/components/ui/card";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "~/components/ui/carousel";
import { API_CALL_REFRESH_DURATION, BACKEND_BASE_URL } from "~/config/constants";
import { Spinner } from "~/components/Spinner";
import { Button } from "~/components/ui/button";
import { DeleteIcon, EditIcon, PlusCircleIcon } from "lucide-react";
import { AddSkillComponent } from "./AddSkillComponent";
import { useToast } from "~/hooks/use-toast"

export function SectionTechnologies() {
    const { toast } = useToast()
    const initialTechnologies = [{
        id: 0,
        skill: "",
        description: ""
    }];
    const [technologies, setTechnologies] = useState<Array<{
             id: number, skill: string, description: string 
}>>(initialTechnologies);

    useEffect(() => {
        const interval = setInterval(async () => {
            try {
                const fetchedTechnologies: Array<{
                    id: number,
                    skill: string,
                    description: string
                }> = (await axios.get(`${BACKEND_BASE_URL}/skills`)).data;

                const hasChanged = Object.keys(fetchedTechnologies).length !== Object.keys(technologies).length;

                if (hasChanged) {
                    setTechnologies(fetchedTechnologies);
                }
            } catch (error) {
                console.error('Error refetching technologies:', error);
            }
        }, API_CALL_REFRESH_DURATION);

        return () => clearInterval(interval);
    }, [technologies]);

    const handleEdit = async (technologyId: number) => {
        const originalTechnology = technologies.find(technology => technology.id === technologyId);
        const updatedSkill = originalTechnology?.skill;
        const updatedDescription = prompt("Edit description:", originalTechnology?.description);
        if (updatedDescription !== null) {
            try {
                await axios.put(`${BACKEND_BASE_URL}/skills/${technologyId}`, {
                    id: technologyId,
                    skill: updatedSkill,
                    description: updatedDescription
                });
                toast({
                    title: "Success",
                    description: "Skill edited successfully!",
                });
                setTechnologies(prevTechnologies => {
                    const newTechnologies = [...prevTechnologies];
                    const technologyIndex = newTechnologies.findIndex(technology => technology.id === technologyId);
                    if (technologyIndex !== -1) {
                        newTechnologies[technologyIndex].description = updatedDescription;
                    }
                    return newTechnologies;
                });
            } catch (error) {
                console.error('Error updating technology:', error);
            }
        }
    };

    const handleDelete = async (technologyId: number) => {
        try {
            await axios.delete(`${BACKEND_BASE_URL}/skills/${technologyId}`);
            toast({
                title: "Success",
                description: "Skill deleted successfully!",
            });
            setTechnologies(prevTechnologies => prevTechnologies.filter(technology => technology.id !== technologyId));
        } catch (error) {
            console.error('Error deleting technology:', error);
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
            {Object.entries(technologies).map(([key, technology], index) => (
                <CarouselItem key={key}>
                <div className="p-1">
                    <Card>
                    <CardContent className="flex aspect-square items-center justify-center p-6">
                        <div>
                            {technology.id ? 
                                <>
                                    <h3 className="text-xl font-semibold">{technology.skill}</h3>
                                    <p className="mt-2">{technology.description}</p>
                                    <div className="flex flex-col my-5 justify-center items-center">
                                        <AddSkillComponent />
                                    </div>
                                    <div className="flex justify-center items-center gap-2 mt-4">
                                        <Button onClick={() => handleEdit(technology.id)}> <EditIcon />Edit</Button>
                                        <Button onClick={() => handleDelete(technology.id)}><DeleteIcon /> Delete</Button>
                                    </div>
                                </> : 
                                <div className="flex flex-col justify-center items-center gap-5">
                                    <h3 className="text-xl font-semibold">Loading technologies..</h3>
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