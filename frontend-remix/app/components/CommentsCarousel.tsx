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

export function CommentsCarousel() {
  const initialComments = [{
    name: "",
    position: "",
    comment: ""
  }];
  const [comments, setComments] = useState<Array<{ name: string, position: string, comment: string }>>(initialComments as Array<{ name: string, position: string, comment: string }>);
  const [heading, setHeading] = useState<string>();
  
  useEffect(() => {
    const interval = setInterval(async () => {
      try {
        const fetchedComments: Array<{
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

  return (
    <Carousel className="w-full max-w-sm"
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
              {comment.name ? 
                <>
                  <h3 className="text-xl font-semibold">{comment.name}</h3>
                  <p className="text-sm italic">{comment.position}</p>
                  <p className="mt-2">{comment.comment}</p>
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
