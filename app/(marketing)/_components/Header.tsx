"use client"
import Marquee from '@/components/ui/marquee'
import Meteors from '@/components/ui/meteors'
import Particles from '@/components/ui/particles'
import Safari from '@/components/ui/safari'
import ShineBorder from '@/components/ui/shine-border'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import Image from 'next/image'
import React from 'react'
import TypewriterComponent from 'typewriter-effect'

export const Header = () => {
  return (
    <>
    <div className="text-center space-y-6 mb-12">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold">
          The all-in-one community platform for
        </h1>
        <div className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-blue-500 text-3xl sm:text-4xl md:text-5xl font-extrabold">
          <TypewriterComponent
            options={{
              strings: [
                "educators",
                "solopreneurs",
                "startups",
                "coaches",
                "entrepreneurs",
                "creators",
              ],
              autoStart: true,
              loop: true,
            }}
          />
        </div>
      </div>
      <Particles
        className="absolute inset-0 -z-10"
        quantity={1000}
        ease={500}
        color="#A07CFE"
        refresh
      />
      <Tabs defaultValue="home" className="w-full py-6">
        <TabsList className="w-full bg-transparent flex whitespace-nowrap">
          <TabsTrigger
            value="home"
            className="flex-shrink-0 capitalize data-[state=active]:border-b-4 border-purple-400 px-4 py-2"
          >
            Home
          </TabsTrigger>
          <TabsTrigger
            value="discussions"
            className="flex-shrink-0 capitalize data-[state=active]:border-b-4 border-purple-400 px-4 py-2"
          >
            Discussions
          </TabsTrigger>
          <TabsTrigger
            value="events"
            className="flex-shrink-0 capitalize data-[state=active]:border-b-4 border-purple-400 px-4 py-2"
          >
            Events
          </TabsTrigger>
          <TabsTrigger
            value="live"
            className="flex-shrink-0 capitalize data-[state=active]:border-b-4 border-purple-400 px-4 py-2"
          >
            Live
          </TabsTrigger>
          <TabsTrigger
            value="courses"
            className="flex-shrink-0 capitalize data-[state=active]:border-b-4 border-purple-400 px-4 py-2"
          >
            Courses
          </TabsTrigger>
          <TabsTrigger
            value="chat"
            className="flex-shrink-0 capitalize data-[state=active]:border-b-4 border-purple-400 px-4 py-2"
          >
            Chat
          </TabsTrigger>
          <TabsTrigger
            value="members"
            className="flex-shrink-0 capitalize data-[state=active]:border-b-4 border-purple-400 px-4 py-2"
          >
            Members
          </TabsTrigger>
        </TabsList>
        <TabsContent value="home">
          <ShineBorder
            className="relative flex h-[500px] w-full flex-col items-center justify-center overflow-hidden rounded-lg border bg-background md:shadow-xl"
            color={["#A07CFE", "#FE8FB5", "#FFBE7B"]}
          >
            <Meteors number={30} />
            <Safari
              className="size-full"
              src="/home.webp"
              url="http://arloo.co"
            />
          </ShineBorder>
        </TabsContent>
        <TabsContent value="discussions">
          <ShineBorder
            className="relative flex h-[500px] w-full flex-col items-center justify-center overflow-hidden rounded-lg border bg-background md:shadow-xl"
            color={["#A07CFE", "#FE8FB5", "#FFBE7B"]}
          >
            <Meteors number={30} />
            <Safari
              className="size-full"
              src="/discussion.webp"
              url="http://arloo.co"
            />
          </ShineBorder>
        </TabsContent>
        <TabsContent value="events">
          <ShineBorder
            className="relative flex h-[500px] w-full flex-col items-center justify-center overflow-hidden rounded-lg border bg-background md:shadow-xl"
            color={["#A07CFE", "#FE8FB5", "#FFBE7B"]}
          >
            <Meteors number={30} />
            <Safari
              className="size-full"
              src="/event.webp"
              url="http://arloo.co"
            />
          </ShineBorder>
        </TabsContent>
        <TabsContent value="live">
          <ShineBorder
            className="relative flex h-[500px] w-full flex-col items-center justify-center overflow-hidden rounded-lg border bg-background md:shadow-xl"
            color={["#A07CFE", "#FE8FB5", "#FFBE7B"]}
          >
            <Meteors number={30} />

            <video className="size-full" autoPlay src="/live.mp4"></video>
          </ShineBorder>
        </TabsContent>
        <TabsContent value="courses">
          <ShineBorder
            className="relative flex h-[500px] w-full flex-col items-center justify-center overflow-hidden rounded-lg border bg-background md:shadow-xl"
            color={["#A07CFE", "#FE8FB5", "#FFBE7B"]}
          >
            <Meteors number={30} />
            <Safari
              className="size-full"
              src="/courses.jpg"
              url="http://arloo.co"
            />
          </ShineBorder>
        </TabsContent>
        <TabsContent value="chat">
          <ShineBorder
            className="relative flex h-[500px] w-full flex-col items-center justify-center overflow-hidden rounded-lg border bg-background md:shadow-xl"
            color={["#A07CFE", "#FE8FB5", "#FFBE7B"]}
          >
            <Meteors number={30} />
            <Safari
              className="size-full"
              src="/chat.webp"
              url="http://arloo.co"
            />
          </ShineBorder>
        </TabsContent>
        <TabsContent value="members">
          <ShineBorder
            className="relative flex h-[500px] w-full flex-col items-center justify-center overflow-hidden rounded-lg border bg-background md:shadow-xl"
            color={["#A07CFE", "#FE8FB5", "#FFBE7B"]}
          >
            <Meteors number={30} />
            <Safari
              className="size-full"
              src="/members.jpg"
              url="http://arloo.co"
            />
          </ShineBorder>
        </TabsContent>
      </Tabs>
      <section className="py-12">
        <Marquee className="[--duration:20s]">
          {[
            "/adobe.svg",
            "/fertility.svg",
            "/futur.svg",
            "/harvard.svg",
            "lucy.svg",
            "webflow.svg",
          ].map((item) => (
            <Image
              key={item}
              alt="Partner logo"
              src={item}
              className="mx-4 opacity-50 hover:opacity-100 transition-opacity"
              height={80}
              width={80}
            />
          ))}
        </Marquee>
      </section>
    </>
  )
}
