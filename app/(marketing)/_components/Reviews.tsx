import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import Marquee from '@/components/ui/marquee'
import { reviews } from '@/lib/constants'
import React from 'react'

export const Reviews = () => {
  return (
    <section className="pt-52 text-center space-y-9">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold">
          Loved by thousands of creators and brands
        </h1>
        <Marquee className="[--duration:30s]">
          {reviews.map((review) => (
            <Card key={review.name} className="flex flex-col h-full">
              <CardHeader className="flex-row gap-4 items-center">
                <Avatar>
                  <AvatarImage
                    src={review.img}
                    alt={`${review.name}'s avatar`}
                  />
                  <AvatarFallback>{review.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="text-lg font-semibold">{review.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    {review.username}
                  </p>
                </div>
              </CardHeader>
              <CardContent className="flex-grow">
                <p className="text-muted-foreground">{review.body}</p>
              </CardContent>
            </Card>
          ))}
        </Marquee>
      </section>
  )
}
