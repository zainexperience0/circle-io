import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { features } from '@/lib/constants'
import Image from 'next/image'


export const FeaturesTab = () => {
  return (
    <>
    <section className="py-12 text-center space-y-6">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold">
          Create a thriving community
        </h2>
        <p className="text-2xl sm:text-3xl md:text-4xl font-bold text-transparent bg-gradient-to-r from-blue-600 to-pink-600 bg-clip-text">
          you can be proud of
        </p>
      </section>
    <Tabs defaultValue="start" className="w-full py-6">
    <TabsList className="w-full bg-transparent flex flex-wrap justify-center gap-4 mb-8">
      {features.map(({ value, name }) => (
        <TabsTrigger
          key={value}
          value={value}
          className="bg-secondary data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-full px-6 py-2 transition-colors"
        >
          {name}
        </TabsTrigger>
      ))}
    </TabsList>
    {features.map(({ value, title, description, imageSrc }) => (
      <TabsContent key={value} value={value}>
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
    <div className="md:w-1/2 space-y-4">
      <h3 className="text-2xl font-bold tracking-tight">{title}</h3>
      <p className="text-lg font-medium tracking-wide text-muted-foreground">
        {description}
      </p>
    </div>
    <Image
    loading='lazy'
      alt={title}
      src={imageSrc}
      className="w-full md:w-1/2 rounded-lg shadow-lg"
      width={400}
      height={300}
      objectFit="cover"
    />
  </div>
      </TabsContent>
    ))}
  </Tabs>
  </>
  )
}
