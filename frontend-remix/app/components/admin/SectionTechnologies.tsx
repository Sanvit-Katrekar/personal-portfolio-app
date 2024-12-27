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
import { EditTechnology } from "./EditTechnology";
import { DeleteTechnology } from "./DeleteTechnology";

export function SectionTechnologies() {
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
                                         <EditTechnology technologyId={technology.id} technologies={technologies} setTechnologies={setTechnologies}/>
                                         <DeleteTechnology technologyId={technology.id} technologies={technologies} setTechnologies={setTechnologies}/>
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